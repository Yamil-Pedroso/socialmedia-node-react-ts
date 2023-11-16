import { Box, Typography, useTheme } from '@mui/material'
import Friend from '../../components/Friend'
import WidgetWrapper from '../../components/WidgetWrapper'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFriends } from '../../state'

interface FriendListWidgetProps {
  userId: string
}

const FriendListWidget = ({ userId }: FriendListWidgetProps) => {
  const dispatch = useDispatch()
  const { palette } = useTheme()
  const token = useSelector((state: any) => state.token)
  const friends = useSelector((state: any) => state.user.friends)

  const getFriends = async () => {
    const response = await fetch(
      `https://linkto-me.onrender.com/api/v1/users/${userId}/friends`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      },
    )
    const data = await response.json()
    dispatch(setFriends({ friends: data }))
  }

  useEffect(() => {
    getFriends()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color={palette.grey[600]}
        variant="h5"
        fontWeight="500"
        sx={{ mb: '1.5rem' }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend: any) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picPath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  )
}

export default FriendListWidget
