;(function(){
  var push = Array.prototype.push;

  var toLoadSoruce = [];


  var assetsLoader = {
    loading: false,

    loadImageSource: function(src, callback){
      this.onLoadSuccess = callback;
      
      if(_.isString(src)){
        toLoadSoruce.push(src);
      } else if(_.isArray(src)){
        push.apply(toLoadSoruce, src);
      }
      if(!this.loading){
        this.beginLoad();
      }
    },
    beginLoad: function(){
      this.loading = true;


      this.loadImage();
    },
    loadImage: function(){
      var self = this;
      if(toLoadSoruce.length){
        var img = new Image();
        img.onload = function(){
          self.loadImage();
        };
        img.src = toLoadSoruce.splice(0,1)[0];
      } else {
        self.loading = false;
        if(_.isFunction(self.onLoadSuccess)){
          this.onLoadSuccess.call(this.onLoadSuccessContext);
        }
      }
    }
  };


  window.assetsLoader = assetsLoader;
})();
