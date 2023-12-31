import React, { useState, useEffect } from 'react'
import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  GitHub,
  LinkedIn,
  Work,
} from '@mui/icons-material'
import { Box, Typography, Divider, useTheme, TextField } from '@mui/material'
import UserImage from '../../components/UserImg'
import FlexBetween from '../../components/FlexBetween'
import WidgetWrapper from '../../components/WidgetWrapper'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

interface UserWidgetProps {
  userId: string | undefined
  picPath: string
  userPicturePath: string
}

interface User {
  firstName: string
  lastName: string
  location: string
  occupation: string
  userPicturePath?: string
  viewedProfile: number
  impressions: number
  friends: []
}

const UserWidget = ({ userId, picPath }: UserWidgetProps) => {
  //const localhostProxy = 'http://localhost:3001'
  const renderProxy = 'https://linkto-me.onrender.com'

  const [isEditing, setIsEditing] = useState(false)
  const [editedValue, setEditedValue] = useState('')
  const [originalValue, setOriginalValue] = useState('')

  const [user, setUser] = useState(null)
  const { palette } = useTheme()
  const navigate = useNavigate()
  const token = useSelector((state: any) => state.token)
  const medium = palette.grey[500]
  const main = palette.primary.main

  const getUser = async () => {
    const response = await fetch(`${renderProxy}/api/v1/users/${userId}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await response.json()
    setUser(data)
    setOriginalValue(data.firstName) // Inicializar el valor original con el nombre del usuario
    setEditedValue(data.firstName) // Inicializar el valor editado con el nombre del usuario
  }

  useEffect(() => {
    getUser()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleEditClick = () => {
    setIsEditing(!isEditing)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedValue(event.target.value)
  }

  const handleEditComplete = () => {
    // Simulación de la lógica de guardar en el servidor
    if (originalValue !== editedValue) {
      // Aquí puedes implementar la lógica para guardar en el servidor
      console.log('Guardando en el servidor:', editedValue)
    }

    setIsEditing(false)
  }

  if (!user) {
    // Manejo del caso cuando user es null o undefined
    return null // o puedes mostrar un mensaje de error, etc.
  }
  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user as User

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage picPath={picPath} />
          <Box>
            <Typography
              variant="h4"
              color={'text.primary'}
              fontWeight="500"
              sx={{
                '&:hover': {
                  cursor: 'pointer',
                },
              }}
            >
              {isEditing ? (
                <TextField
                  value={editedValue}
                  onChange={handleInputChange}
                  onBlur={handleEditComplete}
                  fullWidth
                  InputProps={{
                    style: { color: 'transparent', borderBottom: 'none' },
                  }}
                />
              ) : (
                <>
                  {firstName} {lastName}
                </>
              )}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        {/* GitHub */}
        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <GitHub sx={{ color: main, fontSize: '2rem' }} />
            <Box>
              {isEditing ? (
                <TextField
                  value={editedValue}
                  onChange={handleInputChange}
                  onBlur={handleEditComplete}
                  fullWidth
                  InputProps={{
                    style: { color: 'transparent', borderBottom: 'none' },
                  }}
                />
              ) : (
                <Link
                  to="https://github.com/Yamil-Pedroso"
                  target="_blank"
                  style={{ textDecoration: 'none' }}
                >
                  <Typography color={main} fontWeight="500">
                    Github
                  </Typography>
                </Link>
              )}
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} onClick={handleEditClick} />
        </FlexBetween>

        {/* LinkedIn */}
        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <LinkedIn sx={{ color: main, fontSize: '2rem' }} />
            <Box>
              {isEditing ? (
                <TextField
                  value={editedValue}
                  onChange={handleInputChange}
                  onBlur={handleEditComplete}
                  fullWidth
                  InputProps={{
                    style: { color: 'transparent', borderBottom: 'none' },
                  }}
                />
              ) : (
                <Link
                  to="https://www.linkedin.com/in/yamil-pedroso/"
                  target="_blank"
                  style={{ textDecoration: 'none' }}
                >
                  <Typography color={main} fontWeight="500">
                    Linkedin
                  </Typography>
                </Link>
              )}
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} onClick={handleEditClick} />
        </FlexBetween>

        {/* Website */}
        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <Work sx={{ color: main, fontSize: '2rem' }} />
            <Box>
              {isEditing ? (
                <TextField
                  value={editedValue}
                  onChange={handleInputChange}
                  onBlur={handleEditComplete}
                  fullWidth
                  InputProps={{
                    style: { color: 'transparent', borderBottom: 'none' },
                  }}
                />
              ) : (
                <Link
                  to="https://www.yamilwebdeveloper.com/"
                  target="_blank"
                  style={{ textDecoration: 'none' }}
                >
                  <Typography color={main} fontWeight="500">
                    Website
                  </Typography>
                </Link>
              )}
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} onClick={handleEditClick} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  )
}

export default UserWidget
