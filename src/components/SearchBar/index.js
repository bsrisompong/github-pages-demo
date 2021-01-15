import React, { Fragment, useRef } from 'react'
import styled from 'styled-components'
const InputSize = styled.div`
  /* display: inline-grid;
  vertical-align: top;
  align-items: center;
  position: relative;
  border: solid 1px;
  padding: 0.25em 0.5em;
  margin: 5px;

  &.stacked {
    padding: 0.5em;
    align-items: stretch;

    &::after,
    input,
    textarea {
      grid-area: 2 / 1;
    }
  }

  &::after,
  input,
  textarea {
    width: auto;
    min-width: 1em;
    grid-area: 1 / 2;
    font: inherit;
    padding: 0.25em;
    margin: 0;
    resize: none;
    background: none;
    appearance: none;
    border: none;
  }

  span {
    padding: 0.25em;
  }

  &::after {
    content: attr(data-value) ' ';
    visibility: hidden;
    white-space: pre-wrap;
  }

  &:focus-within {
    outline: solid 1px blue;
    box-shadow: 4px 4px 0px blue;

    > span {
      color: blue;
    }

    textarea:focus,
    input:focus {
      outline: none;
    }
  }

  box-shadow: 4px 4px 0px #000;
  > span {
    text-transform: uppercase;
    font-size: 0.8em;
    font-weight: bold;
    text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.15);
  } */
`
const Input = styled.input`
  font-size: 22px;
  outline: none;
  border: none;
  background: transparent;
  border-bottom: solid 5px antiquewhite;
  padding: 10px 0;
  width: ${({ width }) => width};
  min-width: 200px;
  overflow: visible;
`

const SearchResults = styled.ul`
  display: flex;
  flex-direction: column;
`
const SearchResultItem = styled.li``
const SearchBar = (props) => {
  const {
    register,
    onChange,
    name,
    searchStr = '',
    tutorData = [],
    handleSelectTutor,
  } = props

  const inputRef = useRef()

  const searchResult = (names, str) => {
    const checkRegEx = (name, str) => {
      const pattern = str
        .split('')
        .map((x) => `(?=.*${x})`)
        .join('')
      const regEx = new RegExp(pattern, 'g')

      return name.match(regEx)
    }

    const result = names.filter((item) => {
      const subLine = item?.line?.toLowerCase()?.substring(0, 5)
      const lowerId = item?.tutorid?.toLowerCase()
      return (
        subLine?.includes(str?.toLowerCase()) ||
        lowerId?.includes(str?.toLowerCase()) ||
        checkRegEx(subLine, str?.toLowerCase())
      )
    })
    if (str === '') return []
    return result
  }
  return (
    <Fragment>
      <InputSize>
        <Input
          width={`${inputRef.current?.value?.length}ch`}
          ref={(e) => {
            register(e)
            inputRef.current = e
            const str = e?.target?.value
            console.log(str)
          }}
          name={name}
          onChange={(e) => {
            onChange(e)
          }}
          {...props}
        ></Input>
      </InputSize>
      <SearchResults>
        {searchResult(tutorData, searchStr).map((tutor) => (
          <SearchResultItem
            onClick={() => handleSelectTutor('selectedTutor', tutor)}
          >{`id: ${tutor.tutorid} line: ${tutor.line}`}</SearchResultItem>
        ))}
      </SearchResults>
    </Fragment>
  )
}

// const forwardedSearchBar = React.forwardRef(SearchBar)

export default SearchBar
