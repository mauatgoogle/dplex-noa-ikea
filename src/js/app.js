var APPController;

function GoogleDemoApp(config){
  this.config = config;
  this._blockKeysAndScroll = false;
  this.currentSlug='';
  this.callbacks = config.callbacks||{};
  this.inited = false;
  this.enableScrolling = false;
  GoogleDemoApp.instance = this;
  this.partialPrefix = 'sub';
  this.wordAnimationClasses = 'headline-animation';
  this.debug = false;
  this.sectionIndex = 0;
  this.sectionBackIndex = 0;
  this.backIndex = 0;
  this.switchedChairs = false;
  this.chairIndex = 0;
  this.path = [];
  this.showingEasterEgg = false;
  this.pathElements = ['section','stage','step'];
  this.sections = ['start','stages','outro']; //'explore'
  // section - section--in section--out 1s
  //patrial
  // stage - stage--in stage--out 1s
  // steps - step--in step--out 1s

  this.navigationSequence = [
      'start',
      'start:subheadline--2',
      'start:subheadline--2 subopenmode',
      'stages.intro.0',
      'stages.intro.1',
      'stages.intro.2',
      'stages.geomagical.0',
      'stages.geomagical.1',
      'stages.geomagical.1:sublines',
      'stages.geomagical.1:subparalax',
      'stages.geomagical.1:subclose',
      'stages.geomagical.2',
      'stages.geomagical.2:subdepth',
      'stages.geomagical.2:subsemantic',
      'stages.geomagical.2:subclose',
      'stages.geomagical.3',
      'stages.geomagical.3:subfurniture',
      'stages.geomagical.3:subclose',
      'stages.geomagical.4',
      'stages.geomagical.4:phoneout',
      'stages.geomagical.4:change',
      'stages.recommendations.0',
      'stages.recommendations.1',
      'stages.recommendations.2',
      //'stages.recommendations.3',
      'stages.recap.0',
      'stages.recap.1'
  ];

    this.backNavigationSequence = [
        'start:subheadline--2',
        'stages.intro.0',
        'stages.geomagical.0',
        'stages.geomagical.1',
        'stages.geomagical.2',
        'stages.geomagical.3',
        // 'stages.geomagical.4',
        'stages.recommendations.0',
        'stages.recap.0',
    ];

      this.backBckgrounds = [
          'zoomout',
          'zoomin',
          'zoomfade',
          'geostart',
          'geostart',
          'geostart',
          // 'geofurniture',
          'geofade',
          'office',
      ];

  this.init();
};

GoogleDemoApp.prototype.report = function(data){
  this.log(data,'error');
  return false;
};
GoogleDemoApp.prototype.showEasterEgg = function(){
  if(this.showingEasterEgg)return;
  $('#stagerecap .step--0').addClass('easteregg--in');
  this.showingEasterEgg=true;
  // $('.easteregg').removeClass('active')
  $('.easteregg .bubbles').addClass('active')
  $('.easteregg').addClass('active')
  $('.easteregg .bubble').get(3).addClass('active')
  setTimeout(function(){$('.easteregg .bubble').get(3).addClass('animate');},100);
  setTimeout(function(){$('.easteregg .bubble').get(2).addClass('active');},100+3.5*1000);
  setTimeout(function(){$('.easteregg .bubble').get(2).addClass('animate');},100+3.5*1000+100);
  setTimeout(function(){$('.easteregg .bubble').get(1).addClass('active');},100+7*1000);
  setTimeout(function(){$('.easteregg .bubble').get(1).addClass('animate');},100+7*1000+100);
  setTimeout(function(){$('.easteregg .bubble').get(0).addClass('active');},100+10.5*1000);
  setTimeout(function(){$('.easteregg .bubble').get(0).addClass('animate');},100+10.5*1000+100);
  setTimeout(function(){
    $('.bubbles').removeClass('active');
    // $('.cta-lights').addClass('active');
    Background.play('lightsoff');

  },100+12.5*1000+100);
  setTimeout(function(){
    GoogleDemoApp.instance.hideEasterEgg();
    Background.play('lightson');
  },100+17.5*1000+100)
}
GoogleDemoApp.prototype.hideEasterEgg = function(){
  $('#stagerecap .step--0').removeClass('easteregg--in');
  this.showingEasterEgg=false;
  $('.easteregg .bubbles').removeClass('active')
  $('.easteregg').removeClass('active')
  $('.easteregg .bubble').removeClass('animate active');
}
GoogleDemoApp.prototype.log = function(data,type){
  if(!this.debug) return;
  type = type||'log';
  switch (type) {
    case 'error':
      console.error(data)
      break;
    case 'log':
    default:
      console.log(data)
      break;
  };
};

