var activeGame;
var activeElement, active, x, y, activeSpace, activeUnit;
var targetElement, target, targetX, targetY, targetSpace, targetUnit;
var turnCount = 0;
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
	
	console.log(mapArray);
	
	activeGame = new Map(mapArray);
	
	renderMap()
	
})

$("#bucket").on("click", ".gridSpace", function(){
	
})


var setActiveElement = function(element){
	activeElement = element;
	active = getXY(element);
	x = active.x;
	y = active.y;
	activeSpace = activeGame.spaces[y][x];
	activeUnit = activeSpace.contains
	setMovable();
	setTargetable();
	activeElement.addClass("activeSpace");
}

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

var setMovable = function(){
	stripClass("movable");
	var movableSpaces = activeGame.movableSpaces(y, x);
	movableSpaces.forEach(function(space){
		$(".row" + space.y + ".col" + space.x).addClass("movable")
	})
}

var setTargetable = function(){
	stripClass("targetable");
	var availableTargets = activeGame.availableTargets(y, x);
	availableTargets.forEach(function(space){
		$(".row" + space.y + ".col" + space.x).addClass("targetable")
	})
}

var renderSpaces = function() {
	activeElement.replaceWith(activeSpace.render());
	targetElement.replaceWith(targetSpace.render());
	stripClass("movable");
	stripClass("targetable")
}

var renderMap = function(){
	$("#bucket").html(activeGame.render());
}

var capitalize = function(string){
	string = string.split("");
	string[0]= string[0].toUpperCase();
	return string.join("")
}