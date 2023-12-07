class Api::V1::Auth::ConfirmationsController <  DeviseTokenAuth::ConfirmationsController
    def show
      @resource = resource_class.confirm_by_token(resource_params[:confirmation_token])

      if @resource.errors.empty?
        yield @resource if block_given?
        create_and_assign_token

        sign_in(@resource, scope: :user, store: false, bypass: false)

        yield @resource if block_given?

        render_create_success
      else
          logger.error "バリデーションエラー: #{@resource.errors.full_messages}"
          render json: { errors: @resource.errors.full_messages }, status: :unprocessable_entity
      end
    end

    private



    def create_and_assign_token
      if @resource.respond_to?(:with_lock)
        @resource.with_lock do
          @token = @resource.create_token
          @resource.save!
        end
      else
        @token = @resource.create_token
        @resource.save!
      end
    end

    def render_create_success
      render json: {
        data: resource_data(resource_json: @resource.token_validation_response)
      }
    end

end
