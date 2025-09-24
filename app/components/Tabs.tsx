import { Text } from "@ui-kitten/components";
import { Optional } from 'utility-types';

type props = {
  type: string,
  text: string,
  style?: any
}

function TextComponent(props: Optional<props, 'style'>) {
  return (
    <Text category={props.type} style={props.style}>{props.text}</Text>
  )
}

export default TextComponent