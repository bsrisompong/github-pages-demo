import styled from 'styled-components'
import HintWithMobile from 'images/Phone.png'
// import Fade from 'react-reveal/Fade'
import { ResponsiveLine } from '@nivo/line'
import { linearGradientDef } from '@nivo/core'
import _groupBy from 'lodash/groupBy'
import ShowTotalAnswers from 'components/ShowTotalAnswers'
import Fade from 'react-reveal/Fade'
import ReactFloaterJs from 'react-floaterjs'
const Container = styled.div`
  display: flex;
  justify-content: center;
  /* margin-bottom: -10px; */
  flex-direction: column;
  .total-answer {
    flex: 1;
  }
  padding: 0 20px;
`
export const ChartBackground = styled.div`
  /* border-radius: 10px; */
  /* background-color: #2f4858; */
  /* filter: blur(20px); */
  height: 485px;
  /* width: 100%; */
  /* min-width: 420px; */
  /* backdrop-filter: blur(4px);
  background-color: #2f4858cc; */
  /* background: rgba(37, 37, 37, 0.6); */
  background: rgba(245, 245, 245, 0.8);
  backdrop-filter: blur(5px);
  border-radius: 13px;
  /* .bg {
    height: 100%;
    width: 100%;
    filter: blur(10px);
  } */
  padding: 20px;
  margin: 0px 0px;
  /* box-sizing: border-box; */
`

const Crop = styled.div`
  position: relative;
  /* margin-bottom: -200px; */
  /* height: 350px; */
  width: 296px;
  @media (max-width: 768px) {
    width: 100%;
  }
`
const Img = styled.img`
  /* margin-top: -36px; */
  height: 600px;
`
const Content = styled.div`
  display: flex;
  flex-direction: rows;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const Right = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 20px;
`

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

const colors = {
  Math: 'hsl(351, 70%, 50%)',
  English: 'hsl(219, 70%, 50%)',
  Science: 'hsl(145, 70%, 50%)',
}

const Welcome = (props) => {
  const { rows } = props
  return (
    <Container>
      <Content>
        <Fade top>
          <Crop>
            <ReactFloaterJs>
              <Img className="" src={HintWithMobile} />
            </ReactFloaterJs>
          </Crop>
        </Fade>
        <Right>
          <ShowTotalAnswers className="flx1" rows={rows} />
          <ChartBackground>
            <ResponsiveLine
              colors={{ scheme: 'set1' }}
              lineWidth="4px"
              isInteractive
              enableArea
              useMesh={false}
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
        </Right>
      </Content>
    </Container>
  )
}

export default Welcome
