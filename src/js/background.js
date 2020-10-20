var Background = new CanvasEngine('backgroundCanvas',{folder:'renders/'});
Background.queuePlays = [];

Background.animationList = [
  'initial',
  'start',
  'zoomout',
  // 'interactive',
  'open',
  'center',
  'zoomin',
  'zoomfade',
  'geostart',
  'geophoto',
  'geoseam',
  'geosemantic',
  'geostart',
  'geodepth',
  'geofurniture',
  'phonein',
  'phoneout',
  'georesult',
  'geoend',
  'geotransition',
  'geofade',
  'dining',
  // 'dining_option1',
  // 'dining_option2',
  // 'dining_option3',
  // 'dining_option1_glow',
  // 'dining_option2_glow',
  // 'dining_option3_glow',
  // 'dining_option1_unglow',
  // 'dining_option2_unglow',
  // 'dining_option3_unglow',
  // 'diningcolor',
  'office',
  // 'officecolor',
  'diagonalstart',
  'diagonalplay',
  'diagonalfade',
  'lastscreen',
];
Background.addSprite('background.png',{size:'fill'});
Background.setGroup('diningfurniture');

Background.addSprite('dining/background.jpg',{key:'diningback',pivot:'center',position:'center'})
Background.addSpriteSheet('dining/elements.png',[
  {key:'bpaint1',crop:[6,0,1,1],pivot:{x:0.5,y:0.5},x:0.565,y:0.41},
  {key:'bpaint2',crop:[6,1,1,1],pivot:{x:0.5,y:0.5},x:0.588,y:0.455},
  {key:'bpaint3',crop:[0,7,4,2],pivot:{x:0.5,y:0.5},x:0.49,y:0.432},
  {key:'rack',crop:[10,0,6,8],pivot:{x:0.95,y:0.98},x:0.731,y:0.797},
  {key:'lamp1',crop:[7,3,2,6],pivot:{x:0.51,y:0.17},x:0.455,y:0.135},
  {key:'lamp2',crop:[7,3,2,6],pivot:{x:0.51,y:0.17},x:0.56,y:0.135},
  {key:'plant',crop:[0,1,3,6],pivot:{x:0.5,y:0.9},x:0.203,y:0.878},
  {key:'carpet',crop:[0,14,13,2],pivot:{x:0.5,y:0.5},x:0.504,y:0.845},
  // {key:'chair1',crop:[8,9,3,5],pivot:{x:0.4,y:0.95},x:0.4025,y:0.830},
  // {key:'chair2',crop:[8+3,9,3,5],pivot:{x:0.62,y:0.95},x:0.586,y:0.8365},
  {key:'chair3',crop:[7,0,3,3],pivot:{x:0.34,y:0.93},x:0.323,y:0.863},
  {key:'chair4',crop:[4,5,3,4],pivot:{x:0.5,y:0.93},x:0.681,y:0.863},
  {key:'lpaint1',crop:[4,0,2,2],pivot:{x:0.5,y:0.5},x:0.18,y:0.4},
  {key:'lpaint2',crop:[4,2,1,2],pivot:{x:0.5,y:0.5},x:0.145,y:0.458},
]);
Background.addSpriteSheet('dining/chairs.png',[
  {key:'chair1',crop:[0,11,4,5],pivot:{x:0.45,y:0.93},x:0.44,y:0.830},
  {key:'chair2',crop:[0,6,4,5],pivot:{x:0.59,y:0.95},x:0.57,y:0.8365},
  {key:'chair1_option1' ,crop:[0,0,5,6],pivot:{x:0.51,y:0.88},x:0.4525,y:0.830},
  {key:'chair2_option1' ,crop:[5,0,5,6],pivot:{x:0.63,y:0.88},x:0.586,y:0.8365},
  {key:'chair1_option2' ,crop:[4,11,5,5],pivot:{x:0.32,y:0.94},x:0.4225,y:0.830},
  {key:'chair2_option2' ,crop:[4,6,5,5],pivot:{x:0.61,y:0.93},x:0.586,y:0.84},
]);
Background.addSpriteSheet('dining/chairsglow.png',[
  {key:'chair1_glow',crop:[0,11,4,5],pivot:{x:0.45,y:0.93},x:0.44,y:0.830},
  {key:'chair2_glow',crop:[0,6,4,5],pivot:{x:0.59,y:0.95},x:0.57,y:0.8365},
  {key:'chair1_option1_glow' ,crop:[0,0,5,6],pivot:{x:0.51,y:0.88},x:0.4525,y:0.830},
  {key:'chair2_option1_glow' ,crop:[5,0,5,6],pivot:{x:0.63,y:0.88},x:0.586,y:0.8365},
  {key:'chair1_option2_glow' ,crop:[4,11,5,5],pivot:{x:0.32,y:0.94},x:0.4225,y:0.830},
  {key:'chair2_option2_glow' ,crop:[4,6,5,5],pivot:{x:0.61,y:0.93},x:0.586,y:0.84},
]);
Background.addSpriteSheet('dining/elements.colors.png',[
  {key:'rack_color',crop:[10,0,6,8],pivot:{x:0.95,y:0.98},x:0.731,y:0.797},
  {key:'lamp1_color',crop:[7,3,2,6],pivot:{x:0.51,y:0.17},x:0.455,y:0.135},
  {key:'lamp2_color',crop:[7,3,2,6],pivot:{x:0.51,y:0.17},x:0.56,y:0.135},
  {key:'plant_color',crop:[0,1,3,6],pivot:{x:0.5,y:0.9},x:0.203,y:0.878},

  // {key:'chair1_option1',crop:[8,9,4,5],pivot:{x:0.37,y:1},x:0.4025,y:0.830},
  // {key:'chair2_option1',crop:[12,9,4,5],pivot:{x:0.66,y:1},x:0.586,y:0.8365},
  // {key:'chair1_option2',crop:[0,11,4,5],pivot:{x:0.43,y:1},x:0.4025,y:0.830},
  // {key:'chair2_option2',crop:[4,11,4,5],pivot:{x:0.57,y:1},x:0.586,y:0.8365},
  {key:'chair3_color',crop:[7,0,3,3],pivot:{x:0.34,y:0.93},x:0.323,y:0.863},
  {key:'chair4_color',crop:[4,5,3,4],pivot:{x:0.5,y:0.93},x:0.681,y:0.863},
]);
Background.addSpriteSheet('dining/elements.png',[
  // {key:'spieces2',crop:[4,4,2,1],pivot:{x:0.5,y:1},x:0.701,y:0.361},
  {key:'table',crop:[0,9,8,5],pivot:{x:0.035,y:0.9},x:0.3913,y:0.8652},
  // {key:'fruit',crop:[0,0,2,1],pivot:{x:0.5,y:1},x:0.485,y:0.629},
  // {key:'spieces',crop:[2,0,2,1],pivot:{x:0.5,y:1},x:0.573,y:0.624},
]);
Background.addSpriteSheet('dining/elements.colors.png',[
  {key:'fruit_color',crop:[0,0,2,1],pivot:{x:0.5,y:1},x:0.485,y:0.629},
  {key:'spieces_color',crop:[2,0,2,1],pivot:{x:0.5,y:1},x:0.573,y:0.624},
]);

