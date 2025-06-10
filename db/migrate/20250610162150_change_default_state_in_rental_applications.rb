class ChangeDefaultStateInRentalApplications < ActiveRecord::Migration[7.0]
  def up
    # Set default to 7 (which is :nt in your enum)
    change_column_default :rental_applications, :state, 7

    # Update any existing records with nil state to :nt
    RentalApplication.where(state: nil).update_all(state: 7)
  end

  def down
    # If you want to revert, set it back to no default (or previous default if you had one)
    change_column_default :rental_applications, :state, nil
  end
end