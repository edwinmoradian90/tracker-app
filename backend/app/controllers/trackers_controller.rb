class TrackersController < ApplicationController

  before_action :set_user

  def create
    @tracker = current_user.trackers.new(tracker_params)
    if @tracker && @tracker.save!
      render json: {
        status: 200,
        message: 'Tracker created',
      }
    else
      render json: {
        status: 500,
        message: 'Could not create tracker',
      }
    end
  end

  def index
    @trackers = Tracker.all
    if @trackers
      render json: {
        status: 200,
        trackers: @trackers,
      }
    else 
      render json: {
        status: 401,
        message: 'Could not find any trackers',
      }
    end
  end

  private

    def tracker_params
      params.require(:tracker).permit(:fuel, :miles_driven, :limit)
    end

    def set_user
      @user = User.find(session[:user_id])
    end

end
