var map = ["=....=",
		   ".#..^.",
		   "#....#",
		   "-...-^",
		   "^-...-",
		   "#....#",
		   ".^..#.",
		   "=....="]

var sampleMap = new Map(map);
sampleMap.spaces[0][0].contains = new Unit(humanUnits.spearmen);
sampleMap.spaces[0][0].contains.player = "player1";
sampleMap.spaces[0][0].contains.hits = 2;
sampleMap.spaces[0][1].contains = new Unit(humanUnits.archers);
var sampleArcher = sampleMap.spaces[0][1].contains;
sampleMap.spaces[0][1].contains.player = "player1";

sampleMap.spaces[5][5].contains = new Unit(woodElfUnits.poisonbloom);
sampleMap.spaces[5][5].contains.player = "player1";

sampleMap.spaces[0][2].contains = new Unit(humanUnits.mage);
sampleMap.spaces[0][2].contains.player = "player1";

sampleMap.spaces[2][3].contains = new Unit(orcUnits.fighters);
sampleMap.spaces[2][3].contains.player = "player2";
sampleMap.spaces[3][3].contains = new Unit(orcUnits.troll);
sampleMap.spaces[3][3].contains.player = "player2";
sampleMap.spaces[2][5].contains = new Unit(orcUnits["wolf riders"]);
sampleMap.spaces[2][5].contains.player = "player2";

/* var terrain = {
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
} */