function renderUnitCard(unit) {
	var outputHTML = "";
	outputHTML += "<div class='unit-card'>";
		outputHTML += "<div class='unit-name'>" + unit.name + "</div>";
		outputHTML += "<div class='stat-box range-box'>" + unit.range["value"];
			if (unit.range["special"]) {
				outputHTML += "*"
			}
		outputHTML += "</div>";
		outputHTML += "<div class='stat-box attack-box'>" + unit.attack["value"];
			if (unit.attack["special"]) {
				outputHTML += "*"
			}
		outputHTML += "</div>";
		outputHTML += "<div class='stat-box defense-box'>" + unit.defense["value"];
			if (unit.defense["special"]) {
				outputHTML += "*"
			}
		outputHTML += "</div>";
		outputHTML += "<div class='stat-box move-box'>" + unit.move["value"];
			if (unit.move["special"]) {
				outputHTML += "*"
			}
		outputHTML += "</div>";
		outputHTML += "<img src='" + unit.graphic + "' class='unit-graphic'>";
		if (unit.special) {
			outputHTML += "<div class='stat-box special-box'>" + unit.special.charAt(0) + "</div>";
		}
	outputHTML += "</div>"
	return outputHTML
}