var slideButton = $('#slideButton');
var slideButtonEnd = $('#slideButtonEnd');
var sliderDots = $('#sliderDots');
var mousePosition = {};
var startDrag = false;
var goBackAnimation = null;
function AnimateDrag(){
  mousePosition.max = slideButtonEnd.element.offsetLeft;
  mousePosition.bVal = new Number(slideButton.css('left').split('px')[0]);;
  goFowardAnimation = setInterval(function(){
    mousePosition.bVal += (mousePosition.max-mousePosition.bVal)/5;
    slideButton.css({left:mousePosition.bVal+'px'});
    sliderDots.css({width:(mousePosition.max-47-mousePosition.bVal)+'px'});
    if(mousePosition.bVal>=mousePosition.max-1) clearInterval(goFowardAnimation);
  },1000/30);
}
function resetButtonPos(){
  mousePosition.max = slideButtonEnd.element.offsetLeft;
  slideButton.css({left:0+'px'});
  sliderDots.css({width:(mousePosition.max-47)+'px'});
}
function fireMouseUp(e){
  startDrag = false;
  if(slideButtonEnd.element.offsetLeft-slideButton.element.offsetLeft<50){
    slideButton.css({left:slideButtonEnd.element.offsetLeft+'px'});
    if(GoogleDemoApp.instance.mode=="mobile"){
      GoogleDemoApp.instance.open('stagesmobile.intromobile');
    }else{
      GoogleDemoApp.instance.open('stages.intro.0');
    };
    Background.play('open');
  }else{
    goBackAnimation = setInterval(function(){
      var val =  new Number(slideButton.css('left').split('px')[0]);
      slideButton.css({left:val/2+'px'});
      sliderDots.css({width:(mousePosition.max-47-val/2)+'px'});
      if(val<1) clearInterval(goBackAnimation);
    },1000/30);
  };
  $(document).off('mouseup',fireMouseUp);
  $(document).off('touchend',fireMouseUp);
};
var mDown = function (e){
    $(document).on('mouseup',fireMouseUp);
    $(document).on('touchend',fireMouseUp);
    startDrag = true;
    mousePosition.startx = e.clientX || event.touches[0].clientX;
    mousePosition.max = slideButtonEnd.element.offsetLeft;//-document.getElementById('slideButton').offsetLeft;
    var newPos = Math.max(Math.min(e.clientX-mousePosition.startx,mousePosition.max),0);
    sliderDots.css({width:(mousePosition.max-47-newPos)+'px'});
    slideButton.css({left:newPos+'px'});
    // Background.play('interactive');

};
slideButton.on('touchstart',mDown);
slideButton.on('mousedown',mDown);
slideButton.on('click',function(){
  GoogleDemoApp.instance.open("start:subheadline--2 subopenmode");
});
var mMove = function(e){
  if(!startDrag) return;

  // var touch = event.touches[0];

  var clientx = e.clientX || event.touches[0].clientX;
  var newPos = Math.max(Math.min(clientx-mousePosition.startx,mousePosition.max),0);
  // var animData = AnimationData.interactive.front;
  var sliderDotsWidth = sliderDots.element.offsetWidth;
  // animData.x = animData.startx+(newPos/mousePosition.max)*(animData.finalx-animData.startx);
  slideButton.css({left:newPos+'px'});
  sliderDots.css({width:(mousePosition.max-47-newPos)+'px'});
};
slideButton.on('mousemove',mMove);
slideButton.on('touchmove',mMove);
// $('.googleHomeButton').hover(function(){
//   Background.play('googlehomeon');
// },function(){
//   if(!GoogleDemoApp.instance.showingEasterEgg) Background.play('googlehomeoff');
// }).click(function(){
//   Background.play('googlehomeon');
//   GoogleDemoApp.instance.showEasterEgg();
// });
$('.googleHomeButton').click(function(){
  // Background.play('googlehomeon');
  GoogleDemoApp.instance.showEasterEgg();
});
function updateStageBtn(index, step){
  var buttons = document.getElementsByClassName('stage-btn');
  for(var b=0;b<buttons.length;b++){
    var steps = buttons[b].parentNode.getElementsByClassName('stage-nav__step');

    if(b<index){
      buttons[b].parentNode.classList.remove('current');
      buttons[b].parentNode.classList.add('done');
      for(var s=0;s<steps.length;s++){
        steps[s].classList.add('done');
        steps[s].classList.remove('current');
      }
    }else if(b==index){
      buttons[b].parentNode.classList.add('current');
      buttons[b].parentNode.classList.remove('done');
      for(var s=0;s<steps.length;s++){
        if(s<step){
          steps[s].classList.remove('current');
          steps[s].classList.add('done');
        }else if(s==step){
          steps[s].classList.add('current');
          steps[s].classList.remove('done');
        }else{
          steps[s].classList.remove('current','done');
        }
      }
    }else{
      buttons[b].parentNode.classList.remove('current','done');
      for(var s=0;s<steps.length;s++){
        steps[s].classList.remove('done','current');
      }
    }
  }
};