Background.closeGroup();

Background.addSprite('office/background.png',{key:'officeback',pivot:'center',position:'center'});

// Background.addSprite('office/reference.png',{key:'officeref',pivot:'center',position:'center',alpha:0.5});
Background.addSpriteSheet('office/elements.png',[
{key:'oframe1',crop:[12,4,4,3],pivot:{x:0.5,y:0.5},x:0.39,y:0.5},
{key:'ochair',crop:[0,2,3,5],pivot:{x:0.48,y:0.95},x:0.402,y:0.815},
{key:'oshelves2',crop:[12,0,4,4],pivot:{x:0.5,y:0.95},x:0.632,y:0.799},
{key:'ocarpet',crop:[0,14,12,2],pivot:{x:0.5,y:0.5},x:0.45,y:0.843},
{key:'odesk',crop:[0,9,9,5],pivot:{x:0.2,y:0.88},x:0.36,y:0.858},
{key:'otable',crop:[9,8,7,4],pivot:{x:0.93,y:0.82},x:0.611,y:0.872},
{key:'oplant',crop:[3,4,2,5],pivot:{x:0.5,y:0.95},x:0.207,y:0.885},
{key:'olamp',crop:[5,2,4,4],pivot:{x:0.735,y:0.73},x:0.566,y:0.625},
{key:'oshelves1',crop:[9,0,3,5],pivot:{x:0.87,y:0.97},x:0.793,y:0.87},
{key:'oframe2',crop:[0,0,2,2],pivot:{x:0.48,y:0.88},x:0.47,y:0.307},
{key:'oframe3',crop:[7,6,1,2],pivot:{x:0.5,y:0.5},x:0.801,y:0.35},
{key:'osmallplant',crop:[3,2,1,2],pivot:{x:0.5,y:1},x:0.61,y:0.584},
{key:'obox2',crop:[6,1,3,1],pivot:{x:0.5,y:0.88},x:0.543,y:0.27},
{key:'obox1',crop:[2,0,2,1],pivot:{x:0.5,y:0.88},x:0.542,y:0.309},
{key:'obox3',crop:[4,0,3,1],pivot:{x:0.5,y:0.98},x:0.625,y:0.307},
{key:'opapers1',crop:[0,7,3,1],pivot:{x:0.5,y:0.81},x:0.573,y:0.367},
{key:'opapers2',crop:[4,1,2,1],pivot:{x:0.5,y:1},x:0.348,y:0.367},
{key:'opapers3',crop:[5,7,2,1],pivot:{x:0.5,y:0.65},x:0.43,y:0.63},
{key:'obird',crop:[2,1,1,1],pivot:{x:0.47,y:0.95},x:0.357,y:0.309},
{key:'obook1',crop:[7,0,1,1],pivot:{x:0.47,y:1},x:0.395,y:0.309},
{key:'obook2',crop:[4,3,1,1],pivot:{x:0.9,y:1},x:0.43,y:0.309},
{key:'obook3',crop:[5,6,1,1],pivot:{x:0.5,y:1},x:0.422,y:0.369},
{key:'obook4',crop:[6,6,1,1],pivot:{x:0.85,y:1},x:0.44,y:0.369},
{key:'ocup',crop:[3,1,1,1],pivot:{x:0.5,y:1},x:0.47,y:0.368},
]);


