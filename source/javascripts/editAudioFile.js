// Create Wave Surfer Object
var AudioFile = Object.create(WaveSurfer);

AudioFile.init({
  container: document.querySelector('#wave'),
  waveColor: 'violet',
  progressColor: 'purple'
});

AudioFile.GetRegion = function() {
  var regionLength = document.querySelector('.wavesurfer-region').getAttribute('title');
  var region = {
    start: 30,
    end: 50
  };
  return region;
};

AudioFile.Events = function() {
  document.getElementById("playRegion").onclick = function() {
    AudioFile.Region.play();
  };
  document.getElementById("play").onclick = function() {
    AudioFile.play();
  };
  document.getElementById("pause").onclick = function() {
    AudioFile.pause();
  };
};

AudioFile.on('ready', function () {
  AudioFile.enableDragSelection();
  AudioFile.Events();
});

AudioFile.load('resources/cookie-sample.mp3');