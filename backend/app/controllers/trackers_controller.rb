class TrackersController < ApplicationController

  def create
    @tracker = session_user.trackers.new(tracker_params)
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
    if @tracker.save!
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

  private

    def tracker_params
      params.require(:tracker).permit(:fuel, :amount_driven, :limit)
    end

end
