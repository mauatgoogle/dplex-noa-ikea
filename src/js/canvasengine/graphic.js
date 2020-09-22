function Graphic(img,props){
  this.src = img;
  props = props||{}
  this.x = props.x||0;
  this.y = props.y||0;
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
}
Graphic.prototype.onLoad = function(){
  this.aspect = this.image.height/this.image.width;
}

Graphic.prototype.__defineGetter__("scale", function() { return Math.max(this.width,this.height); });
Graphic.prototype.__defineSetter__("scale", function(s) { this.width = this.height = s; });


Graphic.prototype.logic = function(){
  this.renderData.width = APPW*this.width;
  this.renderData.height = this.aspect*this.renderData.width;//APPH*this.height;
  this.renderData.pivot.x = APPW*this.x;
  this.renderData.pivot.y = APPH*this.y;
  this.renderData.x = APPW*this.x-this.renderData.width*this.pivot.x;
  this.renderData.y = APPH*this.y-this.renderData.height*this.pivot.y;
};

Graphic.prototype.render = function(ctx){
    if(!this.visible) return;
    ctx.globalAlpha = this.alpha;
    ctx.drawImage( this.image, this.renderData.x, this.renderData.y, this.renderData.width, this.renderData.height);
    // ctx.strokeStyle = "#ff0000";
    // ctx.beginPath();
    // ctx.moveTo(this.renderData.pivot.x-5,this.renderData.pivot.y);
    // ctx.lineTo(this.renderData.pivot.x+5,this.renderData.pivot.y);
    // ctx.moveTo(this.renderData.pivot.x,this.renderData.pivot.y-5);
    // ctx.lineTo(this.renderData.pivot.x,this.renderData.pivot.y+5);
    // ctx.closePath();
    // ctx.stroke();
    ctx.globalAlpha = 1;
};
