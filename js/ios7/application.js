;(function(){


  
  var FRAME_IMAGE = 'imgs/iphone.png';
  var IMAGE_SOURCE = ['imgs/background_ios7.jpg', 'imgs/apple_logo.png'];

  var TIME_SHOW_LOGO = 3000;


  var Application = function(){
    var self = this;

    self.initDOM();

    self.loadFrameImage();
  };

  Application.prototype = {
    initDOM: function(){
      var self = this;
      self.applicationDOM = $('#application');
      self.loadingGif = $('#loadingGif');
    },

    loadFrameImage: function(){
      var self = this;
      assetsLoader.loadImageSource(FRAME_IMAGE, function(){
        self.applicationDOM.fadeIn();
        self.loadImageSource(IMAGE_SOURCE);
      });
    },

    loadImageSource: function(imageSource){
      var self = this;

      self.beginTime = new Date;
      assetsLoader.loadImageSource(imageSource, function(){
        self.onSourceLoadDone();
      });
    },

    onSourceLoadDone: function(){
      var self = this;

      var endTime = new Date;
      var duration = endTime - self.beginTime;
      window.setTimeout(function(){
        self.showLogo();
      }, Math.abs(TIME_SHOW_LOGO - duration));

      self.beginTime = null;
    },
    showLogo: function(){
      var self = this;
      
      self.loadingGif.attr('src', 'imgs/apple_logo.png').addClass('shine').one('webkitAnimationEnd', function(){
        self.showLockScreen();
      });
    },
    showLockScreen: function(){
      $('#deviceOpen').fadeOut(100, function(){
        $(this).remove();
      });
    }
  };



  new Application();


})();
