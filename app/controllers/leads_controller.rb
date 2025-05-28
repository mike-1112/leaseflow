class LeadsController < ApplicationController
  # Show the sign-in form
  def new
    @lead = Lead.new
  end

  # Handle form submission
  def create
    @lead = Lead.new(lead_params)
    if @lead.save
      # For now we’ll just redirect—email later
      redirect_to signed_up_path(property: @lead.property)
    else
      render :new, status: :unprocessable_entity
    end
  end

  # Thank-you page
  def thanks
    # property comes from params so we can personalize message
    @property = params[:property]
  end

  private

  def lead_params
    params.require(:lead).permit(:full_name, :email, :phone, :property)
  end
end
