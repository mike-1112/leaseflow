class AddConfirmableToAgents < ActiveRecord::Migration[7.0]
  def up
    add_column :agents, :confirmation_token,   :string
    add_column :agents, :confirmed_at,         :datetime
    add_column :agents, :confirmation_sent_at, :datetime
    add_column :agents, :unconfirmed_email,    :string # only if using reconfirmable

    add_index  :agents, :confirmation_token, unique: true

    # Mark existing records as confirmed so they can sign in
    Agent.update_all(confirmed_at: Time.current)
  end

  def down
    remove_index  :agents, :confirmation_token
    remove_column :agents, :unconfirmed_email
    remove_column :agents, :confirmation_sent_at
    remove_column :agents, :confirmed_at
    remove_column :agents, :confirmation_token
  end
end
