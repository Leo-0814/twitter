import Logo from '../images/Logo.png'
import styled from 'styled-components'

const StyledLogo = styled.img`
  margin-top: 65px;
  width: 50px;
  height: 50px
`

const StyledH1 = styled.h1`
  font-weight: 700;
  font-size: 23px;
  line-height: 33px;
  font-family: 'Noto Sans TC';
`

const StyledContainer = styled.div`
  text-align: center;
  position: relative;
`

const StyledInput = styled.input`
  width: 540px;
  height: 54px;
  border-radius: 0px 0px 4px 4px;
  margin-top: 20px;
  background-color: #F5F8FA;
  border: none;
  border-bottom: 2px solid #657786;
  
`
const LoginPage = () => {
  return (
    <>
      <StyledLogo src={Logo} alt="logo" className='logo'/>
      <StyledH1>登入 Alphitter</StyledH1>
      <StyledContainer>
        <StyledInput type='text' id='username' name='username' placeholder='帳號' />
      </StyledContainer>
      <StyledContainer style={{marginTop: 20+'px'}}>
        <StyledInput type='number' id='password' name='password' placeholder='密碼' />
      </StyledContainer>
    </>
  )
}

export default LoginPage