Background.addSpriteSheet('office/elements.colors.png',[
{key:'ochair_color',crop:[0,2,3,5],pivot:{x:0.48,y:0.95},x:0.402,y:0.815},
{key:'odesk_color',crop:[0,9,9,5],pivot:{x:0.2,y:0.88},x:0.36,y:0.858},
{key:'otable_color',crop:[9,8,7,4],pivot:{x:0.93,y:0.82},x:0.611,y:0.872},
{key:'oplant_color',crop:[3,4,2,5],pivot:{x:0.5,y:0.95},x:0.207,y:0.885},
{key:'olamp_color',crop:[5,2,4,4],pivot:{x:0.735,y:0.73},x:0.566,y:0.625},
{key:'osmallplant_color',crop:[3,2,1,2],pivot:{x:0.5,y:1},x:0.61,y:0.584},
{key:'obox2_color',crop:[6,1,3,1],pivot:{x:0.5,y:0.88},x:0.543,y:0.27},
{key:'obox1_color',crop:[2,0,2,1],pivot:{x:0.5,y:0.88},x:0.542,y:0.309},
{key:'obox3_color',crop:[4,0,3,1],pivot:{x:0.5,y:0.98},x:0.625,y:0.307},
]);
// Background.addSpriteSheet('dining/chairs.png',[
//   {key:'googlehome' ,crop:[9,6,1,1],pivot:{x:0.5,y:0.5},x:0.76,y:0.578},
// ]);
Background.addSpriteSheet('dining/chairsglow.png',[
  {key:'googlehome_glow' ,crop:[9,6,1,1],pivot:{x:0.5,y:0.5},x:0.76,y:0.578},
]);
Background.addSprite('office/lightsoff.png',{key:'lightsoff',pivot:'center',position:'center',width:0.72});

Background.addMask({key:'phonemask',pivot:'center',position:'center',width:0.8,height:0.38,aspect:0.38/0.8});
// Background.addMask({key:'housemask',pivot:'center',position:'center',width:0.8,height:0.38,aspect:0.38/0.8});
Background.addSprite('geomagical/background.png',{key:'geoback',pivot:'center',//scale: 0.17,x: 0.16,y: 0.56,
scale: 0.5*0.34/*0.17*/,x: 0.15,y: 0.57
});//,pivot:{x: 0.74, y: 0.1}});//{x:0.76,y:0.2}
// Background.addMask({key:'housemaskend',maskReset:true});
Background.addSprite('house/backhole.png',{key:'house',pivot:'center',x:-2,y:0.7,scale:1.5});
Background.addSprite('house/front.png',{key:'front',pivot:'center',x:-2,y:0.7,scale:1.5});
// Background.addSprite('house/pole.png',{key:'pole',pivot:'center'});
// Background.addSprite('house/walkpath.png',{key:'zebra',pivot:'center'});
Background.setGroup('furniture');
Background.addSprite('geomagical/panorama.jpg',{key:'panorama',pivot:'center',position:'center'});

var shotSize = 0.18;
var shotPos = 0.2;
Background.addSprite('geomagical/shot1.png',{key:'shot1',pivot:'center',width:shotSize,x:shotPos*0+0.1,y:0.5});

