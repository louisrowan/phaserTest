class MultiplayersController < ApplicationController
  before_action :set_multiplayer, only: [:show, :edit, :update, :destroy]

  # GET /multiplayers
  # GET /multiplayers.json
  def index
    @multiplayers = Multiplayer.all
  end

  # GET /multiplayers/1
  # GET /multiplayers/1.json
  def show
  end

  # GET /multiplayers/new
  def new
    @multiplayer = Multiplayer.new
  end

  # GET /multiplayers/1/edit
  def edit
  end

  # POST /multiplayers
  # POST /multiplayers.json
  def create
    @multiplayer = Multiplayer.new(multiplayer_params)

    respond_to do |format|
      if @multiplayer.save
        format.html { redirect_to @multiplayer, notice: 'Multiplayer was successfully created.' }
        format.json { render :show, status: :created, location: @multiplayer }
      else
        format.html { render :new }
        format.json { render json: @multiplayer.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /multiplayers/1
  # PATCH/PUT /multiplayers/1.json
  def update
    respond_to do |format|
      if @multiplayer.update(multiplayer_params)
        format.html { redirect_to @multiplayer, notice: 'Multiplayer was successfully updated.' }
        format.json { render :show, status: :ok, location: @multiplayer }
      else
        format.html { render :edit }
        format.json { render json: @multiplayer.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /multiplayers/1
  # DELETE /multiplayers/1.json
  def destroy
    @multiplayer.destroy
    respond_to do |format|
      format.html { redirect_to multiplayers_url, notice: 'Multiplayer was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_multiplayer
      @multiplayer = Multiplayer.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def multiplayer_params
      params.fetch(:multiplayer, {})
    end
end
