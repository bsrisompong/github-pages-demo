import {
  ScrollingProvider,
  // useScrollSections,
  Section,
} from 'react-scroll-section'
import _groupBy from 'lodash/groupBy'
import { SectionContainer } from 'components/styles'
import Welcome from 'components/Welcome'
import Emoji from 'components/Emoji'
import DynamicMenu from 'components/DynamicMenu'
import SearchInformation from 'components/SearchInformation'
import shortUID from 'short-uuid'

const Scrolling = (props) => {
  const { rows = [] } = props

  const colors = {
    Math: 'hsl(351, 70%, 50%)',
    English: 'hsl(219, 70%, 50%)',
    Science: 'hsl(145, 70%, 50%)',
  }

  // const result = rows.filter((item) => item.tutorid === '')
  // console.log(_groupBy(rows, (item) => item.line).map((item) => item))
  // console.log('🙃', _chain(rows).groupBy('tutorid'))

  const tutorData = (data) => {
    const groupByObj = _groupBy(data, (item) => item.line)
    const result = Object.keys(groupByObj).map((key) => {
      const data = groupByObj[key].map((item) => ({
        x: item?.date,
        y: item?.score,
        subject: item?.subject,
        week: item?.week,
      }))
      if (groupByObj[key][0]?.tutorid === 'total_answers')
        return {
          uid: shortUID.generate(),
          tutorid: '',
          line: '',
          data: [],
        }
      return {
        uid: shortUID.generate(),
        tutorid: groupByObj[key][0]?.tutorid,
        line: key,
        data,
      }
    })
    return result
  }
  // 65
  // console.log(',s', tutorData(rows))

  return (
    <ScrollingProvider>
      <DynamicMenu />
      <Section id="home">
        <SectionContainer maxWidth="1400px">
          <Welcome rows={rows} />
        </SectionContainer>
      </Section>
      <Section id="info">
        <SectionContainer>
          <Emoji size={50}>📊</Emoji>
          <SearchInformation tutorData={tutorData(rows)} />
        </SectionContainer>
      </Section>
      <Section id="more">
        <SectionContainer>
          <Emoji size={50}>ℹ️</Emoji>
        </SectionContainer>
      </Section>
    </ScrollingProvider>
  )
}

export default Scrolling
