class UsersController < ApplicationController
  skip_before_action :require_login, only: [:create]
  def create
    user = User.create(user_params)
    if user.valid?
      user.admin = true
      user.save!
      payload = { user_id: user.id }
      token = encode_token(payload, Time.now.to_i + 3600)
      puts token
      render json: { user: user, jwt: token, status: 200 }
    elsif user.errors.full_messages[0] == 'Email has already been taken'
      print 'Email taken'
      render json: {
        status: 409,
        message: 'Email already exists'
      }
    else
      render json: {
        errors: user.errors.full_messages,
        status: 406
      }
    end
  end

  def destroy
    @user = User.find(params[:id])
    if @user
      @user.destroy
      render json: {
        status: 200,
        message: 'User has been deleted'
      }
    else
      render json: {
        status: 500,
        message: 'User not deleted'
      }
    end
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :admin)
  end
end
