class RentalApplicationMailer < ApplicationMailer
  def confirmation_email(application)
    @application = application
    mail(to: @application.applicant_email,
         subject: "Your Rental Application Submission Confirmation")
  end
end