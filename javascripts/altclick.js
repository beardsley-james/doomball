var alphabet = ["A", "B", "C", "D", "E", "F", "G"]

Map.prototype.switchActivePlayer = function(){
	if (this.activePlayer == "player1") {
		this.activePlayer = "player2"
	} else {this.activePlayer = "player1"}
	console.log(this.activePlayer + " is active")
	
	this.spaces.forEach(function(row){
		row.forEach(function(space){
			if (space.contains && (space.contains.player == this.activePlayer)) {
				space.contains.hits = 0;
				space.contains.notInactive();
			}
		}, this)
	}, this)
}

Unit.prototype.inactivate = function(){
	this.inactive = true;
}

Unit.prototype.notInactive = function(){
	this.inactive = false;
}

var sampleMap = new Map(map);
sampleMap.spaces[0][0].contains = new Unit(humanUnits.spearmen);
sampleMap.spaces[0][0].contains.player = "player1";
sampleMap.spaces[0][0].contains.hits = 2;
sampleMap.spaces[0][1].contains = new Unit(humanUnits.archers);
var sampleArcher = sampleMap.spaces[0][1].contains;
sampleMap.spaces[0][1].contains.player = "player1";

sampleMap.spaces[0][2].contains = new Unit(humanUnits.mage);
sampleMap.spaces[0][2].contains.player = "player1";

sampleMap.spaces[2][3].contains = new Unit(orcUnits.fighters);
sampleMap.spaces[2][3].contains.player = "player2";
sampleMap.spaces[3][3].contains = new Unit(orcUnits.troll);
sampleMap.spaces[3][3].contains.player = "player2";
sampleMap.spaces[2][5].contains = new Unit(orcUnits["wolf riders"]);
sampleMap.spaces[2][5].contains.player = "player2";

/** Globals **/
var activeGame = sampleMap;
var activeElement, active, x, y, activeSpace, activeUnit;
var targetElement, target, targetX, targetY, targetSpace, targetUnit;

$(document).ready(function(){

	renderMap();
	
	$("div#bucket").on("click", ".gridSpace", function(){
		setTargetElement($(this));
		if (targetUnit) {
			if ($(".activeSpace").length === 0 || activeUnit.player == targetUnit.player){
				stripClass("activeSpace");
				setActiveElement($(this));
				$(this).addClass("activeSpace");
			}
			if (targetElement.hasClass("targetable")){
				activeUnit.attacks(targetUnit);
				if (targetUnit.hits > targetUnit.defense.value) {
					delete targetSpace.contains
				}
				renderSpaces();
				activeUnit.inactive = true
			}
		} else if ($(".activeSpace".length > 1)) {
			if (targetElement.hasClass("movable")){
				targetSpace.contains = activeSpace.contains;
				delete activeSpace.contains;
				renderSpaces();
			}
		}
		

	})
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

