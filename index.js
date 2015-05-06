var events = require("events")

var Swiper = function(element, thresholdX, thresholdY){
  this.thresholdX = thresholdX || 30;
  this.thresholdY = thresholdY || 10;
  
  this.element = element;
  this.events = new events.EventEmitter();
  
  var that = this;
  var isDown = false;
	
	function _onDown(e) {
    if(!isDown) {
        that.onDown(e);
        isDown = true;
    }
		
    if(e instanceof TouchEvent) {
        e.stopPropagation();
    }
	}
	
	function _onUp(e) {
    if(isDown) {
      that.onUp(e); 
      isDown = false;
    }
	    
		if(e instanceof TouchEvent) {
      e.stopPropagation();
		}
	}

  this.element.addEventListener('touchstart', _onDown, false);        
  this.element.addEventListener('touchend', _onUp, false);
  this.element.addEventListener('mousedown', _onDown, false);        
  this.element.addEventListener('mouseup', _onUp, false);
}

Swiper.prototype.emit = function(event, data){
	this.events.emit(event, data);
};

Swiper.prototype.on = function(event, callback){
	this.events.on(event, callback);
};

Swiper.prototype.onDown = function(e){
	if(evt instanceof TouchEvent) {
    this.xDown = e.changedTouches[0].clientX;
    this.yDown = e.changedTouches[0].clientY;  
	} else {
    this.xDown = e.clientX;                                      
    this.yDown = e.clientY;
	}
};

Swiper.prototype.onUp = function(e){
  var xUp;                                    
	var yUp;
	
	if(e instanceof TouchEvent) {
    xUp = e.changedTouches[0].clientX;                                    
    yUp = e.changedTouches[0].clientY;
	} else {
    xUp = e.clientX;                                    
    yUp = e.clientY;
	}
	
  var xDiff = Math.abs(this.xDown - xUp);
	var yDiff = Math.abs(this.yDown - yUp);
	
	var emitObj;

	if (xDiff > yDiff) {
	    emitObj = { amount: xDiff, event: e };
	    
		if (xDiff > this.thresholdX) {
	    if(this.xDown > xUp) {
	        this.events.emit("east", emitObj);
	    } else {
	        this.events.emit("west", emitObj);
	    }
		}
		
  	} else {
	    emitObj = { amount: yDiff, event: e };
  	    
			if (yDiff > this.thresholdY) {
		    if(this.yDown > yUp) {
	        this.events.emit("south", emitObj);
		    } else {
	        this.events.emit("north", emitObj);
		    }
			}
	}
	
  this.xDown = null;
  this.yDown = null;                                             
};

// Module compatible
if(typeof module !== 'undefined' && module.exports) {
	module.exports = Swiper;
} else if(typeof define === 'function' && define.amd) {
	define(function() { return Swiper; });
} else {
	window.Swiper = Swiper;
}