Background.addSprite('geomagical/shot2.png',{key:'shot2',pivot:'center',width:shotSize,x:shotPos*1+0.1,y:0.5});
Background.addSprite('geomagical/shot3.png',{key:'shot3',pivot:'center',width:shotSize,x:shotPos*2+0.1,y:0.5});
Background.addSprite('geomagical/shot4.png',{key:'shot4',pivot:'center',width:shotSize,x:shotPos*3+0.1,y:0.5});
Background.addSprite('geomagical/shot5.png',{key:'shot5',pivot:'center',width:shotSize,x:shotPos*4+0.1,y:0.5});
Background.addSprite('geomagical/seam.jpg',{key:'seam',pivot:'center',position:'center'});
Background.addSprite('geomagical/semantic.png',{key:'semantic',pivot:'center',position:'center'});
Background.addSprite('geomagical/depth.png',{key:'depth',pivot:'center',position:'center'});
Background.addSprite('geomagical/background.furniture.png',{key:'geocomplete',pivot:'center',position:'center',skipGroup:true});
// Background.addSequence('geomagical/furniture',13,'jpg',10,{key:'furniture',pivot:'center',position:'center'});
// Background.addSprite('geomagical/furniture/frame13.jpg',{key:'furniture',pivot:'center',position:'center'});
Background.addSprite('geomagical/furniture.jpg',{key:'furniturecomplete',pivot:'center',position:'center'});

  // Background.addSpriteSheet('geomagical/furniture.png',[
  //   {key:'gcarpet',pivot:'center', crop:[0,16,12,3],x:0.49,y:0.79},
  //   {key:'gpuff',pivot:'center', crop:[0,6,4,3],x:0.604,y:0.902},
  //   {key:'glamp',pivot:'center', crop:[17,16,3,4],x:0.651,y:0.502},
  //   {key:'gbasket',pivot:'center', crop:[6,4,2,2],x:0.326,y:0.675},
  //   {key:'grack',pivot:'center', crop:[0,3,6,3],x:0.485,y:0.642},
  //   {key:'gsidetable',pivot:'center', crop:[8,9,3,4],x:0.222,y:0.824},
  //   {key:'gsofa',pivot:'center', crop:[11,10.1,9,6],x:0.751,y:0.775},
  //   {key:'gsofa2',pivot:'center', crop:[15,0,9,6],x:0.7,y:0.75},
  //   {key:'gsillon',pivot:'center', crop:[0,9,8,7],x:0.25,y:0.79},
  //   {key:'glibrary',pivot:'center', crop:[20,6,6,14],x:0.97,y:0.59},
  //   {key:'gtable',pivot:'center', crop:[4,6,5,3],x:0.483,y:0.772},
  //   {key:'gpic1',pivot:'center', crop:[0,0,2,3],x:0.38,y:0.348},
  //   {key:'gpic2',pivot:'center', crop:[2,0,2,3],x:0.445,y:0.346},
  //   {key:'gpic3',pivot:'center', crop:[4,0,2,3],x:0.515,y:0.44},
  //   {key:'gpic4',pivot:'center', crop:[6,0,1,2],x:0.495,y:0.316},
  //   {key:'gpic5',pivot:'center', crop:[7,0,1,2],x:0.531,y:0.317},
  //   {key:'gpic6',pivot:'center', crop:[8,0,3,2],x:0.442,y:0.464},
  //   {key:'gpic7',pivot:'center', crop:[6,2,2,2],x:0.363,y:0.457},
  //   {key:'gpic8',pivot:'center', crop:[8,2,1,2],x:0.373,y:0.543},
  //   {key:'gpic9',pivot:'center', crop:[11,0,2,3],x:0.583,y:0.472},
  //   {key:'gpic10',pivot:'center', crop:[13,0,2,2],x:0.584,y:0.341},
  //   {key:'gbigpic',pivot:'center', crop:[12,16,5,4],x:0.782,y:0.497},
  // ]);
Background.closeGroup();
Background.addMask({key:'phonemaskend',maskReset:true});
Background.addSprite('geomagical/googlepixel.png',{key:'phone',pivot:'center',position:'center'});
Background.addSprite('house/backholetransition.png',{key:'transition',pivot:'center',/*position:'center'*/ x: 0.07, scale: 4, y: 0});
Background.addSprite('house/color.png',{key:'color',pivot:'center',position:'center',alpha:0});


