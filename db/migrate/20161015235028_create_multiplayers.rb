class CreateMultiplayers < ActiveRecord::Migration[5.0]
  def change
    create_table :multiplayers do |t|

      t.timestamps
    end
  end
end
