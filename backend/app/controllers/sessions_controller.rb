class SessionsController < ApplicationController

  skip_before_action :require_login, only: [:login, :auto_login]
  def login
    user = User.find_by(email: params[:email])
    if user && user.authenticate(params[:password])
        user.admin = true
        user.save!
        payload = {user_id: user.id}
        token = encode_token(payload, Time.now.to_i + 3600)
        render json: {user: user, jwt: token, status: 200}
    else
        render json: {status: 500, message: 'Failed to log in'}
    end
  end

  def logout
    @user = session_user
    print @user
    if @user
      @user.admin = false
      @user.save!
      render json: {
        status: 200,
        message: 'User has been logged out'
      }
    else
      render json: {
        status: 500,
        message: 'An error has occured. Unable to log out user'
      }
    end
  end

  def auto_login
    if session_user
      render json: session_user
    else
      render json: {errors: "No User Logged In"}
    end
  end

  def user_is_authed
    if session_user
      render json: {
        status: 200,
        message: "You are authorized",
        user: session_user
      }
    else
      render json: {
        status: 500,
        message: "You are not authorized"
      }
    end
  end 
end

