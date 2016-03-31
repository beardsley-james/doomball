function renderUnitCard(unit) {
	var outputHTML = "";
	outputHTML += "<div class='unit-card unit-" + unit.race; 
	if (unit.level > 1){
		outputHTML += " unit-level" + unit.level;
	}
	outputHTML += "'>";
		outputHTML += "<div class='unit-name'>" + unit.name + "</div>";
		outputHTML += "<div class='stat-box range-box'>" + unit.range["value"];
			if (unit.range["special"]) {
				outputHTML += "<span style='font-size: .5em'>*</span>"
			}
		outputHTML += "</div>";
		outputHTML += "<div class='stat-box attack-box'>" + unit.attack["value"];
			if (unit.attack["special"]) {
				outputHTML += "<span style='font-size: .5em'>*</span>"
			}
		outputHTML += "</div>";
		outputHTML += "<div class='stat-box defense-box'>" + unit.defense["value"];
			if (unit.defense["special"]) {
				outputHTML += "<span style='font-size: .5em'>*</span>"
			}
		outputHTML += "</div>";
		outputHTML += "<div class='stat-box move-box'>" + unit.move["value"];
			if (unit.move["special"]) {
				outputHTML += "<span style='font-size: .5em'>*</span>"
			}
		outputHTML += "</div>";
		outputHTML += "<img src='" + unit.graphic.split(" ").join("-") + "' class='unit-graphic'>";
		if (unit.special) {
			outputHTML += "<div class='stat-box special-box'><img src='./images/" + unit.special.toLowerCase() + ".png'></div>";
		}
	outputHTML += "</div>"
	return outputHTML
}