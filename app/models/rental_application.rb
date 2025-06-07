class RentalApplication < ApplicationRecord
  belongs_to :lead

  enum state: { nt: 0, nsw: 1, vic: 2, qld: 3, sa: 4, wa: 5, act: 6, tas: 7 }
  validates :state, presence: true

  # Per-state compliance validations:
  validates :nt_disclosure, acceptance: true, if: :nt?
  validates :nsw_disclosure, acceptance: true, if: :nsw?
  validates :vic_disclosure, acceptance: true, if: :vic?
  validates :qld_disclosure, acceptance: true, if: :qld?
  validates :sa_disclosure,  acceptance: true, if: :sa?
  validates :wa_disclosure,  acceptance: true, if: :wa?
  validates :act_disclosure, acceptance: true, if: :act?
  validates :tas_disclosure, acceptance: true, if: :tas?
end