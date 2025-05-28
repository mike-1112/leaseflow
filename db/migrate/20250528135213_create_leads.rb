class CreateLeads < ActiveRecord::Migration[7.0]
  def change
    create_table :leads do |t|
      t.string  :full_name,      null: false
      t.string  :email,          null: false
      t.string  :phone,          null: false
      t.string  :property,       null: false
      t.boolean :thank_you_sent, default: false, null: false

      t.timestamps
    end
  end
end
