Rails.application.routes.draw do
  devise_for :users

  resources :cards do
    member do
      put :move
    end
  end

  resources :lists do
    member do
      put :move
    end
  end

  root to: "lists#index"

end
