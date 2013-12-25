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

		// load level requirements
		game.resetArrays();
		for(var type in level.requirements){
			var requirementArray = level.requirements[type]
			for(var i = 0; i < requirementArray.length; i ++){
				var name = requirementArray[i];
				if(window[type]){
					window[type].load(name);
				} else {
					console.log('Could not load type: ' + type);
				}
			}
		}

		for(var i = level.items.length - 1; i >= 0; i --){
			var itemDetails = level.items[i];
			game.add(itemDetails);
		}

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