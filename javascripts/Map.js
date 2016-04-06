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
		"blocksLOS": true,
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
		"extendLOS": true,
		"addsDefense": true}
}