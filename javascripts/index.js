var sampleMap = new Map(map);
sampleMap.spaces[0][0].contains = new Unit(humanUnits.spearmen);
sampleMap.spaces[0][0].contains.player = "player1";
sampleMap.spaces[0][1].contains = new Unit(humanUnits.archers);
sampleMap.spaces[0][1].contains.player = "player1";
sampleMap.spaces[0][2].contains = new Unit(humanUnits.mage);
sampleMap.spaces[0][2].contains.player = "player1";

sampleMap.spaces[4][5].contains = new Unit(orcUnits.fighters);
sampleMap.spaces[4][5].contains.player = "player2";
sampleMap.spaces[4][4].contains = new Unit(orcUnits.troll);
sampleMap.spaces[4][4].contains.player = "player2";
sampleMap.spaces[4][3].contains = new Unit(orcUnits["wolf riders"]);
sampleMap.spaces[4][3].contains.player = "player2";

$(document).ready(function(){
	var activeGame = sampleMap;
	$("div#bucket").html(activeGame.render());
	$("div#grid").on("click", ".gridSpace", function(){
		var classes = $(this).attr("class").split(" ");
		var x = classes[2].charAt(3);
		var y = classes[1].charAt(3);
		var activeSpace = activeGame.spaces[y][x];
		console.log(x + " " + y);
		if (activeGame.spaces[y][x].contains) {
			if ($(".targetable")){
				$(".targetable").removeClass("targetable")
			}
			if ($(".activeSpace")) {
				$(".activeSpace").removeClass("activeSpace")
			}
			$(this).addClass("activeSpace");
			$("div#grid .gridSpace").each(function(){
				$(this).removeClass("movable");
				var targetClasses = $(this).attr("class").split(" ");

				var targetX = targetClasses[2].charAt(3);
				var targetY = targetClasses[1].charAt(3);
				if (activeGame.spaces[y][x].canMoveTo(activeGame.spaces[targetY][targetX])) {
					$(this).addClass("movable")
				}
			})
			var spacesInRange = activeGame.availableTargets(y, x);
			console.log(spacesInRange);
			spacesInRange.forEach(function(space){
				$(".row" + space.y + ".col" + space.x).addClass("targetable")
			})
		}
	})
	$("div#grid").on("click", ".movable", function(){
		var activeSpace = getXY($(".activeSpace"));
		var targetSpace = getXY($(this));
		activeGame.spaces[targetSpace.y][targetSpace.x].contains = activeGame.spaces[activeSpace.y][activeSpace.x].contains;
		delete activeGame.spaces[activeSpace.y][activeSpace.x].contains;
		$(".activeSpace").replaceWith(activeGame.spaces[activeSpace.y][activeSpace.x].render());
		$(".activeSpace")
		$(this).replaceWith(activeGame.spaces[targetSpace.y][targetSpace.x].render());
		console.log(activeGame.spaces[targetSpace.y][targetSpace.x]);
		$(".gridSpace").each(function(){
			$(this).removeClass("movable");
			$(this).removeClass("targetable");
		})
	})
})

function getXY(element){
	var classes = element.attr("class").split(" ");
	var x = classes[2].charAt(3);
	var y = classes[1].charAt(3);
	return {
		"x": x,
		"y": y
	}
}