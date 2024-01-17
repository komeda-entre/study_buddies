class AddColumnToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :corporation, :boolean, default: false
    add_column :users, :university, :string
  end
end
 