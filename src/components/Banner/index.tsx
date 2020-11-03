import React from 'react'
import styled from 'styled-components'

import banner from "../../assets/img/banner.png";
import bannerTitle from "../../assets/img/banner-title.png";


const Header: React.FC = () => (
  <StyledBanner>
    <img className="banner" src={bannerTitle} alt="banner title" aria-label="banner title" />
    <p className="banner-title">Buy, sell, and discover limited-edition goods with Matataki Fan Tickets</p>
    <button>CREATE A NEW NFT NOW !</button>
  </StyledBanner>
)

const StyledBanner = styled.section`
  width: 100%;
  height: 384px;
  background: #f1f1f1;
  background-image: url(${banner});
  background-size: cover;
  background-position: left;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .banner {
    height: 36px;
  }
  .banner-title {
    font-size: 20px;
    font-weight: 400;
    color: #333333;
    line-height: 28px;
    padding: 0;
    margin: 20px 0 40px;
  }
`


export default Header