import { styled } from "styled-components"

const StyledButtonHollow = styled.button`
  padding: 8px 24px 8px 24px;
  border-radius: 50px;
  color: rgba(255, 102, 0, 1);
  border: none;
  cursor: pointer;
  border: 1px solid rgba(255, 102, 0, 1);
  background-color: rgba(255, 255, 255, 1);

  &:hover {
    border: 1px solid rgba(255, 102, 0, .6);
    color: rgba(255, 102, 0, .8);
  }
`

const ButtonHollow = ({children, className}) => {
  return (
    <StyledButtonHollow className={className}>
      {children}
    </StyledButtonHollow>
  )
}

export default ButtonHollow