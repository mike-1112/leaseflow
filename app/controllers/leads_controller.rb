class LeadsController < ApplicationController
  before_action :authenticate_agent!, except: [:new, :create, :thanks]
  before_action :set_lead, only: [:show, :mark_contacted, :mark_uncontacted, :send_email, :send_sms]

  # GET /leads
  def index
    query = params[:q].to_s.strip.downcase

    if query.present?
      @uncontacted_leads = Lead.where(contacted_at: nil)
        .where("LOWER(full_name) LIKE :q OR LOWER(email) LIKE :q OR LOWER(property) LIKE :q", q: "%#{query}%")
        .order(created_at: :desc)
      @contacted_leads = Lead.where.not(contacted_at: nil)
        .where("LOWER(full_name) LIKE :q OR LOWER(email) LIKE :q OR LOWER(property) LIKE :q", q: "%#{query}%")
        .order(created_at: :desc)
    else
      @uncontacted_leads = Lead.where(contacted_at: nil).order(created_at: :desc)
      @contacted_leads = Lead.where.not(contacted_at: nil).order(created_at: :desc)
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