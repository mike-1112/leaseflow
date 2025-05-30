class AddContactedToLeads < ActiveRecord::Migration[7.0]
  def change
    add_column :leads, :contacted, :boolean
  end
end
