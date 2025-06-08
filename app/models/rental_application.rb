class RentalApplication < ApplicationRecord
  #belongs_to :lead

  has_one_attached :identity_proof
  has_one_attached :income_proof

  validates :applicant_name, presence: true
  validates :applicant_email, presence: true
  enum state: { nt: 0, nsw: 1, vic: 2, qld: 3, sa: 4, wa: 5, act: 6, tas: 7 }
  validates :state, presence: true

  validates :nt_disclosure,  acceptance: true, if: :nt?
  validates :nsw_disclosure, acceptance: true, if: :nsw?
  validates :vic_disclosure, acceptance: true, if: :vic?
  validates :qld_disclosure, acceptance: true, if: :qld?
  validates :sa_disclosure,  acceptance: true, if: :sa?
  validates :wa_disclosure,  acceptance: true, if: :wa?
  validates :act_disclosure, acceptance: true, if: :act?
  validates :tas_disclosure, acceptance: true, if: :tas?

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
    unless income_proof.content_type == "application/pdf" &&
           income_proof.byte_size <= 5.megabytes
      errors.add(:income_proof, "must be PDF and under 5 MB")
    end
  end
end