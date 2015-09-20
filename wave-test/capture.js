//run it like this   phantomjs capture.js INSERTQUOTE INSERTSHOWINFO

var page = require('webpage').create();
var system = require('system');
var address = system.args[1];
var quote = system.args[1]
var show = system.args[2]

page.content = '<style>.g-text-wrapper {  position: absolute;  width: 940px;  padding: 100px 50px 100px 50px;}.g-text-wrapper {  position: absolute;  width: 940px; padding: 100px 50px 100px 50px;}.g-text-wrapper p {  font-size: 50px;  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;;  font-weight: 100;  color: #bcbcbc;  opacity: 0.8;  vertical-align: middle;  margin-top:60px;}p.nudge {  font-size: 20px;  letter-spacing: 0.8px;}</style><div class="g-text-wrapper">  <p>' + quote + '</p>  <p class="nudge">— ' + show + '</p></div>';

console.log(page.content)

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