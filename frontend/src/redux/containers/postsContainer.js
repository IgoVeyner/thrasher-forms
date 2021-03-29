import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPosts } from '../actions/postActions'
import Posts from '../components/posts';

export default function PostContainer({ route }) {

  const posts = useSelector(state => state.posts)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPosts(route))
  }, [route])

  return (
    <div>
      <h1>Posts</h1>
      {posts.length > 0 ? <Posts posts={posts} /> : null }
    </div>
  )

}