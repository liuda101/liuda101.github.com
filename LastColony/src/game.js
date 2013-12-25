var game = {
	gridSize: 20,
	backgroundChanged: true,
	animationTimeout: 100,
	offsetX: 0,
	offsetY: 0,
	panningThreshold: 60,
	panningSpeed: 10,
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

	},
	drawingLoop: function(){
		game.handlePanning();

		if(game.refreshBackground){
			game.backgroundContext.drawImage(game.currentMapImage, game.offsetX, game.offsetY,
				game.canvasWidth, game.canvasHeight, 0, 0, game.canvasWidth, game.canvasHeight);
			game.refreshBackground = false;
		}

		game.foregroundContext.clearRect(0,0,game.canvasWidth, game.canvasHeight);
		mouse.draw();

		if(game.running){
			requestAnimationFrame(game.drawingLoop);
		}
	}
};

$(function(){
	game.init();
});