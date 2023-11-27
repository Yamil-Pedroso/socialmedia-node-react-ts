import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from '../../state'
import PostWidget from './PostWidget'

interface PostsWidgetProps {
  userId: string
  isProfile?: boolean
}

interface Post {
  _id: string
  userId: string
  firstName: string
  lastName: string
  description: string
  location: string
  picPath: string
  userPicturePath: string
  likes: any[]
  comments: any[]
}

const PostsWidget = ({ userId, isProfile = false }: PostsWidgetProps) => {
  const renderProxy = 'https://linkto-me.onrender.com'
  //const localhostProxy = 'http://localhost:3001'

  const dispatch = useDispatch()
  const posts = useSelector((state: any) => state.posts)
  const token = useSelector((state: any) => state.token)

  const getPosts = async () => {
    const response = await fetch(`${renderProxy}/api/v1/posts`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await response.json()
    dispatch(setPosts({ posts: data }))
  }

  const getUserPosts = async () => {
    const response = await fetch(`${renderProxy}/posts/${userId}/posts`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await response.json()
    dispatch(setPosts({ posts: data }))
  }

  useEffect(() => {
    if (isProfile) {
      getUserPosts()
    } else {
      getPosts()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  console.log('posts', posts)

  return (
    <>
      {Array.isArray(posts) &&
        posts.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            location,
            picPath,
            userPicturePath,
            likes,
            comments,
          }: Post) => (
            <PostWidget
              key={_id}
              postId={_id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              description={description}
              location={location}
              picPath={picPath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
            />
          ),
        )}
    </>
  )
}

export default PostsWidget
