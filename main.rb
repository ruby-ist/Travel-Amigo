require 'sinatra'
require 'mongoid'

Mongoid.load!("config/mongoid.yml")

class Place
	include Mongoid::Document

	field :name, type: String
	field :location, type: String
	field :category, type: String
	field :about, type: String
	field :tags, type: Array
	field :images, type: Array
	field :mapImage, type: String
	field :mapURL, type: String

	embeds_many :reviews

	def reviewAverage
		(self.reviews.map{|i| i.rating}.inject(&:+)/reviews.size.to_f).round(1)
	end

end

class Review
	include Mongoid::Document

	field :author, type: String
	field :content, type: String
	field :rating, type: Integer

	embedded_in :place
	belongs_to :place, optional: true

end

before do
	documents = Place.order(name: 1).to_a
	@cities = documents.map { |i| i.location }.uniq.sort
	@categories = documents.map { |i| i.category }.uniq.sort
end

get "/" do
	@places = Place.all.to_a.sort_by { |i| i.reviewAverage }.reverse.first(5)
	erb :index
end

["/", "/listing"].each do |str|
	post str do
		if !(params[:location].empty? or params[:category].empty?)
			location = params[:location]
			category = params[:category]
			redirect "/listing?location=#{location}&category=#{category}"

    elsif !params[:location].empty? and params[:category].empty?
			location = params[:location]
			redirect "/listing?location=#{location}"

		elsif !params[:category].empty? and params[:location].empty?
			category = params[:category]
			redirect "/listing?category=#{category}"

    else
      redirect "/listing"

		end
	end
end

get "/listing" do
	if params[:location] and params[:category]
    @places = Place.where(location: params[:location]).and(category: params[:category]).order(name: 1).to_a
  elsif params[:location]
    @places = Place.where(location: params[:location]).order(name: 1).to_a
  elsif params[:category]
    @places = Place.where(category: params[:category]).order(name: 1).to_a
  else
		@places = Place.order(name: 1).to_a
	end
  erb :listing
end

get "/:id" do
	@place = Place.find(params[:id])
	if @place
		erb :place
  else
    redirect not_found
	end
end

post "/check" do
  place = Place.find(params[:id])
	review = place.reviews.new(author: params[:author], content: params[:content], rating: params[:rating].to_i)
	review.save
  redirect "/#{params[:id]}"
end

not_found do
  oops = '<div class="error-image">(This page has not been created yet. It may or may not be developed in the future)</div>'
  erb oops
end