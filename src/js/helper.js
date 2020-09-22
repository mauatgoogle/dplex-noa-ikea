var sections = [
  'splash',
  'start',
  'stages.intro.0',
  'stages.intro.1',
  'stages.intro.2',
  'stages.geomagical.0',
  'stages.geomagical.1',
  'stages.geomagical.2',
  'stages.geomagical.3',
  'stages.recommendations.0',
  'stages.recommendations.1',
  'stages.recommendations.2',
  'stages.recommendations.3',
  'stages.recap.0'
];
var navHelpStyle = 'position:absolute;left:0;top:0;display:block;z-index:1000;font-size:xx-small;padding:2px;background-color:#fefefe;';
function showMenu(){
  var menu = document.getElementById('devMenu');
  menu.style.display = (menu.style.display=="block")?"none":"block";
}
var NavHelp = '<div style="'+navHelpStyle+'">';
NavHelp += '<a href="#" onClick="showMenu();return false;" style="font-weight:bold;">[ DEV MENU ]</a> <div id="devMenu" style="display:none;">';
for(var s=0;s<sections.length;s++){
  NavHelp+='<a href="#" onClick="GDApp.open(\''+sections[s]+'\');return false;">';
  NavHelp+=sections[s];
  NavHelp+='</a>';
  NavHelp+='<br/>';
}
NavHelp+='</div></div>';
var child = document.createElement('div');
child.innerHTML = NavHelp;
child = child.firstChild;
document.body.appendChild(child);

var logStyle = 'position:absolute;right:0;top:0;display:block;z-index:1000;font-size:xx-small;padding:2px;background-color:#fefefe;';
var LogHelp = '<div id="logHelper" style="'+logStyle+'"></div>';
var LogObject = {};
function watchme(label,value){
  LogObject[label] = value;
}
setInterval(function(){
  var content = '';
  for(var i in LogObject){
    content += '<b>'+i+'</b><br/>';
    content += LogObject[i]+'<br/>';
  }
  document.getElementById('logHelper').innerHTML = content;
},100);
var child = document.createElement('div');
child.innerHTML = LogHelp;
child = child.firstChild;
document.body.appendChild(child);
