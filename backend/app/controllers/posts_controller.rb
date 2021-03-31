class PostsController < ApplicationController
  
  def create
    user = User.find_by(username: post_params[:username])
    board = Board.find_by(name: post_params[:board_name])
    post = Post.create(
      title: post_params[:title], 
      text: post_params[:text],
      user_id: user.id,
      board_id: board.id
    )

    if post.valid?
      render json: { post: PostSerializer.new(post) }, status: :created
    else
      render json: { error: 'failed to create post', messages: post.errors.full_messages }, status: :not_acceptable
    end
  end

  def destroy
    post = Post.find_by_id(params[:id])

    if post.valid?
      post.destroy
      render json: { message: 'Post deleted'}, status: :accepted
    else
      render json: { error: 'Post not found' }, status: :not_acceptable
    end
  end

  def videos
    board = Board.find_by(name: "videos")
    posts = Post.where(board_id: board.id)
    serialized_posts = posts.map {|post| PostSerializer.new(post)}
    render json: {posts: serialized_posts}, status: :accepted
  end
  
  def photos
    board = Board.find_by(name: "photos")
    posts = Post.where(board_id: board.id)
    serialized_posts = posts.map {|post| PostSerializer.new(post)}
    render json: {posts: serialized_posts}, status: :accepted
  end
  
  def events
    board = Board.find_by(name: "events")
    posts = Post.where(board_id: board.id)
    serialized_posts = posts.map {|post| PostSerializer.new(post)}
    render json: {posts: serialized_posts}, status: :accepted
  end

  private

  def post_params
    params.require(:post).permit(:title, :text, :board_name, :username)
  end
end
