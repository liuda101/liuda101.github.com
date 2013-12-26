var maps = {
	singleplayer: [
		{
			name: 'Introduction',
			briefing: 'In this level you will learn how to pan across the map.\n\nDon\'t worry! We will be implementing more features soon.',

			mapImage: 'images/maps/level-one-debug-grid.png',
			startX: 4,
			startY: 4,

			requirements: {
				buildings: ['base', 'starport', 'harvester', 'ground-turret'],
				vehicles: ['transport', 'harvester', 'scout-tank', 'heavy-tank'],
				aircraft: ['chopper', 'wraith'],
				terrain: ['oilfield', 'bigrocks', 'smallrocks']
			},

			items: [
				{type: 'buildings', name: 'base', x: 11, y: 14, team: 'blue', action: 'construct'},
				{type: 'buildings', name: 'base', x: 12, y: 16, team: 'green'},
				{type: 'buildings', name: 'base', x: 15, y: 15, team: 'green', life: 50},

				{type: 'buildings', name: 'starport', x: 18, y: 14, team: 'blue'},
				{type: 'buildings', name: 'starport', x: 18, y: 10, team: 'blue', action: 'teleport'},
				{type: 'buildings', name: 'starport', x: 18, y: 6, team: 'green', action: 'open'},

				{type: 'buildings', name: 'harvester', x: 20, y: 10, team: 'blue'},
				{type: 'buildings', name: 'harvester', x: 22, y: 12, team: 'green', action: 'deploy'},

				{type: 'buildings', name: 'ground-turret', x: 14, y: 9, team: 'blue', direction: 3},
				{type: 'buildings', name: 'ground-turret', x: 14, y: 12, team: 'blue', action: 'teleport'},
				{type: 'buildings', name: 'ground-turret', x: 16, y: 10, team: 'green', direction: 1},


				{type: 'vehicles', name: 'transport', x: 26, y: 10, team: 'blue', direction: 2},
				{type: 'vehicles', name: 'harvester', x: 26, y: 12, team: 'blue', direction: 3},
				{type: 'vehicles', name: 'scout-tank', x: 26, y: 14, team: 'blue', direction: 4},
				{type: 'vehicles', name: 'heavy-tank', x: 26, y: 16, team: 'blue', direction: 5},

				{type: 'vehicles', name: 'transport', x: 30, y: 10, team: 'green', direction: 2},
				{type: 'vehicles', name: 'harvester', x: 30, y: 12, team: 'green', direction: 3},
				{type: 'vehicles', name: 'scout-tank', x: 30, y: 14, team: 'green', direction: 4},
				{type: 'vehicles', name: 'heavy-tank', x: 30, y: 16, team: 'green', direction: 5},

				{type: 'aircraft', name: 'chopper', x: 20, y: 22, team: 'blue', direction: 2},
				{type: 'aircraft', name: 'wraith', x: 23, y: 22, team: 'green', direction: 3},

				{type: 'terrain', name: 'oilfield', x: 5, y: 7},
				{type: 'terrain', name: 'oilfield', x: 8, y: 7, action: 'hint'},
				{type: 'terrain', name: 'bigrocks', x: 5, y: 3},
				{type: 'terrain', name: 'smallrocks', x: 8, y: 3}
			]
		}
	]
};