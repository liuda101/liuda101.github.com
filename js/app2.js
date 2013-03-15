(function(){

	var Application = function(){
		this.init();
	};

	Application.prototype = {
		init : function(){
			this.lockedScreen = new LockedScreen({
				application : this
			});
		},
		goToMainScreen : function(){
			$('html').removeClass('lock');
		}
	};

	window.Application = Application;
})();