Background.currentSlug = 'none';
Background.lastSlug = 'none';
setTimeout(function(){
  Background.init();
}, 500);

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
    };
    if(data.copy!=undefined){
      data = AnimationData.initial[data.copy];
    };
    for(var key in data) object[key] = object.final[key] = data[key];
  };
  GoogleDemoApp.instance.open('start');
  this.resize();
};
Background.set = function(slug){
  for(var b=0;b<Background.animationList.length;b++){
    Background.setPartial(Background.animationList[b]);
    if(slug==Background.animationList[b+1]){
      Background.play(Background.animationList[b+1]);
      break;
    };
  };
};
Background.setPartial = function(slug){
  this.currentSlug = slug;
  this.currentAnimation = {};
  for(var data in AnimationData[this.currentSlug]){
    var animObject = AnimationData[this.currentSlug][data];
    this.currentAnimation[data] = {};
    for(var k in animObject){
      this.currentAnimation[data][k] = animObject[k];
    };
  };
  for(var component in this.currentAnimation){
    var object = this.sprites[component];
    if(!object) continue;
    object.needsUpdate = true;
    var data = this.currentAnimation[component];
    if(!data){
      object.visible = false;
      continue;
    }else{
      if(data.visible!=undefined){
        object.visible = data.visible;
      }else{
        object.visible = true;
      };
    };
    var distance = 0.001;
    for(var key in data){
      if(key=='copy'|| key=='visible') continue;
      if(key=='pivot'){
        if(object.final.pivot==undefined) object.final.pivot = {};
        object.pivot.x = object.final.pivot.x = data.pivot.x;
        object.pivot.y = object.final.pivot.y = data.pivot.y;
      }else{
        if(key[0]=='_'){
          var okey = key;
          key = key.substring(1);
          object.initial[key] = data[okey];
          delete data[okey];
          object[key] = object.final[key] = data[key];
        }else{
          object[key] = object.final[key] = data[key];
        };
      };
    };
    if(data.copy!=undefined){
      data = this.currentAnimation[data.copy];
      for(var key in data){
        if(key=='visible') continue;
        if(key=='pivot') continue;
        object[key] = data[key];
        object.final[key] = data[key];
      };
    };
  };
};
Background.clearQueue = function(){
  for(var a in this.queuePlays){
    if(this.queuePlays[a]){
      clearTimeout(this.queuePlays[a]);
      delete this.queuePlays[a];
      Background.set(a);
    }
  }
  // if(this.queuePlays[slug]){
  //   clearTimeout(this.queuePlays[slug]);
  //   delete this.queuePlays[slug];
  // }
}
Background.playDelay = function(slug,timeout){
  if(timeout>0){
    this.queuePlays[slug] = setTimeout(function(animation){
      Background.play(animation);
    },timeout*1000,slug);
  };
};
Background.play = function(slug,timeset){
  if(timeset!=undefined) alert('SETEASTE UNA ANIMACION CON DELAY');
  if(this.queuePlays[slug]){
    clearTimeout(this.queuePlays[slug]);
    delete this.queuePlays[slug];
  }
  this.currentSlug = slug;
  this.currentAnimation = {};
  for(var data in AnimationData[this.currentSlug]){
    var animObject = AnimationData[this.currentSlug][data];
    this.currentAnimation[data] = {};
    for(var k in animObject){
      this.currentAnimation[data][k] = animObject[k];
      if(k=='delay') this.currentAnimation[data].hasDelay = true;
    };
  };
};
Background.logic = function(){
  for(var component in this.currentAnimation){
    var object = this.sprites[component];
    if(!object) continue;
    object.needsUpdate = true;
    var data = this.currentAnimation[component];
    if(!data){
      object.visible = false;
      continue;
    }else{
      if(data.visible!=undefined){
        object.visible = data.visible;
      }else{
        object.visible = true;
      };
    };
    var distance = 0.001;
    for(var key in data){
      if(key=='copy'||key=='visible') continue;
      if(key=='pivot'){
        if(object.final.pivot==undefined) object.final.pivot = {};
        object.final.pivot.x = data.pivot.x;
        object.final.pivot.y = data.pivot.y;
      }else{
        if(key[0]=='_'){
          var okey = key;
          key = key.substring(1);
          object.initial[key] = data[okey];
          delete data[okey]
        }else if(key=='delay'){
          if(data.hasDelay){
            object.resetDelay();
            data.hasDelay = false;
          };
          object.final[key] = data[key];
        }else{
          object.final[key] = data[key];
        };
      };
    };
    if(data.copy!=undefined){
      data = this.currentAnimation[data.copy];
      for(var key in data){
        if(key=='visible') continue;
        if(key=='pivot') continue;
        object.final[key] = data[key];
      };
    };
  };
};
