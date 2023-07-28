import { styled } from "styled-components"

const StyledAuthButton = styled.button`
  background-color: rgba(255, 102, 0, 1);
  padding: 8px 24px 8px 24px;
  border-radius: 50px;
  color: white;
  border: none;
  font-weight: 400;
  cursor: pointer;
`

const Button = ({children, className}) => {
  return (
    <StyledAuthButton className={className}>
      {children}
    </StyledAuthButton>
  )
}

export default Button