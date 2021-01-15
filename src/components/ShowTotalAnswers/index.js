import { Typography } from 'components'
import Emoji from 'components/Emoji'
import { useScrollSection } from 'react-scroll-section'
import Fade from 'react-reveal/Fade'
import { Container, TotalAnswersCard, Flex, ExamButton } from './styles'
import useRipple from 'useripple'

const ShowTotalAnswers = (props) => {
  const { rows = [] } = props

  const [
    addRipple, // Attach this to any mouse event listener
    ripples, // Render this to see the ripples
  ] = useRipple({
    background: '#e0ffff',
    // background: '#55ffff',
  })
  const infoSection = useScrollSection('info')

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
      {/* <Fade cascade> */}
      <Typography title3 dark>
        เราตอบคำถามไปแล้วทั้งสิ้น
      </Typography>
      {/* </Fade> */}
      <Flex>
        <Fade big>
          <TotalAnswersCard>
            <Typography extraLarge bold className="flex">
              <span style={{ fontSize: '40px', transform: 'scale(-1, 1)' }}>
                <Emoji>🎉</Emoji>
              </span>
              {totalAnswers}
              <span style={{ fontSize: '40px' }}>
                <Emoji>🎉</Emoji>
              </span>
            </Typography>
          </TotalAnswersCard>
        </Fade>
      </Flex>
      <ExamButton
        onClick={(e) => {
          infoSection.onClick()
          addRipple(e)
        }}
      >
        {ripples}
        <Typography title3>
          <span style={{ paddingRight: '15px' }}>
            <Emoji>🔎</Emoji>
          </span>
          ตรวจสอบคะแนนของคุณ
        </Typography>
      </ExamButton>
    </Container>
  )
}

export default ShowTotalAnswers
