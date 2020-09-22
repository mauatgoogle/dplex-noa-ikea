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
    GoogleDemoApp.instance.open('stages.intro.0');
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
}
slideButton.addEventListener('mousedown',function(e){
    document.addEventListener('mouseup',fireMouseUp);
    startDrag = true;
    mousePosition.startx = e.clientX;
    mousePosition.max = document.getElementById('slideButtonEnd').offsetLeft;//-document.getElementById('slideButton').offsetLeft;
    var newPos = Math.max(Math.min(e.clientX-mousePosition.startx,mousePosition.max),0);
    sliderDots.style.width = (mousePosition.max-47-newPos)+'px';
    document.getElementById('slideButton').style.left = newPos+'px';
    Background.play('interactive');

});
// slideButton.addEventListener('mouseup',function(e){
//   //var newPos = e.offsetX-mousePosition.startx;
//   //document.getElementById('slideButton').style.left = newPos;
//   startDrag = false;
//   if(document.getElementById('slideButtonEnd').offsetLeft-document.getElementById('slideButton').offsetLeft<50){
//     document.getElementById('slideButton').style.left = document.getElementById('slideButtonEnd').offsetLeft+'px';
//     GoogleDemoApp.instance.open('stages.intro.0');
//     Background.play('open');
//   };
// });
slideButton.addEventListener('mousemove',function(e){
  if(!startDrag) return;
  var newPos = Math.max(Math.min(e.clientX-mousePosition.startx,mousePosition.max),0);
  var animData = AnimationData.interactive.front;
  var sliderDotsWidth = sliderDots.offsetWidth;
  animData.x = animData.startx+(newPos/mousePosition.max)*(animData.finalx-animData.startx);
  document.getElementById('slideButton').style.left = newPos+'px';
  sliderDots.style.width = (mousePosition.max-47-newPos)+'px';
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
}
window.addEventListener('resize', function(){
  Backgorund.resize();
});
