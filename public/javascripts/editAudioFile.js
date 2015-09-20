// Create Wave Surfer Object
var AudioFile = Object.create(WaveSurfer);
AudioFile.init({
  container: document.querySelector('#wave'),
  waveColor: '#19CCBA',
  progressColor: '#B29E0A',
  scrollParent: 'true',
  fillParent: 'false',
  minPxPerSec: 25,
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
      var selection = window.getSelection();
      $('.video-text').text(selection);
      $('.start-time').text(start);
      $('.end-time').text(end);

      Modal.open();

    } else{
      alert('please make a selection first');
    }
  };

  $('#close').on('click', Modal.close);

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
  spans: $('#transcript span').map(function(index) { return parseInt(this.id)}),

  closest: function (array, num) {
    var i = 0;
    var minDiff = 100;
    var ans;
    for(i in array){
      var m = Math.abs(num-array[i]);
        if(m < minDiff){
          minDiff = m;
          ans = array[i];
        }
      }
    return ans;
  },

  update: function() {
    this.elapsed = AudioFile.getCurrentTime();
    if (this.elapsed == this.last_elapsed) {
      return;
    } else {
      if (this.elapsed != (parseInt(this.last_elapsed) + 1)) { elapsed = (parseInt(this.last_elapsed) + 1) }
      this.last_elapsed = this.elapsed;
    }
    this.current = '#' + this.closest(this.spans,Math.floor(this.elapsed));
    if (this.current == null) {
      return;
    } else {
      $(this.current).addClass('p-current').siblings().removeClass('p-current');
      $(this.current).get(0).scrollIntoView();
    }
  }
};

var Modal = {
  open: function() {
    $(".m-modal").show();
    $("body").addClass('modal-open');
  },

  close: function() {
    $(".m-modal").hide();
    $("body").removeClass('modal-open');
  }
}