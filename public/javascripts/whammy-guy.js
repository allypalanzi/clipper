
var width = 900
var height = 500

var video = new Whammy.Video(15);


function whammyRecord(startTime, endTime, cb){

  ctx = new AudioContext()
  audio = document.getElementById('myAudio')
  audioSrc = ctx.createMediaElementSource(audio)
  analyser = ctx.createAnalyser()

  var segmentEnd;
  audio.addEventListener('timeupdate', function (){
      if (segmentEnd && audio.currentTime >= segmentEnd) {
          audio.pause();
      }   
      console.log(audio.currentTime);
  }, false);

  function playSegment(startTime, endTime){
      segmentEnd = endTime;
      audio.currentTime = startTime;
      audio.play();
  }

  playSegment(startTime, endTime)

  var gainNode = ctx.createGain()
  gainNode.gain.value = 1
  audioSrc.connect(gainNode)
  gainNode.connect(ctx.destination)
  audioSrc.connect(analyser)
   
  frequencyData = new Uint8Array(analyser.frequencyBinCount)

  analyser.fftSize = 32768
  var bufferLength = analyser.frequencyBinCount
  dataArray = new Uint8Array(bufferLength);
  

  var x = d3.scale.linear().domain([0, dataArray.length]).range([0, width])
  var y = d3.scale.linear().domain([50, 180]).range([0, height])

  var canvasSel = d3.select('body')
    .append('canvas')
      .attr({width: width, height: height})

  var canvas = canvasSel.node()
  canvasCtx = canvas.getContext('2d')

   
  d3.timer(function(t){
    analyser.getByteTimeDomainData(dataArray)

    canvas.width = width
    canvasCtx.beginPath()

    canvasCtx.rect(0, 0, width, height)
    canvasCtx.fillStyle = 'rgba(255, 255, 255, 0)'
    canvasCtx.fill()

    canvasCtx.strokeStyle = 'steelblue'
    canvasCtx.lineWidth = 1
    dataArray.forEach(function(d,i){
      canvasCtx.lineTo(x(i), y(d))     
    })
    canvasCtx.stroke()

    video.add(canvasCtx)

    if (t < 7000) return false

    var start_time = +new Date;
    var output = video.compile();
    var end_time = +new Date;
    var url = webkitURL.createObjectURL(output);
    document.getElementById('awesome').src = url; //toString converts it to a URL via Object URLs, falling back to DataURL
    document.getElementById('download').style.display = '';
    document.getElementById('download').href = url;
    document.getElementById('status').innerHTML = "Compiled Video in " + (end_time - start_time) + "ms, file size: " + Math.ceil(output.size / 1024) + "KB";

    var reader = new FileReader();
    // this function is triggered once a call to readAsDataURL returns
    reader.onload = function(event){
        var fd = new FormData();
        fd.append('fname', 'test.txt');
        fd.append('data', event.target.result);
        console.log(event.target.result)

        $('.video-str').text(event.target.result);
        d3.selectAll('.p-submit').style('opacity', 1)

    };      
    reader.readAsDataURL(output);

    return true
  })

}
