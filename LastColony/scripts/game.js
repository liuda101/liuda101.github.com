var loader = {
	loaded: true,
	loadedCount: 0,
	totalCount: 0,
	loadingScreen: $('#loadingScreen'),
	loadingMessage: $('#loadingMessage'),

	init: function(){
		var mp3Support, oggSupport;
		var audio = document.createElement('audio');
		if(audio.canPlayType){
			mp3Support = '' != audio.canPlayType('audio/mpeg');
			oggSupport = '' != audio.canPlayType('audio/ogg; codecs="vorbis"');
		} else {
			mp3Support = false;
			oggSupport = false;
		}

		loader.soundFileExtn = oggSupport ? '.ogg' : mp3Support ? '.mp3' : undefined;
	},

	loadImage: function(url){
		this.totalCount ++;
		this.loaded = false;
		loader.loadingScreen.show();
		var img = new Image();
		img.onload = loader.itemLoaded;
		img.src = url;
		return img;
	},

	loadSound: function(url){
		this.totalCount ++;
		this.loaded = false;
		loader.loadingScreen.show();
		var audio = new Audio();
		audio.addEventListener('canplaythrough', loader.itemLoaded, false);
		audio.src = url + loader.soundFileExtn;
		return audio;
	},
	itemLoaded: function(){
		loader.loadedCount ++;
		loader.loadingMessage.html('Load ' + loader.loadedCount + ' of ' + loader.totalCount);
		if(loader.loadedCount === loader.totalCount){
			loader.loaded= true;
			loader.loadingScreen.hide();
			if(loader.onload){
				loader.onload();
				loader.onload = undefined;
			}
		}
	}
};
var maps = {
	singleplayer: [
		{
			name: 'Introduction',
			briefing: 'In this level you will learn how to pan across the map.\n\nDon\'t worry! We will be implementing more features soon.',

			mapImage: 'images/maps/level-one-debug-grid.png',
			startX: 4,
			startY: 4
		}
	]
};
var singleplayer = {
	start: function(){
		$('.game-player').hide();

		singleplayer.currentLevel = 0;
		game.type = 'singleplayer';
		game.team = 'blue';
		
		singleplayer.startCurrentLevel();
	},
	exit: function(){
		$('.game-player').hide();

		$('#gameStartScreen').show();
	},
	startCurrentLevel: function(){
		var level = maps.singleplayer[singleplayer.currentLevel];

		$('#enterMission').attr('disabled', true);

		game.currentMapImage = loader.loadImage(level.mapImage);
		game.currentLevel = level;

		game.offsetX = level.startX * game.gridSize;
		game.offsetY = level.startY * game.gridSize;

		if(loader.loaded){
			$('#enterMission').removeAttr('disabled');
		} else {
			loader.onload = function(){
				$('#enterMission').removeAttr('disabled');
			};
		}

		$('#missionBriefing').html(level.briefing);
		$('#missionScreen').show();
	},
	play: function(){
		game.animationLoop();
		game.animationInterval = setInterval(game.animationLoop, game.animationTimeout);
		game.start();
	}
};
var mouse = {
	/* x,y coordinates of mouse relative to the top left corner of the canvas */
	x: 0,
	y: 0,

	/* x,y coordinates of mouse relative to the top left corner of the game map */
	gameX: 0,
	gameY: 0,

	/* game grid x,y coordinates of mouse */
	gridX: 0,
	gridY: 0,

	// left mouse is on pressed
	buttonPressed: false,
	// is dragging?
	dragSelect: false,
	insideCanvas: false,

	click: function(ev, rightClick){

	},

	draw: function(){
		if(this.dragSelect){
			var x = Math.min(this.gameX, this.dragX);
			var y = Math.min(this.gameY, this.dragY);
			var width = Math.abs(this.gameX - this.dragX);
			var height = Math.abs(this.gameY - this.dragY);
			game.foregroundContext.strokeStyle = 'white';
			game.foregroundContext.strokeRect(x - game.offsetX, y - game.offsetY, width, height);
		}
	},

	calculateGameCoordinates: function(){
		mouse.gameX = mouse.x + game.offsetX;
		mouse.gameY = mouse.y + game.offsetY;

		mouse.gridX = Math.floor(mouse.gameX / game.gridSize);
		mouse.gridY = Math.floor(mouse.gameY / game.gridSize);
	},

	init: function(){
		var $mouseCanvas = $('#gameForegroundCanvas');
		$mouseCanvas.mousemove(function(ev){
			var offset = $mouseCanvas.offset();
			mouse.x = ev.pageX - offset.left;
			mouse.y = ev.pageY - offset.top;

			mouse.calculateGameCoordinates();

			if(mouse.buttonPressed){
				if((Math.abs(mouse.dragX - mouse.gameX) > 4) ||
					(Math.abs(mouse.dragY - mouse.gameY) > 4)){
					mouse.dragSelect = true;
				} else {
					mouse.dragSelect = false;
				}
			}
		});

		$mouseCanvas.click(function(ev){
			mouse.click(ev, false);
			mouse.dragSelect = false;
			return false;
		});

		$mouseCanvas.mousedown(function(ev){
			if(ev.which == 1){
				mouse.buttonPressed = true;
				mouse.dragX = mouse.gameX;
				mouse.dragY = mouse.gameY;
				ev.preventDefault();
			}
			return false;
		});

		$mouseCanvas.bind('contextmenu', function(ev){
			mouse.click(ev, true);
			return false;
		});

		$mouseCanvas.mouseup(function(ev){
			var shiftPressed = ev.shiftKey;
			if(ev.which == 1){
				mouse.buttonPressed = false;
				mouse.dragSelect = false;
			}

			return false;
		});

		$mouseCanvas.mouseleave(function(ev){
			mouse.insideCanvas = false;
		});

		$mouseCanvas.mouseenter(function(ev){
			mouse.buttonPressed = false;
			mouse.insideCanvas = true;
		});
	}
};
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