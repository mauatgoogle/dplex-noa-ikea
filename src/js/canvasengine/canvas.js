var APPW = 1920;
var APPH = 1080;
var APPController;

function CanvasEngine(canvasid,config){
  CanvasEngine.instance = this;
  this.config = config;
  this.margin = this.config.margin||0;
  console.log(canvasid);
  this.canvas = document.getElementById(canvasid);

  this.graphics = this.canvas.getContext('2d');
  this.running = false;
  // this.canvas = this.graphics = null;
  this.images = {loaded:0,total:0,loader:[]}
  this.imagesCount = 0;
  this.logicProcessors = [];
  this.animationData = null;
  this.animationSlug = null;//"sections.home.intro";
  this.tempFolder = false;
  this.sprites = {};
  //this.setAnimation("home.intro");
  this.resize();
  this.fitCanvas();
  this.init();
};
CanvasEngine.prototype.resize = function(){
  this.canvas.width = window.innerWidth;
  this.canvas.height = window.innerHeight;
  this.fitCanvas();
}
CanvasEngine.prototype.setFolder = function(f){
  this.tempFolder = f;
}
CanvasEngine.prototype.fitCanvas = function(){
  //this.aspect =
  APPW = this.width = this.canvas.width;
  APPH = this.height = this.canvas.height;
}

CanvasEngine.prototype.registerImage = function( target, src,callback){
  var trgt = this;
  this.images.total++;
  var img = loadImage(src,function(){
    trgt.onImageLoaded();
    callback();
  })
  this.images.loader.push(img);
  this.logicProcessors.push(target);
  return img;
};
CanvasEngine.prototype.setAnimation = function(slug){
  this.animationSlug = slug;
  var path = this.animationSlug.split(".");
  var animation = AnimationData.sections[path[0]];
  for(var p=1;p<path.length;p++){
    animation = animation[path[p]];
  }
  this.animationData = animation;
}
CanvasEngine.prototype.onImageLoaded = function(){
  this.images.loaded++;
  if(this.images.loaded==this.images.total){
    this.internalStart();
  };
};

// CanvasEngine.prototype.onJsonLoaded = function(){
//   this.build();
// };

CanvasEngine.prototype.init = function(){
  // loadJson("src/js/data/animation.json",this.onJsonLoaded)
  this.build();
};
CanvasEngine.prototype.addSprite = function(src,props){
  props=props||{};
  var spriteKey = props.key||src.split('/').pop().split('.').shift();
  props.margin = this.margin;
  var folder = this.tempFolder||this.config.folder;
  var spriteObj = new Graphic( folder+src, props );//,{pivot:{x:0,y:0}});
  // for(var p in props){
  //   console.log(p);
  //   if(p=='key') continue;
  //   spriteObj[p] = props[p];
  // }
  // console.log(spriteObj);
  spriteObj.visible = false;
  this.sprites[spriteKey] = spriteObj;
}
CanvasEngine.prototype.build = function(){
  // console.log("init");
  // this.registerImage('background','assets/renders/home/House_a_v031_Background.png');
  // this.house = new HomeHouse(this);
  // this.house.x = 0.2;
  // this.house.width = 0.5;
  // this.house.height = 0.5;

  // this.background = new Graphic('assets/renders/home/House_a_v031_Background.png',{pivot:{x:0,y:0}});
  // this.house = new Graphic('assets/renders/home/House_a_v031_HouseBack.png');
  // this.housefront = new Graphic('assets/renders/home/House_a_v031_HouseFront.png');
  // this.housepole = new Graphic('assets/renders/home/House_a_v031_LightProp.png');
  // this.housezebra = new Graphic('assets/renders/home/House_a_v031_LightZebra.png');
};

CanvasEngine.prototype.internalStart = function(){
  console.log('Started');
  this.start();
  this.running = true;
  this.loop();
};
CanvasEngine.prototype.loop = function(){
  this.internalLogic();
  for(var l=0;l<this.logicProcessors.length;l++) this.logicProcessors[l].logic();
  this.internalRender();
  if(!this.running) return;
  var target = this;
  requestAnimationFrame(function () {
    target.loop();
  });
}

CanvasEngine.prototype.render = function(){
}
CanvasEngine.prototype.logic = function(){
}
  // this.house.x = Math.sin(getTimer()/1000)*0.1+0.2;
  // this.house.y = Math.sin(getTimer()/1000)*0.05+0.4;
  // // this.house.width = Math.cos(getTimer()/1000)*0.2+0.4;
  // // this.house.height = this.house.width;//Math.cos(getTimer()/1000)*0.05+0.4;
  // // this.house.front.x = Math.sin(getTimer()/5000)*0.2-0.2;
CanvasEngine.prototype.internalLogic = function(){
  this.logic();
  return false;
  // this.house.scale=2;
  // this.house.x=0;
  // this.house.y=0.75;
  // this.background.scale =1.5;

};

CanvasEngine.prototype.internalRender = function(){
  this.canvas.width = this.canvas.width;
  this.render();
  for(var l=0;l<this.logicProcessors.length;l++) this.logicProcessors[l].render(this.graphics);
  // this.background.render(this.graphics);// this.graphics.drawImage(this.images.background,0,0);
  // this.house.render(this.graphics);
  // this.housefront.render(this.graphics);
  if(this.margin>0){
    var ctx = this.graphics;
    ctx.strokeStyle = "#ff0000";
    ctx.beginPath();
    ctx.moveTo(this.margin,this.margin);
    ctx.lineTo(this.width-this.margin,this.margin);
    ctx.lineTo(this.width-this.margin,this.height-this.margin);
    ctx.lineTo(this.margin,this.height-this.margin);
    ctx.closePath();
    ctx.stroke();

  }
};

//CanvasEngine.instance var GDApp = new CanvasEngine();
