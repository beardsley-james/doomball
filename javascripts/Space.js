var Space = function(){
	this.x = 0;
	this.y = 0;
	this.terrain = "Plains"
}

/* I'm probably going to want to structure this so that it can be used
	in a gameboard constructing function, so the arguments are going to
	have to be like (x, y, terrain) and then the terrain will probably be
	a one letter thing so that I can specify maps pretty easily.