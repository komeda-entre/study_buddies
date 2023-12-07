class Api::V1::UsersController < ApplicationController
    def update
        @user = User.find(params[:id])
        if @user.update(user_params)
            render json: { user: @user }, status: :ok
        else
            render json: { message: "Userの更新に失敗しました", errors: @user.errors }, status: :unprocessable_entity
        end
    end
    private
    def user_params
        params.require(:user).permit(:image)
    end
end