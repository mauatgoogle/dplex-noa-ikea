
Background.play('start');
Background.play('dining');
var animations = "";
for( var i in AnimationData){
  animations+='<a href="#" onclick="Background.play(\''+i+'\');return false;">'+i+'</a><br/>';
}
document.getElementById('animnames').innerHTML = animations;
document.getElementById('animname').addEventListener('keydown',function(e){
  if(e.keyCode==13){
    Background.play(e.target.value);
  }
});

// window.addEventListener('resize', function(){
//   Background.resize();
// });

//STATS
// (function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()
