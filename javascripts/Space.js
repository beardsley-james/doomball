var Space = function(x, y, terrain){
	this.x = x;
	this.y = y;
	if (terrain) {
		this.terrain = terrain
	} else {this.terrain = 
		{"name": "plains"}
	}
}

Space.prototype.render = function() {
	var outputHTML = "<div class='gridSpace row" + this.y + " col" + this.x + " terrain-" + this.terrain.name.toLowerCase();
	if (this.x % 2 != 0) {
		outputHTML += " evenSpace";
	}
	if (this.activeSpace) {
		outputHTML += " activeSpace"
	}
	if (this.moveable) {
		outputHTML += " movable"
	}
	if (this.targetable) {
		ouputHTML += " targetable"
	}
	outputHTML += "'><div class='coord'>" + this.x + ", " + this.y + " " + this.terrain.name + "</div>";
	if (this.contains) {
		outputHTML += this.contains.render()
	}
	outputHTML += "</div>";
	return outputHTML
}

Space.prototype.isAdjacentTo = function(space){
	if (this.x == space.x) {
		if (this.y == space.y - 1 || this.y == space.y + 1) {
			return true
		}
	}
	
	if (this.x == space.x - 1 || this.x == space.x + 1) {
		if (this.x % 2 != 0) {
			if (this.y == space.y || this.y == space.y + 1) {
				return true
			}
		} else {
			if (this.y == space.y || this.y == space.y - 1) {
				return true
			}
		}
	}
	
	return false
}

Space.prototype.canMoveTo = function(space) {
	if (space.terrain.name == "Mountains") {
		return false
	}
	if (space.contains) {
		return false
	}
	if (!this.isAdjacentTo(space)) {
		return false
	}
	return true
}