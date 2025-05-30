Rails.application.routes.draw do
  # Devise for Agent authentication
  devise_for :agents

  # Public-facing lead routes
  get  '/signin',    to: 'leads#new',    as: :signin
  post '/leads',     to: 'leads#create'
  get  '/signed_up', to: 'leads#thanks',  as: :signed_up

  # Dashboard route (you generated a stub)
  get 'dashboard/index'

  # Authenticated root → dashboard
  authenticate :agent do
    root to: 'dashboard#index', as: :authenticated_root

  resources :leads, only: [:new, :create] do
    member do
      patch :mark_contacted
    end
  end
    
  end

  # Unauthenticated users → sign in
  unauthenticated do
    root to: redirect('/agents/sign_in')
  end
end
