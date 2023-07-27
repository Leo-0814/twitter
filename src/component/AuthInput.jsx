import { styled } from "styled-components"

const StyledLabel = styled.label`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: rgba(105, 105, 116, 1);
`

const StyledInput = styled.input`
  width: 356px;
  height: 54px;
  border-radius: 0px 0px 4px 4px;
  margin-top: 10px;
  background-color: #F5F8FA;
  border: none;
  border-bottom: 2px solid #657786;
  padding: 0 6px;
`

const AuthInput = () => {
  return (
    <>
    <StyledLabel for='username'>帳號</StyledLabel>
    <StyledInput id="username" type="text" name="username" placeholder="請輸入帳號"/>
    </>
  )
}

export default AuthInput