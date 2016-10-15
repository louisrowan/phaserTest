class CreateFractions < ActiveRecord::Migration[5.0]
  def change
    create_table :fractions do |t|

      t.timestamps
    end
  end
end
