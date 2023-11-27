import { Box, useMediaQuery } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Navbar from '../../scenes/navbar'
import FriendListWidget from '../../scenes/widgets/FriendListWidget'
import MyPostWidget from '../../scenes/widgets/MyPostWidget'
import PostsWidget from '../../scenes/widgets/PostsWidget'
import UserWidget from '../../scenes/widgets/UserWidget'

const ProfilePage = () => {
  const renderProxy = 'https://linkto-me.onrender.com'
  //const localhostProxy = 'http://localhost:3001'

  const [user, setUser] = useState(null) as any
  const { userId } = useParams() as any
  const token = useSelector((state: any) => state.token)
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)')

  const getUser = async () => {
    const response = await fetch(`${renderProxy}/api/v1/users/${userId}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await response.json()
    setUser(data)
  }

  useEffect(() => {
    getUser()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null

  return (
    <Box>
      <Navbar closeDropdowns={function (): void {
        throw new Error('Function not implemented.')
      } } id={0} title={''} description={''} date={''} />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? 'flex' : 'block'}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
          <UserWidget
            userId={userId}
            picPath={user.picPath}
            userPicturePath={''}
          />
          <Box m="2rem 0" />
          <FriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? '42%' : undefined}
          mt={isNonMobileScreens ? undefined : '2rem'}
        >
          <MyPostWidget picPath={user.picPath} />
          <Box m="2rem 0" />
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  )
}

export default ProfilePage
