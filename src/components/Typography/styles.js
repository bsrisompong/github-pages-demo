import styled, { css } from 'styled-components'

export const Text = styled.div`
  line-height: 1;
  /* font-weight: 500; */

  ${({ bold }) => {
    if (bold)
      return css`
        font-weight: 700;
      `
  }}
  ${({
    extraLarge,
    largeTitle,
    title1,
    title2,
    title3,
    headline,
    body,
    callout,
    subheadline,
    footnote,
    caption1,
    caption2,
  }) => {
    if (extraLarge)
      return css`
        font-size: 70px;
      `
    if (largeTitle)
      return css`
        font-size: 34px;
      `
    if (title1)
      return css`
        font-size: 28px;
      `
    if (title2)
      return css`
        font-size: 22px;
      `
    if (title3)
      return css`
        font-size: 20px;
      `
    if (headline)
      return css`
        font-size: 17px;
        font-weight: 600;
      `
    if (body)
      return css`
        font-size: 17px;
      `
    if (callout)
      return css`
        font-size: 16px;
      `
    if (subheadline)
      return css`
        font-size: 15px;
      `
    if (footnote)
      return css`
        font-size: 13px;
      `
    if (caption1)
      return css`
        font-size: 12px;
      `
    if (caption2)
      return css`
        font-size: 11px;
      `
  }}
`
