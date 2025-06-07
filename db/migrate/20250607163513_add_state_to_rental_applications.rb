class AddStateToRentalApplications < ActiveRecord::Migration[7.0]
  def change
    add_column :rental_applications, :state, :integer, null: false, default: 0
  end
end
