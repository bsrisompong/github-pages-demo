import { Typography } from 'components'
import Emoji from 'components/Emoji'
import styled from 'styled-components'
import Tada from 'react-reveal/Tada'

const Container = styled.div`
  /* display: flex;
  justify-content: center; */
`
const Flex = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0;
`
const TotalAnswersCard = styled.div`
  display: flex;
  justify-content: center;
  padding: 15px;
  background: rgba(245, 245, 245, 0.6);
  backdrop-filter: blur(5.3656px);
  border-radius: 15px;
`
const ShowTotalAnswers = (props) => {
  const { rows = [] } = props

  const lastweek = rows.reduce(
    (last, obj) => (last > obj.week ? last : obj.week),
    0
  )
  const totalAnswers = rows
    .filter(
      (item) => item.tutorid === 'total_answers' && item.week === lastweek
    )
    .reduce((sum, item) => sum + parseInt(item.score), 0)

  return (
    <Container className="total-answer">
      <Typography title3>เราตอบคำถามไปแล้วทั้งสิ้น</Typography>
      <Flex>
        <Tada right cascade>
          <TotalAnswersCard>
            <Typography extraLarge bold>
              {totalAnswers}{' '}
              <span>
                <Emoji>🎉</Emoji>
              </span>
            </Typography>
          </TotalAnswersCard>
        </Tada>
      </Flex>
    </Container>
  )
}

export default ShowTotalAnswers
