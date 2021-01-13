import styled from 'styled-components'
import HintWithMobile from 'images/Phone.png'
// import Fade from 'react-reveal/Fade'
import ShowTotalAnswers from 'components/ShowTotalAnswers'
import Fade from 'react-reveal/Fade'
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

const Crop = styled.div`
  position: relative;
  margin-bottom: -200px;
  /* height: 350px; */
  /* width: 800px; */
`
const Img = styled.img`
  /* margin-top: -36px; */
  height: 600px;
`

const Welcome = (props) => {
  const { rows } = props
  return (
    <Container>
      <Fade top>
        <Crop>
          <Img className="" src={HintWithMobile} />
        </Crop>
      </Fade>
      <ShowTotalAnswers className="flx1" rows={rows} />
    </Container>
  )
}

export default Welcome
