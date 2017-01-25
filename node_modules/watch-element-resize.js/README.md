# watch-element-resize.js

[![Build Status](https://travis-ci.org/jonataswalker/watch-element-resize.js.svg?branch=master)](https://travis-ci.org/jonataswalker/watch-element-resize.js)

A (yet another) cross-browser, event-based, element resize watcher. This is kind of a (improved) fork of [sdecima/javascript-detect-element-resize](https://github.com/sdecima/javascript-detect-element-resize).

### Demo
See [here a demo](http://rawgit.com/jonataswalker/watch-element-resize.js/master/examples/example.html).

## How to use it?

##### CDN Hosted - [jsDelivr](http://www.jsdelivr.com/projects/watch-element-resize.js)
Load Javascript:
```HTML
<script src="//cdn.jsdelivr.net/watch-element-resize.js/latest/watch-element-resize.min.js"></script>
```

##### Self hosted
Download [latest release](https://github.com/jonataswalker/watch-element-resize.js/releases/latest).

##### Instantiate with some options and listen to changes
```javascript
var watchResize = new WatchElementResize(['field1', 'field2']);
watchResize.on('resize', function(evt){
  console.info(evt);
  
  // the DOM element
  var resized_element = evt.element.target;
  
  // the element offset (width, height, top, left) 
  var offset = evt.element.offset;
  
  // the window dimensions -- just in case you need
  var window_size = evt.window;
});
```

# API

## Constructor

#### `new WatchElementResize(target)`

###### `target` can be:
`{String|Array<String>|Element|Array<Element>}` String or array of string, DOM node or array of nodes.

## Methods

#### watchResize.reAddListener()
#### watchResize.removeListener()

## Events

```javascript
watchResize.on('resize', function(evt){

});
```