var DomUtils = {};
DomUtils.find = function(selector,target){
  if(typeof selector=='object') return new DomElement(selector);
  target = target||document;
  var elements = target.querySelectorAll(selector);//selectors[0]);
  if(elements.length>1){
    var elList = new DomList();
    for(var e=0; e<elements.length; e++){
      elList.push(new DomElement(elements[e]));
    };
    return elList;
  }else{
    return new DomElement(elements[0]);
  };
};

function DomElement(element){
  this.element = element;
};

DomElement.prototype.click = function(callback){
  if(!this.element) return this;
  this.on('click',callback);
  return this;
};

DomElement.prototype.css = function(style){
  if(!this.element) return this;
  if(typeof style=='string'){
    return this.element.style[style];
  }else{
    for(var i in style){
      this.element.style[i] = style[i];
    };
  };
  return this;
};

DomElement.prototype.hide = function(){
  if(!this.element) return this;
  this.prevDisplay = this.element.style.display;
  this.element.style.display = 'none';
  return this;
};

DomElement.prototype.show = function(){
  if(!this.element) return this;
  this.element.style.display = this.prevDisplay||"";
  return this;
};

DomElement.prototype.addClass = function(classList){
  if(!this.element) return this;
  if(classList.trim()!=''){
    var classes = classList.trim().split(' ');
    for(var c in classes){
      this.element.classList.add(classes[c])
    };
  };
  return this;
};

DomElement.prototype.removeClass = function(classList){
  if(!this.element) return this;
  if(classList.trim()!=''){
    var classes = classList.trim().split(' ');
    for(var c in classes){
      this.element.classList.remove(classes[c].trim())
    };
  };
  return this;
};

DomElement.prototype.hasClass = function(className){
  if(!this.element) return false;
  return this.element.classList.contains(className);
};

DomElement.prototype.find = function(selector){
  return DomUtils.find(selector,this.element);
};
DomElement.prototype.first = function(){
  return this;
};
DomElement.prototype.last = function(){
  return this;
};
DomElement.prototype.on = function(event,callback){
  if(!this.element) return this;
  this.element.addEventListener(event,callback,false);
  return this;
};
DomElement.prototype.off = function(event,callback){
  if(!this.element) return this;
  this.element.removeEventListener(event,callback,false);
  return this;
};
DomElement.prototype.html = function(content){
  if(!this.element) return this;
  this.element.innerHTML = content;
  return this;
};
DomElement.prototype.scrollTop = function(content){
  if(!this.element) return 0;
  return this.element.scrollTop;
};
DomElement.prototype.hover = function(over,out){
  if(over) this.on('mouseenter',over);
  if(out) this.on('mouseleave',out);
  return this;
};
DomElement.prototype.parent = function(){
  return new DomElement(this.element.parentElement);
};
DomElement.prototype.offset = function(){
  if(!this.element) return {top:0,left:0};
  return this.element.getBoundingClientRect();
};
DomElement.prototype.classes = function(index){
  if(!this.element) return [];
  if(index==undefined){
    return this.element.classList.length;
  }else{
    return this.element.classList[index];
  };
};
DomElement.prototype.data = function(key,value){
  if(!this.element) return false;
  if(value!==undefined){
    this.element.dataset[key] = value;
    return this;
  }else{
    return this.element.dataset[key];
  };
};


function DomList(elements){ this.elements = elements||[]; };
Object.defineProperty(DomList.prototype, 'length', {
  get: function() {
    return this.elements.length;
  }
});
DomList.prototype.push = function(element){ this.elements.push(element); };
DomList.prototype.callMethod = function(method,param){
  for(var e=0;e<this.elements.length;e++) this.elements[e][method](param);
  return this;
};
DomList.prototype.addClass = function(classList){
  return this.callMethod('addClass',classList);
};
DomList.prototype.removeClass = function(classList){
  return this.callMethod('removeClass',classList);
};
DomList.prototype.css = function(cssProps){
  return this.callMethod('css',cssProps);
};
DomList.prototype.find = function(selector){
  return this.callMethod('find',selector);
};
DomList.prototype.first = function(){
  return this.elements[0];
};
DomList.prototype.get = function(ix){
  return this.elements[ix];
};
DomList.prototype.last = function(){
  return this.elements[this.elements.length-1];
};
DomList.prototype.hasClass = function(className){
  return this.callMethod('hasClass',className);
};
DomList.prototype.html = function(content){
  return this.callMethod('html',content);
};
DomList.prototype.click = function(callback){
  return this.callMethod('click',callback);
};
DomList.prototype.parent = function(){
  return this.callMethod('parent');
};
DomList.prototype.offset = function(){
  return this.callMethod('offset');
};
DomList.prototype.show = function(){
  return this.callMethod('show');
};
DomList.prototype.hide = function(){
  return this.callMethod('hide');
};
DomList.prototype.scrollTop = function(){
  return this.callMethod('scrollTop');
};
DomList.prototype.on = function(method,callback){
  for(var e=0;e<this.elements.length;e++) this.elements[e].on(method,callback);
  return this;
};
DomList.prototype.off = function(method,callback){
  for(var e=0;e<this.elements.length;e++) this.elements[e].off(method,callback);
  return this;
};
DomList.prototype.hover = function(over,out){
  for(var e=0;e<this.elements.length;e++) this.elements[e].hover(over,out);
  return this;
};

function $(selector){
  return DomUtils.find(selector);
};
