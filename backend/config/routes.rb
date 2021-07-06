Rails.application.routes.draw do
  post "/login", to: "sessions#login"
  get "/auto_login", to: "sessions#auto_login"
  post "/signup", to: "users#create"
  get "/user_is_authed", to: "sessions#user_is_authed"
  get "/logged_in", to: "application#logged_in?"
  get "/logout", to: "sessions#logout"
  resources :users
  resources :trackers
  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
