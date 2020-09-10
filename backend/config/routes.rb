Rails.application.routes.draw do
  post "/login", to: "sessions#login"
  get "/auto_login", to: "sessions#auto_login"
  get "/user_is_authed", to: "sessions#user_is_authed"
  get "/logged_in", to: "application#logged_in?"
  resources :users
  resources :trackers
end
