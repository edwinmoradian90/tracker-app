class TrackersController < ApplicationController

  def create
    @tracker = session_user.trackers.new(tracker_params)
    if @tracker && @tracker.save! && is_admin
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
    @trackers = session_user.trackers.all
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

  def update
    @tracker = Tracker.find(params[:id])
    @tracker.update(fuel: params[:fuel], amount_driven: params[:amount_driven], limit: params[:limit])
    if @tracker.save! && is_admin
      render json: {
        status: 200,
        message: 'Successfully updated tracker'
      }
    else 
      render json: {
        status: 500,
        message: 'Could not update tracker'
      }
    end
  end

  def show
    @tracker = session_user.trackers.find(params[:id])
    if @tracker
      render json: {
        status: 200,
        tracker: @tracker,
        message: 'Found tracker',
      }
    else
      render json: {
        status: 404,
        message: 'Tracker not found'
      }
    end
  end

  def destroy
    @tracker = Tracker.find(params[:id])
    if @tracker && is_admin
      @tracker.destroy
      render json: {
        status: 200,
        message: 'Tracker deleted'
      }
    else
      render json: {
        status: 404,
        message: 'Could not find tracker'
      }
    end
  end
  
  private

    def tracker_params
      params.require(:tracker).permit(:fuel, :amount_driven, :limit)
    end

    def is_admin
      @user = session_user
      user_is_admin = false
      if @user.admin
        user_is_admin = true 
      end
      user_is_admin
    end

end
