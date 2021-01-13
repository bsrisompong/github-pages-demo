import {
  ScrollingProvider,
  // useScrollSections,
  Section,
} from 'react-scroll-section'
import { ResponsiveLine } from '@nivo/line'
import { linearGradientDef } from '@nivo/core'
import _groupBy from 'lodash/groupBy'
import { SectionContainer } from 'components/styles'
import { ChartBackground } from './styles'
import Welcome from 'components/Welcome'
import Emoji from 'components/Emoji'
import DynamicMenu from 'components/DynamicMenu'

// const commonProperties = {
//   width: 900,
//   height: 400,
//   margin: { top: 20, right: 20, bottom: 60, left: 80 },
//   data,
//   animate: true,
//   enableSlices: 'x',
// }

const Scrolling = (props) => {
  const { rows = [] } = props

  const colors = {
    Math: 'hsl(351, 70%, 50%)',
    English: 'hsl(219, 70%, 50%)',
    Science: 'hsl(145, 70%, 50%)',
  }

  const chartData = (data) => {
    const subjectObject = _groupBy(
      data?.filter((item) => item.tutorid === 'total_answers'),
      (item) => item.subject
    )
    const result = Object.keys(subjectObject).map((key) => {
      const data = subjectObject[key].map((item) => ({
        x: item.date,
        y: item.score,
      }))
      return {
        id: key,
        color: colors[key],
        data,
      }
    })

    return result
  }

  // const result = rows.filter((item) => item.tutorid === '')
  // console.log(rows)
  return (
    <ScrollingProvider>
      <DynamicMenu />
      <Section id="home">
        <SectionContainer maxWidth="1400px">
          <Welcome rows={rows} />
          <ChartBackground>
            <ResponsiveLine
              colors={{ scheme: 'set1' }}
              lineWidth="4px"
              isInteractive={true}
              enableArea
              useMesh={true}
              curve="linear"
              data={chartData(rows)}
              margin={{ top: 60, right: 80, bottom: 60, left: 80 }}
              xScale={{ type: 'point' }}
              yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                // stacked: true,
                reverse: false,
              }}
              yFormat=" >-.0f"
              axisTop={null}
              axisRight={null}
              enableSlices={'x'}
              pointSize={5}
              pointColor={{ theme: 'background' }}
              pointBorderWidth="8px"
              pointBorderColor={{ from: 'serieColor' }}
              // pointLabel={'y'}
              // pointLabelYOffset={-12}
              legends={[
                {
                  anchor: 'bottom-right',
                  direction: 'column',
                  justify: false,
                  translateX: 100,
                  translateY: 0,
                  itemsSpacing: 0,
                  itemDirection: 'left-to-right',
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: 'circle',
                  symbolBorderColor: 'rgba(0, 0, 0, .5)',
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemBackground: 'rgba(0, 0, 0, .03)',
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]}
              defs={[
                linearGradientDef('gradientA', [
                  { offset: 0, color: 'inherit' },
                  { offset: 100, color: 'inherit', opacity: 0 },
                ]),
              ]}
              fill={[{ match: '*', id: 'gradientA' }]}
            />
          </ChartBackground>
        </SectionContainer>
      </Section>
      <Section id="about">
        <SectionContainer>
          <Emoji size={50}>📊</Emoji>
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
