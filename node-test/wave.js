var Canvas = require('canvas'),
  fs = require('fs'),
  leftpad = require('leftpad'),
  d3 = require('d3')



var rows = fs.readFileSync('out.dat', 'utf8').split('\n')
var data = rows.map(function(d){
  var row = d.split('  ')
  return {p: +row[0], v: +row[1]}
})

var pitches = d3.nest().key(function(d){ return d.p }).entries(data)
console.log(pitches.length, pitches[0].values.length, pitches[100].values.length)



// instead of finding an element, Canvas is a constructor.
var canvas = new Canvas(600, 100);
// get a context to draw in
var ctx = canvas.getContext('2d');
// count frames
var frame = 0;

for (var i = 0; i < Math.PI * 2; i += 0.05) {
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, 600, 100);
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.arc((Math.sin(i) + 1) * 250 + 50, 50, 20, 0, 2 * Math.PI);
  ctx.fill();
  
  // save a frame as a PNG file to disk
  fs.writeFileSync(
    __dirname + '/frames/' + leftpad(frame++, 5) + '.png',
    canvas.toBuffer());
}
