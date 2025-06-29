# app/controllers/leads_controller.rb
class LeadsController < ApplicationController
  before_action :authenticate_agent!, except: %i[new create thanks]
  before_action :set_lead, only: %i[show mark_contacted mark_uncontacted send_email send_sms]

  # GET /leads
  def index
    query  = params[:q].to_s.strip.downcase
    filter = params[:filter].presence || "all"
    @current_filter = filter

    base_scope =
      if query.present?
        term = "%#{query}%"
        Lead.where(
          "LOWER(full_name) LIKE :term OR LOWER(email) LIKE :term OR LOWER(property) LIKE :term",
          term: term
        )
      else
        Lead.all
      end

    # initialize so views never see nil
    @uncontacted_leads = []
    @contacted_leads   = []

    case filter
    when "uncontacted"
      @uncontacted_leads = base_scope.where(contacted_at: nil).order(created_at: :desc)
    when "contacted"
      @contacted_leads = base_scope.where.not(contacted_at: nil).order(contacted_at: :desc)
    else
      # "all"
      @uncontacted_leads = base_scope.where(contacted_at: nil).order(created_at: :desc)
      @contacted_leads   = base_scope.where.not(contacted_at: nil).order(contacted_at: :desc)
    end
  end

  # GET /leads/:id
  def show
  end

  # PATCH /leads/:id/mark_contacted
  def mark_contacted
    @lead.update!(contacted_at: Time.current)
    head :no_content
  end

  # PATCH /leads/:id/mark_uncontacted
  def mark_uncontacted
    @lead.update!(contacted_at: nil)
    head :no_content
  end

  # POST /leads/:id/send_email
  def send_email
    begin
      LeadMailer.quick_message(@lead).deliver_later
      render json: { status: "ok" }
    rescue => e
      Rails.logger.error "Email send failed: #{e.message}"
      render json: { status: "error", message: e.message }, status: :internal_server_error
    end
  end

  # POST /leads/:id/send_sms
  def send_sms
    begin
      TwilioService.new.send_sms(@lead)
      render json: { status: "ok" }
    rescue => e
      Rails.logger.error "SMS send failed: #{e.message}"
      render json: { status: "error", message: e.message }, status: :internal_server_error
    end
  end

  # GET /leads/new
  def new
    @lead = Lead.new
  end

  # POST /leads
  def create
    @lead = Lead.new(lead_params)
    if @lead.save
      redirect_to thanks_leads_path, notice: "Thanks! We'll be in touch shortly."
    else
      render :new
    end
  end

  # GET /leads/thanks
  def thanks
  end

  private

  def set_lead
    @lead = Lead.find(params[:id])
  end

  def lead_params
    params.require(:lead).permit(:full_name, :email, :phone, :property)
  end
end
