var game = {
	gridSize: 20,
	backgroundChanged: true,
	animationTimeout: 100,
	offsetX: 0,
	offsetY: 0,
	panningThreshold: 60,
	panningSpeed: 10,

	selectionBorderColor: 'rgba(255,255,0,0.5)',
	selectionFillColor: 'rgba(255,215,0,0.2)',
	healthBarBorderColor: 'rgba(0,0,0,0.8)',
	healthBarHealthyFillColor: 'rgba(0,255,0,0.5)',
	healthBarDamagedFillColor: 'rgba(255,0,0,0.5)',
	lifeBarHeight: 5,

	clearSelection: function(){
		while(game.selectedItems.length > 0){
			game.selectedItems.pop().selected = false;
		}
	},

	selectItem: function(item, shiftPressed){
		if(shiftPressed && item.selected){
			item.selected = false;
			for(var i = game.selectedItems.length - 1; i >= 0; i --){
				game.selectedItems.splice(i, 1);
				break;
			}
			return;
		}

		if(item.selectable && !item.selected){
			item.selected = true;
			game.selectedItems.push(item);
		}
	},

	init: function(){
		loader.init();
		mouse.init();

		$('.game-player').hide();
		$('#gameStartScreen').show();

		game.backgroundCanvas = document.getElementById('gameBackgroundCanvas');
		game.backgroundContext = game.backgroundCanvas.getContext('2d');

		game.foregroundCanvas = document.getElementById('gameForegroundCanvas');
		game.foregroundContext = game.foregroundCanvas.getContext('2d');

		game.canvasWidth = game.backgroundCanvas.width;
		game.canvasHeight = game.backgroundCanvas.height;
	},

	start: function(){
		$('.game-player').hide();

		$('#gameInterfaceScreen').show();
		game.running = true;
		game.refreshBackground = true;

		game.drawingLoop();
	},
	resetArrays: function(){
		game.counter = 1;
		
		game.items = [];
		
		game.buildings = [];
		game.vehicles = [];
		game.aircraft = [];
		game.terrain = [];

		game.triggeredEvents = [];
		game.selectedItems = [];
		game.sortedItems = [];
	},
	add: function(itemDetails){
		if(!itemDetails.uid){
			itemDetails.uid = game.counter ++;
		}

		var item = window[itemDetails.type].add(itemDetails);
		game.items.push(item);
		game[item.type].push(item);

		return item;
	},
	remove: function(item){
		item.selectedItems = false;
		for(var i = game.selectedItems.length - 1; i >= 0; i --){
			if(game.selectedItems[i].uid == item.uid){
				game.selectedItems.splice(i, 1);
				break;
			}
		}

		for(var i = game.items.length - 1; i >= 0; i --){
			if(game.items[i].uid == item.uid){
				game.items.splice(i, 1);
				break;
			}
		}

		for(var i = game[item.type].length - 1; i >= 0; i --){
			if(game[item.type][i].uid == item.uid){
				game[item.type].splice(i, 1);
				break;
			}
		}
	},
	handlePanning: function() {
		if(!mouse.insideCanvas){
			return;
		}

		if(mouse.x <= game.panningThreshold){
			if(game.offsetX >= game.panningSpeed){
				game.refreshBackground = true;
				game.offsetX -= game.panningSpeed;
			}
		} else if(mouse.x >= game.canvasWidth - game.panningThreshold){
			if(game.offsetX + game.canvasWidth + game.panningSpeed <= game.currentMapImage.width){
				game.refreshBackground = true;
				game.offsetX += game.panningSpeed;
			}
		} else if(mouse.y <= game.panningThreshold){
			if(game.offsetY >= game.panningSpeed){
				game.refreshBackground = true;
				game.offsetY -= game.panningSpeed;
			}
		} else if(mouse.y >= game.canvasHeight - game.panningThreshold){
			if(game.offsetY + game.canvasHeight + game.panningSpeed <= game.currentMapImage.height){
				game.refreshBackground = true;
				game.offsetY += game.panningSpeed;
			}
		}

		if(game.refreshBackground){
			mouse.calculateGameCoordinates();
		}
	},
	animationLoop: function(){
		for(var i = game.items.length - 1; i >= 0; i --){
			game.items[i].animate();
		}

		game.sortedItems = $.extend([], game.items);
		game.sortedItems.sort(function(a,b){
			return b.y - a.y + ((b.y == a.y) ? (a.x - b.x) : 0);
		});
	},
	drawingLoop: function(){
		game.handlePanning();

		if(game.refreshBackground){
			game.backgroundContext.drawImage(game.currentMapImage, game.offsetX, game.offsetY,
				game.canvasWidth, game.canvasHeight, 0, 0, game.canvasWidth, game.canvasHeight);
			game.refreshBackground = false;
		}

		game.foregroundContext.clearRect(0,0,game.canvasWidth, game.canvasHeight);

		for(var i = game.sortedItems.length - 1; i >= 0; i --){
			game.sortedItems[i].draw();
		}

		mouse.draw();

		if(game.running){
			requestAnimationFrame(game.drawingLoop);
		}
	}
};

$(function(){
	game.init();
});