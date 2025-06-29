require 'twilio-ruby'

class TwilioService
  def initialize
    @client = Twilio::REST::Client.new(
      ENV.fetch("TWILIO_ACCOUNT_SID"),
      ENV.fetch("TWILIO_AUTH_TOKEN")
    )
    @from = ENV.fetch("TWILIO_PHONE_NUMBER")
  end

  def send_sms(to:, body:)
    resp = @client.messages.create(
      from: @from,
      to:   to,
      body: body
    )
    Rails.logger.info "📱 SMS sent to #{to}, SID=#{resp.sid}"
    resp
  rescue StandardError => e
    Rails.logger.error "⚠️ SMS error to #{to}: #{e.message}"
    raise
  end

   # helper for leads
  def send_lead_sms(lead)
    send_sms(
      to:   lead.applicant_phone || lead.phone,
      body: "Hi #{lead.full_name}, thanks for reaching out. We’ll be in touch shortly!"
    )
  end
end
