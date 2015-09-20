# app.rb
require 'sinatra'
require 'twitter'
require 'json'
class HelloWorldApp < Sinatra::Base
  get '/' do
    send_file 'index.html'
  end

  get '/testwave' do
    send_file 'test2.html'
  end

  get '/fake' do
    send_file 'fake.html'
  end

  post '/tweet' do
    `phantomjs public/javascripts/capture.js '#{params["quote"]}' 'made with clpr.' '#ff00ff'`

    `ffmpeg -i public/media/bg.mov -i public/media/fore.png \
    -y -r 30 -filter_complex "[0:v][1:v] overlay=0:0:enable='between(t,0,20)'" \
    -pix_fmt yuv420p -c:a copy \
    public/media/output.mp4`

    # `ffmpeg -i public/media/output.mp4 -i public/media/cookie-sample.mp3 -ss 0 -t 29 -shortest \
    # -y -c:v copy -c:a aac -strict experimental public/media/out.mp4`
    length = (params["end-time"].to_f - params["start-time"].to_f).to_i

    `ffmpeg -i public/media/output.mp4 -ss #{params["start-time"].to_i} -t #{length} -i public/media/cookie-sample.mp3\
    -shortest -y -c:v copy -c:a aac -strict experimental public/media/out.mp4`

    # Tweet It
    file = File.new("public/media/out.mp4")
    media_id = JSON.parse(`twurl -H upload.twitter.com "/1.1/media/upload.json" -d "command=INIT&media_type=video/mp4&total_bytes=#{file.size}"`)["media_id"]

    `twurl -H upload.twitter.com "/1.1/media/upload.json" -d "command=APPEND&media_id=#{media_id}&segment_index=0" --file #{file.path} --file-field "media"`
    `twurl -H upload.twitter.com "/1.1/media/upload.json" -d "command=FINALIZE&media_id=#{media_id}"`
    `twurl "/1.1/statuses/update.json" -d "media_ids=#{media_id}&status=#{params["message"]}"`
    send_file 'finished.html'
  end

end
