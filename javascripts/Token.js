var Token = function(){
	this.name = "string";
	this.unique = true;
}

/* Was considering adding an x, y locator object and an owner object but
	I don't know now, since I'm probably just going to push tokens into 
	an array on the individual units anyway. Seems like the easier way to
	do it. Maybe add a prototype .effect() function that checks the string
	and then applies the appropriate effect to the character.
	
	A lot is going to have to happen in the game logic, though, with various
	funtions checking for the presence of certain tokens and then applying
	different effects as a matter of course. Some tokens will also be looking
	the presence of other tokens, and I'm not sure how to do that.