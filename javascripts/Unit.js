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
	
	this.graphic = "./images/" + unit.race + "-" + unit.name.split(" ").join("-").toLowerCase() + ".png";
	
	this.hits = 0;
}

Unit.prototype.attacks = function(target) {
	for (var i = 0; i < this.attack.value; i++) {
		if (coinFlip()) {
			target.hits += 1
		}
	}
}

Unit.prototype.render = function(){
	var outputHTML = "<div class='unit-card unit-" + this.race;
	if (this.level > 1){
		outputHTML += " unit-level" + this.level;
	}
	outputHTML += "'>";
	outputHTML += "<div class='unit-name'>" + this.name + "</div>";
	outputHTML += "<img src='" + this.graphic + "' class='unit-graphic"
	if (this.player && this.player == "player2"){
			outputHTML += " player2'"
	}
	outputHTML += "'>"
	if (this.inactive) {
		outputHTML += "<div class='inactive'></div>"
	}
	var stats = ["attack", "defense", "move", "range"];
	for (var i = 0; i < stats.length; i++){
		outputHTML += createStatBox(stats[i], this);
	}
	if (this.special) {
		outputHTML += "<div class='stat-box special-box'><img src='./images/" + this.special.toLowerCase() + ".png'></div>"
	}
	if (this.hits > 0) {
		outputHTML += "<div class='tokens tokens-hits'><img src='./images/hits-" + this.hits + ".png'></div>"
	}
	this.tokens.forEach(function(token) {
		outputHTML += "<div class='tokens tokens-" + token + "'><img src='./images/token-" + token + ".png'></div>"
	});
	outputHTML += "</div>"
	return outputHTML
}

Unit.prototype.inactivate = function(){
	this.inactive = true;
	if (activeGame.checkIfTurnComplete()){
		activeGame.switchActivePlayer();
		renderMap();
	}
}

Unit.prototype.notInactive = function(){
	this.inactive = false;
}

var createStatBox = function(stat, unit){
	var outputHTML = "<div class='stat-box " + stat + "-box'>" + unit[stat]["value"];
	if (unit[stat]["special"]) {
		outputHTML += "<span style='font-size: .5em'>*</span>"
	}
	outputHTML += "</div>";
	return outputHTML
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

function coinFlip() {
    return (Math.floor(Math.random() * 2) == 0);
}