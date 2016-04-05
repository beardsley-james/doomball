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
	var outputHTML = "<div class='gridSpace row" + this.y + " column" + this.x;
	if (this.x % 2 != 0) {
		outputHTML += " evenSpace";
	}
	outputHTML += "'><div class='coord'>" + this.x + ", " + this.y + "</div>";
	if (this.contains) {
		outputHTML += this.contains.render()
	}
	outputHTML += "</div>";
	return outputHTML
}

Space.prototype.isAdjacentTo = function(space){
	if (this.x == space.x || this.x == space.x-1 || this.x == space.x+1) {
		if (this.x % 2 == 0) {
			if (this.y == space.y-1 || this.y == space.y) {
				return true
			}
		} else {
			if (this.y == space.y || this.y == space.y+1) {
				return true
			}
		}
	}
	
	return false
}