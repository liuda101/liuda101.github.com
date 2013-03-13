(function(){

	var App = function(){
		var self = this;

		this.screenIndex = 0;
		this.screenCount = 2;

		this.searchGrid = ios.$('search-grid');

		this.pageControl = ios.$('page-control');
		this.dock = ios.$('app-dock');
		this.keyboard = ios.$('keyboard');

		this.scrollDirection = 0;

		new iScroll('app-grids-scroll-wrapper',{
			hScroll : true,
			hScrollbar : false,
			vScroll : false,
			vScrollbar : false,
			snap : true,
			onScrollMove : function(e){
				if(this.x > 5 - self.screenIndex * 320){
					self.scrollDirection = -1;
				} else if(this.x < -self.screenIndex * 320 - 5){
					self.scrollDirection = 1;
					if(self.screenIndex === 0){
						ios.removeClass(self.keyboard,'show');
					}
				}
			},
			onBeforeScrollEnd : function(){
				if(self.scrollDirection === -1 && self.screenIndex > 0){
					self.screenIndex -= 1;
				} else if(self.scrollDirection === 1 && self.screenIndex < self.screenCount - 1){
					self.screenIndex += 1;
				}
				if(self.screenIndex === 0){
					ios.addClass(self.keyboard,'show');
					ios.addClass(self.searchGrid,'show-search');
					ios.addClass(self.dock,'show-search');
					ios.addClass(self.pageControl,'show-search');
					this.options.bounce = false;
				} else {
					ios.removeClass(self.searchGrid,'show-search');
					ios.removeClass(self.dock,'show-search');
					ios.removeClass(self.pageControl,'show-search');
					this.options.bounce = true;
				}
			}
		});
	};

	window.addEventListener('load',function(){
		new App();
	},false);
})();