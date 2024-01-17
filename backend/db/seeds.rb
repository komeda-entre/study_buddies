# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
User.create!(
  email: 'bei73ok@gmail.com',
  password: '1111111',
  password_confirmation: '1111111',
  name: "康喜",
  nickname: "koki",
  university: "同志社大学",
  confirmed_at: Time.now,
  confirmation_token: SecureRandom.hex(10),
  confirmation_sent_at: Time.now,
  admin: true
)
User.create!(
  email: 'komeda.entre@gmail.com',
  password: '1111111',
  password_confirmation: '1111111',
  name: "コメダ",
  university: "コメダダイガク",
  nickname: "komeda",
  confirmed_at: Time.now,
  confirmation_token: SecureRandom.hex(10),
  confirmation_sent_at: Time.now,
  admin: false
)
