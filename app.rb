# app.rb
require 'sinatra'
require 'twitter'
require 'json'
require 'shellwords'
require 'open3'
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
    Open3.popen2('phantomjs', 'public/javascripts/capture.js', "#{params["quote"]}", 'made with clpr.', '#000000')

    `ffmpeg -i public/media/bg.mov -i public/media/fore.png \
    -y -r 30 -filter_complex "[0:v][1:v] overlay=0:0:enable='between(t,0,20)'" \
    -pix_fmt yuv420p -c:a copy \
    public/media/output.mp4`

    length = (params["end-time"].to_f - params["start-time"].to_f).to_i

    `ffmpeg -i public/media/output.mp4 -ss #{Shellwords.escape(params["start-time"].to_i)} -t #{Shellwords.escape(length)} -i public/media/cookie-sample.mp3\
    -shortest -y -c:v copy -c:a aac -strict experimental public/media/out.mp4`

    # Tweet It
    file = File.new("public/media/out.mp4")
    media_id = JSON.parse(Open3.popen2('twurl', '-H', 'upload.twitter.com', '/1.1/media/upload.json', '-d', "command=INIT&media_type=video/mp4&total_bytes=#{file.size}")[1].gets)["media_id"]

    system('twurl', '-H', 'upload.twitter.com', '/1.1/media/upload.json', '-d', "command=APPEND&media_id=#{media_id}&segment_index=0", '--file', "#{file.path}", '--file-field', 'media')
    system('twurl', '-H', 'upload.twitter.com', '/1.1/media/upload.json', '-d', "command=FINALIZE&media_id=#{media_id}")
    system('twurl', "/1.1/statuses/update.json", "-d", "media_ids=#{media_id}&status=#{params["message"]}")

    send_file 'finished.html'
  end

end
