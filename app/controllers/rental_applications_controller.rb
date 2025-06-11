class RentalApplicationsController < ApplicationController
  # allow anyone to view the form and submit…
  skip_before_action :authenticate_agent!, only: [:new, :create]
  # …but require agent sign-in for everything else
  before_action :authenticate_agent!, only: [:index, :mark_in_review, :approve, :reject]
  before_action :set_rental_application, only: %i[ show edit update destroy mark_in_review approve reject ]

  # GET /rental_applications
  def index
    @rental_applications = if params[:status].present?
      RentalApplication.where(status: params[:status])
    else
      RentalApplication.all
    end.page(params[:page]).per(20)
  end

  # GET /rental_applications/1
  def show
  end

  # GET /rental_applications/new
  def new
  @rental_application = RentalApplication.new
    if params[:lead_id]
      lead = Lead.find_by(id: params[:lead_id])
      @rental_application.assign_attributes(
        applicant_name: lead.full_name,
        applicant_email: lead.email
      ) if lead
    end
  end

  # GET /rental_applications/1/edit
  def edit
  end

  # POST /rental_applications
  def create
    @rental_application = RentalApplication.new(rental_application_params)
    if @rental_application.save
      RentalApplicationMailer.confirmation_email(@rental_application).deliver_later
    begin
        TwilioService.new.send_sms(
          to: @rental_application.applicant_phone,
          body: "Thanks for applying! We’ve received your application and will be in touch soon."
        )
      rescue => e
        Rails.logger.error "SMS failed: #{e.message}"
      end
      redirect_to @rental_application, notice: "Application submitted!"
    else
      render :new
    end
  end

  # PATCH/PUT /rental_applications/1
  def update
    if @rental_application.update(rental_application_params)
      redirect_to @rental_application, notice: "Rental application was successfully updated.", status: :see_other
    else
      render :edit, status: :unprocessable_entity
    end
  end

  # DELETE /rental_applications/1
  def destroy
    @rental_application.destroy
    redirect_to rental_applications_url, notice: "Rental application was successfully destroyed.", status: :see_other
  end

  def mark_in_review
    if @rental_application.update(status: :in_review)
      render json: {status: "ok"}
    else
      render json: {error: "Unable to update"}, status: :unprocessable_entity
    end
  end

  def approve
    if @rental_application.update(status: :approved)
      render json: {status: "ok"}
    else
      render json: {error: "Unable to update"}, status: :unprocessable_entity
    end
  end

  def reject
    if @rental_application.update(status: :rejected)
      render json: {status: "ok"}
    else
      render json: {error: "Unable to update"}, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_rental_application
      @rental_application = RentalApplication.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def rental_application_params
      params.require(:rental_application).permit(
        :applicant_name, :applicant_email, :rental_history, :employment_status, :annual_income, :reference_name, :reference_contact, :status, :state,
        :nt_disclosure, :nsw_disclosure, :vic_disclosure, :qld_disclosure, :sa_disclosure, :wa_disclosure, :act_disclosure, :tas_disclosure,
        :accepted_compliance, :accepted_privacy
      )
    end

    def compliance_partial
      state = params[:state]
      checkbox_html = render_to_string(partial: "rental_applications/compliance/#{state}_field")
      render plain: checkbox_html
    end

end
