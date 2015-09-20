# app.rb
require 'sinatra'
require 'twitter'
class HelloWorldApp < Sinatra::Base
  get '/' do
    send_file 'index.html'
  end

  get '/testwave' do
    send_file 'test2.html'
  end

  get '/testwave2' do
    send_file 'test3.html'
  end

  post '/tweet' do
    client = Twitter::REST::Client.new do |config|
      config.consumer_key        = "fGSQjePjFen4St3G75JqKLQ2Q"
      config.consumer_secret     = "BnJBDpfojMMgUL4VIiY881CE5e4575R2Ab3gRCv3XgV5VqcYyO"
      config.access_token        = "3713908337-KX9Ut2NEUSb7efApEcvNQ9TCDqneK7PRMgiehLV"
      config.access_token_secret = "wmFClvXUx6ddAcMODnm6lv0rasfOdIDoXaUCHPfTqO8Ys"
    end
    client.update(params[:message])
  end

end