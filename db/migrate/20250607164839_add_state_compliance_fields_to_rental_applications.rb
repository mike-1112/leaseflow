class AddStateComplianceFieldsToRentalApplications < ActiveRecord::Migration[7.0]
  def change
    add_column :rental_applications, :nt_disclosure,  :boolean, default: false, null: false
    add_column :rental_applications, :nsw_disclosure, :boolean, default: false, null: false
    add_column :rental_applications, :vic_disclosure, :boolean, default: false, null: false
    add_column :rental_applications, :qld_disclosure, :boolean, default: false, null: false
    add_column :rental_applications, :sa_disclosure,  :boolean, default: false, null: false
    add_column :rental_applications, :wa_disclosure,  :boolean, default: false, null: false
    add_column :rental_applications, :act_disclosure, :boolean, default: false, null: false
    add_column :rental_applications, :tas_disclosure, :boolean, default: false, null: false
  end
end
