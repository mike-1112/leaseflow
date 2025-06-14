class LeadsController < ApplicationController
  before_action :authenticate_agent!, except: [:new, :create, :thanks]
  before_action :set_lead, only: [:show, :mark_contacted, :mark_uncontacted, :send_email, :send_sms]

  # GET /leads
  def index
    query = params[:q].to_s.strip.downcase
    filter = params[:filter] || "all"
    @current_filter = filter

    if query.present?
      term = "%#{query}%"
      base_scope = Lead.where(
        "LOWER(full_name) LIKE :term OR LOWER(email) LIKE :term OR LOWER(property) LIKE :term",
        term: term
      )
    else
      base_scope = Lead.all
    end

    case filter
    when "uncontacted"
      @uncontacted_leads = base_scope.where(contacted_at: nil).order(created_at: :desc)
      @contacted_leads = []
    when "contacted"
      @uncontacted_leads = []
      @contacted_leads = base_scope.where.not(contacted_at: nil).order(contacted_at: :desc)
    else # "all"
      @uncontacted_leads = base_scope.where(contacted_at: nil).order(created_at: :desc)
      @contacted_leads = base_scope.where.not(contacted_at: nil).order(contacted_at: :desc)
    end
  end

  # GET /leads/:id
  def show
  end

  # PATCH /leads/:id/mark_contacted
  def mark_contacted
    @lead.update(contacted_at: Time.current)
    head :no_content
  end

  # PATCH /leads/:id/mark_uncontacted
  def mark_uncontacted
    @lead.update(contacted_at: nil)
    head :no_content
  end

  # POST /leads/:id/send_email
  def send_email
    begin
      LeadMailer.quick_message(@lead).deliver_later
      render json: { status: "ok" }
    rescue => e
      logger.error e.message
      render json: { status: "error", message: e.message }, status: :internal_server_error
    end
  end

  # POST /leads/:id/send_sms
  def send_sms
    begin
      TwilioService.send_lead_sms(@lead)
      render json: { status: "ok" }
    rescue => e
      logger.error e.message
      render json: { status: "error", message: e.message }, status: :internal_server_error
    end
  end

  # new, create, thanks unchanged...

  private

  def set_lead
    @lead = Lead.find(params[:id])
  end
end