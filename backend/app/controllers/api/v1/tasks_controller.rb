class Api::V1::TasksController < ApplicationController
  before_action :set_task, only: [:destroy]
  # before_action :authenticate_api_v1_user!, except: [:index]
  
  def index
    render json: { tasks: Task.all }, status: :ok
  end

  def create
    @task = Task.new(task_params)  
    @task.user_id = current_api_v1_user.id 
    # task = current_api_v1_user.tasks.build(task_params)
    if @task.save
      render json: { task: @task }, status: :created
    else
      render json: { message: "Taskの作成に失敗しました", errors: @task.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    if @task.user == current_api_v1_user
      if @task.destroy
        render json: { task: @task }, status: :ok
      else
        render json: { message: "Taskの削除に失敗しました" }, status: :unprocessable_entity
      end
    else
      render json: { message: "権限がありません" }, status: :forbidden
    end
  end

  private

  def set_task
    @task = Task.find_by(id: params[:id])
    unless @task
      render json: { message: "Task not found" }, status: :not_found
    end
  end

  def task_params
    params.require(:task).permit(:title).merge(user: current_api_v1_user)
  end
end