document.getElementById('geomagicalBtn').addEventListener('click', function(){
  document.getElementById('stagegeomagicalmobile').getElementsByClassName('steps-overlay')[0].classList.add('active');
  $('body').addClass('scroll-lock');
});
document.getElementById('recomendationsMobile').addEventListener('click', function(){
  document.getElementById('stagerecommendationsmobile').getElementsByClassName('steps-overlay')[0].classList.add('active');
  $('body').addClass('scroll-lock');
});
document.getElementById('recapMobile').addEventListener('click', function(){
  document.getElementById('stagerecapmobile').getElementsByClassName('steps-overlay')[0].classList.add('active');
  $('body').addClass('scroll-lock');
});
window.addEventListener('resize', function(){
  // Background.resize();
  GoogleDemoApp.instance.resize();
});
$('#shareFinal').click(function(){
  share('linkedin');
})
$(document).on('wheel',function(e){

  if ($('body').hasClass('mobile')) return;
  if($('body').hasClass('mac-os')){
    var scrollDelta = e.deltaY;
    if( Math.abs(scrollDelta)<70 ) return;
    if(scrollDelta<-70){
      GoogleDemoApp.instance.prevSectionProxy();
    }else if(scrollDelta>70){
      GoogleDemoApp.instance.nextSectionProxy();
    };
  }else{
    var scrollDelta = e.deltaY;
    if( Math.abs(scrollDelta)<80 ) return;
    if(scrollDelta<-90){
      GoogleDemoApp.instance.prevSectionProxy();
    }else if(scrollDelta>80){
      GoogleDemoApp.instance.nextSectionProxy();
    };
  }
});
$('#changeChairs').click(function(e){
  GoogleDemoApp.instance.switchChairs();
});
$('.steps-overlay__back').click(function(e){
  $(this).parent().removeClass('active');
  $('body').removeClass('scroll-lock');
});

$('.platform').on('click', function () {
  if ($('body').hasClass('mobile')) {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
    } else {
      $('.platform').removeClass('active');
      $(this).addClass('active');
    }
  }
});
    var tooltips_selector = '#tooltipLine .pulsar-btn';
    tooltips_selector += ', #tooltipParallax .pulsar-btn';
    tooltips_selector += ', #tooltipDepth .pulsar-btn';
    tooltips_selector += ', #tooltipSegmentation .pulsar-btn';
    tooltips_selector += ', #tooltipRealistic .pulsar-btn';
    tooltips_selector += ', #tooltipVisionSearch .pulsar-btn';

    $(tooltips_selector).on('mouseenter', function() {
      var me = $(this);
      var parent = me.parent().parent();
      if (!parent.hasClass('hover')) {
        parent.addClass('hover');
        clearTimeout(timers.ttdetail);
        timers.ttdetail = setTimeout(function(target) {
          target.addClass('tooltip--detail');
        }, 500,parent);

        clearTimeout(timers.ttcontent);
        timers.ttcontent = setTimeout(function(target) {
          target.find('.tooltip__content').addClass('active');
          target.find('.material-icons').html('remove');
        }, 1000,parent);
      };
    });
    $(tooltips_selector).on('click', function() {
      var me = $(this);
      var parent = me.parent().parent();
      if (parent.hasClass('hover')) {
        parent.find('.tooltip__content').removeClass('active');
        clearTimeout(timers.ttdetail);
        timers.ttdetail = setTimeout(function(target) {
          target.removeClass('tooltip--detail');
        }, 350,parent);
        clearTimeout(timers.ttcontent);
        timers.ttcontent = setTimeout(function(target) {
          target.removeClass('hover');
          target.find('.material-icons').html('add');
        }, 850,parent);
      };
    });
function resetTooltip(tooltipClass,show){
  if(show===undefined) show=true;
  var parent = $(tooltipClass);
  $('.tooltip').removeClass('active animate');

  parent.find('.tooltip__content').removeClass('active');
  parent.removeClass('tooltip--detail');
  parent.removeClass('hover');
  parent.find('.material-icons').html('add');
  if(show){
    parent.addClass('active');
    setTimeout(function (target) {
      target.addClass('animate');
    }, 100,parent);
  }else{
    parent.removeClass('active');
    parent.removeClass('animate');
  }
}
function resetAllTooltips(){

  resetTooltip('#tooltipLine',false);
  resetTooltip('#tooltipParallax',false);
  resetTooltip('#tooltipDepth',false);
  resetTooltip('#tooltipSegmentation',false);
  resetTooltip('#tooltipRealistic',false);
  resetTooltip('#tooltipVisionSearch',false);
}

var scrollingDown = 0;
var scrollingDownDelta = 0;

// $(document).ready(function() {
  $(document).on('keydown',function(e){
    if(e.keyCode==39)  GoogleDemoApp.instance.nextSectionProxy();
    if(e.keyCode==37)  GoogleDemoApp.instance.prevSectionProxy();
  })
  //// FIXME: Ubicarlo donde corresponda
  $('.btn').on('mouseenter', function(e) {
    var parentOffset = $(this).offset(),
        relX = e.pageX - parentOffset.left,
        relY = e.pageY - parentOffset.top;
    $(this).find('.anim').css({top:relY, left:relX})
  }).on('mouseout', function(e) {
    var parentOffset = $(this).offset(),
        relX = e.pageX - parentOffset.left,
        relY = e.pageY - parentOffset.top;
    $(this).find('.anim').css({top:relY, left:relX})
  });


  $('.steps-scroll').on('touchstart',function(e){
    if($(".steps-overlay.active").scrollTop()==0){
      scrollingDown=e.originalEvent.touches[0].clientY;
    }else{
      scrollingDown=0;
    }
  });
  $('.steps-scroll').on('touchmove',function(e){
    scrollingDownDelta=e.originalEvent.touches[0].clientY-scrollingDown;
  });
  $('.steps-scroll').on('touchend',function(e){
    if( $('.steps-overlay.active').length>0 ){
      if(scrollingDown!=0 && scrollingDownDelta>200 && $(".steps-overlay.active").scrollTop()==0){
        scrollingDownDelta = 0;
        scrollingDown = 0;
        $('.steps-overlay.active').removeClass('active');
        $('body').removeClass('scroll-lock');
      }
    }
  });