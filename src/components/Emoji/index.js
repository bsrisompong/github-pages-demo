import emoji from 'emoji-dictionary'
import styled from 'styled-components'

const Container = styled.span`
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : 'inherit')};
  line-height: 1;
`

const Emoji = ({ children, size }) => {
  return (
    <Container fontSize={size}>
      {emoji.getUnicode(emoji.getName(children))}
    </Container>
  )
}

export default Emoji
