import { useRef } from 'react'
import styled from 'styled-components'
import { useScrollSections } from 'react-scroll-section'
import Emoji from 'components/Emoji'
const Menu = styled.ul`
  z-index: 100;
  position: fixed;
  list-style: none;
  margin: 0;
  padding: 0;
  top: calc(50% - 56px);

  display: flex;
  flex-direction: column;
  gap: 10px;
`

const MenuItem = styled.li`
  display: flex;
  align-items: center;
  padding: 7px 7px 7px 7px;
  border-radius: 0 20px 20px 0;
  background: rgba(245, 245, 245, 0.6);
  backdrop-filter: blur(10px);
  gap: 10px;
  overflow: hidden;

  cursor: pointer;

  width: ${({ selected, width }) => (selected ? `${80}px` : '30px')};
  /* width: min-content; */
  /* transform: ${({ selected }) =>
    selected ? 'translateX(0px)' : 'translateX(-24px) '}; */
  /* transform: ${({ selected }) =>
    selected ? 'scale(1.3) translateX(10px)' : 'scale(1) translateX(0px)'}; */
  transition: all 0.3s ease;
  transition-property: transform, width;
`

const Label = styled.div`
  max-width: ${({ selected }) => (selected ? '100%' : '0%')};
  transition: all 0.3s ease;
`

const menuIcon = {
  home: '📊',
  info: '🆔',
  more: 'ℹ️',
}
const DynamicMenu = () => {
  const sections = useScrollSections()

  const ref = useRef()
  return (
    <Menu>
      {sections.map(({ id, onClick, selected }) => (
        <MenuItem
          key={id}
          onClick={onClick}
          selected={selected}
          width={ref.current?.offsetWidth}
        >
          <Emoji size={25}>{menuIcon[id]}</Emoji>
          {selected && (
            <Label selected={selected} ref={ref}>
              {id.toLocaleUpperCase()}
            </Label>
          )}
        </MenuItem>
      ))}
    </Menu>
  )
}

export default DynamicMenu
