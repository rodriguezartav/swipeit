# swiper

Swiper is a simple touch event manager for detecting Swipe on a DOM Element. Once registered it emits events when it's swiped; I decided to use cardinal events because it seems more direct than left, right. So events are east, west, north and south. 

Swiper is a Javascript Module, when it's compiled with Browserify it works out of the box - if module is not found then it will bind itself to window under the variable swiper. ie: window.swiper;

## Install

npm install swiper --save

## Usage
```
var Swiper = require("swiper");

var element = document.querySelector("div.swipable");

var swiper = new Swiper(element);

swiper.on("east", function(){
	.....
})

```

## API

### var swiper = new Swiper( ELEMENT );
Creates a new swipper for the DOM Element passed as argument. You can create many swipper instances for different elements.

### swiper.on( EVENT , callback );
EVENT can be east, west, north and south

The callback is a function, it is passed a parameter with the following object:
```
{ 
  amount: the swipe amount in pixels 
  event: the original swipe ( touchmove ) event
}
```

## Collaboration and Todo
Open to any suggestion - just send a pull request.

Todo: Make it compatible with other require.js and ES6 Modules.
