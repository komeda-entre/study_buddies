Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      # ログイン機能のルーティング
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations'
      }
      # ログインユーザー取得のルーティング
      namespace :auth do
        resources :sessions, only: %i[index]
      end
    end
  end
end
