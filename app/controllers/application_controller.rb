class ApplicationController < ActionController::Base
    # Require an authenticated Agent for every page
    before_action :authenticate_agent!
  end
  