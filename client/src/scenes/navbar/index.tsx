import { useState } from 'react'
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { setMode, setLogout } from '../../state'
import { useNavigate } from 'react-router-dom'
import FlexBetween from '../../components/FlexBetween'
import styles from './styles'

const Navbar: React.FC = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state: any) => state.user)
  const mode = useSelector((state: any) => state.mode)
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)')

  const theme = useTheme()
  const neutralLight = theme.palette.grey[200]
  const dark = theme.palette.grey[900]
  const alt = theme.palette.background.paper

  const fullName = `${user.firstName} ${user.lastName}`

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontSize="clamp(1rem, 1.5rem, 2.25rem)"
          color={mode === 'dark' ? '#fff' : '#000'}
          onClick={() => navigate('/home')}
          sx={{
            '&:hover': {
              cursor: 'pointer',
            },
          }}
        >
          <Box
            sx={{
              ...styles.box,
              ...(mode === 'dark' && { border: 'none', boxShadow: 'none' }),
            }}
          >
            Linkto<span style={{ color: '#00D5FA' }}>Me</span>
          </Box>
        </Typography>
        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            mt="0.7rem"
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem .8rem"
          >
            <InputBase
              placeholder="Search..."
              inputProps={{ style: { color: '#000' } }}
            />
            <IconButton>
              <Search sx={{ color: '#464646' }} />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === 'dark' ? (
              <DarkMode sx={{ fontSize: '25px' }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: '25px' }} />
            )}
          </IconButton>
          <Message sx={{ fontSize: '25px' }} />
          <Notifications sx={{ fontSize: '25px' }} />
          <Help sx={{ fontSize: '25px' }} />
          <FormControl variant="standard">
            <Select
              value={fullName}
              defaultValue={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: '150px',
                borderRadius: '0.25rem',
                p: '0.25rem 1rem',
                '& .MuiSvgIcon-root': {
                  pr: '0.25rem',
                  width: '3rem',
                  color: `${mode && '#5f5f5f'}`,
                },
                '& .MuiSelect-select:focus': {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography sx={{ fontWeight: 'bold', color: '#949393' }}>
                  {fullName}
                </Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: '25px' }}
            >
              {theme.palette.mode === 'dark' ? (
                <DarkMode sx={{ fontSize: '25px' }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: '25px' }} />
              )}
            </IconButton>
            <Message sx={{ fontSize: '25px' }} />
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  position: 'absolute',
                  top: '2rem',
                  right: '2rem',
                  width: '3rem',
                  height: '3rem',
                  background: 'red',
                  borderRadius: '50%',
                  color: '#fff',
                }}
              ></div>
              <Notifications sx={{ fontSize: '25px' }} />
            </div>
            <Help sx={{ fontSize: '25px' }} />
            <FormControl variant="standard">
              <Select
                value={fullName}
                defaultValue={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: '150px',
                  borderRadius: '0.25rem',
                  p: '0.25rem 1rem',
                  '& .MuiSvgIcon-root': {
                    pr: '0.25rem',
                    width: '3rem',
                  },
                  '& .MuiSelect-select:focus': {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => dispatch(setLogout()) && navigate('/')}
                >
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  )
}

export default Navbar
