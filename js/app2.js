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
			self.showMainScreenTimeTimeout = null;
			self.backToLockedScreen = null;
			self.lockScreenTime = 5000;

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
			var mm = 60, self = this;
			self.showMainScreenTimeTimeout = setTimeout(function () {
				var date = new Date();
				var h = date.getHours(),
					m = date.getMinutes();
					// s = date.getSeconds();
				if (m !== mm) {
					var hd = h >= 12 ? 'PM' : 'AM';
					h = h > 12 ? h - 12 : h;
					h = h.toString().length === 1 ? '0' + h : '' + h;
					m = m.toString().length === 1 ? '0' + m : '' + m;
					$('#time-status').text(h + ' : ' + m + ' ' + hd);
					mm = m;
				}
				self.showMainScreenTimeTimeout = setTimeout(arguments.callee, 1000);
			}, 0);
			$('html').removeClass('lock');
			if (typeof backToLockedScreen === 'number') {
				clearTimeout(self.backToLockedScreen);
			};
			self.setLockScreenTimer(self.lockScreenTime);
			$('#screen').on('mouseup', function () {
				if (typeof self.backToLockedScreen === 'number') {
					clearTimeout(self.backToLockedScreen);
					self.setLockScreenTimer(self.lockScreenTime);
				};
			});
		},
		goToLockedScreen: function () {
			var self = this;
			clearTimeout(this.showMainScreenTimeTimeout);
			$('html').addClass('lock');
			$('#lock-screen-time').css({
				left: 0,
				top: -136,
				opacity: 0
			});
			$('#lock-screen-slide').css({
				left: 0,
				bottom: -114,
				opacity: 0
			});
			_.delay(function(){
				self.lockedScreen.screenDOM.show();
				$('#lock-screen-time').animate({
					left: 0,
					top: 0,
					opacity: 1
				},120);
				$('#lock-screen-slide').animate({
					left: 0,
					bottom: 0,
					opacity: 1
				},120);
			},700);
		},
		setLockScreenTimer: function (time) {
			var self = this;
			self.backToLockedScreen = setTimeout(function () {
				self.goToLockedScreen();
			}, time)
		}
	};

	window.Application = Application;
})();
