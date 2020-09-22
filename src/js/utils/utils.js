
function getTimer() { return new Date().getTime(); }

function D2R(deg) { return (deg / 180) * Math.PI; }

function loadJson(src,callback){
  var jsonLoader = new XMLHttpRequest();
  jsonLoader.open('GET', src, true);
  jsonLoader.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      var data = JSON.parse(this.response);
      callback(data);
    } else {
      console.log("ERROR PARSING JSON");
    }
  };
  jsonLoader.onerror = function() {
    console.log("ERROR LOADING JSON: "+src);
  };
  jsonLoader.send();
}

function loadImage(src,callback){
  var img = new Image();
  img.onload = function(){
    callback();
  };
  setTimeout(function(i,s){i.src=s},1,img,src);
  //img.src = src;
  return img;
}
