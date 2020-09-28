function Graphic(img,props){
  this.src = img;
  props = props||{}
  this.x = props.x||0;
  this.y = props.y||0;
  this.margin = props.margin||0;
  this.visible = true;
  this.width = props.width||1;
  this.height = props.height||1;
  this.ratio = props.ratio||1;
  this.alpha = props.alpha||1;
  //if(props.pivot=="center")
  if(props.scale) this.scale = props.scale;
  this.pivot = props.pivot||{x:0.5,y:0.5};
  this.renderData = {pivot:{}};
  this.load();
  this.logic();
};

Graphic.prototype.load = function(){
  var target = this;
  this.image = CanvasEngine.instance.registerImage(this,this.src,function(){target.onLoad();});
  // this.image.onLoad = function(){
  //   target.onLoad();
  // }
};

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

Graphic.prototype.logic = function() {
  this.renderData.width = this.width*APPW;
  this.renderData.height = this.renderData.width*this.aspect;
  this.renderData.x = this.x*APPW-this.pivot.x*this.renderData.width;
  this.renderData.y = this.y*APPH-this.pivot.y*this.renderData.height;

};

Graphic.prototype.render = function(ctx){
    if(!this.visible) return;
    if(this.alpha<0.01) return;
    ctx.globalAlpha = this.alpha;
    // var x = this.renderData.x;
    // var y = this.renderData.y;
    // var width = this.renderData.width;
    // var height = this.renderData.height;
    this.renderNormal( ctx, this.image, this.renderData, this.cropData );
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
};
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
    // ctx.strokeStyle = "#ff0000";
    // ctx.beginPath();
    // ctx.moveTo( pivot.x-5, pivot.y   );
    // ctx.lineTo( pivot.x+5, pivot.y   );
    // ctx.moveTo( pivot.x  , pivot.y-5 );
    // ctx.lineTo( pivot.x  , pivot.y+5 );
    // ctx.closePath();
    // ctx.stroke();
    ctx.globalAlpha = 1;
};
