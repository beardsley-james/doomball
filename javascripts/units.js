var units = {
	"human": {
		"spearmen": {
			"race": "human",
			"name": "Spearmen",
			"special": "Steadfast",
		},
		"archers": {
			"race": "human",
			"name": "Archers",
			"special": "Pinning",
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
			"special": "Piercing",
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
	},
	"dwarf": {
		"dwarves": {
			"race": "dwarf",
			"name": "Dwarves",
			"defense": {
				"value": 2
			}
		},
		"maddwarves": {
			"race": "dwarf",
			"name": "Mad Dwarves",
			"special": "Overrun",
			"attack": {
				"value": 3
			}
		},
		"rifledwarves": {
			"race": "dwarf",
			"name": "Rifledwarves",
			"range": {
				"value": 2
			},
			"move": {
				"special": true
			}
		},
		"cannon": {
			"race": "dwarf",
			"name": "Cannon",
			"level": 2,
			"range": {
				"value": 4,
				"special": true
			},
			"attack": {
				"value": 3,
				"special": true
			},
			"move": {
				"special": true
			}
		},
		"gyrocopters": {
			"race": "dwarf",
			"name": "Gyrocopters",
			"level": 2,
			"special": "Pinning",
			"defense": {
				"special": true
			},
			"move": {
				"value": 3
			}
		},
		"thanesdwarves": {
			"race": "dwarf",
			"name": "Thanesdwarves",
			"level": 2,
			"special": "Steadfast",
			"defense": {
				"value": 3
			},
			"move": {
				"special": true
			}
		},
		"thane": {
			"race": "dwarf",
			"name": "Thane",
			"level": 3,
			"special": "Leadership",
			"attack": {
				"value": 3
			},
			"defense": {
				"value": 3
			}
		}
	},
	"highelf": {
		"ballista": {
			"race": "highelf",
			"name": "Ballista",
			"special": "Piercing",
			"range": {
				"value": 3
			},
			"attack": {
				"value": 3
			},
			"move": {
				"special": true
			}
		},
		"rangers": {
			"race": "highelf",
			"name": "Rangers",
			"special": "Pinning",
			"range": {
				"value": 2
			}
		},
		"spearelves": {
			"race": "highelf",
			"name": "Spearelves"
		},
		"warsinger": {
			"race": "highelf",
			"name": "Warsinger",
			"level": 2,
			"special": "Leadership",
			"attack": {
				"value": 2
			},
			"defense": {
				"special": true
			},
			"move": {
				"value": 2
			}
		},
		"cavalry": {
			"race": "highelf",
			"name": "Cavalry",
			"level": 2,
			"special": "Charging",
			"defense": {
				"special": true
			},
			"move": {
				"value": 2
			}
		},
		"shiningones": {
			"race": "highelf",
			"name": "Shining Ones",
			"level": 2,
			"special": "Steadfast",
			"defense": {
				"value": 2
			}
		},
		"mage": {
			"race": "highelf",
			"name": "Mage",
			"level": 3,
			"special": "Pinning",
			"range": {
				"value": 4,
				"special": true
			},
			"attack": {
				"value": 3
			}
		}
	},
	"woodelf": {
		"crows": {
			"race": "woodelf",
			"name": "Crows",
			"level": 1,
			"special": "Charging",
			"attack": {
				"value": 1
			},
			"move": {
				"value": 3
			}
		},
		"dryads": {
			"race": "woodelf",
			"name": "Dryads",
			"level": 1,
			"special": "Steadfast",
			"defense": {
				"value": 2
			}
		},
		"woodelves": {
			"race": "woodelf",
			"name": "Wood Elves",
			"level": 1,
			"range": {
				"value": 2,
				"special": true
			}
		},
		"eagleriders": {
			"race": "woodelf",
			"name": "Eagle Riders",
			"level": 2,
			"special": "Piercing",
			"range": {
				"value": 2,
				"special": true
			},
			"attack": {
				"value": 3
			},
			"defense": {
				"special": true
			},
			"move": {
				"value": 3
			}
		},
		"giantsnake": {
			"race": "woodelf",
			"name": "Giant Snake",
			"level": 2,
			"special": "Pinning",
			"attack": {
				"value": 4
			},
			"defense": {
				"value": 2
			},
			"move": {
				"value": 2
			}
		},
		"poisonbloom": {
			"race": "woodelf",
			"name": "Poison Bloom",
			"level": 2,
			"special": "Explosive",
			"range": {
				"value": 3,
				"special": true
			},
			"attack": {
				"value": 3
			},
			"defense": {
				"value": 2
			},
			"move": {
				"value": "0"
			}
		},
		"elderdryad": {
			"race": "woodelf",
			"name": "Elder Dryad",
			"level": 3,
			"special": "Steadfast",
			"attack": {
				"value": 5
			},
			"defense": {
				"value": 3
			},
			"move": {
				"special": true
			}
		}
	},
	"orc": {
		"fighters": {
			"race": "orc",
			"name": "Fighters",
			"special": "Charging",
			"attack": {
				"value": 3
			},
			"defense": {
				"special": true
			}
		},
		"goblins": {
			"race": "orc",
			"name": "Goblins",
			"special": "Cowardly",
			"attack": {
				"value": 1
			}
		},
		"goblinarchers": {
			"race": "orc",
			"name": "Goblin Archers",
			"special": "Pinning",
			"range": {
				"value": 2
			},
			"move": {
				"special": true
			}
		},
		"wolfriders": {
			"race": "orc",
			"name": "Wolf Riders",
			"level": 2,
			"special": "Charging",
			"move": {
				"value": 2
			}
		},
		"troll": {
			"race": "orc",
			"name": "Troll",
			"level": 2,
			"special": "Overrun",
			"attack": {
				"value": 4
			},
			"defense": {
				"value": 2
			}
		},
		"captains": {
			"race": "orc",
			"name": "Captains",
			"level": 2,
			"special": "Steadfast",
			"attack": {
				"value": 3
			},
			"defense": {
				"value": 2
			}
		},
		"general": {
			"race": "orc",
			"name": "General",
			"level": 3,
			"special": "Leadership",
			"attack": {
				"value": 3
			},
			"defense": {
				"value": 3
			}
		}
	},
	"undead": {
		"zombies": {
			"race": "undead",
			"name": "Zombies",
			"special": "Steadfast",
			"attack": {
				"value": 1
			}
		},
		"ghosts": {
			"race": "undead",
			"name": "Ghosts",
			"special": "Piercing",
			"attack": {
				"value": 1
			},
			"defense": {
				"special": true
			},
			"move": {
				"value": 2
			}
		},
		"bats": {
			"race": "undead",
			"name": "Giant Bats",
			"special": "Pinning",
			"attack": {
				"value": 1
			},
			"defense": {
				"special": true
			},
			"move": {
				"value": 2
			}
		},
		"hellhound": {
			"race": "undead",
			"name": "Hell Hound",
			"level": 2,
			"special": "Charging",
			"defense": {
				"special": true
			},
			"move": {
				"value": 2
			}
		},
		"skeletons": {
			"race": "undead",
			"name": "Skeletons",
			"level": 2,
			"special": "Steadfast"
		},
		"catapult": {
			"race": "undead",
			"name": "Catapult",
			"level": 2,
			"special": "Pinning",
			"range": {
				"value": 4,
				"special": true
			},
			"attack": {
				"value": 4,
				"special": true
			},
			"defense": {
				"value": 2
			},
			"move": {
				"special": true
			}
		},
		"necromancer": {
			"race": "undead",
			"name": "Necromancer",
			"level": 3,
			"special": "Leadership",
			"range": {
				"value": 3,
				"special": true
			},
			"attack": {
				"value": 3
			}
		}
	}
}