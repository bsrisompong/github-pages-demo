import { useEffect, useState } from 'react'
import Sky from 'react-sky'
import styled from 'styled-components'
import HintLogo from 'images/hint_logo.png'
import ChatBox from 'images/chat-box.png'
import './App.css'
import useGoogleSpreadsheet from 'use-google-spreadsheet'
import Scrolling from 'components/Scrolling'
// import SearchInformation from 'components/SearchBar'
// import _groupBy from 'lodash/groupBy'

const Container = styled.div`
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`

const Background = styled.div`
  #sky {
    position: fixed !important;
  }
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`

function App() {
  const [isLoading, setLoading] = useState(true)
  const API_KEY = process.env.REACT_APP_API_KEY
  console.log('API_KEY: ', API_KEY);
  console.log('API_KEY: ', typeof API_KEY);
  const shareUrl = process.env.REACT_APP_TUTOR_URL
  const { rows = [] } = useGoogleSpreadsheet(shareUrl, API_KEY)
  console.log('rows: ', rows);

  useEffect(() => {
    if (rows === null) setLoading(true)
    if (Array.isArray(rows)) setLoading(false)
  }, [rows])

  return (
    <Container className="App">
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
      {isLoading ? 'Loading' : <Scrolling rows={rows} />}
    </Container>
  )
}

export default App
