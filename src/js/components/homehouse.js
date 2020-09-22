function HomeHouse(ctrl){
  this.controller = ctrl;
  this.x = 0;
  this.y = 0;
  this.front = { x:0, y:0 };
  this.width = 1;
  this.height = 1;
  // this.baseSize = {width:1920,height:1080};
  this.load();
};

HomeHouse.prototype.load = function(){
  this.controller.registerImage('back','assets/renders/home/House_a_v031_HouseBack.png');
  this.controller.registerImage('front','assets/renders/home/House_a_v031_HouseFront.png');
  this.controller.registerImage('lamppost','assets/renders/home/House_a_v031_LightProp.png');
  this.controller.registerImage('zebra','assets/renders/home/House_a_v031_LightZebra.png');
};

HomeHouse.prototype.logic = function(){

};

HomeHouse.prototype.render = function(){

  var w = APP_WIDTH*this.width;
  var h = APP_HEIGHT*this.height;
  var _x = APP_WIDTH*this.x;
  var _y = APP_HEIGHT*this.y;
  var _fx = APP_WIDTH*this.front.x;
  this.controller.graphics.drawImage( this.controller.images.back, _x, _y, w, h);
  this.controller.graphics.drawImage( this.controller.images.front, _x+_fx, _y, w, h);
  this.controller.graphics.drawImage( this.controller.images.lamppost, _x, _y, w, h);
  this.controller.graphics.drawImage( this.controller.images.zebra, _x, _y, w, h);
};
