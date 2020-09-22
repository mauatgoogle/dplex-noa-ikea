var backconfig = {
  folder:'assets/DiningRoom_assests/',
};
var Background = new CanvasEngine('backgroundCanvas',backconfig);
Background.addSprite('DiningRoom.png',{key:'background',pivot:{x:0,y:0}});
var side =  { x:-0.02 };
var up =    { y:-0.02 };
var scale = { scale:0.95 };
function doA( k, anim ){
  var o = { key:k, alpha:0, pivot:{x:0,y:0} };
  for(var a in anim) o[a] = anim[a];
  return o;
};
Background.addSprite('DiningRoom_Picture1.png', doA('picture1',up) );
Background.addSprite('DiningRoom_Picture2.png', doA('picture2',up) );
Background.addSprite('DiningRoom_Picture3.png', doA('picture3',up) );
Background.addSprite('DiningRoom_Picture4.png', doA('picture4',up) );
Background.addSprite('DiningRoom_Picture5.png', doA('picture5',up) );
Background.addSprite('DiningRoom_Hemnes.png',   doA('hemnes',side) );
Background.addSprite('DiningRoom_Carpet.png',   doA('carpet',up) );
Background.addSprite('DiningRoom_Chair1.png',   doA('chair1',side) );
Background.addSprite('DiningRoom_Kyrre1.png',   doA('kyrre1',up) );
Background.addSprite('DiningRoom_Navlinge1.png',doA('navlinge1',scale) );
Background.addSprite('DiningRoom_Kyrre2.png',   doA('kyrre2',up) );
Background.addSprite('DiningRoom_Chair2.png',   doA('chair2',up) );
Background.addSprite('DiningRoom_Navlinge2.png',doA('navlinge2',scale) );
Background.addSprite( 'DiningRoom_Table.png', doA('table',side) );
Background.addSprite('DiningRoom_Plant.png',    doA('plant',scale) );
Background.addSprite('DiningRoom_Fruits.png',   doA('fruits',side) );
Background.addSprite('DiningRoom_Spice1.png',   doA('spice1',side) );
Background.addSprite('DiningRoom_Spice2.png',   doA('spice2',side) );

console.log(Background.sprites);
// Background.currentSlug = 'none';
Background.init();

Background.start = function(){
  // for(var component in AnimationData.initial){
  //   var object = this.sprites[component];
  //   var data = AnimationData.initial[component];
  //   if(!data){
  //     object.visible = false;
  //     continue;
  //   }else{
  //     object.visible = true;
  //   };
  //   if(data.copy!=undefined){
  //     data = AnimationData.initial[data.copy];
  //   };
  //   for(var key in data){
  //     object[key] = data[key];
  //   };
  // };
  this.final = { x:0, y:0, scale:1, alpha:1 };
  var si = 0;
  for( var s in this.sprites){
    var object = this.sprites[s];
    if(si>0){
      // object.y = -0.04;
      object.alpha = 0;
      object.time = 1000+80*si;
    };
    si++;
  };
};

Background.play = function(slug){
  this.currentSlug = slug;
};
var startTime = getTimer();
Background.logic = function(){
  // for(var component in AnimationData[this.currentSlug]){
  var deltaTime = getTimer()-startTime;
  var si = 0;
  for( var s in this.sprites){
    if(si>0){
      var object = this.sprites[s];
      // console.log(s,object.time>deltaTime);
      if( deltaTime > object.time ){
        console.log(object);
        var r = 20;
        object.x      += ( this.final.x - object.x )/r;
        object.y      += ( this.final.y - object.y )/r;
        object.scale  += ( this.final.scale - object.scale )/r;
        object.alpha  += ( this.final.alpha - object.alpha )/r;
      }
    }
    si++;
  };
  //   var object = this.sprites[component];
  //   var data = AnimationData[this.currentSlug][component];
  //   if(!data){
  //     object.visible = false;
  //     continue;
  //   }else{
  //     object.visible = true;
  //   };
  //   if(data.copy!=undefined){
  //     data = AnimationData[this.currentSlug][data.copy];
  //   };
  //   for(var key in data){
  //     object[key] += (data[key]-object[key])/50;
  //   };
  // };
};
