var map = ["......",
		   "^.....",
		   "^^-.-^",
		   "^^-=-^",
		   "^^.-.^",
		   "......",
		   ".####.",
		   "##...."];

var sampleMap = new Map(map);
var mapSpaces = sampleMap.spaces;

var spearmen1 = new Unit(humanUnits.spearmen);
spearmen1.player = "player2";
var spearmen2 = new Unit(humanUnits.spearmen);
spearmen2.player = "player2";
var spearmen3 = new Unit(humanUnits.spearmen);
spearmen3.player = "player2";
var archers1 = new Unit(humanUnits.archers);
archers1.player = "player2";
var archers2 = new Unit(humanUnits.archers);
archers2.player = "player2";
var fusiliers1 = new Unit(humanUnits.fusiliers);
fusiliers1.player = "player2";
var fusiliers2 = new Unit(humanUnits.fusiliers);
fusiliers2.player = "player2";
var knights = new Unit(humanUnits.knights);
knights.player = "player2";
var mage = new Unit(humanUnits.mage);
mage.player = "player2";

var fighters1 = new Unit(orcUnits.fighters);
fighters1.player = "player1";
var fighters2 = new Unit(orcUnits.fighters);
fighters2.player = "player1";
var fighters3 = new Unit(orcUnits.fighters);
fighters3.player = "player1";
var goblins1 = new Unit(orcUnits.goblins);
goblins1.player = "player1";
var goblins2 = new Unit(orcUnits.goblins);
goblins2.player = "player1";
var goblins3 = new Unit(orcUnits.goblins);
goblins3.player = "player1";
var goblins4 = new Unit(orcUnits.goblins);
goblins4.player = "player1";
var captains = new Unit(orcUnits.captains);
captains.player = "player1";
var troll1 = new Unit(orcUnits.troll);
troll1.player = "player1";
var troll2 = new Unit(orcUnits.troll);
troll2.player = "player1";
var general = new Unit(orcUnits.general);
general.player = "player1";

mapSpaces[1][2].contains = spearmen1;
mapSpaces[2][3].contains = spearmen2;
mapSpaces[2][4].contains = spearmen3;
mapSpaces[0][4].contains = archers1;
mapSpaces[0][3].contains = archers2;
mapSpaces[1][4].contains = fusiliers1;
mapSpaces[0][2].contains = fusiliers2;
mapSpaces[2][2].contains = knights;
mapSpaces[1][3].contains = mage;

mapSpaces[6][4].contains = fighters1;
mapSpaces[7][3].contains = fighters2;
mapSpaces[6][1].contains = fighters3;
mapSpaces[5][1].contains = goblins1;
mapSpaces[5][0].contains = goblins2;
mapSpaces[5][4].contains = goblins3;
mapSpaces[5][5].contains = goblins4;
mapSpaces[6][2].contains = captains;
mapSpaces[5][2].contains = troll1;
mapSpaces[5][3].contains = troll2;
mapSpaces[6][3].contains = general;