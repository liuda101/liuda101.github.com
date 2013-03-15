(function(){
	var LockedScreen = function(options){
		this.init(options);
	};

	LockedScreen.prototype  = {
		init : function(options){
			var self = this;

			self.application = options.application;

			self.screenDOM = $('#lock-screen');
			self.slideTip = $('#lock-screen-slide-tip');

			self.dragger = $('#lock-screen-slide-btn').draggable({
				containment: "parent",
				start : _.bind(self.onDragStart,self),
				drag : _.bind(self.onDragGoing,self),
				stop : _.bind(self.onDragEnd,self)
			});

			self.soundEffect = $('#unlock_sound_effect')[0];
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