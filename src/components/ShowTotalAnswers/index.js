import { Typography } from 'components'
import Emoji from 'components/Emoji'

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
    <div className="total-answer">
      <Typography title3 bold>
        เราตอบคำถามไปแล้วทั้งสิ้น
      </Typography>
      <Typography extraLarge bold>
        {totalAnswers}{' '}
        <span>
          <Emoji>🎉</Emoji>
        </span>
      </Typography>
    </div>
  )
}

export default ShowTotalAnswers
