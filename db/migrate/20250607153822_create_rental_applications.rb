class CreateRentalApplications < ActiveRecord::Migration[7.0]
  def change
    create_table :rental_applications do |t|
      t.references :lead, null: false, foreign_key: true
      t.text :rental_history
      t.string :employment_status
      t.integer :annual_income
      t.string :reference_name
      t.string :reference_contact
      t.string :status

      t.timestamps
    end
  end
end
