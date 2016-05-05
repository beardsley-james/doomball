### altclick.js
- alphabet 
  - converts columns to letters
- Map.prototype.switchActivePlayer()
  - changes value of string "activePlayer"
  - goes through spaces in map and activates new activePlayer's units
    - *Move to Map.js*
- Unit.prototype.inactive()
  - sets Unit.inactive as "true"
    * **Move to Unit.js**
    * **Rename**
    * *Change to "Unit.active"*
- Unit.prototype.notInactive()
  - sets Unit.inactive as "false"
    - **Move to Unit.js**
    - **Rename**
    - *Change to "Unit.active"*
- section establishing sampleMap
  - generates sample Map
  - places units on Map
  - establishes variable names for certain units
  - sets Unit.player for generated units
    - **Move to a sampleMap.js file**
    - *Assign variable names to all units*
    - *Make game-legal for further testing*
- Globals
  - sets activeGame as sampleMap
  - creates variables for active space
  - creates variables for target space
    - **set up Init.js to establish activeGame more dynamically**
    - *rename active space and target space*
    - *set up active/target space as objects instead of just lists of variables*
- $(document).ready()
  - renders the map
  - div#bucket.on click
    - sets target element as clicked element
    - unit in target element?
      - no current active unit or same team as active unit?
        - sets active unit
          - **make sure target unit isn't inactive**
      - targetable unit?
        - attack target unit
        - inactive active unit
          - **clear active unit**
          - **inactive active unit first**
    - or else is a unit active?
      - space movable?
        - move unit
        - render active & target spaces
          - **make so it can only move once and then it can just attack or deactivate or reload**
  **needs to handle deactivating units**
- setActiveElement(element)
  - sets global active element variables
    - **needs to clear variable is not passed an argument**
    - *change values of activeElement object*
- setTargetElement(element)
  - sets global target element variables
    - **needs to clear if no argument**
    - *change values of targetElement object*
- getXY(element)
  - returns object containing elements coordinates
- stripClass(classname)
  - removes class from all DOM elements that have this class
    - **should take multiple classes**
- setMovable()
  - strips "movable" class from all DOM elements
  - uses Map.movableSpaces to get reachable spaces for unit in current activeSpace
  - adds "movable" to DOM elements matching coordinates of objects returned by Map.movableSpaces
- setTargetable()
  - strips "targetable" elements
  - uses Map.availableTargets to get spaces targetable by activeSpace variable
  - adds Targetable to spaces that match objects returned
- renderSpaces()
  - replaces targetElement and activeElement with new renders of the spaces, stripping activespace class from active unit coincidentally
  - strips "movable" and "targetable"
    - **retain "activespace" class if activeunit has only moved and not attacked yet**
- renderMap()
  - replaces current map render with full map render based on the activeGame object
 
### humanUnits.js
- contains objects to generate all human units available

### index.js
- click handling, basic getXY(element) function
  - !delete this sucker

### Map.js
- Map(map, name)
  - builds map object based on array of strings
  - sets:
    - name, if passed as argument
    - height, based on length of array
    - width, based on length of strings
    - pushes Space objects into array of spaces based on terrain value of characters in row strings
    - activePlayer as "player1"
-Map.render()
  - sets up div with id "<mapname>grid"
  - steps through each space and adds the render() value of that space to the div
  - closes the div and returns the completed string
    - *change so it's name based on map name, that's unnecessary*
-Map.spacesInRangeOf(y, x)
  - sets space variable as Space object in [y][x] of the map
    - **just pass a space as an argument**
  - checks if the space has a unit in it
  - takes the units range and moves that many spaces out in concentric circles
  - if a space matches certain criteria and isn't already in the set, it gets pushed into the array that gets returned
-Map.availableTargets(y, x)
    - **pass space as argument**
  -gets all the spaces in range of a space and check to see if they have an enemy unit
  - if they do, they're added to an array and returned
-Map.movableSpaces(y, x)
    - **pass space as argument**
  - basically does the same thing as spacesInRangeOf but makes sure they don't have another unit and it's not impassable terrain
  - currently lets you move into forests but not through them, ideally forests would drop the move value by 1 but just for that route
    - *make it so forests take 2 movement points*
-Map.adjacentSpaces(y, x)
    - **pass space as argument**
  - uses a Unit.isAdjacentTo test to build an array of spaces adjacent to a space at given coordinates
-var map
  - just a sample map, needs more options
-var terrain
  - object for converting the maps to map objects
    
### orcUnits.js
- has all the orc units in it
  
### renderUnitCard.js
- converted unit objects into html but it's not really necessary since unit objects has .render(), on the other hand the problems with converting JSON types might make a more functional approach more practical
  - *delete since i can always bring it back in github if it doesn't work*

### Space.js
- Space(x, y, terrain)
  - builds the space object, just basically x, y, and whatever terrain gets passed along in the array passed to the map constructor as the third property
-Space.render()
  - returns a div element that adds classes based on properties
    - **remove moveable and targetable tests, as that is handled entirely in the DOM and not the object stat**
  - adds a render of what is contained in the package
- Space.isAdjacentTo(space)
  - tests to see if a space is adjacent to a given space, just uses math, nothing weird
-Space.canMoveTo(space)
  - checks if a space is adjacent to a given space and that it does not contain a unit and it's not a mountain space
    - *handled entirely by Map.movableSpaces, can probably remove this or replace the logic in Map.movableSpaces with this, replacing logic would make it more succinct*
- Space.containsEnemyUnit(space)
  - checks if a given space contains a unit, and if it has a different player than originating space
    - *see if this is actually used, good utility function if it is*
- Space.isElevated
  - sees whether the unit has the special ability that lets them shoot over allies or if they are on terrain that does so
- Space.isEntrenched
  - checks if terrain adds defense
    - *may want to add checks to see if nearby allies are providing leadership, or the unit has moved and has the special ability that gives them extra defense, maybe return an aggregate defense total to use in the rendered unit card*
    - *if so, name it something different*

### test.js
- makes new instances of all the units in humans, orcs, and undead and writes them to the page
- used in index.html to display all the units for checking
  - *can i make this into a loop thing instead of writing each one individually*

### Token.js
- Token()
  - *builds token objects? i'm not using this for anything, I should probably delete it*
    
### turnorder.js
- this is where I'm going to build the turn order function which will probably get dragged into a different file at some point
  
### undeadunits.js
- has all the undead units
  
### Unit.js
- Unit()
  - gets passed an object from one of the unit lists and constructs a unit model out of it
  - generates:
    - name of unit
    - race of unit
    - uses setStat() to generate range, attack, defense, and move
    - adds special ability
    - sets "tokens" as an empty array
    - sets the graphic path for the unit
    - sets hits to 0
    - sets unit as "inactive" as a default
  - returns an object
    - *potentially problems with "inactive" by default, at least for generating objects for the unit selection steps*
- Unit.attacks(target)
  - makes a unit attack a target
  - flips a coin for each attack and adds to target's hits
- Unit.render()
  - returns a string that contains a div element that represents a whole unit box
    - *inactive could be an img instead of a div*
- createStatBox(stat, unit)
  - returns a div that has the right classes to be displayed in the proper corner for each of the four main stats, as well as adding a little asterisk if it's got the special attribute
    - *attach to Unit.prototype to get ride of the argument, unless I decide to kick the prototype chain*
- setStat(unit, stat)
  - sets the stat object for the Unit object, sets a default if no argument is passed by the unit template
    - *reverse arguments or add to Unit.prototype to get rid of the argument*
- coinFlip()
  - 50% chance of returning 0 or 1