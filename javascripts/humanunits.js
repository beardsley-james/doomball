var humanUnits = {
	"spearmen": {
		"race": "human",
		"name": "Spearmen",
		"special": "Steadfast",
		"graphic": "./images/spearmen.png"	
	},
	"archers": {
		"race": "human",
		"name": "Archers",
		"special": "Pinning",
		"graphic": "./images/archers.png",
		"range": {
			"value": 2
		},
		"move": {
			"special": true
		}
	},
	"horsemen": {
		"race": "human",
		"name": "Horsemen",
		"special": "Overrun",
		"graphic": "./images/horsemen.png",
		"defense": {
			"special": true
		},
		"move": {
			"value": 2
		}
	},
	"swordsmen": {
		"race": "human",
		"name": "Swordsmen",
		"level": 2,
		"defense": {
			"value": 2
		}
	},
	"fusiliers": {
		"race": "human",
		"name": "Fusiliers",
		"level": 2,
		"special": "Armor Piercing",
		"range": {
			"value": 2
		},
		"attack": {
			"value": 3,
			"special": true
		}
	},
	"knights": {
		"race": "human",
		"name": "Knights",
		"level": 2,
		"special": "Charging",
		"defense": {
			"value": 2
		},
		"move": {
			"value": 2
		}
	},
	"mage": {
		"race": "human",
		"name": "Mage",
		"level": 3,
		"special": "Explosive",
		"range": {
			"value": 3,
			"special": true
		},
		"attack": {
			"value": 4
		}
		
	}
}