GoogleDemoApp.prototype.init = function(){
  Utils.detectBrowser();
  this.mode = Utils.detectDevice();
  this.addButtonActions();
  this.log('App init');
  this.resize();
};

GoogleDemoApp.prototype.timeNextSection = function(time){
  this.timedTimeout = setTimeout(function(){
    GoogleDemoApp.instance.nextSection();
  },time*1000);
}
GoogleDemoApp.prototype.timeOpen = function(slug,time){
  this.timedTimeout = setTimeout(function(path){
    GoogleDemoApp.instance.open(path);
  },time*1000,slug);
}
GoogleDemoApp.prototype.nextSection = function(){
  if(this.showingEasterEgg) return;
  if(!this.enableScrolling) return;
  // if(this.changingSection) return;
  if(this.sectionIndex==this.navigationSequence.length-1) return;
  clearTimeout(this.timedTimeout);
  this.changingSection = true;
  this.open(this.navigationSequence[this.sectionIndex+1]);
};
GoogleDemoApp.prototype.prevSection = function(){
  if(this.showingEasterEgg) return;
  if(!this.enableScrolling) return;
  // if(this.changingSection) return;
  if(this.sectionIndex==0) return;
  this.changingSection = true;
  // this.open(this.navigationSequence[this.sectionIndex-1])
  Background.set(this.backBckgrounds[this.sectionBackIndex]);
  this.open(this.backNavigationSequence[this.sectionBackIndex],true);
}
GoogleDemoApp.prototype.attachActions = function(buttons){
  for( var b=0; b<buttons.length; b++ ){
    var button = buttons.get(b);
    if(button.data('slug')!=undefined){
      var target = this;
      button.click(function(){
        target.open($(this).data('slug'));
      });
    };
  };
};
GoogleDemoApp.prototype.addButtonActions = function(){
  this.attachActions( $('button') );
  this.attachActions( $('.slug-deep-dive') );
};
GoogleDemoApp.prototype.getStepTarget = function(p,parent,step){
  return $('#'+this.pathElements[p-1]+parent).find('.'+this.pathElements[p]+'--'+step).first();
};
GoogleDemoApp.prototype.getSlugClass = function(path){
  if(path.indexOf(':')>=0){
    path = path.substring(path.indexOf(':')+1)
  }
  return path;
};
GoogleDemoApp.prototype.getSlugComponent = function(path){
  if(path.indexOf(':')>=0){
    path = path.substring(0,path.indexOf(':'));
  }
  return path;
}
GoogleDemoApp.prototype.getTarget = function(p,path){
  if(p==2) return this.getStepTarget(p,this.getSlugComponent(path[p-1]),this.getSlugComponent(path[p]));
  return $('#'+this.pathElements[p]+this.getSlugComponent(path[p]));
}
GoogleDemoApp.prototype.cleanGroup = function(group){
  var items = document.getElementsByClassName(group+'--out');
  for(var i=0;i<items.length;i++){
    items[i].classList.remove('active',group+'--out',group+'--in');
    // this.log(group+'--in');
    // this.log(group+'--out');
  }
}
GoogleDemoApp.prototype.cleanDom = function(){
  this.cleanGroup('section');
  this.cleanGroup('stage');
  this.cleanGroup('step');
}
GoogleDemoApp.prototype.removePartial = function(target){
  var classesToRemove = [];
  for(var c=0;c<target.classes();c++){
    if(target.classes(c).substring(0,this.partialPrefix.length)==this.partialPrefix){
      classesToRemove.push(target.classes(c));
    }
  }
  // target.element.classList.remove.apply(target.element.classList,classesToRemove);
}
GoogleDemoApp.prototype.cleanPartial = function(p,path){
  var target = this.getTarget(p,path);
  this.removePartial(target);
}
GoogleDemoApp.prototype.addPartial = function(p,path){
  var target = this.getTarget(p,path);
  this.removePartial(target);
  var classes = this.getSlugClass(path[p]).split(' ');
  for(var c=0;c<classes.length;c++){
    target.addClass(classes[c]);
  }
};

