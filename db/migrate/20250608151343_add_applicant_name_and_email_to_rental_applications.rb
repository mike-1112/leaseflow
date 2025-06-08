class AddApplicantNameAndEmailToRentalApplications < ActiveRecord::Migration[7.0]
  def change
    add_column :rental_applications, :applicant_name, :string
    add_column :rental_applications, :applicant_email, :string
  end
end
