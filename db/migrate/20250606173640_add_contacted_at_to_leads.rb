class AddContactedAtToLeads < ActiveRecord::Migration[7.0]
  def change
    add_column :leads, :contacted_at, :datetime
  end
end
