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
    # 1) Strip whitespace
    to = to.strip
  
    # 2) If it starts with a leading 0 (Australian local), convert to +61…
    if to.match?(/\A0\d+/)
      to = to.sub(/\A0/, '+61')
    end
  
    # 3) Ensure it's in E.164 form otherwise (you could add more checks here)
    unless to.start_with?('+')
      raise ArgumentError, "Phone number must be in E.164 format or Australian local starting with 0"
    end
  
    # 4) Send via Twilio
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
  
end
