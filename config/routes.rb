Rails.application.routes.draw do
  devise_for :agents
  # Sign-in form
  get  '/signin', to: 'leads#new',   as: :signin
  # Form POSTs here
  post '/leads',  to: 'leads#create'
  # Thank-you page after create
  get  '/signed_up', to: 'leads#thanks', as: :signed_up

  # You can set root to sign-in for now:
  root to: 'leads#new'
end
