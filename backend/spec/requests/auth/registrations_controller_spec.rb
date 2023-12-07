require 'rails_helper'

RSpec.describe 'Api::V1::RegistrationsControllerSpec', type: :request do
  describe 'POST /auth' do
    let(:user_attributes) { attributes_for(:user) }
    let(:confirm_success_url) { 'http://localhost:4000' }

    subject { post '/api/v1/auth', params: params.to_json, headers: json_headers }

    context 'when the request is valid' do
      let(:params) { user_attributes.merge(confirm_success_url: confirm_success_url) }

      before { subject }

      it 'creates a user' do
        expect(response).to have_http_status(200)
        expect(json['status']).to eq('success')
        expect(User.find_by(email: params[:email])).to be_present
      end
    end

    context 'when the request is invalid' do
      let(:params) { user_attributes.merge(password_confirmation: 'wrong_password', confirm_success_url: confirm_success_url) }

      before { subject }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
        expect(json['errors']['password_confirmation']).to include("doesn't match Password")
      end
    end
  end
end
