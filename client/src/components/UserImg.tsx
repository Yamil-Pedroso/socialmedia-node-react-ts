import { Box } from '@mui/material'
interface UserImageProps {
  picPath: string | undefined
  size?: string
  borderRadius?: string
}

const UserImg = ({ picPath, size = '60px', borderRadius }: UserImageProps) => {
  //const renderProxy = 'https://linkto-me.onrender.com'
  const localhostProxy = 'http://localhost:3001'

  return (
    <Box width={size} height={size}>
      <img
        className={`user-img ${borderRadius}`}
        style={{ objectFit: 'cover', borderRadius: '50%' }}
        width={size}
        height={size}
        alt="user"
        src={`${localhostProxy}/assets/${picPath}`}
      />
    </Box>
  )
}

export default UserImg
