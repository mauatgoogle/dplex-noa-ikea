var tweenSpeed = 30;
function Graphic(img,props){
  this.src = img;
  props = props||{}
  if(props.position=="center"){

      this.x = 0.5;
      this.y = 0.5;
  }else{
    this.x = props.x||0;
    this.y = props.y||0;

  }
  this.final = {};
  this.initial = {};
  this.gcinitial = {};
  this.sequence = null;
  this.isSequence = false;
  this.delay = 0;
  this.group = false;
  this.isGroup = false;
  this.startTimeDelay = 0;
  this.isPlaying = false;
  this.rotation = 0;
  this.playTime = 0;
  this.startTime = 0;
  this.isMask = false;
  this.maskReset = props.maskReset||false;
  this.darken = props.darken||0;
  this.margin = props.margin||0;
  this.visible = true;
  this.name = props.key||'Untitled';
  this.width = props.width||1;
  this.height = props.height||1;
  this.aspect = this.height/this.width;
  this.ratio = props.ratio||1;
  this.needsUpdate = false;
  this.alpha = props.alpha||1;
  this.size = props.size||'width';
  //if(props.pivot=="center")
  if(props.scale) this.scale = props.scale;
  this.pivot = props.pivot||{x:0,y:0};
  this.updatePivot(this.pivot);
  this.renderData = {pivot:{}};
  this.cropData = false;
  if(props.crop){
    var tilesetSize = 64;
    var x = props.crop[0]*tilesetSize;
    var y = props.crop[1]*tilesetSize;
    var w = props.crop[2]*tilesetSize;
    var h = props.crop[3]*tilesetSize;
    // console.log(x,y,w,h);
    this.cropData = {x:x,y:y,width:w,height:h};
    this.width = this.cropData.width/APPW;
    this.aspect = this.cropData.height/this.cropData.width;
    this.height = this.width*this.aspect;
    // console.log(this.cropData);
  }
  //
  if(img) this.load();
  this.logic();
};
Graphic.prototype.setPivot = function(){

}
Graphic.prototype.updatePivot = function(pivot){
  switch (pivot) {
    case 'center':
      this.pivot={x:0.5,y:0.5};
      break;
        case 'topright':
          this.pivot={x:1,y:0};
          break;
    default:
  }
}

Graphic.prototype.load = function(){
  var target = this;
  this.image = CanvasEngine.instance.registerImage(this,this.src,function(){target.onLoad();});
  // this.image.onLoad = function(){
  //   target.onLoad();
  // }
};
Graphic.prototype.setGroup = function(g){
  this.group = g;
}
Graphic.prototype.linkToImg = function(img){
  this.image = img;
}
Graphic.prototype.linkToSequence = function(sequence){
  this.sequence = sequence;
  this.isSequence = true;
  this.frame = 0;
  this.linkToImg(this.sequence[this.frame]);
    this.aspect = 1080/1920;
    this.height = this.width*this.aspect;

  this.frameTime = (this.playTime*1000)/(this.sequence.length);
}
Graphic.prototype.onLoad = function(){
  this.aspect = this.image.height/this.image.width;
  this.height = this.width*this.aspect;
};

Graphic.prototype.__defineGetter__("scale", function() {
  return Math.max(this.width);/*,this.height);*/
});
Graphic.prototype.__defineSetter__("scale", function(s) {
  this.width = s;
  this.height = this.width*this.aspect;
});
Graphic.prototype.stop = function(){
  this.isPlaying = false;
  this.frame = 0;
}
Graphic.prototype.pause = function(){
  this.isPlaying = false;
}
Graphic.prototype.play = function(){
  this.isPlaying = true;
  this.startTime = getTimer()-this.frameTime*this.frame;
}
Graphic.prototype.rewind = function(){
  this.frame = 0;
  this.startTime = getTimer();
}

