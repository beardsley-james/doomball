var activeGame = sampleMap;
var activeElement, active, x, y, activeSpace, activeUnit;
var targetElement, target, targetX, targetY, targetSpace, targetUnit;
var turnCount = 0;

$(document).ready(function(){
	activeGame.switchActivePlayer();
	renderMap();
})

$("div#bucket").on("click", ".gridSpace", function(){
	setTargetElement($(this));
	if (targetUnit) {
		if (targetElement.hasClass("activeSpace")){
			activeUnit.inactivate();
			renderSpaces();
		} else if (($(".activeSpace").length === 0 || activeUnit.player == targetUnit.player) && !targetUnit.inactive && targetUnit.player == activeGame.activePlayer){
			stripClass("activeSpace");
			setActiveElement($(this));
		} else if (targetElement.hasClass("targetable")){
			activeUnit.attacks(targetUnit);
			if (targetUnit.hits > targetUnit.defense.value) {
				delete targetSpace.contains
			}
			activeUnit.inactivate();
			renderSpaces();
		}
	} else if ($(".activeSpace".length > 1)) {
		if (targetElement.hasClass("movable")){
			targetSpace.contains = activeSpace.contains;
			delete activeSpace.contains;
			targetSpace.contains.hasMoved = true;
			renderSpaces();
			setActiveElement($(".row" + targetY + ".col" + targetX));
		}
	}
	activeGame.checkIfTurnComplete();
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
	$("div#bucket").html(activeGame.render());
}