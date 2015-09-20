//run it like this   phantomjs capture.js 'INSERTQUOTE' 'INSERTSHOWINFO' 'textcolor'

var page = require('webpage').create();
var system = require('system');
var address = system.args[1];
var quote = system.args[1]
var show = system.args[2]
var textcolor = system.args[3]

if (textcolor == undefined) {
    textcolor = '#bcbcbc'
}

page.content = '<style>.g-text-wrapper {  position: absolute;  width: 912px; height: 352px; padding: 100px 50px 100px 50px;}.g-text-wrapper p {  font-size: 50px;  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;;  font-weight: 100;  color:' + textcolor + ';  opacity: 0.8;  vertical-align: middle;  margin-top:60px;}p.nudge {  font-size: 20px;  letter-spacing: 0.8px;}</style><div class="g-text-wrapper">  <p>' + quote + '</p>  <p class="nudge">— ' + show + '</p></div>';

page.open(address, function() {
  // being the actual size of the headless browser
  page.viewportSize = { width: 1012, height: 552 };

  var clipRect = page.evaluate(function(){
    return document.querySelector('.g-text-wrapper').getBoundingClientRect();
  });

  page.clipRect = {
    top:    clipRect.top,
    left:   clipRect.left,
    width:  clipRect.width,
    height: clipRect.height
  };

  page.render('public/media/fore.png');
  phantom.exit();
});