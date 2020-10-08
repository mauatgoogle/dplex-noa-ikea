var slideButton = document.getElementById('slideButton');
var sliderDots = document.getElementById('sliderDots');
//var simpleButton = document.getElementsByClassName('btn');
var mousePosition = {}
var startDrag = false;
var goBackAnimation = null;
function fireMouseUp(e){
  startDrag = false;
  if(document.getElementById('slideButtonEnd').offsetLeft-document.getElementById('slideButton').offsetLeft<50){
    document.getElementById('slideButton').style.left = document.getElementById('slideButtonEnd').offsetLeft+'px';
    if(GoogleDemoApp.instance.mode=="mobile"){
      GoogleDemoApp.instance.open('stagesmobile.intromobile');
    }else{
      GoogleDemoApp.instance.open('stages.intro.0');
    }
    Background.play('open');
  }else{
    goBackAnimation = setInterval(function(){
      var val =  new Number(document.getElementById('slideButton').style.left.split('px')[0]);
      document.getElementById('slideButton').style.left = val/2+'px';

      //var newPos = Math.max(Math.min(e.clientX-mousePosition.startx,mousePosition.max),0);
      var animData = AnimationData.interactive.front;
      animData.x = animData.startx+(val/2/mousePosition.max)*(animData.finalx-animData.startx);
      sliderDots.style.width = (mousePosition.max-47-val/2)+'px';
      if(val<1){
        clearInterval(goBackAnimation);
      }
    },1000/30);
  }
  document.removeEventListener('mouseup',fireMouseUp);
  document.removeEventListener('touchend',fireMouseUp);
}
var mDown = function (e){
    document.addEventListener('mouseup',fireMouseUp);
    document.addEventListener('touchend',fireMouseUp);
    startDrag = true;
    mousePosition.startx = e.clientX || event.touches[0].clientX;
    mousePosition.max = document.getElementById('slideButtonEnd').offsetLeft;//-document.getElementById('slideButton').offsetLeft;
    var newPos = Math.max(Math.min(e.clientX-mousePosition.startx,mousePosition.max),0);
    sliderDots.style.width = (mousePosition.max-47-newPos)+'px';
    document.getElementById('slideButton').style.left = newPos+'px';
    Background.play('interactive');

};
slideButton.addEventListener('touchstart',mDown);
slideButton.addEventListener('mousedown',mDown);
var mMove = function(e){
  if(!startDrag) return;

  // var touch = event.touches[0];

  var clientx = e.clientX || event.touches[0].clientX;
  var newPos = Math.max(Math.min(clientx-mousePosition.startx,mousePosition.max),0);
  var animData = AnimationData.interactive.front;
  var sliderDotsWidth = sliderDots.offsetWidth;
  animData.x = animData.startx+(newPos/mousePosition.max)*(animData.finalx-animData.startx);
  document.getElementById('slideButton').style.left = newPos+'px';
  sliderDots.style.width = (mousePosition.max-47-newPos)+'px';
};
slideButton.addEventListener('mousemove',mMove);
slideButton.addEventListener('touchmove',mMove);


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

// document.body.addEventListener('wheel',function(e){
//   if(e.deltaX>0){
//     GoogleDemoApp.instance.nextSection();
//   }else if(e.deltaX<0){
//     // GoogleDemoApp.instance.prevSection();
//       GoogleDemoApp.instance.nextSection();
//   }else if(e.deltaY>0){
//     GoogleDemoApp.instance.prevSection();
//   }else if(e.deltaY<0){
//     GoogleDemoApp.instance.nextSection();
//   }
// })
$('#changeChairs').click(function(e){
  GoogleDemoApp.instance.switchChairs();
})
$('.steps-overlay__back').each(function(index){
  $(this).click(function(e){
    $(this).parent().removeClass('active');
    $('body').removeClass('scroll-lock');
  })
});
// window.addEventListener('resize', () => {
//   document.querySelector(':root').style
//     .setProperty('--vh', window.innerHeight/100 + 'px');
// })
var scrollingDown = 0;
var scrollingDownDelta = 0;

$(document).ready(function() {
  $(document).keydown(function(e){
    if(e.keyCode==39)  GoogleDemoApp.instance.nextSection();
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


  // //// FIXME: Deep Dive
  $('.btn--deepdive').on('click', function(e) {
    GoogleDemoApp.instance.nextSection();
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
  // };
  //   e.preventDefault();
  //   var $this = $(this);
  //
  //   // Activo botones deep-nav
  //   $this.closest('.card__actions').addClass('deep-dive--active');
  //
  //   // Activo listado deep-nav
  //   $this.closest('.card__body').find('.deep-dive__content').slideDown('slow');
  // });
  //
  // $('.btn--close-deepdive').on('click', function(e) {
  //   e.preventDefault();
  //   var $this = $(this);
  //   $this.closest('.card__actions').removeClass('deep-dive--active');
  //   $this.closest('.card__body').find('.deep-dive__content').slideUp('slow');
  // });



});
