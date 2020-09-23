class UsersController < ApplicationController

  skip_before_action :require_login, only: [:create]
  def create
    user = User.create(user_params) 
    if user.valid?
        user.admin = true
        user.save!
        payload = {user_id: user.id}
        token = encode_token(payload, Time.now.to_i + 3600)
        puts token
        render json: {user: user, jwt: token}
    else
        render json: {errors: user.errors.full_messages}, status: :not_acceptable
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
