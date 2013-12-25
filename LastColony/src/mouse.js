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