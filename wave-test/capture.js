var page = require('webpage').create();
var system = require('system');
var address = system.args[1]; 

page.open(address, function() {
  // being the actual size of the headless browser
  page.viewportSize = { width: 1440, height: 900 };

  var clipRect = page.evaluate(function(){
    return document.querySelector('.g-text-wrapper').getBoundingClientRect();
  });

  page.clipRect = {
    top:    clipRect.top,
    left:   clipRect.left,
    width:  clipRect.width,
    height: clipRect.height
  };

  page.render('export.png');
  phantom.exit();
});