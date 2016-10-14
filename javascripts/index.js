var activeGame;
var activeElement, active, x, y, activeSpace, activeUnit;
var targetElement, target, targetX, targetY, targetSpace, targetUnit;
var turnCount = 0;

$(document).ready(function(){
	for (var key in units){
		$("#attackerSelect").append(
			"<input type='radio' name='attacker' value='" + key + "'>" + key + "</br>"
		);
		$("#defenderSelect").append(
			"<input type='radio' name='defender' value='" + key + "'>" + key + "</br>"
		);
	}
})

$("#submit").on("click", function(e){
	e.preventDefault();
	$("#teamSelect").toggle();
	var attacker = $('input[name=attacker]:checked').val();
	var defender = $('input[name=defender]:checked').val();
	activeGame = mapConstructor(attacker, defender);
	activeGame.switchActivePlayer();
	renderMap();
})

$("#bucket").on("click", ".gridSpace", function(){
	setTargetElement($(this));
	if (targetUnit) {
		if (targetElement.hasClass("activeSpace")){
			if (activeUnit.attack.special && !activeUnit.loaded){
				activeUnit.loaded = true;
				console.log("Active unit reloads")
			}
			activeUnit.inactivate();
			renderSpaces();
			if (activeGame.checkIfTurnComplete()){
				activeGame.switchActivePlayer();
				renderMap();
			}
		} else if (($(".activeSpace").length === 0 || activeUnit.player == targetUnit.player) && !targetUnit.inactive && targetUnit.player == activeGame.activePlayer){
			stripClass("activeSpace");
			setActiveElement($(this));
		} else if (targetElement.hasClass("targetable")){
			if (activeUnit.attack.special){
				delete activeUnit.loaded
			}
			if (activeUnit.attacks(targetUnit)){
				var targetDefense = targetUnit.defense["value"];
				if (targetUnit.defense.adjusted){
					targetDefense = targetUnit.defense.adjusted
				}
				if (targetSpace.terrain.name == "Forests" && !activeSpace.isAdjacentTo(targetSpace)){
					targetDefense ++;
					console.log("The target is shielded by the forests")
				}
				console.log("Target's defense is " + targetDefense);
				console.log("Currently has " + targetUnit.hits + " hits")
				if (activeUnit.special == "Pinning"){
					targetUnit.pinned = true;
					console.log("Target is pinned by the attack");
				}
				console.log("Hits!");
				if (targetUnit.hits > targetDefense) {
					delete targetSpace.contains
					console.log("Target unit destroyed with " + targetUnit.hits + " hits versus " + targetDefense + " defense");
					if (activeUnit.special == "Overrun") {
						targetSpace.contains = activeSpace.contains;
						delete activeSpace.contains;
						targetSpace.contains.hasMoved = true;
					}
				} else if (targetUnit.hits == targetDefense  && targetUnit.special != "Steadfast") {
					var retreatSpace = activeGame.retreat(targetY, targetX);
					if (retreatSpace == false || targetUnit.pinned) {
						delete targetSpace.contains
						console.log("Target unit destroyed with " + targetUnit.hits + " hits versus " + targetDefense + " defense due to no retreatable spaces");
						if (activeUnit.special == "Overrun") {
							targetSpace.contains = activeSpace.contains;
							delete activeSpace.contains;
							targetSpace.contains.hasMoved = true;
						}
					} else {
						activeGame.spaces[retreatSpace.y][retreatSpace.x].contains = targetSpace.contains;
						delete targetSpace.contains;
						if (activeUnit.special == "Overrun") {
							targetSpace.contains = activeSpace.contains;
							delete activeSpace.contains;
							targetSpace.contains.hasMoved = true;
						}
					}
				}
			} else {console.log("Miss!")}
			activeUnit.inactivate();
			if (activeGame.checkIfTurnComplete()){
				activeGame.switchActivePlayer();
				renderMap();
			}
			renderMap();
		}
	} else if ($(".activeSpace".length > 1)) {
		if (targetElement.hasClass("movable")){
			if (activeUnit.defense.special){
				activeUnit.adjustStat("defense", 1)
			}
			if (activeUnit.special == "Charging"){
				activeUnit.adjustStat("attack", 1)
			}
			targetSpace.contains = activeSpace.contains;
			delete activeSpace.contains;
			targetSpace.contains.hasMoved = true;
			renderSpaces();
			setActiveElement($(".row" + targetY + ".col" + targetX));
		}
	}
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

var mapConstructor = function(attacker, defender){
	var attArmy = armyList[attacker]["attacker"];
	var defArmy = armyList[defender]["defender"];
	var map = defArmy["map"].concat(attArmy.map);
	var board = new Map(map);
	attArmy["army"].forEach(function(item){
		var unit = item.split(" ");
		var type = unit[0];
		var y = unit[1];
		var x = unit[2];
		board.spaces[y][x].contains = new Unit(units[attacker][type]);
		if (board.spaces[y][x].contains.attack.special){
			board.spaces[y][x].contains.loaded = true
		}
		board.spaces[y][x].contains.player = "player1"
	});
	defArmy["army"].forEach(function(item){
		var unit = item.split(" ");
		var type = unit[0];
		var y = unit[1];
		var x = unit[2];
		board.spaces[y][x].contains = new Unit(units[defender][type]);
		if (board.spaces[y][x].contains.attack.special){
			board.spaces[y][x].contains.loaded = true
		}
		board.spaces[y][x].contains.player = "player2"
	});
	return board
}
