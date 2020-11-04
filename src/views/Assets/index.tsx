import React from 'react'
import styled from 'styled-components'
import Page from '../../components/Page'
import Banner from '../../components/Banner'
import { Tag } from 'antd'
import { useHistory } from 'react-router-dom'

const Assets: React.FC = () => {
  let history = useHistory()

  return (
    <Page>
      <StyledHead>
        <StyledHeadBack onClick={ () => history.goBack() }>Back To NFTs</StyledHeadBack>
      </StyledHead>
      <StyledContent>
        <StyledContentInfo>
          <StyledContentCover>
            <img src="https://image.gameapps.hk/images/202002/26/5e998cac78633112.jpg" alt="cover" aria-label="cover" />
          </StyledContentCover>
          <StyledContentCard>
            <StyledContentCardTitle>
              <span>icon Description</span>
            </StyledContentCardTitle>
            <StyledContentCardContent>
              Developed by Shinji Mikami -- creator of the seminal Resident Evil series -- and the talented team at Tango Gameworks, The Evil Within embodies the meaning of pure survival horror. Highly-crafted environments, horrifying anxiety, and an intricate story are combined to create an immersive world that will bring you to the height of tension. With limited resources at your disposal, you’ll fight for survi…
              <a href="#">Unfold</a>
            </StyledContentCardContent>
          </StyledContentCard>
        </StyledContentInfo>

        <StyledContentPrice>
          <StyledPriceHead>
            <Tag color="cyan">Now On Sale</Tag>
            <span>lock icon 3d 00:00:00</span>
            <StyledPriceHeadShare>share icon</StyledPriceHeadShare>
          </StyledPriceHead>
          <StyledPriceTitle>Evil Within - The Game Cover</StyledPriceTitle>
          <StyledPriceUser>
            <StyledPriceUserBy>Created by</StyledPriceUserBy>
            <StyledPriceUserByAuthor>avatar HideoKojima</StyledPriceUserByAuthor>
          </StyledPriceUser>

          <StyledContentCard>
            <StyledContentCardTitle>
              <span>icon Current Price</span>
            </StyledContentCardTitle>
            <StyledContentCardContent>
              <div>
                <div>
                  <div>New Offer</div>
                  <div>7.7545<span>KJM($1.312)</span></div>
                </div>
                <div>
                  <div>New Offer</div>
                  <div>7.7545<span>KJM($1.312)</span></div>
                </div>
              </div>
              <div>
                <input type="text" value="Input the price you want to offer" />
                <button>participate in the auction</button>
              </div>
            </StyledContentCardContent>
          </StyledContentCard>


          <StyledContentCard>
            <StyledContentCardTitle>
              <span>icon Price History</span>
            </StyledContentCardTitle>
            <StyledContentCardContent>
              charts
            </StyledContentCardContent>
          </StyledContentCard>

        </StyledContentPrice>
      </StyledContent>
    </Page>
  )
}

// const StyledContent = styled.div`
//   max-width: 1400px;
//   padding: 0 15px;
//   margin: 0 auto 120px;
//   box-sizing: border-box;
// `
const StyledContentHead = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 40px;
  `
const StyledContentList = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-column-gap: 24px;
    grid-row-gap: 24px;
    margin-top: 24px;
  `
const StyledContentPagination = styled.div`
display: felx;
align-items: cennter;
justify-content: center;
margin-top: 40px;

`
const StyledList = styled.div`
  width: 256px;
  height: 360px;
  background: #FFFFFF;
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.06);
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all .2s;
  &:hover {
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.16);
  }

`
const StyledListCover = styled.div`
  width: 100%;
  height: 256px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
const StyledListTitle = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #333333;
  line-height: 22px;
  padding: 0;
  margin: 16px 16px 0;
`
const StyledListInfo = styled.div`
  margin: 24px 16px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

// ----

const StyledHead = styled.div`
max-width: 1400px;
padding: 0 15px;
box-sizing: border-box;
    display: flex;
    align-items: center;
    margin: 40px auto 20px;
`
const StyledHeadBack = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #193CB1;
  line-height: 22px;
  cursor: pointer;
`
const StyledContent = styled.div`
  max-width: 1400px;
  padding: 0 15px;
  margin: 0 auto 40px;
  box-sizing: border-box;
  display: flex;
`
const StyledContentInfo = styled.div`
  width: calc(40% - 24px);
  margin-right: 24px;
`
const StyledContentPrice = styled.div`
  width: 60%
`

const StyledContentCover = styled.div`
  height: 512px;
  overflow: hidden;
  background: #B2B2B2;
  border-radius: 16px;
  border: 1px solid #DBDBDB;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
// common card
const StyledContentCard = styled.div`
  background: #FFFFFF;
  border-radius: 16px;
  border: 1px solid #DBDBDB;
  overflow: hidden;
  margin-top: 24px;
`
const StyledContentCardTitle = styled.div`
  height: 53px;
  background: #F1F1F1;
  border-bottom: 1px solid #DBDBDB;
  display: flex;
  align-items: center;
  padding: 0 16px;
  span {
    font-size: 16px;
    font-weight: bold;
    color: #333333;
    line-height: 22px;
  }
`
const StyledContentCardContent = styled.div`
  padding: 16px;
  background: #FFFFFF;
`
const StyledPriceHead = styled.div`
  display: flex;
`
const StyledPriceHeadShare = styled.span`
  margin-left: auto;
`
const StyledPriceTitle = styled.p`
  font-size: 36px;
  font-weight: 600;
  color: #333333;
  line-height: 50px;
  padding: 16px 0;
  margin: 0;
`
const StyledPriceUser = styled.div``
const StyledPriceUserBy = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: #B2B2B2;
  line-height: 22px;

`
const StyledPriceUserByAuthor = styled.a`
  font-size: 16px;
  font-weight: 500;
  color: #193CB1;
  line-height: 22px;
`

export default Assets
