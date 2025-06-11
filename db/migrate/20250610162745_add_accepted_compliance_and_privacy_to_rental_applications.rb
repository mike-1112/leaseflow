class AddAcceptedComplianceAndPrivacyToRentalApplications < ActiveRecord::Migration[7.0]
  def change
    add_column :rental_applications, :accepted_compliance, :boolean
    add_column :rental_applications, :accepted_privacy, :boolean
  end
end
