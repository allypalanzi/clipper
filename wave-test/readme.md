http://www.patrick-wied.at/blog/how-to-create-audio-visualizations-with-javascript-html

https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode

Convert to single channel `wav`

    ffmpeg -i clip.m4a -ac 1 clip.wav

Run DFT and remove `sox` footer
      sox clip.wav -n stat -freq 2>&1 | sed -n -e :a -e '1,15!{P;N;D;};N;ba' > out.dat

### TODO

- [x] Audio not playing
- [ ] 


### Whammy
- [x] Load lib
- [x] switch to canvas
- [x] take frames on set timeout
- [ ] overlay text

### node-canvas
- [ ] higher fps ?
- [ ] where to get audio data from?