RSpec.describe Api::V1::Auth::SessionsController, type: :request do
  describe 'GET /api/v1/auth/sessions' do
    let(:user) { create(:user) }

    context 'when the user is logged in' do
      before do
        # ユーザーをログインさせる
        post '/api/v1/auth/sign_in', params: { email: user.email, password: user.password }
        
        # ログイン後の認証ヘッダーを取得
        auth_headers = {
          'access-token' => response.headers['access-token'],
          'token-type'   => 'Bearer',
          'client'       => response.headers['client'],
          'expiry'       => response.headers['expiry'],
          'uid'          => response.headers['uid']
        }

        # 認証ヘッダーを使用してセッション情報を取得
        get api_v1_auth_sessions_path, headers: auth_headers
      end

      it 'returns is_login true and user data' do
        expect(response).to have_http_status(200)
        json = JSON.parse(response.body)
        expect(json['is_login']).to eq(true)
        expect(json['data']['email']).to eq(user.email)
      end
    end

    context 'when the user is not logged in' do
      before do
        get api_v1_auth_sessions_path
      end

      it 'returns is_login false and an error message' do
        expect(response).to have_http_status(200)
        json = JSON.parse(response.body)
        expect(json['is_login']).to eq(false)
        expect(json['message']).to eq("ユーザーが存在しません")
      end
    end
  end
end
