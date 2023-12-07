require 'rails_helper'

RSpec.describe 'Api::V1::Auth::Confirmations', type: :request do
  let(:user) { create(:user, confirmed_at: nil) } # 未確認のユーザーを作成
  let(:raw_confirmation_token) { Devise.friendly_token }
  let(:confirmation_token) { Devise.token_generator.digest(User, :confirmation_token, raw_confirmation_token) }

  before do
    user.confirmation_token = confirmation_token
    user.save
  end

  describe 'GET /api/v1/auth/confirmation' do
    context 'with valid confirmation token' do
      it 'confirms the user and renders success' do
        get "/api/v1/auth/confirmation?confirmation_token=#{raw_confirmation_token}"

        expect(response).to have_http_status(:ok)
        expect(json['data']).to include('uid' => user.email)
        # その他のレスポンスデータの検証...
      end
    end

    context 'with invalid confirmation token' do
      it 'renders an error' do
        get '/api/v1/auth/confirmation?confirmation_token=invalid_token'

        expect(response).to have_http_status(:unprocessable_entity)
        expect(json['errors']).to include('Confirmation token is invalid')
      end
    end
  end

  def json
    JSON.parse(response.body)
  end
end
