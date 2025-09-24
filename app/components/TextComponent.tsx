import Typography from '@mui/material/Typography';
import { Optional } from 'utility-types';

type props = {
  type: any,
  text: string,
  sx?: any
}

function TextComponent(props: Optional<props, 'sx'>) {
  return (
    <Typography sx={(props.sx == undefined ? {} : props.sx)} variant={props.type}>{props.text}</Typography>
  )
}

export default TextComponent