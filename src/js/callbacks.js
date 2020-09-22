var SiteCallbacks = {}

SiteCallbacks["splash"] = function(){
  setTimeout(function(){
    GDApp.open('start');
  },2500);
  // console.log('intro 1 BEFORE');
};
SiteCallbacks["start"] = function(){
  Background.play('start')

      document.getElementById('backgroundCanvas').style.display = "block";
};
SiteCallbacks["start:subheadline--2"] = function(){
    Background.play('zoomout')
};
//
// SiteCallbacks["before::stages.intro.0"] = function(){
//
// };
SiteCallbacks["after::stages.intro.0"] = function(){
  Background.play('center');
};

SiteCallbacks["before::stages.intro.0"] = function(){

    document.getElementById('backgroundCanvas').style.display = "block";
  updateStageBtn(0,0);}
SiteCallbacks["before::stages.intro.1"] = function(){ updateStageBtn(0,1);

    document.getElementById('backgroundCanvas').style.display = "block"; }
SiteCallbacks["before::stages.intro.2"] = function(){ updateStageBtn(0,2);

    document.getElementById('backgroundCanvas').style.display = "block";
}

SiteCallbacks["before::stages.geomagical.0"] = function(){
  document.getElementById('backgroundCanvas').style.display = "none";
  updateStageBtn(1,0);
}
SiteCallbacks["before::stages.geomagical.1"] = function(){
  document.getElementById('backgroundCanvas').style.display = "none";
  updateStageBtn(1,1);
}
SiteCallbacks["before::stages.geomagical.2"] = function(){ updateStageBtn(1,2); }
SiteCallbacks["before::stages.geomagical.3"] = function(){ updateStageBtn(1,3); }

SiteCallbacks["before::stages.recommendations.0"] = function(){
  updateStageBtn(2,0);
  document.getElementById('backgroundCanvas').style.display = "none";
}
SiteCallbacks["before::stages.recommendations.1"] = function(){ updateStageBtn(2,1); }
SiteCallbacks["before::stages.recommendations.2"] = function(){ updateStageBtn(2,2); }
SiteCallbacks["before::stages.recommendations.3"] = function(){ updateStageBtn(2,3); }

SiteCallbacks["before::stages.recap.0"] = function(){
  updateStageBtn(3,0);
  document.getElementById('backgroundCanvas').style.display = "none";
}

// SiteCallbacks["before::stages.intro.1"] = function(){
//
//     console.log('intro 1 BEFORE');
// };
// SiteCallbacks["stages.intro.1"] = function(){
//   console.log('intro 1 MID');
// };
// SiteCallbacks["after::stages.intro.1"] = function(){
//   console.log('intro 1 AFTER');
// };
//
// SiteCallbacks["before::start"] = function(){
//   console.log('start BEFORE');
// };
// // SiteCallbacks["start"] = function(){
// //   console.log('start MID');
// // };
// SiteCallbacks["after::start"] = function(){
//   console.log('start AFTER');
// };
// SiteCallbacks["stages.geomagical.0"] = function(){
//   Background.play('zoomin')
// };
