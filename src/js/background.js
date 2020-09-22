var backconfig = {
  folder:'assets/renders/home/',//'public/renders/'
}
var Background = new CanvasEngine('backgroundCanvas',backconfig);
Background.addSprite('House_a_v031_Background.png',{key:'background',pivot:{x:0,y:0}});
Background.addSprite('House_a_v031_HouseBack.png',{key:'house'});
Background.addSprite('House_a_v031_HouseFront.png',{key:'front'});
Background.addSprite('House_a_v031_LightProp.png',{key:'pole'});
Background.addSprite('House_a_v031_LightZebra.png',{key:'zebra'});
Background.currentSlug = 'none';
Background.init();

Background.start = function(){
  for(var component in AnimationData.initial){
    var object = this.sprites[component];
    var data = AnimationData.initial[component];
    if(!data){
      object.visible = false;
      continue;
    }else{
      object.visible = true;
    }
    if(data.copy!=undefined){
      data = AnimationData.initial[data.copy];
    }
    for(var key in data){
      object[key] = data[key];
    }
  }

}
Background.play = function(slug){
  this.currentSlug = slug;
}
Background.logic = function(){
  //console.log(GDApp.currentSlug);

  for(var component in AnimationData[this.currentSlug]){
    var object = this.sprites[component];
    var data = AnimationData[this.currentSlug][component];
    if(!data){
      object.visible = false;
      continue;
    }else{
      object.visible = true;
    }
    if(data.copy!=undefined){
      data = AnimationData[this.currentSlug][data.copy];
    }
    for(var key in data){
      object[key] += (data[key]-object[key])/50;
    }
  }
  // this.sprites.background.x = 0.5;
  // this.sprites.background.y = 0.5;
  // this.sprites.house.x = 0.5;
  // this.sprites.house.y = 0.5;
};
