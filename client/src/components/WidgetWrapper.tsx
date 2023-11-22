import { Box } from '@mui/material'
import { styled, CSSObject } from '@mui/system'
import { useSelector } from 'react-redux'

interface WidgetWrapperProps {
  padding?: string
  backgroundColor?: string
  theme?: any
}

const WidgetWrapper = styled(Box)(
  (props: WidgetWrapperProps): CSSObject => ({
    padding: '1.5rem 1.5rem 0.75rem 1.5rem',
    backgroundColor: props.backgroundColor,
    border: '1px solid #000',
    boxShadow: `${
      SetMyMode() === 'light'
        ? '6px 6px 0px 0px rgba(0,0,0,0.75)'
        : '6px 6px 0px 0px #000'
    }`,
    borderRadius: '10px',
  }),
)

const SetMyMode = () => {
  const mode = useSelector((state: any) => state.mode)
  return mode
}

export default WidgetWrapper
