FactoryBot.define do
  factory :user do
    email                 { Faker::Internet.email }
    password              { Faker::Internet.password(min_length: 6) }
    password_confirmation { password }
    provider              { "email" }
    uid                   { email } # uidはemailと同じ値を持つと仮定
    encrypted_password    { Devise::Encryptor.digest(User, password) } # Deviseを使用してパスワードを暗号化
    allow_password_change { false }
    name                  { Faker::Name.name }
    nickname              { Faker::Internet.username }
    image                 { Faker::Avatar.image }
    tokens                { {} } # tokensは空のハッシュとして初期化
    confirmed_at          { Time.now } # ユーザーが確認済みとして設定
    confirmation_token    { SecureRandom.hex(10) } # 10文字のランダムなトークンを生成
    confirmation_sent_at  { Time.now } # 確認メールの送信時刻
    unconfirmed_email     { nil } # 未確認のメールアドレスは初期値としてnil
    admin                 {false}
    corporation           {false}
    university            {"university"}
  end
end