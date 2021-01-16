import { useState, Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { SearchBar, Typography } from 'components'
import styled, { css } from 'styled-components'
import _debounce from 'lodash/debounce'
import _isEmpty from 'lodash/isEmpty'
import Rodal from 'rodal'
import 'rodal/lib/rodal.css'
import { ResponsiveRadar } from '@nivo/radar'
import moment from 'moment'

const Container = styled.div`
  .rodal-dialog {
    border-radius: 15px;
    height: 600px;
    width: 80%;
    @media (max-width: 425px) {
      width: 100%;
    }
  }

  .rodal {
    backdrop-filter: blur(2px);
  }
`
const customStyle = {
  // borderRadius: '10px',
  width: '80%',
  height: '600px',
  maxWidth: '1024px',
  background: 'rgba(245,245,245,0.95)',
  backdropFilter: 'blur(5px)',
}

const Flex = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: space-evenly;
  ${({ row, column, margin }) => {
    if (row)
      return css`
        flex-direction: row;
      `
    if (column)
      return css`
        flex-direction: column;
      `
    if (margin)
      return css`
        marign: margin;
      `
  }}

  @media (max-width: 425px) {
    flex-direction: column;
  }
`
const FlexItem = styled.div`
  position: relative;
  flex: 1 1 auto;
  /* height: 100%; */
`

const ChartWraper = styled.div`
  position: relative;
  flex: 1 1 auto;
  /* max-width: 500px; */
  max-height: 500px;
`
const SearchInformation = (props) => {
  const { tutorData = [] } = props

  const [state, setState] = useState({ search: '', selectedTutor: {} })
  const { register, getValues, reset } = useForm({
    defaultValues: { search: '' },
  })

  const handleSelectTutor = (name, value) => {
    setState({ ...state, search: '', [name]: value })
    reset({ search: '' })
  }

  const onChange = (name, e) => {
    setState({ ...state, [name]: e.target.value })
  }

  const debounceOnChange = _debounce((name, e) => {
    onChange(name, e)
  }, 0)

  // const [isReady] = useDebounce(() => {}, 1000, [state])
  // console.log()

  // if (!tutorData) return null

  const reformatData = (data = []) => {
    const recentDate = moment(
      Math.max(...data.map((item) => new Date(item.x)))
    ).format('YYYY-MM-DD')
    const latestData = data.filter((item) => item?.x === recentDate)

    // return [
    //   { subject: 'science', score: 2 },
    //   { subject: 'english', score: 0 },
    //   { subject: 'math', score: 1 },
    // ]
    return latestData
      .map((item) => ({
        subject: item.subject.toLowerCase(),
        score: item.y,
      }))
      .reduce(
        (arr, item) => {
          const newArr = [...arr]
          const find = newArr.find((obj) => obj.subject === item.subject)
          if (find) find.score = parseInt(item.score)
          console.log({ newArr, find })
          return newArr
        },
        [
          { subject: 'science', score: 0 },
          { subject: 'english', score: 0 },
          { subject: 'math', score: 0 },
        ]
      )
  }

  const totalTutorAnwer = (arr) => {
    return arr.reduce((acc, obj) => acc + obj.score, 0)
  }

  const { tutorid, line, data } = state.selectedTutor
  // console.log(reformatData(state.selectedTutor))
  return (
    <Fragment>
      <Container>
        <Typography title2>{getValues('search')}</Typography>

        <SearchBar
          name="search"
          register={register}
          onChange={debounceOnChange}
          tutorData={tutorData}
          // searchStr={getValues('search')}
          searchStr={state.search}
          search={state.search}
          handleSelectTutor={handleSelectTutor}
        />

        <Rodal
          visible={!_isEmpty(state.selectedTutor)}
          animation={'zoom'}
          customStyles={customStyle}
          duration={200}
          onClose={() => setState({ ...state, selectedTutor: {} })}
          customMaskStyles={{ background: 'rgba(0,0,0,0.5)' }}
        >
          <Typography title3>Tutor Info</Typography>
          <Flex>
            <FlexItem>
              <Flex row margin={'20px 0'}>
                <Flex>
                  <Typography subheadline>line account:</Typography>
                  <Typography title3>{line}</Typography>
                </Flex>
                <Flex>
                  <Typography subheadline>tutor id:</Typography>
                  <Typography title3>{tutorid}</Typography>
                </Flex>
                <Flex>
                  <Typography subheadline>total score:</Typography>

                  <Typography title3>
                    {totalTutorAnwer(reformatData(data))}
                  </Typography>
                </Flex>
              </Flex>
            </FlexItem>
            <ChartWraper>
              <ResponsiveRadar
                // data={[
                //   { subject: 'science', score: 7 },
                //   { subject: 'english', score: 50 },
                //   { subject: 'math', score: 124 },
                // ]}
                data={reformatData(data)}
                indexBy="subject"
                keys={['score']}
                animate
                margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
                curve={'linearClosed'}
                dotSize={10}
                dotBorderColor="#fff"
                dotBorderWidth={2}
                enableDotLabel={true}
                gridLevels={5}
                // gridShape="linear"
                gridShape="circular"
                gridLabelOffset={22}
                // maxValue={1000}
                // height={400}
                // width={400}
                theme={{
                  grid: {
                    line: {
                      stroke: 'gainsboro',
                      strokeWidth: 1,
                      // strokeDasharray: '4 4',
                    },
                  },
                }}
              />
            </ChartWraper>
          </Flex>
        </Rodal>
      </Container>
    </Fragment>
  )
}
export default SearchInformation
