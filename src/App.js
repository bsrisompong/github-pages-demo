import { useEffect } from 'react'
import Sky from 'react-sky'
import styled from 'styled-components'
import HintLogo from 'images/hint_logo.png'
import ChatBox from 'images/chat-box.png'
import './App.css'
import useGoogleSpreadsheet from 'use-google-spreadsheet'
import Scrolling from 'components/Scrolling'
import Emoji from 'components/Emoji'

const Background = styled.div`
  #sky {
    position: fixed !important;
  }
`

console.log(process.env.REACT_APP_TUTOR_URL)
function App() {
  // const API_KEY = process.env.REACT_APP_API_KEY
  const shareUrl = process.env.REACT_APP_TUTOR_URL
  const { rows } = useGoogleSpreadsheet(shareUrl)

  useEffect(() => {}, [])

  console.log(rows)

  return (
    <div className="App">
      <Background
        style={{
          minHeight: '100vh',
          overflow: 'scroll',
          position: 'fixed',
          zIndex: '-1',
        }}
      >
        <Sky
          style={{ position: 'fixed' }}
          images={{
            0: HintLogo,
            1: ChatBox,
          }}
          how={50}
          time={50}
          size={'50px'}
          background={
            'linear-gradient(to right top, #ffcd61, #ffc164, #ffb667, #fdab6b, #f8a170)'
          }
        />
      </Background>
      <Scrolling />
    </div>
  )
}

export default App
