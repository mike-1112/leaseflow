class LeadsController < ApplicationController
  # Protect from CSRF attacks (enabled by default)
  protect_from_forgery with: :exception

  # Show the sign-in form
  def new
    @lead = Lead.new
  end

  # Handle form submission
  def create
    @lead = Lead.new(lead_params)

    if @lead.save
      # Send thank-you email asynchronously
      #LeadMailer.with(lead: @lead).thank_you_email.deliver_later
      LeadMailer.with(lead: @lead).thank_you_email.deliver_now
      TwilioService.new.send_sms(
        to:   @lead.phone,
        body: "Thanks for inspecting #{@lead.property}! " \
              "Complete your application: #{signed_up_url(property: @lead.property)}"
      )
      redirect_to signed_up_path(property: @lead.property), notice: "Check your email & SMS!"
    else
      …
    end
    
  end

  # Thank-you page
  def thanks
    @property = params[:property]
  end

  private

  # Strong parameters: only allow specific, permitted fields
  def lead_params
    params.require(:lead).permit(:full_name, :email, :phone, :property)
  end

  # PATCH /leads/:id/mark_contacted
  def mark_contacted
    @lead = Lead.find(params[:id])
    #@lead.update!(contacted: true)
    lead.update!(thank_you_sent: true)
    head :no_content
  end
end
