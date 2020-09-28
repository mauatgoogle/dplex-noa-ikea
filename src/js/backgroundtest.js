APPW = 800;
APPH = 500;
var backconfig = {
  folder:'assets/tests/',//'public/renders/'
  margin:50,
}
var Background = new CanvasEngine('backgroundCanvas',backconfig);
// Background.addSprite('checkers.webp',{key:'background'});//,pivot:{x:0,y:0}});
Background.addSprite('nosquarechecker.jpeg',{key:'background'});//,pivot:{x:0,y:0}});
// Background.addSprite('House_a_v031_HouseBack.png',{key:'house'});

Background.init();

Background.start = function(){
  this.sprites.background.scale=0.5;
};
Background.play = function(slug){
};
Background.logic = function(){
  // this.sprites.background.x = 0.25+0.25;
  // this.sprites.background.y = 0.5;
  this.sprites.background.x = 0.5+Math.sin(getTimer()/1000)*0.5
      // // this.sprites.background.x = -0.1;
      // this.sprites.background.width = 0.4

        // this.sprites.background.x = Math.sin(getTimer()/1000)*0.2;//0;
        // this.sprites.background.y = -0.1;
        //-1/8;//
    this.sprites.background.y = 0.5+Math.cos(getTimer()/1000)*0.35;
          // this.sprites.background.scale = 1+Math.cos(getTimer()/1000)*0.2;
          // this.sprites.background.height = 1;
};
