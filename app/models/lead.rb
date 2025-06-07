class Lead < ApplicationRecord
  after_create_commit -> { broadcast_prepend_to "leads_list" }

  # VALIDATIONS
  validates :full_name,
    presence: true,
    length: { maximum: 100 }

  validates :email,
    presence: true,
    format: { with: URI::MailTo::EMAIL_REGEXP, message: "must be a valid email address" }

  # Australian phone (basic AU mobile number regex, allows +61 or 04 at start, then 8 digits)
  validates :phone,
    presence: true,
    format: {
      with: /\A(\+?61|0)4\d{8}\z/,
      message: "must be a valid Australian mobile number"
    }

  validates :property,
    presence: true,
    length: { maximum: 200 }

  # CALLBACKS
  before_validation :strip_whitespace

  private

  # Remove leading/trailing whitespace from all string attributes
  def strip_whitespace
    %w[full_name email phone property].each do |attr|
      value = self[attr]
      self[attr] = value.strip if value.respond_to?(:strip)
    end
  end
end