import { styled } from "styled-components"

const StyledButton = styled.button`
  background-color: rgba(255, 102, 0, 1);
  padding: 8px 24px 8px 24px;
  border-radius: 50px;
  color: white;
  border: none;
  cursor: pointer;
`

const Button = ({children, className}) => {
  return (
    <StyledButton className={className}>
      {children}
    </StyledButton>
  )
}

export default Button