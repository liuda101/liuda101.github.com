(function(){

	var Application = function(){
		this.init();
	};

	Application.prototype = {
		init : function(){
			this.lockedScreen = new LockedScreen({
				application : this
			});

			var self = this;

			this.appMouseDownTimeout = null;

			$('.app').on('mousedown',function(e){
				window.clearTimeout(self.appMouseDownTimeout);
				if(!$('.app').hasClass('rotating')){
					self.appMouseDownTimeout = window.setTimeout(function(){
						$('.app').each(function(){
							$(this).addClass('rotating');
							$(this).addClass('rotating' + Math.ceil(Math.random() * 10 % 4));
						})
					},600);
				}
			});
			$('.app').on('mouseup',function(){
				if(!$('.app').hasClass('rotating')){
					window.clearTimeout(self.appMouseDownTimeout);
				}
			});

			$('#home button').on('click',function(){
				if($('.app').hasClass('rotating')){
					$('.app').removeClass('rotating');
				}
			});
		},
		goToMainScreen : function(){
			$('html').removeClass('lock');
		}
	};

	window.Application = Application;
})();
