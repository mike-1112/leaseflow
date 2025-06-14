class AddTrackableToAgents < ActiveRecord::Migration[7.0]
  def change
    add_column :agents, :sign_in_count,      :integer, default: 0, null: false
    add_column :agents, :current_sign_in_at, :datetime
    add_column :agents, :last_sign_in_at,    :datetime
    add_column :agents, :current_sign_in_ip, :string
    add_column :agents, :last_sign_in_ip,    :string
  end
end
