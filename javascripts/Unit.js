var Unit = function(unit) {
	this.race = unit.race;
	this.name = unit.name;
	
	if (unit.level) {
		this.level = unit.level
	} else {this.level = 1}
	
	this.range = setStat(unit, "range");
	this.attack = setStat(unit, "attack");
	this.defense = setStat(unit, "defense");
	this.move = setStat(unit, "move");
	
	if (unit.special) {
		this.special = unit.special
	}
	
	this.tokens = [];
	
	this.graphic = unit.graphic;
}

var setStat = function(unit, stat) {
	var returnStat={};
	
	if (unit[stat]) {
		
		if (unit[stat]["value"]) {
			returnStat["value"] = unit[stat]["value"]
		} else {returnStat["value"] = 1}	
		
		if (unit[stat]["special"]) {
			returnStat["special"] = true
		}
	} else {
		if (stat == "attack") {
			returnStat = {
				"value": 2
			}
		} else {
			returnStat = {
				"value": 1
			}
		}
	}
	
	return returnStat
}