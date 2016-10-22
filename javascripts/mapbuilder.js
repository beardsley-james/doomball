var activeGame;
var targetElement, target, targetX, targetY, targetSpace, targetUnit;
var player1Race, player2Race;

$(document).ready(function(){
	for (var key in terrain){
		$("#terrain").append(
			"<option value='" + key + "'>" + terrain[key].name + "</option>"
		)
	}
	
	for (var key in units){
		$("#player1").append(
			"<option value='" + key + "'>" + capitalize(key) + "</option>"
		)
		
		$("#player2").append(
			"<option value='" + key + "'>" + capitalize(key) + "</option>"
		)
	}
})

$("#submit").on("click", function(e){
	e.preventDefault();
	var height = $("#height").val();
	var width = $("#width").val();
	var terrain = $("#terrain").val();
	var rowString = "";
	var mapArray = []
	player1Race = $("#player1").val();
	player2Race = $("#player2").val();
	
	for (var i = 0; i < width; i++){
		rowString += terrain
	}
	
	for (var i = 0; i < height; i++){
		mapArray.push(rowString)
	}
	
	activeGame = new Map(mapArray);
	
	$("#menu").html(
		"<h2>Select a space to edit</h2>"
	)
	
	renderMap()
	
})

var renderMenu = function(){
	$("#menu").html("");
	$("<h2>").appendTo($("#menu")).text("Editing space " + targetY + " " + targetX);
	$("<h3>").appendTo($("#menu")).text("Terrain");
	$("<select>").appendTo($("#menu")).attr("id", "spaceTerrain");
	for (var key in terrain){
		$("<option>").appendTo($("#spaceTerrain")).attr("value", key).text(terrain[key].name).prop("selected", function(){if (terrain[key].name == targetSpace.terrain.name) return true})
	}
	$("<h3>").appendTo($("#menu")).text("Unit");
	$("<select>").appendTo($("#menu")).attr("id", "spaceUnit");
	$("<option>").appendTo($("#spaceUnit")).attr("value", "None").text("Empty space");
	$("<option>").appendTo($("#spaceUnit")).attr("value", "None").text("Player 1");
	for (var key in units[player1Race]){
		$("<option>").appendTo($("#spaceUnit")).attr("value", "player1 " + player1Race + " " + key).text("-" + units[player1Race][key].name).prop("selected",
			function(){
				if (targetSpace.contains){
					var thisSpaceContains = targetSpace.contains.player + " " + targetSpace.contains.race + " " + targetSpace.contains.name.split(" ").join("").toLowerCase();
					var elementUnitName = "player1 " + player1Race + " " + key;
					if (thisSpaceContains == elementUnitName){
						return true
					}
				}
			}
		)
	}
	$("<option>").appendTo($("#spaceUnit")).attr("value", "None").text("Player 2");
	for (var key in units[player2Race]){
		$("<option>").appendTo($("#spaceUnit")).attr("value", "player2 " + player2Race + " " + key).text("-" + units[player2Race][key].name).prop("selected",
			function(){
				if (targetSpace.contains){
					var thisSpaceContains = targetSpace.contains.player + " " + targetSpace.contains.race + " " + targetSpace.contains.name.split(" ").join("").toLowerCase();
					var elementUnitName = "player2 " + player2Race + " " + key;
					if (thisSpaceContains == elementUnitName){
						return true
					}
				}
			}
		)
	}
	$("<button>").appendTo($("#menu")).attr("id", "file").text("Save changes");
	$("<button>").appendTo($("#menu")).attr("id", "stringify").text("Stringify");
}

$("#menu").on("click", "#stringify", function(e){
	e.preventDefault();
	var mapObject = stringify(activeGame);
	$("#bucket").html(JSON.stringify(mapObject));
})

$("#bucket").on("click", ".gridSpace", function(){
	setTargetElement($(this));
	renderMenu();
})

$("#menu").on("click", "#file", function(e){
	e.preventDefault();
	targetSpace.terrain = terrain[$("#spaceTerrain").val()];
	if ($("#spaceUnit").val() != "None"){
		var selectedUnit = $("#spaceUnit").val();
		selectedUnit = selectedUnit.split(" ");
		var selectedPlayer = selectedUnit[0];
		var selectedRace = selectedUnit[1];
		var selectedPiece = selectedUnit[2];
		targetSpace.contains = new Unit(units[selectedRace][selectedPiece]);
		targetSpace.contains.player = selectedPlayer;
	}
	renderMap();
})

var setTargetElement = function(element){
	targetElement =  element;
	target = getXY(element);
	targetX = target.x;
	targetY = target.y;
	targetSpace = activeGame.spaces[targetY][targetX];
	if (targetSpace.contains) {
		targetUnit = targetSpace.contains
	} else {targetUnit = undefined}
}

var getXY = function(element){
	var classes = element.attr("class").split(" ");
	var x = classes[2].charAt(3);
	var y = classes[1].charAt(3);
	return {
		"x": x,
		"y": y
	}
}

var stripClass = function(classname){
	$("." + classname).removeClass(classname)
}

var renderMap = function(){
	$("#bucket").html(activeGame.render());
}

var capitalize = function(string){
	string = string.split("");
	string[0]= string[0].toUpperCase();
	return string.join("")
}

var stringify = function(game){
	var map = {};
	map.board = [];
	map.p1Army = [];
	map.p2Army = [];
	map.p1Race = player1Race;
	map.p2Race = player2Race;
	game.spaces.forEach(function(row){
		var rowString = "";
		row.forEach(function(space){
			var terrainName = space.terrain.name;
			for (var key in terrain){
				if (terrain[key].name == terrainName){
					rowString += key
				}
			}
			if (space.contains){
				var unitString = space.contains.name.split(" ").join("").toLowerCase() + " " + space.y + " " + space.x;
				if (space.contains.player == "player1"){
					map.p1Army.push(unitString)
				} else {map.p2Army.push(unitString)}
			}
		})
		map.board.push(rowString)
	})
	return map
}