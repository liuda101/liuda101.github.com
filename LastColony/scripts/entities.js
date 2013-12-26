function loadItem(name){
	var item = this.list[name];
	if(item.spriteArray){
		return;
	}

	item.spriteSheet = loader.loadImage('images/' + this.defaults.type + '/' + name + '.png');
	item.spriteArray = [];
	item.spriteCount = 0;

	for(var i = 0; i < item.spriteImages.length; i ++){
		var constructImageCount = item.spriteImages[i].count;
		var constructDirectionCount = item.spriteImages[i].directions;
		if(constructDirectionCount){
			for(var j = 0; j < constructDirectionCount; j ++){
				var constructImageName = item.spriteImages[i].name + '-' + j;
				item.spriteArray[constructImageName] = {
					name: constructImageName,
					count: constructImageCount,
					offset: item.spriteCount
				};
				item.spriteCount += constructImageCount;
			}
		} else {
			var constructImageName = item.spriteImages[i].name;
			item.spriteArray[constructImageName] = {
				name: constructImageName,
				count: constructImageCount,
				offset: item.spriteCount
			};
			item.spriteCount += constructImageCount;
		}
	}
}

function addItem(details){
	var item = {};
	var name = details.name;
	$.extend(item, this.defaults);
	$.extend(item, this.list[name]);
	item.life = item.hitPoints;
	$.extend(item, details);
	
	return item;
}
var buildings = {
	list: {
		base: {
			name: 'base',

			pixelWidth: 60,
			pixelHeight: 60,
			baseWidth: 40,
			baseHeight: 40,
			pixelOffsetX: 0,
			pixelOffsetY: 20,

			buildableGrid: [
				[1,1],
				[1,1]
			],
			passableGrid: [
				[1,1],
				[1,1]
			],
			sight: 3,
			hitPoints: 500,
			cost: 5000,
			spriteImages: [
				{name: 'healthy', count: 4},
				{name: 'damaged', count: 1},
				{name: 'constructing', count: 3}
			]
		},
		starport: {
			name: 'starport',

			pixelWidth: 40,
			pixelHeight: 60,
			baseWidth: 40,
			baseHeight: 55,
			pixelOffsetX: 1,
			pixelOffsetY: 5,
			buildableGrid: [
				[1,1],
				[1,1],
				[1,1]
			],
			passableGrid: [
				[1,1],
				[0,0],
				[0,0]
			],
			sight: 3,
			cost: 2000,
			hitPoints: 300,
			spriteImages: [
				{name: 'teleport', count: 9},
				{name: 'closing', count: 18},
				{name: 'healthy', count: 4},
				{name: 'damaged', count: 1}
			]
		},
		harvester: {
			name: 'harvester',
			pixelWidth: 40,
			pixelHeight: 60,
			baseWidth: 40,
			baseHeight: 20,
			pixelOffsetX: -2,
			pixelOffsetY: 40,
			buildableGrid: [
				[1,1]
			],
			passableGrid: [
				[1,1]
			],
			sight: 3,
			cost: 5000,
			hitPoints: 300,
			spriteImages: [
				{name: 'deploy', count: 17},
				{name: 'healthy', count: 3},
				{name: 'damaged', count: 1}
			]
		},
		'ground-turret': {
			name: 'ground-turret',
			canAttack: true,
			canAttackLand: true,
			canAttackAir: false,
			weaponType: 'cannon-ball',
			action: 'guard',
			direction: 0,
			directions: 8,
			orders: {type: 'guard'},

			pixelWidth: 38,
			pixelHeight: 32,
			baseWidth: 20,
			baseHeight: 18,
			pixelOffsetX: 9,
			pixelOffsetY: 12,

			cost: 1500,
			buildableGrid: [
				[1]
			],
			passableGrid: [
				[1]
			],
			sight: 5,
			hitPoints: 200,
			spriteImages: [
				{name: 'teleport', count: 9},
				{name: 'healthy', count: 1, directions: 8},
				{name: 'damaged', count: 1}
			]
		}
	},
	defaults: {
		type: 'buildings',
		animationIndex: 0,
		direction: 0,
		orders: {type: 'stand'},
		action: 'stand',
		selected: false,
		selectable: true,
		animate: function(){
			if(this.life > this.hitPoints * 0.4){
				this.lifeCode = 'healthy';
			} else if(this.life <= 0){
				this.lifeCode = 'dead';
				game.remove(this);
				return;
			} else {
				this.lifeCode = 'damaged';
			}

			switch(this.action){
				case 'stand':
					this.imageList = this.spriteArray[this.lifeCode];
					this.imageOffset = this.imageList.offset + this.animationIndex;
					this.animationIndex ++;
					if(this.animationIndex >= this.imageList.count){
						this.animationIndex = 0;
					}
				break;
				case 'construct':
					this.imageList = this.spriteArray['constructing'];
					this.imageOffset = this.imageList.offset + this.animationIndex;
					this.animationIndex ++;
					if(this.animationIndex >= this.imageList.count){
						this.animationIndex = 0;
						this.action = 'stand';
					}
				break;
				case 'teleport':
					this.imageList = this.spriteArray['teleport'];
					this.imageOffset = this.imageList.offset + this.animationIndex;
					this.animationIndex ++;
					if(this.animationIndex >= this.imageList.count){
						this.animationIndex = 0;
						if(this.canAttack){
							this.action = 'guard';
						} else {
							this.action = 'stand';
						}
					}
				break;
				case 'close':
					this.imageList = this.spriteArray['closing'];
					this.imageOffset = this.imageList.offset + this.animationIndex;
					this.animationIndex ++;
					if(this.animationIndex >= this.imageList.count){
						this.animationIndex = 0;
						this.action = 'stand';
					}
				break;
				case 'open':
					this.imageList = this.spriteArray['closing'];
					this.imageOffset = this.imageList.offset + this.imageList.count - this.animationIndex;
					this.animationIndex ++;
					if(this.animationIndex >= this.imageList.count){
						this.animationIndex = 0;
						this.action = 'close';
					}
				break;
				case 'deploy':
					this.imageList = this.spriteArray['deploy'];
					this.imageOffset = this.imageList.offset + this.animationIndex;
					this.animationIndex ++;
					if(this.animationIndex >= this.imageList.count){
						this.animationIndex = 0;
						this.action = 'stand';
					}
				break;
				case 'guard':
					if(this.lifeCode == 'damaged'){
						this.imageList = this.spriteArray[this.lifeCode];
					} else {
						this.imageList = this.spriteArray[this.lifeCode + '-' + this.direction];
					}
					this.imageOffset = this.imageList.offset;
				break;
			}
		},
		draw: function(){
			var x = (this.x*game.gridSize) - game.offsetX - this.pixelOffsetX;
			var y = (this.y*game.gridSize) - game.offsetY - this.pixelOffsetY;

			this.drawingX = x;
			this.drawingY = y;

			if(this.selected){
				this.drawSelection();
				this.drawLifeBar();
			}

			var colorIndex = (this.team == 'blue') ? 0 : 1;
			var colorOffset = colorIndex * this.pixelHeight;
			game.foregroundContext.drawImage(this.spriteSheet,
				this.imageOffset*this.pixelWidth, colorOffset, this.pixelWidth, this.pixelHeight,
				x, y, this.pixelWidth, this.pixelHeight);
		},
		drawLifeBar: function(){
			var x = this.drawingX + this.pixelOffsetX;
			var y = this.drawingY - 2 * game.lifeBarHeight;
			game.foregroundContext.fillStyle = (this.lifeCode == 'healthy') ?
				game.healthBarHealthyFillColor: game.healthBarDamagedFillColor;
			game.foregroundContext.fillRect(x, y, this.baseWidth * this.life / this.hitPoints, game.lifeBarHeight);
			game.foregroundContext.strokeStyle = game.healthBarBorderColor;
			game.foregroundContext.lineWidth = 1;
			game.foregroundContext.strokeRect(x, y, this.baseWidth, game.lifeBarHeight);
		},
		drawSelection: function(){
			var x = this.drawingX + this.pixelOffsetX;
			var y = this.drawingY + this.pixelOffsetY;
			game.foregroundContext.strokeStyle = game.selectionBorderColor;
			game.foregroundContext.lineWidth = 1;
			game.foregroundContext.fillStyle = game.selectionFillColor;
			game.foregroundContext.fillRect(x-1, y-1,this.baseWidth+2, this.baseHeight+2);
			game.foregroundContext.strokeRect(x-1, y-1,this.baseWidth+2, this.baseHeight+2);
		}
	},
	load: loadItem,
	add: addItem
};
var vehicles = {
	list: {
		transport: {
			name: 'transport',

			pixelWidth: 31,
			pixelHeight: 30,
			pixelOffsetX: 15,
			pixelOffsetY: 15,

			radius: 15,
			speed: 15,
			sight: 3,

			cost: 400,
			hitPoints: 100,
			turnSpeed: 2,
			spriteImages: [
				{name: 'stand', count: 1, directions: 8}
			]
		},
		harvester: {
			name: 'harvester',

			pixelWidth: 21,
			pixelHeight: 20,
			pixelOffsetX: 10,
			pixelOffsetY: 10,

			radius: 10,
			speed: 10,
			sight: 3,

			cost: 1600,
			hitPoints: 50,
			turnSpeed: 2,
			spriteImages: [
				{name: 'stand', count: 1, directions: 8}
			]
		},
		'scout-tank' : {
			name: 'scout-tank',

			canAttach: true,
			canAttachLand: true,
			canAttachAir: false,
			weaponType: 'bullet',

			pixelWidth: 21,
			pixelHeight: 20,
			pixelOffsetX: 10,
			pixelOffsetY: 10,

			radius: 11,
			speed: 20,
			sight: 4,

			cost: 500,
			hitPoints: 50,
			turnSpeed: 4,
			spriteImages: [
				{name: 'stand', count: 1, directions: 8}
			]
		},
		'heavy-tank': {
			name: 'heavy-tank',

			canAttach: true,
			canAttachLand: true,
			canAttachAir: false,
			weaponType: 'bullet',

			pixelWidth: 30,
			pixelHeight: 30,
			pixelOffsetX: 15,
			pixelOffsetY: 15,

			radius: 13,
			speed: 15,
			sight: 5,

			cost: 1200,
			hitPoints: 50,
			turnSpeed: 4,
			spriteImages: [
				{name: 'stand', count: 1, directions: 8}
			]
		}
	},
	defaults: {
		type: 'vehicles',
		animationIndex: 0,
		direction: 0,
		action: 'stand',
		orders: {type: 'stand'},
		selected: false,
		selectable: true,
		directions: 8,
		animate: function(){
			if(this.life > this.hitPoints * 0.4){
				this.lifeCode = 'healthy';
			} else if(this.life <= 0){
				this.lifeCode = 'dead';
				game.remove(this);
				return;
			} else {
				this.lifeCode = 'damaged';
			}

			switch(this.action){
				case 'stand':
					var direction = this.direction;
					this.imageList = this.spriteArray['stand-' + direction];
					this.imageOffset = this.imageList.offset + this.animationIndex;
					this.animationIndex ++;
					if(this.animationIndex >= this.imageList.count){
						this.animationIndex = 0;
					}
				break;
			}
		},
		draw: function(){
			var x = (this.x * game.gridSize) - game.offsetX - this.pixelOffsetX;
			var y = (this.y * game.gridSize) - game.offsetY - this.pixelOffsetY;

			this.drawingX = x;
			this.drawingY = y;

			if(this.selected){
				this.drawSelection();
				this.drawLifeBar();
			}

			var colorIndex = (this.team == 'blue') ? 0 : 1;
			var colorOffset = colorIndex * this.pixelHeight;
			game.foregroundContext.drawImage(this.spriteSheet,
				this.imageOffset * this.pixelWidth, colorOffset, this.pixelWidth, this.pixelHeight,
				x, y, this.pixelWidth, this.pixelHeight);
		},
		drawLifeBar: function(){
			var x = this.drawingX;
			var y = this.drawingY - 2 * game.lifeBarHeight;
			game.foregroundContext.fillStyle = (this.lifeCode == 'healthy') ?
				game.healthBarHealthyFillColor: game.healthBarDamagedFillColor;
			game.foregroundContext.fillRect(x, y, this.pixelWidth * this.life / this.hitPoints, game.lifeBarHeight);
			game.foregroundContext.strokeStyle = game.healthBarBorderColor;
			game.foregroundContext.lineWidth = 1;
			game.foregroundContext.strokeRect(x, y, this.pixelWidth, game.lifeBarHeight);
		},
		drawSelection: function(){
			var x = this.drawingX + this.pixelOffsetX;
			var y = this.drawingY + this.pixelOffsetY;
			game.foregroundContext.strokeStyle = game.selectionBorderColor;
			game.foregroundContext.lineWidth = 1;
			game.foregroundContext.beginPath();
			game.foregroundContext.arc(x,y,this.radius,0,Math.PI*2,false);
			game.foregroundContext.fillStyle = game.selectionFillColor;
			game.foregroundContext.fill();
			game.foregroundContext.stroke();
		}
	},
	load: loadItem,
	add: addItem
};
var aircraft = {
	list: {
		chopper: {
			name: 'chopper',
			
			pixelWidth: 40,
			pixelHeight: 40,
			pixelOffsetX: 20,
			pixelOffsetY: 20,

			canAttack: true,
			canAttackLand: true,
			canAttackAir: true,
			weaponType: 'heatseeker',

			radius: 18,
			sight: 6,

			hitPoints: 50,
			speed: 25,
			turnSpeed: 4,
			cost: 900,
			pixelShadowHeight: 40,

			spriteImages: [
				{name: 'fly', count: 4, directions: 8}
			]
		},
		wraith: {
			name: 'wraith',
			
			pixelWidth: 30,
			pixelHeight: 30,
			pixelOffsetX: 15,
			pixelOffsetY: 15,

			canAttack: true,
			canAttackLand: true,
			canAttackAir: false,
			weaponType: 'fireball',

			radius: 15,
			sight: 8,

			hitPoints: 50,
			speed: 40,
			turnSpeed: 4,
			cost: 600,
			pixelShadowHeight: 40,

			spriteImages: [
				{name: 'fly', count: 1, directions: 8}
			]
		}
	},
	defaults: {
		type: 'aircraft',
		animationIndex: 0,
		direction: 0,
		directions: 8,
		action: 'fly',
		selected: false,
		selectable: true,
		orders: {type: 'float'},
		animate: function(){
			if(this.life > this.hitPoints * 0.4){
				this.lifeCode = 'healthy';
			} else if(this.life <= 0){
				this.lifeCode = 'dead';
				game.remove(this);
				return;
			} else {
				this.lifeCode = 'damaged';
			}

			switch(this.action){
				case 'fly':
					var direction = this.direction;
					this.imageList = this.spriteArray['fly-' + direction];
					this.imageOffset = this.imageList.offset + this.animationIndex;
					this.animationIndex ++;
					if(this.animationIndex >= this.imageList.count){
						this.animationIndex = 0;
					}
				break;
			}
		},
		draw: function(){
			var x = (this.x * game.gridSize) - game.offsetX - this.pixelOffsetX;
			var y = (this.y * game.gridSize) - game.offsetY - this.pixelOffsetY;

			this.drawingX = x;
			this.drawingY = y;

			if(this.selected){
				this.drawSelection();
				this.drawLifeBar();
			}

			var colorIndex = (this.team == 'blue') ? 0 : 1;
			var colorOffset = colorIndex * this.pixelHeight;
			var shadowOffset = this.pixelHeight * 2;

			game.foregroundContext.drawImage(this.spriteSheet,
				this.imageOffset * this.pixelWidth, colorOffset, this.pixelWidth, this.pixelHeight,
				x, y, this.pixelWidth, this.pixelHeight);

			game.foregroundContext.drawImage(this.spriteSheet,
				this.imageOffset * this.pixelWidth, shadowOffset, this.pixelWidth, this.pixelHeight,
				x, y + this.pixelShadowHeight, this.pixelWidth, this.pixelHeight);
		},
		drawLifeBar: function(){
			var x = this.drawingX;
			var y = this.drawingY - 2 * game.lifeBarHeight;
			game.foregroundContext.fillStyle = (this.lifeCode == 'healthy') ?
				game.healthBarHealthyFillColor: game.healthBarDamagedFillColor;
			game.foregroundContext.fillRect(x, y, this.pixelWidth * this.life / this.hitPoints, game.lifeBarHeight);
			game.foregroundContext.strokeStyle = game.healthBarBorderColor;
			game.foregroundContext.lineWidth = 1;
			game.foregroundContext.strokeRect(x, y, this.pixelWidth, game.lifeBarHeight);
		},
		drawSelection: function(){
			var x = this.drawingX + this.pixelOffsetX;
			var y = this.drawingY + this.pixelOffsetY;
			game.foregroundContext.strokeStyle = game.selectionBorderColor;
			game.foregroundContext.lineWidth = 2;
			game.foregroundContext.beginPath();
			game.foregroundContext.arc(x,y,this.radius,0,Math.PI*2,false);
			game.foregroundContext.stroke();
			game.foregroundContext.fillStyle = game.selectionFillColor;
			game.foregroundContext.fill();
			
			game.foregroundContext.beginPath();
			game.foregroundContext.arc(x, y+this.pixelShadowHeight,4,0,Math.PI*2,false);
			game.foregroundContext.stroke();

			game.foregroundContext.beginPath();
			game.foregroundContext.moveTo(x,y);
			game.foregroundContext.lineTo(x,y+this.pixelShadowHeight);
			game.foregroundContext.stroke();
		}
	},
	load: loadItem,
	add: addItem
};
var terrain = {
	list: {
		oilfield: {
			name: 'oilfield',

			pixelWidth: 40,
			pixelHeight: 60,
			baseWidth: 40,
			baseHeight: 20,
			pixelOffsetX: 0,
			pixelOffsetY: 40,
			buildableGrid: [
				[1,1]
			],
			passableGrid: [
				[1,1]
			],
			spriteImages: [
				{name: 'hint', count: 1},
				{name: 'default', count: 1}
			]
		},
		bigrocks: {
			name: 'bigrocks',

			pixelWidth: 40,
			pixelHeight: 70,
			baseWidth: 40,
			baseHeight: 40,
			pixelOffsetX: 0,
			pixelOffsetY: 30,
			buildableGrid: [
				[1,1],
				[0,1]
			],
			passableGrid: [
				[1,1],
				[0,1]
			],
			spriteImages: [
				{name: 'default', count: 1}
			]
		},
		smallrocks: {
			name: 'smallrocks',

			pixelWidth: 30,
			pixelHeight: 35,
			baseWidth: 20,
			baseHeight: 20,
			pixelOffsetX: 0,
			pixelOffsetY: 15,
			buildableGrid: [
				[1]
			],
			passableGrid: [
				[1]
			],
			spriteImages: [
				{name: 'default', count: 1}
			]
		}
	},
	defaults: {
		type: 'terrain',
		animationIndex: 1,
		action: 'default',
		selected: false,
		selectable: false,
		animate: function(){
			switch(this.action){
				case 'default':
				this.imageList = this.spriteArray['default'];
				this.imageOffset = this.imageList.offset + this.animationIndex;
				this.animationIndex ++;
				if(this.animationIndex >= this.imageList.count){
					this.animationIndex = 0;
				}
				break;
				case 'hint':
				this.imageList = this.spriteArray['hint'];
				this.imageOffset = this.imageList.offset + this.animationIndex;
				this.animationIndex ++;
				if(this.animationIndex >= this.imageList.count){
					this.animationIndex = 0;
				}
				break;
			}
		},
		draw: function(){
			var x = (this.x * game.gridSize) - game.offsetX - this.pixelOffsetX;
			var y = (this.y * game.gridSize) - game.offsetY - this.pixelOffsetY;
			game.foregroundContext.drawImage(this.spriteSheet,
				this.imageOffset * this.pixelWidth, 0, this.pixelWidth, this.pixelHeight,
				x, y, this.pixelWidth, this.pixelHeight);
		}
	},
	load: loadItem,
	add: addItem
};