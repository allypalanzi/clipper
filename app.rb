# app.rb
require 'sinatra'

class HelloWorldApp < Sinatra::Base
  get '/' do
    send_file 'index.html'
  end

  get '/testwave' do
    send_file 'test2.html'
  end

end