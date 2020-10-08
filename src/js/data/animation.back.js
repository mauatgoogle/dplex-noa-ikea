var AnimationData = {

  'initial':{
    background:{alpha:0},
    house:{x:-2,y:0.7,scale:1.5,alpha:0},
    pole:{copy:'house'},
    zebra:{copy:'house'},
    front:{copy:'house'},
      // panorama:{scale:1,x:0.5,y:0.5,alpha:0},
      // line1:{scale:0.2,x:0.1,alpha:0},
      // line2:{scale:0.2,x:0.3,alpha:0},
      // line3:{scale:0.2,x:0.5,alpha:0},
      // line4:{scale:0.2,x:0.7,alpha:0},
      // line5:{scale:0.2,x:0.9,alpha:0},
      // seam:{scale:1,x:0.5,y:0.5,alpha:0},
      // semantic:{scale:1,x:0.5,y:0.5,alpha:0},
  },
  'start':{
    background:{alpha:1},//scale:1},
    house:{x:0,y:0.7,scale:1.5,alpha:1},
    pole:{copy:'house'},
    zebra:{copy:'house'},
    front:{copy:'house'},
  },
  'zoomout':{
    background:{},
    house:{x:0.25,y:0.5,scale:0.7},
    pole:{copy:'house'},
    zebra:{copy:'house'},
    front:{copy:'house'},
  },
  'interactive':{
      background:{},
      house:{},
      front:{finalx:-0.2,startx:0.25},
      zebra:{copy:'front'},
      pole:{copy:'front'},
  },
  'open':{
    background:{},
    house:{},
    pole:{x:-0.5},
    zebra:{x:-0.5},
    front:{x:-0.5},
  },
  'center':{
    background:{},
    house:{x:0.5,y:0.5,scale:0.9},
  },
  'zoomin':{
    background:{},
    house:{x:0,y:0,scale:4},
  },
  //:subheadline--2
  'geostart':{
    panorama:{scale:1,x:0.5,y:0.5,alpha:0},
    line1:{scale:0.2,x:0.1,alpha:0},
    line2:{scale:0.2,x:0.3,alpha:0},
    line3:{scale:0.2,x:0.5,alpha:0},
    line4:{scale:0.2,x:0.7,alpha:0},
    line5:{scale:0.2,x:0.9,alpha:0},
    seam:{scale:1,x:0.5,y:0.5,alpha:0},
    semantic:{scale:1,x:0.5,y:0.5,alpha:0},
  },
  'geopano':{
    line1:{alpha:0},
    line2:{alpha:0},
    line3:{alpha:0},
    line4:{alpha:0},
    line5:{alpha:0},
    panorama:{scale:1,x:0.5,y:0.5,alpha:1},
  },
  'geoparts':{
    line1:{scale:0.2,x:0.1,alpha:1},
    line2:{scale:0.2,x:0.3,alpha:1},
    line3:{scale:0.2,x:0.5,alpha:1},
    line4:{scale:0.2,x:0.7,alpha:1},
    line5:{scale:0.2,x:0.9,alpha:1},
    panorama:{alpha:0},
    seam:{alpha:0},
  },
  'geoseam':{
    line1:{alpha:0},
    line2:{alpha:0},
    line3:{alpha:0},
    line4:{alpha:0},
    line5:{alpha:0},
    seam:{scale:1,x:0.5,y:0.5,alpha:1},
  },
  'geosemantic':{
    semantic:{scale:1,x:0.5,y:0.5,alpha:1},
    seam:{alpha:0},

  },
};


/*
{
  images:{
    background:'assets/renders/home/House_a_v031_Background.png',
    house:'assets/renders/home/House_a_v031_HouseBack.png',
    housefront:'assets/renders/home/House_a_v031_HouseFront.png',
  },
  sections:{
    home:{
      intro:{
        house:{x:0,y:0.75,scale:2},
        housefront:{x:0,y:0.75,scale:2},
        housepole:{x:0,y:0.75,scale:2},
        housezebra:{x:0,y:0.75,scale:2},
        background:{scale:1.5}
      },
      fullhouse:{
        house:{x:0.25,y:0.6,scale:0.6},
        housefront:{x:0.25,y:0.6,scale:0.6},
        housezebra:{x:0.25,y:0.6,scale:0.6},
        housepole:{x:0.25,y:0.6,scale:0.6},
        background:{scale:1}
      },
      fullhouseopenpre:{
        house:{x:0.25,y:0.6,scale:0.6},
        housefront:{x:0.25,y:0.6,scale:0.65},
        housezebra:{x:0.25,y:0.6,scale:0.7},
        housepole:{x:0.25,y:0.6,scale:0.75},
      },
      fullhouseopen:{
        house:{x:0.25,y:0.6,scale:0.6},
        housefront:{x:-0.25,y:0.6,scale:0.6},
        housezebra:{x:-0.35,y:0.6,scale:0.8},
        housepole:{x:-0.45,y:0.6,scale:1},
      },
      centerhouse:{
        house:{x:0.3,y:0.5,scale:0.9},
        housefront:false,
        housezebra:false,
        housepole:false,
      },
      diningroom:{
        house:{x:-0.05,y:-0.04,scale:4.5},
        housefront:false,
        housezebra:false,
        housepole:false,
      },
      toproom:{
        house:{x:0,y:1,scale:4.5},
      },
      leftroom:{
        house:{x:0.8,y:1,scale:3},
      },
    }
  }
}*/
