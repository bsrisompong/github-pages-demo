import { Text } from './styles'

const Typography = (props) => {
  // const  { style } = props
  return <Text {...props}>{props.children}</Text>
}

export default Typography
