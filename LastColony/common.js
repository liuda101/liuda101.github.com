function loadItem(name){
	var item = this.list[item];
	if(item.spriteArray){
		return;
	}

	item.spriteSheet = loader.loadItem('images/' + this.defaults.type + '/' + name + '.png');
	item.spriteArray = [];
	item.spriteCount = 0;

	for(var i = 0; i < item.spriteImages.length; i ++){
		var constructImageCount = item.spriteImages[i].count;
		var constructDirectionCount = item.spriteImages[i].directions;
		if(constructDirectionCount){
			for(var j = 0; j < constructDirectionCount; j ++){
				var constructImageName = item.spriteImages[i].name + '-' + j;
				item.spriteArray[constructImageName] = {
					name: constructImageName,
					count: constructImageCount,
					offset: item.spriteCount
				};
			}
			item.spriteCount += constructImageCount;
		} else {
			var constructImageName = item.spriteImages[i].name;
			item.spriteArray[constructImageName] = {
				name: constructImageName,
				count: constructImageCount,
				offset: item.spriteCount
			};
			item.spriteCount += constructImageCount;
		}
	}
}

function addItem(details){
	var item = {};
	var name = details.name;
	$.extend(item, this.defaults);
	$.extend(item, this.list[name]);
	item.life = item.hitPoints;
	$.extend(item, details);
	return item;
}