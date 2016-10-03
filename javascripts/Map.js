var Map = function(map, name){
	if (name) {this.name = "name"}
	else {this.name = ""}
	this.spaces = [];
	this.height = map.length;
	this.width = map[0].length;
	for (var row = 0; row < this.height; row++) {
		var section = [];
		for (var column = 0; column < this.width; column++) {
			section.push(new Space(column, row, terrain[map[row].charAt(column)]));
		}
		this.spaces.push(section)
	}
}

Map.prototype.render = function(){
	var outputHTML = "<div class='grid' id='" + this.name + "grid'>";
	for (var row = 0; row < this.height; row++){
		for (var column = 0; column < this.width; column++){
			outputHTML += this.spaces[row][column].render();
		}
		outputHTML += "</br>"
	}
	outputHTML += "</div>";
	return outputHTML
}

Map.prototype.spacesInRangeOf = function(y, x){
	var space = this.spaces[y][x];
	if (space.contains){
		var spacesInRange = [space];
		var range = space.contains.range.value;
		var elevated = space.isElevated();
		var showStoppers = [];
		while (range > 0) {
			var nextRing = spacesInRange.forEach(function(tempSpace){
				var adjacentSpaces = this.adjacentSpaces(tempSpace.y, tempSpace.x);
				adjacentSpaces.forEach(function(candidate){
					if (spacesInRange.indexOf(candidate) == -1) {
						if (candidate.terrain.dropsLOS) {
							showStoppers.push(candidate)
						} else if (!candidate.terrain.blocksLOS) {
							if (!candidate.contains || (space.isElevated() && candidate.contains.player == space.contains.player)) {
								spacesInRange.push(candidate); 
							} else if (candidate.contains.player != space.contains.player) {
								showStoppers.push(candidate)
							}
						}
					}
				})
			}, this)
			range -= 1
		}
		spacesInRange.shift();
		spacesInRange = spacesInRange.concat(showStoppers);
		return spacesInRange
	}
}

Map.prototype.availableTargets = function(y, x){
	var homeSpace = this.spaces[y][x];
	var spacesInRange = this.spacesInRangeOf(y, x);
	var targets = [];
	spacesInRange.forEach(function(space){
		if (homeSpace.containsEnemyUnit(space)) {
			targets.push(space)
		}
	})
	return targets
}

Map.prototype.movableSpaces = function(y, x){
	var space = this.spaces[y][x];
	if (space.contains){
		var spacesInRange = [space];
		if (space.contains.hasMoved) {
			var range = 0;
		} else {var range = space.contains.move.value;}
		var showStoppers = [];
		while (range > 0) {
			var nextRing = spacesInRange.forEach(function(tempSpace){
				var adjacentSpaces = this.adjacentSpaces(tempSpace.y, tempSpace.x);
				adjacentSpaces.forEach(function(candidate){
					if (spacesInRange.indexOf(candidate) == -1){
						if (!candidate.contains && candidate.terrain.x2Movement) {
							showStoppers.push(candidate)
						} else if (!candidate.contains && !candidate.terrain.blocksMovement){
							spacesInRange.push(candidate)
						}
					}
				})
			}, this)
			range -= 1;
		}
		spacesInRange.shift();
		spacesInRange = spacesInRange.concat(showStoppers);
		return spacesInRange
	}
}

Map.prototype.retreatableSpaces = function (y, x){
	var space = this.spaces[y][x];
	var spaces = [];
	var colType= "";
	console.log(x % 2);
	if (x % 2 == 0) {
		colType = "even"
	} else {colType = "odd"};
	var player = space.contains.player;
	var modifiers = retreatModifiers[player][colType];
	console.log(colType + " " + player + " " + modifiers);
	modifiers.forEach(function(modifier){
		var tempY = (Number(y) + modifier[0]);
		var tempX = (Number(x) + modifier[1]);
		console.log(tempY + " " + tempX);
		var candidate = this.spaces[tempY][tempX];
		if (space.canMoveTo(candidate)) {
			spaces.push([tempY, tempX])
			console.log(tempY + " " + tempX + " true")
		}
	}, this)
	return spaces
}

/* Map.prototype.movableSpaces = function(y, x){
	var homeSpace = this.spaces[y][x];
	var adjacentSpaces = this.adjacentSpaces(y, x);
	var targets = [];
	adjacentSpaces.forEach(function(space){
		if (homeSpace.canMoveTo(space)){
			console.log(space);
			targets.push(space)
		}
	})
	return targets
} */

Map.prototype.adjacentSpaces = function(y, x){
	var base = this.spaces[y][x];
	var returnArray = [];
	this.spaces.forEach(function(arr, i) {
		arr.forEach(function(space, i) {
			if (base.isAdjacentTo(space)) {
				returnArray.push(space)
			}
		})
	})
	return returnArray
}

Map.prototype.switchActivePlayer = function(){
	if (this.activePlayer == "player1") {
		this.activePlayer = "player2"
	} else {this.activePlayer = "player1"}
	console.log(this.activePlayer + " is active")
	
	this.spaces.forEach(function(row){
		row.forEach(function(space){
			if (space.contains && (space.contains.player == this.activePlayer)) {
				space.contains.hits = 0;
				space.contains.hasMoved = false;
				space.contains.notInactive();
			} else if (space.contains) {
				space.contains.inactive = true;
			}
		}, this)
	}, this)
	renderMap();
}

Map.prototype.checkIfTurnComplete = function(){
	var turnComplete = true;
	this.spaces.forEach(function(row){
		row.forEach(function(space){
			if (space.contains && (space.contains.player == this.activePlayer)) {
				if (!space.contains.inactive) {
					turnComplete = false;
				}
			}
		}, this)
	}, this)
	return turnComplete;
}

var retreatModifiers = {
	"player2": {
		"even": [[0, -1], [-1, 0], [0, 1]],
		"odd": [[-1, -1], [-1, 0], [-1, 1]]
	},
	"player1": {
		"even": [[1, -1], [1, 0], [1, 1]],
		"odd": [[0, -1], [1, 0], [0, 1]]
	}
}

var map = ["......",
		   "--..--",
		   ".-^--.",
		   "=.##..",
		   "..##.=",
		   ".--^-.",
		   "--..--",
		   "......"]
	
var terrain = {
	"#": {"name": "Forests",
		"dropsLOS": true,
		"x2Movement": true,
		"addsDefense": true},
	".": {"name": "Plains"},
	"Y": {"name": "River",
		"hazard": true},
	"-": {"name": "Hills",
		"addMeleeDefense": true,
		"extendsLOS": true},
	"^": {"name": "Mountains",
		"blocksLOS": true,
		"blocksMovement": true},
	"=": {"name": "Fort",
		"addsDefense": true},
	"!": {"name": "Wizard Tower",
		"extendsLOS": true,
		"addsDefense": true}
}