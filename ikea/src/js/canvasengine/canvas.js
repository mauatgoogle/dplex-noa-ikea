var APPW = 1920;
var APPH = 1080;
var APPController;
function CanvasEngine(canvasid,config){
  CanvasEngine.instance = this;
  this.config = config;
  this.margin = this.config.margin||0;
  this.canvas = document.getElementById(canvasid);
  this.sequences = {};
  this.graphics = this.canvas.getContext('2d');
  this.running = false;
  this.disableRender = false;
  this.images = {loaded:0,total:0,loader:[]}
  this.imagesCount = 0;
  this.forceUpdate = false;//// TODO: ADD force update
  this.logicProcessors = [];
  this.animationData = null;
  this.animationSlug = null;
  this.tempFolder = false;
  this.sprites = {};
  this.fitCanvas();
  this.init();
};
CanvasEngine.prototype.resize = function(){
  return false;
  this.canvas.width = window.innerWidth;
  this.canvas.height = window.innerHeight;
  this.fitCanvas();
};
CanvasEngine.prototype.setFolder = function(f){
  this.tempFolder = f;
};
CanvasEngine.prototype.fitCanvas = function(){
  APPW = this.width = this.canvas.width;
  APPH = this.height = this.canvas.height;
};

CanvasEngine.prototype.registerImage = function( target, src,callback){
  var trgt = this;
  this.images.total++;
  var img = loadImage(src,function(){
    trgt.onImageLoaded();
    callback();
  });
  this.images.loader.push(img);
  if(target) this.logicProcessors.push(target);
  return img;
};
CanvasEngine.prototype.setAnimation = function(slug){
  this.animationSlug = slug;
  var path = this.animationSlug.split(".");
  var animation = AnimationData.sections[path[0]];
  for(var p=1;p<path.length;p++) animation = animation[path[p]];
  this.animationData = animation;
};
CanvasEngine.prototype.onImageLoaded = function(){
  this.images.loaded++;
  if(this.images.loaded==this.images.total) this.internalStart();
};
CanvasEngine.prototype.setGroup = function(g){
  this.activeGroup = g;
  if(this.sprites[g]==undefined){
    var spriteObj = new Graphic(false,{key:g});
    spriteObj.isGroup = true;
    this.sprites[g] = spriteObj;
    this.logicProcessors.push(spriteObj);
  };
};

CanvasEngine.prototype.closeGroup = function(){
  this.activeGroup = false;
};

CanvasEngine.prototype.init = function(){
  this.build();
};
CanvasEngine.prototype.addSpriteSheet = function(src,parts){
  var folder = this.tempFolder||this.config.folder;
  var img = this.registerImage(null,folder+src,function(){});
  for(var p=0; p<parts.length; p++ ){
    var part = parts[p];
    var spriteObj = new Graphic(false, part );
    spriteObj.linkToImg(img);
    spriteObj.visible = false;
    spriteObj.isPart = true;
    if(this.activeGroup) spriteObj.setGroup(this.sprites[this.activeGroup]);
    this.sprites[part.key] = spriteObj;
    this.logicProcessors.push(spriteObj);
  };
};
CanvasEngine.prototype.addSequence = function(src,frames,ext,time,props){
  this.sequences[props.key] = [];
  var folder = this.tempFolder||this.config.folder;
  for(var i=1;i<=frames;i++){
    this.sequences[props.key][i-1]=this.registerImage(null,folder+src+'/frame'+i+'.'+ext,function(){});
  };
  var spriteObj = new Graphic(false, props );
  spriteObj.playTime = time;
  if(this.activeGroup) spriteObj.setGroup(this.sprites[this.activeGroup]);
  spriteObj.linkToSequence(this.sequences[props.key]);
  spriteObj.visible = false;
  this.sprites[props.key] = spriteObj;
  this.logicProcessors.push(spriteObj);
};
CanvasEngine.prototype.addMask = function(props){
  props=props||{};
  var spriteKey = props.key||src.split('/').pop().split('.').shift();
  props.margin = this.margin;
  props.key = spriteKey;
  var folder = this.tempFolder||this.config.folder;
  var spriteObj = new Graphic( false, props );
  spriteObj.visible = false;
  spriteObj.isMask = true;
  this.sprites[spriteKey] = spriteObj;
  this.logicProcessors.push(spriteObj);
};

CanvasEngine.prototype.addSprite = function(src,props){
  props=props||{};
  var spriteKey = props.key||src.split('/').pop().split('.').shift();
  props.margin = this.margin;
  props.key = spriteKey;
  var folder = this.tempFolder||this.config.folder;
  var spriteObj = new Graphic( folder+src, props );
  if(this.activeGroup && !props.skipGroup) spriteObj.setGroup(this.sprites[this.activeGroup]);
  spriteObj.visible = false;
  this.sprites[spriteKey] = spriteObj;
};


CanvasEngine.prototype.internalStart = function(){
  this.start();
  this.running = true;
  this.loop();
};

CanvasEngine.prototype.loop = function(){
  var target = this;
  if(!this.disableRender){
  this.internalLogic();
    this.skipRender = true;
    for(var l=0;l<this.logicProcessors.length;l++){
      if(this.logicProcessors[l].logic()) this.skipRender = false;
    };
    this.internalRender();
    this.postRender();
    if(!this.running) return;
  };
  requestAnimationFrame(function () {
    target.loop();
  });
};

CanvasEngine.prototype.render = function(){ };
CanvasEngine.prototype.logic = function(){ };
CanvasEngine.prototype.build = function(){ };
CanvasEngine.prototype.postRender = function(){ };

CanvasEngine.prototype.internalLogic = function(){
  this.renderlist = '';
  this.logic();
  return false;
};

CanvasEngine.prototype.internalRender = function(){
  if(this.skipRender){
    this.renderlist = "freeze";
    return;
  };
  this.canvas.width = this.canvas.width;
  this.render();
  for(var l=0;l<this.logicProcessors.length;l++){
    var rname = this.logicProcessors[l].render(this.graphics);
    if(rname) {
      this.renderlist+=rname;
      this.renderlist+='['+(this.logicProcessors[l].needsUpdate?'*':' ')+']';
      this.renderlist+='<br/>';
    };
  };
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
  };
};
