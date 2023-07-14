Rails.application.routes.draw do
  root 'homepage#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  put '/homepage/update_all'

  # Defines the root path route ("/")
  # root "articles#index"
end
