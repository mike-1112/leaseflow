class ChangeStatusToIntegerOnRentalApplications < ActiveRecord::Migration[7.0]
  def up
    # Add a new integer column to hold the new values
    add_column :rental_applications, :status_int, :integer, default: 0, null: false

    # Copy over values, mapping string/enumerated status to integer
    RentalApplication.reset_column_information
    RentalApplication.find_each do |app|
      int_value =
        case app.status
        when "pending", "0"
          0
        when "in_review", "1"
          1
        when "approved", "2"
          2
        when "rejected", "3"
          3
        else
          0 # fallback to pending if unknown
        end
      app.update_column(:status_int, int_value)
    end

    # Remove the old string column and rename the new one
    remove_column :rental_applications, :status
    rename_column :rental_applications, :status_int, :status
  end

  def down
    add_column :rental_applications, :status_str, :string, default: "pending"

    RentalApplication.reset_column_information
    RentalApplication.find_each do |app|
      str_value =
        case app.status
        when 0
          "pending"
        when 1
          "in_review"
        when 2
          "approved"
        when 3
          "rejected"
        else
          "pending"
        end
      app.update_column(:status_str, str_value)
    end

    remove_column :rental_applications, :status
    rename_column :rental_applications, :status_str, :status
  end
end