Graphic.prototype.logic = function() {
  var distance = 0.001;
  var needsUpdate = false;
  if(this.final.delay && this.startTimeDelay==0){
     this.delay = this.final.delay*1000;
     this.startTimeDelay = getTimer();
  }
  if(this.startTimeDelay>0){
    if(getTimer()-this.startTimeDelay>this.delay){
      this.startTimeDelay = -1;
      this.delay=0;
    }else{
      return;
    }
  }
  for(var key in this.initial){
    if(this.initial[key]!=undefined){
      this.final[key]=this[key];
      this[key]=this[key]+this.initial[key];
      this.gcinitial[key] = this.initial[key];
      delete this.initial[key];
      // console.log(key,this.final,this.initial);
      // deltaKey = (this.final[key]-this[key]);
    }else{

    }
  }
  for(var key in this.final){
      if(key=='pivot'){

        var deltaKey = (this.final.pivot.x-this.pivot.x);
        if(Math.abs(deltaKey)>distance) needsUpdate = true;
        this.pivot.x += deltaKey/tweenSpeed;

        deltaKey = (this.final.pivot.y-this.pivot.y);
        if(Math.abs(deltaKey)>distance) needsUpdate = true;
        this.pivot.y += deltaKey/tweenSpeed;
        // console.log(this.pivot);

      }else{
        // if(this.name=='table') console.log(key,this.final,this.initial,this);
        var deltaKey = (this.final[key]-this[key]);
        if(Math.abs(deltaKey)>distance) needsUpdate = true;
        this[key] += deltaKey/(this.final.speed?this.final.speed:tweenSpeed);

      }
      // console.log(key);
  }
  if(this.isMask) needsUpdate = true;
  // console.log(this.final);
  if(this.isSequence && this.isPlaying){
    var currentTime = (getTimer()-this.startTime);
    var currentFrame = Math.floor(currentTime/this.frameTime);
    this.frame=Math.min(this.sequence.length-1,currentFrame);
    this.linkToImg(this.sequence[this.frame]);
    needsUpdate = true;
  }
  this.needsUpdate = needsUpdate;
  if(this.isGroup) this.needsUpdate = true;
  if(this.group && this.group.needsUpdate) this.needsUpdate = true;
  if(!this.needsUpdate) return false;
  if(!this.visible && !this.isGroup) return false;
  var _appW = APPW;
  var _appH = APPH;

  var _appX = 0;
  var _appY = 0;
  if(this.group){
    _appW*=this.group.width;
    _appH*=this.group.width;
    _appX = (APPW-_appW)/2;
    _appY = (APPH-_appH)/2;
  }
  if(this.size=='fill'){
    this.renderData.width = _appW;
    this.renderData.height = _appH;
  }else{
    this.renderData.width = this.width*_appW;
    this.renderData.height = this.renderData.width*this.aspect;

  }

  this.renderData.x = this.x*_appW-this.pivot.x*this.renderData.width+_appX;
  this.renderData.y = this.y*_appH-this.pivot.y*this.renderData.height+_appY;

  return this.needsUpdate;
};

