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
    setInterval(function () {
      Transcript.update()
    }, 500);
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
      setInterval(function () {
        Transcript.update()
      }, 500);
    }
  };
};

AudioFile.on('ready', function () {
  AudioFile.enableDragSelection();
  AudioFile.Events();
});

AudioFile.load('media/cookie-sample.mp3');

var Transcript = {
  elapsed: "0",
  last_elapsed: "0",
  current: '0.0',
  update: function() {
    this.elapsed = AudioFile.getCurrentTime();
    if (this.elapsed == this.last_elapsed) {
      return;
    } else {
      if (this.elapsed != (parseInt(this.last_elapsed) + 1)) { elapsed = (parseInt(this.last_elapsed) + 1) }
      this.last_elapsed = this.elapsed;
    }
    this.current = $('#' + Math.floor(this.elapsed))[0];
    if (this.current == null) {
      return;
    } else {
      this.current.style["color"] = "#ff0000";
      this.current.scrollIntoView();
    }
  }
};