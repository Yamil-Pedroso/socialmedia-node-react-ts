import { Typography, useTheme } from '@mui/material'
import FlexBetween from '../../components/FlexBetween'
import WidgetWrapper from '../../components/WidgetWrapper'

const AdvertWidget = () => {
  const { palette } = useTheme()
  const dark = palette.grey[600]
  const main = palette.primary.main
  const medium = palette.grey[500]

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="https://linkto-me.onrender.com/assets/info4.jpeg"
        style={{ borderRadius: '0.75rem', margin: '0.75rem 0' }}
      />
      <FlexBetween>
        <Typography color={main}>BookiBooks</Typography>
        <Typography color={medium}>bookibooks.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Visit our bookstore, where each book is an opportunity to embark on a
        new journey, and where the love for literature is at the heart of
        everything we do. Come, let the adventure begin!
      </Typography>
    </WidgetWrapper>
  )
}

export default AdvertWidget
