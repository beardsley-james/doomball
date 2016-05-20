var spearmen = new Unit(humanUnits.spearmen);
var archers = new Unit(humanUnits.archers);
var horsemen = new Unit(humanUnits.horsemen);
var swordsmen = new Unit(humanUnits.swordsmen);
var fusiliers = new Unit(humanUnits.fusiliers);
var knights = new Unit(humanUnits.knights);
var mage = new Unit(humanUnits.mage);

document.write(renderUnitCard(spearmen));
document.write(renderUnitCard(archers));
document.write(renderUnitCard(horsemen));
document.write(renderUnitCard(swordsmen));
document.write(renderUnitCard(fusiliers));
document.write(renderUnitCard(knights));
document.write(renderUnitCard(mage));
document.write(renderUnitCard(new Unit(orcUnits.fighters)));
document.write(renderUnitCard(new Unit(orcUnits.goblins)));
document.write(renderUnitCard(new Unit(orcUnits["goblin archers"])));
document.write(renderUnitCard(new Unit(orcUnits.captains)));
document.write(renderUnitCard(new Unit(orcUnits["wolf riders"])));
document.write(renderUnitCard(new Unit(orcUnits.troll)));
document.write(renderUnitCard(new Unit(orcUnits.general)));
document.write(renderUnitCard(new Unit(undeadUnits.zombies)));
document.write(renderUnitCard(new Unit(undeadUnits.ghosts)));
document.write(renderUnitCard(new Unit(undeadUnits["giant bats"])));
document.write(renderUnitCard(new Unit(undeadUnits.skeletons)));
document.write(renderUnitCard(new Unit(undeadUnits.catapult)));
document.write(renderUnitCard(new Unit(undeadUnits["hell hound"])));
document.write(renderUnitCard(new Unit(undeadUnits.necromancer)));
for (var type in woodElfUnits) {
	console.log(woodElfUnits[type]);
	var unit = new Unit(woodElfUnits[type]);
	console.log(unit);
	document.write(unit.render())
}
for (var type in dwarfUnits) {
	var unit = new Unit(dwarfUnits[type]);
	document.write(unit.render())
}
for (var type in highElfUnits) {
	var unit = new Unit(highElfUnits[type]);
	document.write(unit.render())
}