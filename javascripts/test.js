var spearmen = new Unit(humanUnits.spearmen);
console.log(spearmen);
var archers = new Unit(humanUnits.archers);
console.log(archers);
var horsemen = new Unit(humanUnits.horsemen);
console.log(horsemen);
var swordsmen = new Unit(humanUnits.swordsmen);
console.log(swordsmen);
var fusiliers = new Unit(humanUnits.fusiliers);
console.log(fusiliers);
var knights = new Unit(humanUnits.knights);
console.log(knights);
var mage = new Unit(humanUnits.mage);
console.log(mage)

document.write(renderUnitCard(spearmen));
document.write(renderUnitCard(archers));
document.write(renderUnitCard(horsemen));
document.write(renderUnitCard(swordsmen));
document.write(renderUnitCard(fusiliers));
document.write(renderUnitCard(knights));
document.write(renderUnitCard(mage));