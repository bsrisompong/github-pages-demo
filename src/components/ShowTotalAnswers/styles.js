import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  overflow: hidden;
  /* display: flex;
  justify-content: center; */
  /* background: rgba(37, 37, 37, 0.6); */
  background: rgba(37, 37, 37, 0.8);
  /* background: rgba(245, 245, 245, 0.6); */
  backdrop-filter: blur(5px);
  border-radius: 13px;
  padding: 20px 0;
  margin: 0 0 20px 0;
  /* display: flex; */
  flex-direction: column;

  @keyframes useRippleAnimation {
    to {
      transform: scale(15);
      opacity: 0;
    }
  }
`
const Flex = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0 0;
  flex: 1;
  align-items: center;
`
const TotalAnswersCard = styled.div`
  display: flex;
  justify-content: center;
  /* padding: 15px 30px; */
  /* background: rgba(245, 245, 245, 0.6); */
  backdrop-filter: blur(5.3656px);
  border-radius: 15px;
  color: #fff;

  .flex {
    display: flex;
    align-items: center;
    /* gap: 30px; */
  }
`

const ExamButton = styled.button`
  position: relative;
  overflow: hidden;
  width: max-content;
  margin: 10px auto 0;
  border-radius: 13px;
  padding: 10px 20px;
  border: none;
  background-color: #fff;
`

export { Container, TotalAnswersCard, Flex, ExamButton }
