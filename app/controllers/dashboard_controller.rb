class DashboardController < ApplicationController
  # ensures only signed-in agents can access
  before_action :authenticate_agent!

  def index
    # Most recent 50 leads
    @leads = Lead.order(created_at: :desc).limit(50)
  end
end
