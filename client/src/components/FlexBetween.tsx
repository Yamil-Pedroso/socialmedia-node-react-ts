import { Box } from '@mui/material'
import { styled, CSSObject } from '@mui/system'

interface FlexBetweenProps {
  display?: string;
  backgroundColor?: string;
  padding?: string;
}

const FlexBetween = styled(Box)<FlexBetweenProps>(  // for now we can use it in place of Box
  {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  (props: FlexBetweenProps): CSSObject => ({
    backgroundColor: props.backgroundColor,
  }),
    (props: FlexBetweenProps): CSSObject => ({
        padding: props.padding,
    })
);

export default FlexBetween;
