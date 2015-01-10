var events = require("events")

var Swiper = function( element){
	
	this.element = element;

	this.events = new events.EventEmitter();

	var _this = this;

	this.element.addEventListener('touchstart', function(evt){ _this.handleTouchStart(evt) }, false);        
  this.element.addEventListener('touchmove', function(evt){ _this.handleTouchMove(evt) } , false);
}

Swiper.prototype.emit = function(event, data){
	this.events.emit(event,data);
}

Swiper.prototype.on = function( event, callback ){
	this.events.on(event, callback);
}

Swiper.prototype.handleTouchStart = function(evt){
  this.xDown = evt.touches[0].clientX;                                      
  this.yDown = evt.touches[0].clientY;  
}

Swiper.prototype.handleTouchMove = function(evt){
	var _this = this;
	if ( ! this.xDown || ! this.yDown ) return;

  var xUp = evt.touches[0].clientX;                                    
  var yUp = evt.touches[0].clientY;

  var xDiff = this.xDown - xUp;
  var yDiff = this.yDown - yUp;

	if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
		if ( xDiff > 0 ) this.events.emit("east", { amount: xDiff, event: evt } )
		else this.events.emit("west", { amount: xDiff, event: evt } )
  } 
  else {
		if ( yDiff > 0 ) this.events.emit("north", { amount: yDiff, event: evt } )
		else this.events.emit("south", { amount: yDiff, event: evt } )
	}
      
  /* reset values */
  this.xDown = null;
  this.yDown = null;                                             
  
}

if(module) module.exports = Swiper;
else window.Swiper = Swiper;
