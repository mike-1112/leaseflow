class LeadMailer < ApplicationMailer
  default from: "no-reply@leaseflow.local"

  def thank_you_email
    @lead = params[:lead]
    @url  = signed_up_url(property: @lead.property)
    mail(
      to: @lead.email,
      subject: "Thanks for inspecting #{@lead.property} – next steps"
    )
  end
end