Graphic.prototype.render = function(ctx){
    if(this.isGroup) return;
    if(!this.visible) return;
    if(this.alpha<0.01) return;
    ctx.globalAlpha = this.alpha;
    // if(this.group) ctx.globalAlpha*=this.group.alpha;
    // var x = this.renderData.x;
    // var y = this.renderData.y;
    // var width = this.renderData.width;
    // var height = this.renderData.height;
    if(this.renderData.x+this.renderData.width<=0||this.renderData.x>=APPW) return;
    if(this.renderData.y+this.renderData.height<=0||this.renderData.y>=APPH) return;
    var doRotation = false;
    if(CHECKSCALES){
      ctx.save();
      ctx.translate(300,300);
    }
    if(Math.abs(this.rotation)>0){
      ctx.save();
      ctx.translate(this.x*APPW,this.y*APPH);
      ctx.rotate(D2R(this.rotation));
      this.renderData.x = -this.pivot.x*this.renderData.width;
      this.renderData.y = -this.pivot.y*this.renderData.height;
      doRotation = true;
    }

    if(this.isMask){
      ctx.fillStyle = "#00FF00";

      // ctx.beginPath();
      // ctx.moveTo(this.renderData.x,this.renderData.y);
      // ctx.lineTo(this.renderData.x+this.renderData.width,this.renderData.y);
      // ctx.lineTo(this.renderData.x+this.renderData.width,this.renderData.y+this.renderData.height);
      // ctx.lineTo(this.renderData.x,this.renderData.y+this.renderData.height);
      // ctx.closePath();
      // ctx.fill();

      if(this.maskReset){
        ctx.restore();
      }else{
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(this.renderData.x,this.renderData.y);
        ctx.lineTo(this.renderData.x+this.renderData.width,this.renderData.y);
        ctx.lineTo(this.renderData.x+this.renderData.width,this.renderData.y+this.renderData.height);
        ctx.lineTo(this.renderData.x,this.renderData.y+this.renderData.height);
        ctx.closePath();
        ctx.clip();
      }

      // ctx.fillRect(this.renderData.x, this.renderData.y, this.renderData.width, this.renderData.height);

    }else{
      if(this.cropData){
        this.renderAndCrop( ctx, this.image, this.renderData, this.cropData );
      }else{
        this.renderNormal( ctx, this.image, this.renderData );
      }
    }

    if(this.darken>0){
      ctx.fillStyle = "#000000";
      ctx.globalAlpha = this.darken*this.alpha;
      ctx.fillRect(this.renderData.x, this.renderData.y, this.renderData.width, this.renderData.height);
      ctx.globalAlpha = this.alpha;
    }
    if(doRotation) ctx.restore();
    if(CHECKSCALES) ctx.restore();
    var pivot = {
      x: this.x*APPW,
      y: this.y*APPH,
    }
    // ctx.strokeStyle = "#ff0000";
    // ctx.beginPath();
    // ctx.moveTo( pivot.x-5, pivot.y   );
    // ctx.lineTo( pivot.x+5, pivot.y   );
    // ctx.moveTo( pivot.x  , pivot.y-5 );
    // ctx.lineTo( pivot.x  , pivot.y+5 );
    // ctx.closePath();
    // ctx.stroke();
    ctx.globalAlpha = 1;
    // this.renderPivot(ctx,pivot);
    return this.name;
};
Graphic.prototype.renderAndCrop = function( ctx, image, render, crop ){
  ctx.drawImage( image,
    crop.x, crop.y, crop.width, crop.height,
    render.x+this.margin, render.y+this.margin, render.width, render.height
  );
};
Graphic.prototype.renderNormal = function( ctx, image, render, crop ){
  ctx.drawImage( image,
    render.x+this.margin, render.y+this.margin, render.width, render.height
  );
};
Graphic.prototype.renderPivot = function(ctx,pivot){
  ctx.globalAlpha = 1;
  ctx.strokeStyle = "#ff0000";
  ctx.beginPath();
  ctx.moveTo( pivot.x-5, pivot.y   );
  ctx.lineTo( pivot.x+5, pivot.y   );
  ctx.moveTo( pivot.x  , pivot.y-5 );
  ctx.lineTo( pivot.x  , pivot.y+5 );
  ctx.closePath();
  ctx.stroke();
}






Graphic.prototype.prologic = function(){

  var _W = (APPW-this.margin*2);
  var _H = (APPH-this.margin*2);
  var _width = _W*this.width;
  var _height = _H*this.height;

  var _sizeRatio = APPH/APPW;
  var _x = _W*this.x-_width*this.pivot.x;
  var _y = _H*this.y-_height*this.pivot.y;


  var _widthCroped =  Math.min(1,1+(1-(this.width+(this.x-this.pivot.x*this.width)))/this.width);
  var _wx =           Math.max(0,(this.x-this.pivot.x*this.width)/-this.width);
  _widthCroped -=     _wx;

  var _heightCroped = Math.min(1,1+(1-(this.height+(this.y-this.pivot.y*this.height)))/this.height);
  var _wy =           Math.max(0,(this.y-this.pivot.y*this.height)/-this.height);
  _heightCroped -=    _wy;

  this.renderData = {
    x: _x +_width*_wx,
    y: _y +_height*_wy,
    width: _width*_widthCroped,
    height: _height*_heightCroped /_sizeRatio,
  }
  this.cropData = {
    x: this.image.width*_wx,
    y: this.image.height*_wy,
    width: this.image.width*_widthCroped,
    height: this.image.height*_heightCroped,
  }


};
Graphic.prototype.prorender = function(ctx){
    if(!this.visible) return;
    ctx.globalAlpha = this.alpha;
    // var x = this.renderData.x;
    // var y = this.renderData.y;
    // var width = this.renderData.width;
    // var height = this.renderData.height;
    this.renderAndCrop( ctx, this.image, this.renderData, this.cropData );
    var pivot = {
      x: this.x*APPW,
      y: this.y*APPH,
    }
    ctx.strokeStyle = "#ff0000";
    ctx.beginPath();
    ctx.moveTo( this.pivot.x-5, this.pivot.y   );
    ctx.lineTo( this.pivot.x+5, this.pivot.y   );
    ctx.moveTo( this.pivot.x  , this.pivot.y-5 );
    ctx.lineTo( this.pivot.x  , this.pivot.y+5 );
    ctx.closePath();
    ctx.stroke();
    ctx.globalAlpha = 1;
};
