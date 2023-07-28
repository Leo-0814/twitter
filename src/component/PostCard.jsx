import logo from '../images/logo.png'
import answer from '../images/_base/answer.png'
import follow from '../images/_base/follow.png'
import { LogoIcon } from "./common/logo.styled"
import { styled } from 'styled-components'

const StyledPostCard = styled.div`
  width: 100%;
  padding: 6px 5px 6px 19px;
  border-left: 1px solid rgba(230, 236, 240, 1);
  border-right: 1px solid rgba(230, 236, 240, 1);
  border-bottom: 1px solid rgba(230, 236, 240, 1);
  display: flex;
`
const StyledPostCardData = styled.div`
  margin-left: 3px;
  margin-top: 5px;
`
const StyledDataHeader = styled.div`
  display: flex;
  align-items: center;
`
const StyledDataHeaderUsername = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 26px;
  margin-right: 5px;
`
const StyledDataHeaderAccount = styled.div`
  color: rgba(108, 117, 125, 1);
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
`
const StyledDataHeaderDot = styled.span`
  color: rgba(108, 117, 125, 1);
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
`
const StyledDataHeaderTime = styled.div`
  color: rgba(108, 117, 125, 1);
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
`
const StyledCardDataContent = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  margin: 5px 0;
`
const StyledCardDataFooter = styled.div`
  display: flex;
  align-items: center;
`
const StyledDataFooterItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 30px;
`
const StyledFooterItemIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 3px;
  cursor: pointer;
`
const StyledFooterItemCount = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 14px;
  color: rgba(108, 117, 125, 1);
`

const PostCard = () => {
  return (
    <StyledPostCard>
      <LogoIcon src={logo} alt="" />
      <StyledPostCardData >
        <StyledDataHeader >
          <StyledDataHeaderUsername >Apple</StyledDataHeaderUsername>
          <StyledDataHeaderAccount >@apple</StyledDataHeaderAccount>
          <StyledDataHeaderDot >．</StyledDataHeaderDot>
          <StyledDataHeaderTime >3小時</StyledDataHeaderTime>
        </StyledDataHeader>
        <StyledCardDataContent >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</StyledCardDataContent>
        <StyledCardDataFooter >
          <StyledDataFooterItem >
            <StyledFooterItemIcon src={answer} alt="" />
            <StyledFooterItemCount >13</StyledFooterItemCount>
          </StyledDataFooterItem>
          <StyledDataFooterItem >
            <StyledFooterItemIcon src={follow} alt="" />
            <StyledFooterItemCount >76</StyledFooterItemCount>
          </StyledDataFooterItem>
        </StyledCardDataFooter>
      </StyledPostCardData>
    </StyledPostCard>
  )
}

export default PostCard