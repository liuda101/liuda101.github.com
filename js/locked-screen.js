(function(){
	var WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
	var MONTH = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Augest', 'September', 'October', 'November', 'December'];
	var LockedScreen = function(options){
		this.init(options);
	};

	LockedScreen.prototype  = {
		init : function(options){
			var self = this;

			self.application = options.application;

			self.screenDOM = $('#lock-screen');
			self.slideTip = $('#lock-screen-slide-tip');

			self.timeDetail = $('#lock-screen-time-time');
			self.dayDetail = $('#lock-screen-time-date');

			self.dragger = $('#lock-screen-slide-btn').draggable({
				containment: "parent",
				start : _.bind(self.onDragStart,self),
				drag : _.bind(self.onDragGoing,self),
				stop : _.bind(self.onDragEnd,self)
			});

			self.soundEffect = $('#unlock_sound_effect')[0];

			window.setInterval(function(){
				self.fireTick();
			}, 60 * 1000);

			self.fireTick();
		},
		fireTick: function(){
			var self = this;

			var date = new Date;

			var timeDetailHTML = (date.getHours() > 9 ? date.getHours() : '0' + date.getHours()) + ':' + (date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes());
			self.timeDetail.html(timeDetailHTML);

			var dayDetailHTML = WEEK[date.getDay()] + ',' + MONTH[date.getMonth()] + ' ' + date.getDate();
			self.dayDetail.html(dayDetailHTML);


		},
		onDragStart : function(e,ui){
			this.slideTip.removeClass('blind');
		},
		onDragGoing : function(e,ui){
			this.slideTip.css('opacity',1 - ui.position.left / 84);
		},
		onDragEnd : function(e,ui){
			var self = this;

			self.slideTip.addClass('blind');
			self.slideTip.css('opacity',1);
			var time = 0;
			if(ui.position.left === 164){
				self.application.goToMainScreen();

				self.soundEffect.play();
				
				_.delay(function(){
					self.screenDOM.hide();
				},350);
				
				time = 1000;
			}

			
			_.delay(function(){
				self.dragger.animate({
					left : 0,
					top : 0
				},200);
			},time);
		}
	};

	window.LockedScreen = LockedScreen;
})();
