import { Box } from '@mui/material'
interface UserImageProps {
  picPath: string | undefined
  size?: string
}

const UserImg = ({ picPath, size = '60px' }: UserImageProps) => {
  const renderProxy = 'https://linkto-me.onrender.com'
  //const localhostProxy = 'http://localhost:3001'

  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: 'cover', borderRadius: '50%' }}
        width={size}
        height={size}
        alt="user"
        src={`${renderProxy}/assets/${picPath}`}
      />
    </Box>
  )
}

export default UserImg
