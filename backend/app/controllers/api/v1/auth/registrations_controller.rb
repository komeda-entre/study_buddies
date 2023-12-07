class Api::V1::Auth::RegistrationsController <  DeviseTokenAuth::RegistrationsController
    private

    def sign_up_params
        # サインアップ時に登録できるカラムを指定
        params.permit(:name, :university, :email, :password, :password_confirmation,:corporation)
    end
end
