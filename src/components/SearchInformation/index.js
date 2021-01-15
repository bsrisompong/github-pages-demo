import { useState, useDebounce } from 'react'
import { useForm } from 'react-hook-form'
import { SearchBar, Typography } from 'components'
import styled from 'styled-components'
import _debounce from 'lodash/debounce'
import _isEmpty from 'lodash/isEmpty'

const Container = styled.div``

const SearchInformation = (props) => {
  const { tutorData = [] } = props

  const [isTyping, setTyping] = useState(false)
  const [state, setState] = useState({ search: 'a', selectedTutor: {} })
  const { register, handleSubmit, getValues, reset } = useForm({
    defaultValues: { search: '' },
  })

  const handleSelectTutor = (name, value) => {
    setState({ ...state, [name]: value })
    reset({ search: '' })
  }

  const onChange = (e) =>
    setState({ ...state, [e.target.name]: e.target.value })

  const debounceOnChange = _debounce(onChange, 500)

  const onSubmit = (data) => console.log(data)

  // const [isReady] = useDebounce(() => {}, 1000, [state])
  // console.log()

  // if (!tutorData) return null
  return (
    <Container>
      <Typography title2>{getValues('search')}</Typography>

      <SearchBar
        name="search"
        register={register}
        onChange={debounceOnChange}
        tutorData={tutorData}
        searchStr={getValues('search')}
        handleSelectTutor={handleSelectTutor}
        setTyping={setTyping}
      />
      <button onClick={() => setState({ ...state, selectedTutor: {} })}>
        clear
      </button>
      {!_isEmpty(state.selectedTutor) && (
        <h2>{`Selected Tutor: ${state.selectedTutor.line}`}</h2>
      )}
    </Container>
  )
}
export default SearchInformation
