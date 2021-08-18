import React, { Fragment } from 'react'
import styled from 'styled-components'
import ContentEditable from 'react-contenteditable'
import { CSSTransition } from 'react-transition-group'
import './style.css'
const InputSize = styled.div`
  display: flex;
  justify-content: center;
  background: rgba(37, 37, 37, 0.8);
  backdrop-filter: blur(5px);
  border-radius: 13px;
  width: max-content;
  padding: 20px 30px;
  margin: 20px auto;
  max-width: 100vw;
  box-sizing: border-box;

  @media (max-width: 425px) {
    padding: 20px;
  }
`

const InputContentEditable = styled(ContentEditable)`
  font-size: 20px;
  line-height: 1.2;
  color: #fff;
  width: max-content;
  min-width: 425px;
  border-bottom: solid 3px #ff5555;
  outline: none;
  padding: 10px;

  &.noContent {
    :before {
      content: '🔎 Search your LINE accout or tutor id';
      color: whitesmoke;
      opacity: 0.3;
    }
  }

  @media (max-width: 425px) {
    font-size: 16px;
    min-width: 200px;
    padding: 5px;
  }

  :focus {
    :before {
      content: '';
    }
  }
`

const SearchResults = styled.ul`
  display: flex;
  flex-direction: column;
  /* min-height: 50px; */
  max-height: 50vh;
  overflow: scroll;
  width: 425px;
  margin: auto;
  margin-top: -33px;

  border-radius: 0 0 13px 13px;
  background: rgba(245, 245, 245, 0.95);
  backdrop-filter: blur(5px);
`
const SearchResultItem = styled.li`
  list-style: none;
`

const SearchBar = (props) => {
  const {
    register,
    onChange,
    name,
    searchStr = '',
    tutorData = [],
    handleSelectTutor,
    search,
  } = props


  let selection, range
  const handleFocus = (event) => {
    if (document.body.createTextRange) {
      range = document.body.createTextRange()
      range.moveToElementText(event.target)
      range.select()
    } else if (window.getSelection) {
      selection = window.getSelection()
      range = document.createRange()
      range.selectNodeContents(event.target)
      selection.removeAllRanges()
      selection.addRange(range)
    }
  }

  const searchResult = (names, str) => {
    const checkRegEx = (name, str) => {
      const pattern = str
        .split('')
        .map((x) => (x !== '\\' ? `(?=.*${x})` : `(?=.*\${x})`))
        .join('')
      const regEx = new RegExp(pattern, 'g')

      return name.match(regEx)
    }

    const result = names.filter((item) => {
      console.log('itemmmmm: ', item);
      const subLine = item?.line?.toLowerCase()?.substring(0, 5)
      const lowerId = item?.tutorid?.toLowerCase()
      return (
        item?.line.toLowerCase()?.includes(str?.toLowerCase()) ||
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
        <InputContentEditable
          className={`${search !== '' ? 'hasContent' : 'noContent'} input`}
          innerRef={register} // element's ref attribute
          html={search} // innerHTML of the editable div
          onChange={(e) => {
            onChange(name, e)
          }}
          onClick={(e) => e.target.selectAll}
          onFocus={handleFocus}
          disable={false} // use true to disable edition
          tagName="div" // Use a custom HTML tag (uses a div by default)
          spellCheck={false}
          placeholder={'asdss'}
        ></InputContentEditable>
      </InputSize>
      <CSSTransition
        in={searchResult(tutorData, searchStr).length > 0}
        timeout={300}
        classNames="alert"
        unmountOnExit
      >
        <SearchResults>
          {searchResult(tutorData, searchStr).map((tutor, index) => (
            <SearchResultItem
              key={`${tutor.tutorid} ${tutor?.uid}`}
              onClick={() => handleSelectTutor('selectedTutor', tutor)}
            >{`id: ${tutor.tutorid} line: ${tutor.line}`}</SearchResultItem>
          ))}
        </SearchResults>
      </CSSTransition>
    </Fragment>
  )
}

// const forwardedSearchBar = React.forwardRef(SearchBar)

export default SearchBar
