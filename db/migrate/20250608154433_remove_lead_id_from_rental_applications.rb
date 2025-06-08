class RemoveLeadIdFromRentalApplications < ActiveRecord::Migration[7.0]
  def change
    remove_column :rental_applications, :lead_id, :integer
  end
end
