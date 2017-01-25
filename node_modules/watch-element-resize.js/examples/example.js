/* global hljs, WatchElementResize */

var size_el = document.getElementById('size');
var size2_el = document.getElementById('size2');
var click_el = document.getElementById('id2');
var size = { x: 100, y: 80 };

var watchResize = new WatchElementResize(['id', 'id2']);

click_el.addEventListener('click', function () {
  if (size.x > 180) {
    size = { x: 100, y: 80 };

    size2_el.innerHTML = 'Stop watching!';
    size_el.innerHTML = 'Stop watching!';

    watchResize.removeListener();
  } else {
    size.x += 40;
    size.y += 40;
  }

  click_el.style.width = size.x + 'px';
  click_el.style.height = size.y + 'px';
});

watchResize.on('resize', function (evt) {
  var offset = evt.element.offset;

  if (evt.element.target.id === 'id') {
    size_el.innerHTML = offset.width + ' x ' + offset.height;
  } else {
    size2_el.innerHTML = offset.width + ' x ' + offset.height;
  }
});

hljs.configure({ tabReplace: '  ' });
hljs.initHighlightingOnLoad();
