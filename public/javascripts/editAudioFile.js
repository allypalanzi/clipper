// Create Wave Surfer Object
var AudioFile = Object.create(WaveSurfer);

AudioFile.init({
  container: document.querySelector('#wave'),
  waveColor: '#19CCBA',
  progressColor: '#B29E0A',
  scrollParent: 'true',
  fillParent: 'false',
  minPxPerSec: 50,
  normalize: true,
  height: 200
});

AudioFile.Events = function() {
  document.getElementById("playRegion").onclick = function() {
    AudioFile.regions.list[Object.keys(AudioFile.regions.list)[0]].play();
  };
  document.getElementById("play").onclick = function() {
    AudioFile.play();
  };
  document.getElementById("pause").onclick = function() {
    AudioFile.pause();
  };
  document.getElementById("wave").addEventListener('mousedown', function (e) {
    if(document.querySelector('.wavesurfer-region')) {
      AudioFile.clearRegions();
    }
  });
};

AudioFile.on('ready', function () {
  AudioFile.enableDragSelection();
  AudioFile.Events();
});

AudioFile.load('media/cookie-sample.mp3');