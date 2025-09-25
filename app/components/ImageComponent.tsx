import { Box } from '@mui/material';
import { Optional } from 'utility-types';

type props = {
  url: string,
  sx?: any
}

function ImageComponent(props: Optional<props, 'sx'>) {
  return (
    <Box component="img" sx={{
        display: "block",
        width: "100%",
        maxWidth: "500px",
        height: "auto",
        objectFit: "contain", 
        ...props.sx,
      }} src={props.url}/>
  )
}

export default ImageComponent