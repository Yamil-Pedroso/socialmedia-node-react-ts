import { Box, Typography, useMediaQuery } from '@mui/material'
import Form from './Form'

const LoginPage = () => {
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)')
  return (
    <Box>
      <Box width="100%" p="1rem 6%" textAlign="center">
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          <div
            style={{
              marginBottom: '-2rem',
              color: '#4a4a4a',
              fontSize: '3rem',
            }}
          >
            Linkto<span style={{ color: '#00D5FA' }}>Me</span>
          </div>
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? '50%' : '93%'}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: '1.5rem' }}>
          Welcome to linktoMe
        </Typography>
        <Form />
      </Box>
    </Box>
  )
}

export default LoginPage
