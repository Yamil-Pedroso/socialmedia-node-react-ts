import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material'
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setFriends } from '../state'
import FlexBetween from './FlexBetween'
import UserImg from './UserImg'

interface FriendProps {
  friendId: string
  name: string
  subtitle: string
  picPath?: string
  userPicturePath?: string
}

const Friend = ({ friendId, name, subtitle, userPicturePath }: FriendProps) => {
  const renderProxy = 'https://linkto-me.onrender.com'
  //const localhostProxy = 'http://localhost:3001'

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { _id } = useSelector((state: any) => state.user)
  const token = useSelector((state: any) => state.token)
  const friends = useSelector((state: any) => state.user.friends)

  const { palette } = useTheme()
  const primaryLight = palette.primary.light
  const primaryDark = palette.primary.dark
  const main = palette.grey[600]

  const isFriend = friends.find((friend: any) => friend._id === friendId)

  const patchFriend = async () => {
    const response = await fetch(
      `${renderProxy}/api/v1/users/${_id}/${friendId}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    )
    const data = await response.json()
    dispatch(setFriends({ friends: data }))
  }

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImg picPath={userPicturePath} />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`)
            navigate(0)
          }}
        >
          <Typography
            color="text.primary"
            variant="h5"
            fontWeight="500"
            sx={{
              '&:hover': {
                cursor: 'pointer',
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={main} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton
        onClick={() => patchFriend()}
        sx={{ backgroundColor: primaryLight, p: '0.6rem' }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>
    </FlexBetween>
  )
}

export default Friend
