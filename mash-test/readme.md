add image over video 
http://video.stackexchange.com/questions/12105/add-an-image-in-front-of-video-using-ffmpeg

    ffmpeg -i bg.mov -i fore.png \
    -filter_complex "[0:v][1:v] overlay=225:225:enable='between(t,0,20)'" \
    -pix_fmt yuv420p -c:a copy \
    output.mp4
