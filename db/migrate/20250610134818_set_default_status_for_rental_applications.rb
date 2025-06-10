class SetDefaultStatusForRentalApplications < ActiveRecord::Migration[7.0]
  def up
    change_column_default :rental_applications, :status, 0
    RentalApplication.where(status: nil).update_all(status: 0)
  end

  def down
    change_column_default :rental_applications, :status, nil
  end
end