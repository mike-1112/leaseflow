Rails.application.routes.draw do
  # Devise for Agent authentication
  devise_for :agents

  # Public-facing lead routes
  get  '/signin',    to: 'leads#new',    as: :signin
  post '/leads',     to: 'leads#create'
  get  '/signed_up', to: 'leads#thanks', as: :signed_up
  get "/rental_applications/compliance", to: "rental_applications#compliance_partial"

  # Public: only allow new/create
  resources :rental_applications, only: [:new, :create]

  # Authenticated root → leads#index (dashboard)
  authenticate :agent do
    root to: 'leads#index', as: :authenticated_root

    resources :leads, only: [:index, :show, :new, :create] do
      member do
        patch :mark_contacted
        patch :mark_uncontacted
        post  :send_email
        post  :send_sms
      end
    end

    # Agents: full CRUD + status actions
    resources :rental_applications do
      member do
        patch :mark_in_review
        patch :approve
        patch :reject
      end
    end
  end

  # Unauthenticated users → sign in
  unauthenticated do
    root to: redirect('/agents/sign_in')
  end
end