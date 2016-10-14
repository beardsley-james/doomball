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
		if (space.contains.hasMoved && space.contains.move.special){
			range = 0;
			console.log("Active unit cannot fire as it has moved")
		}
		if (space.contains.attack.special && !space.contains.loaded){
			range = 0;
			console.log("Active unit's weapon is not loaded")
		}
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
		if (space.contains.hasMoved || space.contains.pinned) {
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

Map.prototype.retreat = function(y, x){
	var spaces = [];
	var space = this.spaces[y][x];
	var candidates = space.retreatableSpaces();
	console.log(candidates);
	var i = 0;
	while (i < candidates.length){
		var candidate = this.spaces[candidates[i][0]][candidates[i][1]];
		if (space.canMoveTo(candidate) && i == 0){
			return candidate
		}
		if (space.canMoveTo(candidate)){
			spaces.push(candidate)
		}
		i++
	}
	if (spaces.length == 0){
		return false
	} else if (spaces.length == 1){
		return spaces[0]
	} else {
		if (coinFlip()){
			return spaces[1]
		} else {return spaces[0]}
	}
}

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

Map.prototype.leadership = function(y, x){
	var adjacent = this.adjacentSpaces(y, x);
	adjacent.forEach(function(space){
		if (space.contains && space.contains.player == this.activePlayer){
			space.contains.adjustStat("attack", 1)
		}
	}, this)
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
				if (!space.contains.retreated){
					space.contains.notInactive();
				}
				delete space.contains.defense.adjusted;
				if (space.contains.special == "Leadership"){
					this.leadership(space.y, space.x)
				}
				if (space.contains.special == "Cowardly") {
					var friendlies = false;
					var adjacent = this.adjacentSpaces(space.y, space.x);
					adjacent.forEach(function(space){
						if (space.contains && space.contains.player == this.activePlayer){
							friendlies = true
						}
					}, this)
					if (!friendlies){
						var retreatSpace = this.retreat(space.y, space.x);
						if (retreatSpace == false || space.contains.pinned) {
							delete space.contains
						} else {
							space.contains.inactivate();
							space.contains.retreated = true;
							this.spaces[retreatSpace.y][retreatSpace.x].contains = space.contains;
							delete space.contains;
						}
					}
				}
			} else if (space.contains) {
				space.contains.inactive = true;
				delete space.contains.pinned;
				delete space.contains.attack.adjusted;
				if (space.terrain.addsDefense){
					space.contains.adjustStat("defense", 1)
				}
				delete space.contains.retreated;
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

/* var retreatModifiers = {
	"player2": {
		"even": [[0, -1], [-1, 0], [0, 1]],
		"odd": [[-1, -1], [-1, 0], [-1, 1]]
	},
	"player1": {
		"even": [[1, -1], [1, 0], [1, 1]],
		"odd": [[0, -1], [1, 0], [0, 1]]
	}
} */
	
var terrain = {
	".": {"name": "Plains"},
	"#": {"name": "Forests",
		"dropsLOS": true,
		"x2Movement": true},
	"-": {"name": "Hills",
		"addMeleeDefense": true,
		"extendsLOS": true},
	"^": {"name": "Mountains",
		"blocksLOS": true,
		"blocksMovement": true},
	"=": {"name": "Fort",
		"addsDefense": true},
	"Y": {"name": "River",
		"hazard": true},
	"!": {"name": "Wizard Tower",
		"extendsLOS": true,
		"addsDefense": true}
}