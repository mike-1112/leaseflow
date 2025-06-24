# app/models/rental_application.rb
class RentalApplication < ApplicationRecord
  belongs_to :lead, optional: true

  has_one_attached :identity_proof
  has_one_attached :income_proof

  # Use 'pending' instead of 'new' to avoid enum conflict
  enum status: { pending: 0, in_review: 1, approved: 2, rejected: 3 }
  enum state:  { nsw: 0, vic: 1, qld: 2, wa: 3, sa: 4, tas: 5, act: 6, nt: 7 }

  # Only on create: required fields + attachments + disclosures
  with_options on: :create do
    validates :applicant_name, :applicant_email, :state,
              :rental_history, :employment_status, :annual_income,
              :reference_name, :reference_contact,
              :accepted_compliance, :accepted_privacy,
              :identity_proof, :income_proof,
              presence: true

    validates :applicant_email, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :annual_income,   numericality: { only_integer: true, greater_than: 0 }

    validates :nt_disclosure,  acceptance: true, if: :nt?
    validates :nsw_disclosure, acceptance: true, if: :nsw?
    validates :vic_disclosure, acceptance: true, if: :vic?
    validates :qld_disclosure, acceptance: true, if: :qld?
    validates :sa_disclosure,  acceptance: true, if: :sa?
    validates :wa_disclosure,  acceptance: true, if: :wa?
    validates :act_disclosure, acceptance: true, if: :act?
    validates :tas_disclosure, acceptance: true, if: :tas?
  end

  # Always validate file type & size when an attachment is present
  validate :acceptable_identity_proof, if: -> { identity_proof.attached? }
  validate :acceptable_income_proof,   if: -> { income_proof.attached? }

  private

  def acceptable_identity_proof
    unless identity_proof.content_type.in?(%w[image/png image/jpg image/jpeg application/pdf]) &&
           identity_proof.byte_size <= 5.megabytes
      errors.add(:identity_proof, "must be PNG, JPG or PDF and under 5 MB")
    end
  end

  def acceptable_income_proof
    allowed = %w[image/png image/jpg image/jpeg application/pdf]
    unless income_proof.content_type.in?(allowed) &&
          income_proof.byte_size <= 5.megabytes
      errors.add(
        :income_proof,
        "must be PDF, PNG, JPG or JPEG and under 5 MB"
      )
    end
  end

end
