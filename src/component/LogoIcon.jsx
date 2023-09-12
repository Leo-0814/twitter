import { styled } from "styled-components";
import logo from '../images/logo.png'

const StyledLogoIcon = styled.img`
  width: 50px;
  height: 50px
`

const LogoIcon = ({className}) => {
  return (
    <StyledLogoIcon src={logo} alt="logo" className={className}></StyledLogoIcon>
  )
}

export default LogoIcon