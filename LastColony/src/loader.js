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