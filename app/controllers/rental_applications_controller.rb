class RentalApplicationsController < ApplicationController
  before_action :set_rental_application, only: %i[ show edit update destroy ]

  # GET /rental_applications
  def index
    @rental_applications = RentalApplication.all
  end

  # GET /rental_applications/1
  def show
  end

  # GET /rental_applications/new
  def new
    @rental_application = RentalApplication.new
  end

  # GET /rental_applications/1/edit
  def edit
  end

  # POST /rental_applications
  def create
    @rental_application = RentalApplication.new(rental_application_params)

    if @rental_application.save
      redirect_to @rental_application, notice: "Rental application was successfully created."
    else
      render :new, status: :unprocessable_entity
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

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_rental_application
      @rental_application = RentalApplication.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def rental_application_params
      params.require(:rental_application).permit(
        :lead_id, :rental_history, :employment_status, :annual_income, :reference_name, :reference_contact, :status, :state,
        :nt_disclosure, :nsw_disclosure, :vic_disclosure, :qld_disclosure, :sa_disclosure, :wa_disclosure, :act_disclosure, :tas_disclosure
      )
    end

    def compliance_partial
      state = params[:state]
      checkbox_html = render_to_string(partial: "rental_applications/compliance/#{state}_field")
      render plain: checkbox_html
    end
end
