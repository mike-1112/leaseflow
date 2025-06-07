# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2025_06_07_164839) do
  create_table "agents", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.index ["confirmation_token"], name: "index_agents_on_confirmation_token", unique: true
    t.index ["email"], name: "index_agents_on_email", unique: true
    t.index ["reset_password_token"], name: "index_agents_on_reset_password_token", unique: true
  end

  create_table "leads", force: :cascade do |t|
    t.string "full_name", null: false
    t.string "email", null: false
    t.string "phone", null: false
    t.string "property", null: false
    t.boolean "thank_you_sent", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "contacted"
    t.datetime "contacted_at"
  end

  create_table "rental_applications", force: :cascade do |t|
    t.integer "lead_id", null: false
    t.text "rental_history"
    t.string "employment_status"
    t.integer "annual_income"
    t.string "reference_name"
    t.string "reference_contact"
    t.string "status", default: "new"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "state", default: 0, null: false
    t.boolean "nt_disclosure", default: false, null: false
    t.boolean "nsw_disclosure", default: false, null: false
    t.boolean "vic_disclosure", default: false, null: false
    t.boolean "qld_disclosure", default: false, null: false
    t.boolean "sa_disclosure", default: false, null: false
    t.boolean "wa_disclosure", default: false, null: false
    t.boolean "act_disclosure", default: false, null: false
    t.boolean "tas_disclosure", default: false, null: false
    t.index ["lead_id"], name: "index_rental_applications_on_lead_id"
  end

  add_foreign_key "rental_applications", "leads"
end
