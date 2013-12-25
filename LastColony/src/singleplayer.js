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