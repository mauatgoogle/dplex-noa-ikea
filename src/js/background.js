var backconfig = {
  folder:'assets/renders/home/',//'public/renders/'
  //margin:50
}
var Background = new CanvasEngine('backgroundCanvas',backconfig);
Background.addSprite( 'House_a_v031_Background.png', { key:'background', pivot:{x:0,y:0}});
Background.addSprite( 'House_a_v031_HouseBack.png',  { key:'house', pivot:{x:0.5,y:0.5}} );
Background.addSprite( 'House_a_v031_HouseFront.png', { key:'front'} );
Background.addSprite( 'House_a_v031_LightProp.png',  { key:'pole'}  );
Background.addSprite( 'House_a_v031_LightZebra.png', { key:'zebra'} );
Background.setFolder('assets/fondos/geomagical/');
//
// Background.addSprite('capture_img_line_0-min.jpg',{key:'line1',pivot:{x:0.5,y:0.5}})
// Background.addSprite('capture_img_line_1-min.jpg',{key:'line2',pivot:{x:0.5,y:0.5}})
// Background.addSprite('capture_img_line_2-min.jpg',{key:'line3',pivot:{x:0.5,y:0.5}})
// Background.addSprite('capture_img_line_3-min.jpg',{key:'line4',pivot:{x:0.5,y:0.5}})
// Background.addSprite('capture_img_line_4-min.jpg',{key:'line5',pivot:{x:0.5,y:0.5}})
// Background.addSprite('panorama-min.jpg',          {key:'panorama',pivot:{x:0.5,y:0.5}})
// Background.addSprite('seam-carving-min.jpg',      {key:'seam',pivot:{x:0.5,y:0.5}})
// Background.addSprite('semantic-segmentation-min.jpg',{key:'semantic',pivot:{x:0.5,y:0.5}})

Background.currentSlug = 'none';
Background.init();

Background.start = function(){
  for(var component in AnimationData.initial){
    var object = this.sprites[component];
    if(!object) continue;
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
  this.resize();
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
