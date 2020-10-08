var APPController;

function GoogleDemoApp(config){
  this.config = config;
  this.currentSlug='';
  this.callbacks = config.callbacks||{};
  this.inited = false;
  this.enableScrolling = false;
  GoogleDemoApp.instance = this;
  this.partialPrefix = 'sub';
  this.wordAnimationClasses = 'headline-animation';
  this.debug = true;
  this.sectionIndex = 0;
  this.chairIndex = 0;
  this.path = [];
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
      'stages.recommendations.0',
      'stages.recommendations.1',
      'stages.recommendations.2',
      'stages.recommendations.3',
      'stages.recap.0',
      'stages.recap.1'
  ];

  this.init();
};

GoogleDemoApp.prototype.report = function(data){
  this.log(data,'error');
  return false;
};
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
  this.addWordAnimation();
  this.log('App init')
  this.resize();
}

GoogleDemoApp.prototype.nextSection = function(){
  if(!this.enableScrolling) return;
  if(this.changingSection) return;
  this.changingSection = true;
  this.open(this.navigationSequence[this.sectionIndex+1])
}
GoogleDemoApp.prototype.prevSection = function(){
  if(!this.enableScrolling) return;
  if(this.changingSection) return;
  if(this.sectionIndex==0) return;
  this.changingSection = true;
  this.open(this.navigationSequence[this.sectionIndex-1])
}
GoogleDemoApp.prototype.addWordAnimation = function(){
  var wordAnimations = document.getElementsByClassName(this.wordAnimationClasses);
  for(var anim=0;anim<wordAnimations.length;anim++){
    var wordContent = wordAnimations[anim].innerHTML.trim();
    var findTags = RegExp('\<.*?\>','g');
    var htmlTags = wordContent.matchAll(findTags);
    var tid = 0;
    var foundTags = [];
    for (var tag of htmlTags) {
      foundTags.push(tag[0]);
      wordContent = wordContent.replace(tag[0],'***')
      tid++;
    }
    var lines = wordContent.split('***');
    var linesResult=[];
    for(var l=0;l<lines.length;l++){
      var line = lines[l].trim();
      var words = line.split(" ");
      var result = "";
      for(var w=0;w<words.length;w++){
        var word = words[w].trim();
        if(word.length==0){
          continue;
        }
        result+='<span class="word-mask"><span>'+word+'</span></span> ';
      }
      linesResult.push(result);
    }
    var finalResult = "";
    for(var f=0;f<foundTags.length;f++){
      finalResult+=linesResult[f];
      finalResult+=foundTags[f];
    }

    finalResult+=linesResult[foundTags.length];
    wordAnimations[anim].innerHTML = finalResult;
  }
}
GoogleDemoApp.prototype.attachActions = function(buttons){
  for( var b=0; b<buttons.length; b++ ){
    if(buttons[b].dataset.slug!=undefined){
      var target = this;
      buttons[b].addEventListener('click',function(){
        target.open(this.dataset.slug);
      })
    }
  }
}
GoogleDemoApp.prototype.addButtonActions = function(){
  this.attachActions( document.getElementsByTagName('button') );
  this.attachActions( document.getElementsByClassName('slug-deep-dive') );
}
GoogleDemoApp.prototype.getStepTarget = function(p,parent,step){
  return document.getElementById(this.pathElements[p-1]+parent).getElementsByClassName(this.pathElements[p]+'--'+step)[0];
}
GoogleDemoApp.prototype.getSlugClass = function(path){
  if(path.indexOf(':')>=0){
    path = path.substring(path.indexOf(':')+1)
  }
  return path;
}
GoogleDemoApp.prototype.getSlugComponent = function(path){
  if(path.indexOf(':')>=0){
    path = path.substring(0,path.indexOf(':'))
  }
  return path;
}
GoogleDemoApp.prototype.getTarget = function(p,path){
  if(p==2) return this.getStepTarget(p,this.getSlugComponent(path[p-1]),this.getSlugComponent(path[p]));
  return document.getElementById(this.pathElements[p]+this.getSlugComponent(path[p]));
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
  for(var c=0;c<target.classList.length;c++){
    if(target.classList[c].substring(0,this.partialPrefix.length)==this.partialPrefix){
      classesToRemove.push(target.classList[c]);
    }
  }
  target.classList.remove.apply(target.classList,classesToRemove);
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
    target.classList.add(classes[c]);
  }
};
GoogleDemoApp.prototype.switchChairs = function(){
  var chairList = ['dining_option3','dining_option1', 'dining_option2'];
  this.chairIndex = this.chairIndex==2?0:this.chairIndex+1;
  Background.play(chairList[this.chairIndex]);
};
GoogleDemoApp.prototype.open = function(slug){
  if(slug=='NEXT'){
    this.nextSection();
    return;
  }
  this.sectionIndex = this.navigationSequence.indexOf(slug);
  this.currentSlug = slug;
  watchme('slug',this.currentSlug);
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
      var introTime = target.dataset.timeIntro||2000;
      if(!target) return this.report(newPath[p]+'('+slug+') not found');
      if(this.path[p]!=undefined){
        var oldTarget = this.getTarget(p,this.path);
        // this.cleanPartial(p,this.path);
        var outroTime = oldTarget.dataset.timeOutro||1000;
        //oldTarget.classList.remove(this.pathElements[p]+'--in')
        oldTarget.classList.add(this.pathElements[p]+'--out')
        target.classList.add('active');
        setTimeout(function(target,p,path){
          target.cleanPartial(p,path);
        },outroTime,this,p,this.path);
        setTimeout(function(target,cls){
          target.classList.add(cls);
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
        target.classList.add('active');
        setTimeout(function(target,cls){
          target.classList.add(cls);
          GoogleDemoApp.instance.dispatchCallback();
        }, 100, target, this.pathElements[p]+'--in');
        if(finalComponent) setTimeout(function(){ GoogleDemoApp.instance.dispatchCallback('after'); }, introTime);
      };
    };
  };
  for(var p=newPath.length;p<this.path.length;p++){
    var oldTarget = this.getTarget(p,this.path);
    oldTarget.classList.remove(this.pathElements[p]+'--in')
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
    this.changingSection = false;
  }
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
    Background.canvas.style.width = cWidth+'px';
    Background.canvas.style.height = cHeight+'px';
    Background.canvas.style.left = (-(cWidth-width)/2)+'px';;
    Background.canvas.style.top = (-(cHeight-height)/2)+'px';
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
    Background.canvas.style.width = cWidth+'px';
    Background.canvas.style.height = cHeight+'px';
    Background.canvas.style.left = (-(cWidth-width)/2)+'px';;
    Background.canvas.style.top = (-(cHeight-height)/2)+'px';
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

var config = {
  callbacks:SiteCallbacks
};
var GDApp = new GoogleDemoApp(config);

//TEST CODE
GDApp.open('splash');