GoogleDemoApp.prototype.switchChairs = function(){
  if(!this.switchedChairs){
    resetTooltip('#tooltipVisionSearch',true);
  }
  var chairList = ['dining_option3','dining_option1', 'dining_option2'];
  this.chairIndex = this.chairIndex==2?0:this.chairIndex+1;
  var chairAnimation = chairList[this.chairIndex];
  Background.play(chairAnimation);
  setTimeout(function(anim){
    Background.play(anim)
  },1.8*1000,chairAnimation+'_glow');
};
GoogleDemoApp.prototype.unGlow = function(){
  var chairList = ['dining_option3_unglow','dining_option1_unglow', 'dining_option2_unglow'];
  // this.chairIndex = this.chairIndex==2?0:this.chairIndex+1;
  var chairAnimation = chairList[this.chairIndex];
  Background.play(chairAnimation);
  // setTimeout(function(anim){
  //   Background.play(anim)
  // },1.8*1000,chairAnimation+'_glow');
};
GoogleDemoApp.prototype.blockKeysAndScroll = function(v){
  this._blockKeysAndScroll = v;
}
GoogleDemoApp.prototype.nextSectionProxy = function(){
  if(!this._blockKeysAndScroll && !this.changingSection) this.nextSection();
}
GoogleDemoApp.prototype.prevSectionProxy = function(){
  if(!this._blockKeysAndScroll && !this.changingSection) this.prevSection();
}
GoogleDemoApp.prototype.open = function(slug,force){
  // if(this.blockKeysAndScroll) return;
  if(slug=='NEXT'){
    this.nextSection();
    return;
  }
  this.changingSection = true;
  // if(this.changingSection) return;
  this.sectionIndex = this.navigationSequence.indexOf(slug);
  var backIndex = 0;
  for(var si=0;si<this.sectionIndex;si++){
    if(this.backNavigationSequence.indexOf(this.navigationSequence[si])>0){
        backIndex++;
    }
  }
  this.sectionBackIndex = backIndex;
  this.currentSlug = slug;
  var newPath = slug.split('.');
  var isNewSlug = false;
  for(var p=0;p<newPath.length;p++){
    var pathProps = newPath[p].split(':');
    var newPathPart = pathProps[0];
    var finalComponent = (p==newPath.length-1);
    if(this.path[p]==newPath[p] && !isNewSlug){
      continue;
    }else if(this.path[p]!=undefined && this.getSlugComponent(this.path[p])==this.getSlugComponent(newPath[p]) && !isNewSlug){
      this.addPartial(p,newPath);
      //isNewSlug = true;
      if(finalComponent){
        GoogleDemoApp.instance.dispatchCallback();
        setTimeout(function(){
          GoogleDemoApp.instance.dispatchCallback('after');
        }, 1000);
      };
      continue;
    }else{
      isNewSlug = true;
      var target = this.getTarget(p,newPath);
      // this.cleanPartial(p,newPath);
      var introTime = target.data('timeIntro')||2000;
      if(!target) return this.report(newPath[p]+'('+slug+') not found');
      if(this.path[p]!=undefined){
        var oldTarget = this.getTarget(p,this.path);
        // this.cleanPartial(p,this.path);
        var outroTime = oldTarget.data('timeOutro')||1000;
        //oldTarget.classList.remove(this.pathElements[p]+'--in')
        oldTarget.addClass(this.pathElements[p]+'--out')
        target.addClass('active');
        setTimeout(function(target,p,path){
          target.cleanPartial(p,path);
        },outroTime,this,p,this.path);
        setTimeout(function(target,cls){
          target.addClass(cls);
          GoogleDemoApp.instance.cleanDom();
          // GDApp.dispatchCallback();

        }, outroTime, target, this.pathElements[p]+'--in');
        if(finalComponent){
          setTimeout(function(){
            GoogleDemoApp.instance.dispatchCallback();
            setTimeout(function(){ GoogleDemoApp.instance.dispatchCallback('after'); }, introTime );
          }, outroTime);
        };
      }else{
        target.addClass('active');
        setTimeout(function(target,cls){
          target.addClass(cls);
          GoogleDemoApp.instance.dispatchCallback();
        }, 100, target, this.pathElements[p]+'--in');
        if(finalComponent) setTimeout(function(){ GoogleDemoApp.instance.dispatchCallback('after'); }, introTime);
      };
    };
  };
  for(var p=newPath.length;p<this.path.length;p++){
    var oldTarget = this.getTarget(p,this.path);
    oldTarget.removeClass(this.pathElements[p]+'--in')
    // oldTarget.classList.add(this.pathElements[p]+'--out')
    // setTimeout(function(target,cls){
    //   target.classList.add(cls);
    //   GDApp.cleanDom();
    // }, 1*1000, target, this.pathElements[p]+'--in');
  }
  this.path = newPath;
  this.dispatchCallback('before');
  // var target = document.getElementById(this.pathElements[0]+this.path[0]);
  // target.classList.add(this.pathElements[0]+'--in');
};
GoogleDemoApp.prototype.dispatchCallback = function(prefix){
  if(prefix=='after'){
    setTimeout(function(target){
      target.changingSection = false;
    }, 3000, this);
    // this.changingSection = false;
  };

  prefix = (prefix!=undefined)?'['+prefix.toUpperCase()+'] ':'';
  if(this.callbacks[prefix+this.currentSlug]!=undefined){
    this.callbacks[prefix+this.currentSlug]();
  }

};
GoogleDemoApp.prototype.resize = function(){
  var width = document.body.offsetWidth;
  var height = document.body.offsetHeight;
  var ratio = width/height;
  var canvasRatio = 1920/1080;
  if(ratio>canvasRatio){
    var cWidth = width;
    var cHeight = Math.ceil(width/canvasRatio);
    // Background.canvas.style.width = cWidth+'px';
    // Background.canvas.style.height = cHeight+'px';
    // Background.canvas.style.left = (-(cWidth-width)/2)+'px';;
    // Background.canvas.style.top = (-(cHeight-height)/2)+'px';
     $('.fit-canvas').css({
       position:'absolute',
       width:cWidth+'px',
       height:cHeight+'px',
       left:(-(cWidth-width)/2)+'px',
       top:(-(cHeight-height)/2)+'px'
     });
  }else{
    var cWidth = Math.ceil(height*canvasRatio);
    var cHeight = height;
    // Background.canvas.style.width = cWidth+'px';
    // Background.canvas.style.height = cHeight+'px';
    // Background.canvas.style.left = (-(cWidth-width)/2)+'px';;
    // Background.canvas.style.top = (-(cHeight-height)/2)+'px';
     $('.fit-canvas').css({
       position:'absolute',
       width:cWidth+'px',
       height:cHeight+'px',
       left:(-(cWidth-width)/2)+'px',
       top:(-(cHeight-height)/2)+'px'
     });
  }
  this.mode = Utils.detectDevice();
  Background.disableRender = this.mode=='mobile';
}

var GDApp = new GoogleDemoApp({callbacks:SiteCallbacks});
GDApp.open('splash');
