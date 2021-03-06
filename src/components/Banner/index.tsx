import React, { useContext } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import { message } from 'antd';

import banner from "../../assets/img/banner.png";
import bannerTitle from "../../assets/img/banner-title.png";
import { Context } from '../../contexts/CreateItemProvider'

const Header: React.FC = () => {
  const CreateItemContext = useContext(Context);
  const { account }: { account: string } = useWallet()

  const showCreateItemModal = () => {
    if (account) {
      CreateItemContext.setVisible(true)
    } else {
      message.info('please sign in!')
    }
  }

  return (
    <StyledBanner>
      <img className="banner" src={bannerTitle} alt="banner title" aria-label="banner title" />
      <p className="banner-title">Buy, sell, and discover limited-edition goods with Matataki Fan Tickets</p>
      <StyledBannerButton onClick={ () => showCreateItemModal() }>CREATE A NEW NFT NOW !</StyledBannerButton>
    </StyledBanner>
  )
}

const StyledBanner = styled.section`
  width: 100%;
  height: 384px;
  background: #f1f1f1;
  background-image: url(${banner});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  @media screen and (max-width: 576px) {
    background-position: right;
  }
  .banner {
    height: 36px;
    @media screen and (max-width: 576px) {
      height: 22px;
    }
  }
  .banner-title {
    font-size: 20px;
    font-weight: 400;
    color: #333333;
    line-height: 28px;
    padding: 0;
    margin: 20px 0 40px;
    @media screen and (max-width: 576px) {
      font-size: 18px;
      padding: 0px 20px;
    }
  }
`

const StyledBannerButton = styled.button`
  background: #193CB1;
  border-radius: 24px;
  font-size: 16px;
  font-weight: 600;
  color: #FFFFFF;
  line-height: 22px;
  outline: navajowhite;
  border: navajowhite;
  padding: 13px 36px;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    background: #1940c5;
  }
  @media screen and (max-width: 576px) {
    font-size: 14px;
    padding: 10px 30px;
  }
`



export default Header