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
  document.getElementById("play").onclick = function() {
    var region = AudioFile.regions.list[Object.keys(AudioFile.regions.list)[0]];
    if (region) {
      region.play();
    } else {
      AudioFile.play();
    }
  };
  document.getElementById("pause").onclick = function() {
    AudioFile.pause();
  };
  document.getElementById("wave").addEventListener('mousedown', function (e) {
    if(document.querySelector('.wavesurfer-region')) {
      AudioFile.clearRegions();
    }
  });
  document.getElementById("share").onclick = function() {
    if(Object.keys(AudioFile.regions.list)[0]) {
      start = AudioFile.regions.list[Object.keys(AudioFile.regions.list)[0]].start;
      end = AudioFile.regions.list[Object.keys(AudioFile.regions.list)[0]].end;
      alert('coming soon!');
      console.log({"start": start, "end": end});
    }else{
      alert('please make a selection first');
    }
  };
  document.onkeypress = function (e) {
    if(e.charCode == 32) {
      AudioFile.playPause();
    }
  };
};

AudioFile.on('ready', function () {
  AudioFile.enableDragSelection();
  AudioFile.Events();
});

AudioFile.load('media/cookie-sample.mp3');