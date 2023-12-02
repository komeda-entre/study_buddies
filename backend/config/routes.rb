Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      # ログイン機能のルーティング
      mount_devise_token_auth_for 'User', at: 'auth', skip: [:omniauth_callbacks],controllers: {
        registrations: 'api/v1/auth/registrations',
        confirmations: 'api/v1/auth/confirmations'
      }
      # ログインユーザー取得のルーティング
      namespace :auth do
        resources :sessions, only: %i[index]
      end
      resources :tasks
    end
  end
end
