import {
  ScrollingProvider,
  useScrollSections,
  Section,
} from 'react-scroll-section'
import { ResponsiveLine } from '@nivo/line'
import emoji from 'emoji-dictionary'
// import { linearGradientDef } from '@nivo/core'
import { SectionContainer } from 'components/styles'
import { ChartBackground } from './styles'
import Emoji from 'components/Emoji'
import DynamicMenu from 'components/DynamicMenu'

// const data = generateDrinkStats(18)
const data = [
  {
    id: 'English',
    color: 'hsl(156, 70%, 50%)',
    data: [
      {
        x: 'Dec-12',
        y: 0,
      },
      {
        x: 'Dec-19',
        y: 40,
      },
      {
        x: 'Dec-26',
        y: 122,
      },
      {
        x: 'Jan-2',
        y: 218,
      },
    ],
  },
  {
    id: 'Math',
    color: 'hsl(175, 70%, 50%)',
    data: [
      {
        x: 'Dec-12',
        y: 0,
      },
      {
        x: 'Dec-19',
        y: 10,
      },
      {
        x: 'Dec-26',
        y: 22,
      },
      {
        x: 'Jan-2',
        y: 118,
      },
    ],
  },
]

// const commonProperties = {
//   width: 900,
//   height: 400,
//   margin: { top: 20, right: 20, bottom: 60, left: 80 },
//   data,
//   animate: true,
//   enableSlices: 'x',
// }

const Scrolling = () => (
  <ScrollingProvider>
    <DynamicMenu />
    <Section id="home">
      <SectionContainer maxHeight={'525px'}>
        <ChartBackground>
          <ResponsiveLine
            curve="monotoneX"
            data={data}
            margin={{ top: 100, right: 100, bottom: 100, left: 100 }}
            xScale={{ type: 'point' }}
            yScale={{
              type: 'linear',
              min: 'auto',
              max: 'auto',
              stacked: true,
              reverse: false,
            }}
            yFormat=" >-.0f"
            axisTop={null}
            axisRight={null}
            enableSlices={'x'}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
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
          />
          <div className=".bg" />
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

export default Scrolling
