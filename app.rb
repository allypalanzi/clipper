# app.rb
require 'sinatra'

class HelloWorldApp < Sinatra::Base
  get '/' do
    send_file 'index.html'
  end
end