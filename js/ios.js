(function(){
	var ios = window.ios = {};

	ios.$ = function(id){
		return document.getElementById(id);
	};

	var hasClass = ios.hasClass = function(node,cls){
		var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
		return reg.test(node.className);
	};

	ios.addClass = function(node,cls){
		if(!hasClass(node,cls)){
			node.className += ' ' + cls;
		}
	};

	ios.removeClass = function(node,cls){
		var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
		node.className = node.className.replace(reg,' ');
	};
})();