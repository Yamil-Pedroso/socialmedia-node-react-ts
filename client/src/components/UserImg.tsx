import { Box } from '@mui/material'
interface UserImageProps {
  picPath: string | undefined
  size?: string
  borderRadius?: string
  style?: any
}

const UserImg = ({
  picPath,
  size = '60px',
  borderRadius,
  style,
}: UserImageProps) => {
  //const renderProxy = 'https://linkto-me.onrender.com'
  const localhostProxy = 'http://localhost:3001'

  return (
    <Box width={size} height={size} style={style}>
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
