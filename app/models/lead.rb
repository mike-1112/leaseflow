class Lead < ApplicationRecord
    after_create_commit -> { broadcast_prepend_to "leads_list" }
    
    # VALIDATIONS
    validates :full_name,
      presence: true,
      length: { maximum: 100 }
  
    validates :email,
      presence: true,
      format: { with: URI::MailTo::EMAIL_REGEXP }
  
    validates :phone,
      presence: true,
      format: {
        with: /\A[\d\-\+\s\(\)]+\z/,
        message: "only allows numbers, spaces, parentheses, + and -"
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
  