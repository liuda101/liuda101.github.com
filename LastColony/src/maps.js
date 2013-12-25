var maps = {
	singleplayer: [
		{
			name: 'Introduction',
			briefing: 'In this level you will learn how to pan across the map.\n\nDon\'t worry! We will be implementing more features soon.',

			mapImage: 'images/maps/level-one-debug-grid.png',
			startX: 4,
			startY: 4,

			requirements: {
				buildings: ['base', 'starport', 'harvester'],
				vehicles: [],
				aircraft: [],
				terrain: []
			},

			items: [
				{type: 'buildings', name: 'base', x: 11, y: 14, team: 'blue', action: 'construct'},
				{type: 'buildings', name: 'base', x: 12, y: 16, team: 'green'},
				{type: 'buildings', name: 'base', x: 15, y: 15, team: 'green', life: 50},

				{type: 'buildings', name: 'starport', x: 18, y: 14, team: 'blue'},
				{type: 'buildings', name: 'starport', x: 18, y: 10, team: 'blue', action: 'teleport'},
				{type: 'buildings', name: 'starport', x: 18, y: 6, team: 'green', action: 'open'},

				{type: 'buildings', name: 'harvester', x: 20, y: 10, team: 'blue'},
				{type: 'buildings', name: 'harvester', x: 22, y: 12, team: 'green', action: 'deploy'}
			]
		}
	]
};