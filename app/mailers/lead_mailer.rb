class LeadMailer < ApplicationMailer
  default from: ENV.fetch("SENDGRID_FROM")

  def thank_you_email
    @lead = params[:lead]
    @url  = signed_up_url(property: @lead.property)
    mail(
      to: @lead.email,
      subject: "Thanks for inspecting #{@lead.property} – next steps"
    )
  end

  # called from LeadsController#send_email
  def quick_message(lead)
    @lead = lead
    mail(
      to:      @lead.email,
      subject: "Thanks for your enquiry!"
    )
  end
end
