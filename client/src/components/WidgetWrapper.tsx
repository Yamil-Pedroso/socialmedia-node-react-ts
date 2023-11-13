import { Box } from '@mui/material'
import { styled, CSSObject } from '@mui/system'

interface WidgetWrapperProps {
    padding?: string;
    backgroundColor?: string;
    theme?: any;
}

const WidgetWrapper = styled(Box)((props: WidgetWrapperProps): CSSObject => ({
    padding: "1.5rem 1.5rem 0.75rem 1.5rem",
    backgroundColor: props.theme.palette.background.alt,
    border: '1px solid black',
    boxShadow: '3px 3px 0px 0px rgba(0, 0, 0, 0.9)',
    borderRadius: '10px',
}));

export default WidgetWrapper;