import React from 'react'
import styled from 'styled-components'
import chef from '../../assets/img/chef.png'
import Button from '../../components/Button'
import Container from '../../components/Container'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import Balances from './components/Balances'
import Banner from '../../components/Banner'

const Home: React.FC = () => {
  return (
    <Page>
      <Banner></Banner>
      {/* <PageHeader
        icon={<img src={chef} height={120} />}
        title="MasterChef is Ready"
        subtitle="Stake Uniswap LP tokens to claim your very own yummy SUSHI!"
      />

      <Container>
        <Balances />
      </Container>
      <Spacer size="lg" />
      <StyledInfo>
        🏆<b>Pro Tip</b>: SUSHI-ETH UNI-V2 LP token pool yields TWICE more token
        rewards per block.
      </StyledInfo>
      <Spacer size="lg" />
      <div
        style={{
          margin: '0 auto',
        }}
      >
        <Button text="🔪 See the Menu" to="/farms" variant="secondary" />
      </div> */}
      <StyledContent>
        <StyledContentHead>
          <div>Didital goods auction</div>
          <div>view all</div>
        </StyledContentHead>
        <StyledContentList>
          {
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 1, 1, 1].map(i => (
              <StyledList>
                <StyledListCover>
                  <img src="https://image.gameapps.hk/images/202002/26/5e998cac78633112.jpg" alt="cover" aria-label="cover" />
                </StyledListCover>
                <StyledListTitle>Binance Turns 3 Digital Card</StyledListTitle>
                <StyledListInfo>
                  <span>3days</span>
                  <span>1.3434DPC</span>
                </StyledListInfo>
              </StyledList>
            ))
          }
        </StyledContentList>
      </StyledContent>
    </Page>
  )
}

// const StyledInfo = styled.h3`
//   color: ${(props) => props.theme.color.grey[500]};
//   font-size: 16px;
//   font-weight: 400;
//   margin: 0;
//   padding: 0;
//   text-align: center;

//   > b {
//     color: ${(props) => props.theme.color.grey[600]};
//   }
// `

const StyledContent = styled.div`
  max-width: 1400px;
  padding: 0 15px;
  margin: 0 auto 120px;
  box-sizing: border-box;
`
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

export default Home
