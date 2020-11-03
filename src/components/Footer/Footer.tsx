import React from 'react'
import styled from 'styled-components'

// import Nav from './components/Nav'
import logo from "../../assets/img/logo.png";
import logoText from "../../assets/img/logo-text.png";

const Footer: React.FC = () => (
  <StyledFooter>
    {/* <StyledFooterInner>
      <Nav />
    </StyledFooterInner> */}

    <StyledFooterContainer>
      <div>
        <StyledFooterLogo>
          <img className="logo" src={logo} alt="logo" aria-label="logo" />
          <img className="logo-text" src={logoText} alt="logo" aria-label="logo" />
        </StyledFooterLogo>
        <StyledFooterCopyright>© 2018 - 2020 NFT Market All Rights Served </StyledFooterCopyright>
      </div>

      <StyledFooterUlContent>
        <StyledFooterUl>
          <li>About</li>
          <li>Suggestions</li>
          <li>FAQ</li>
        </StyledFooterUl>
        <StyledFooterUl>
          <li>Privacy Policy</li>
          <li>Terms of Service</li>
        </StyledFooterUl>
      </StyledFooterUlContent>
    </StyledFooterContainer>
  </StyledFooter>
)

const StyledFooter = styled.footer`
  background-color: #B2B2B2;
`
const StyledFooterContainer = styled.footer`
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 15px;
  display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
`
// const StyledFooterInner = styled.div`
//   align-items: center;
//   display: flex;
//   justify-content: center;
//   height: ${props => props.theme.topBarSize}px;
//   max-width: ${props => props.theme.siteWidth}px;
//   width: 100%;
// `

const StyledFooterLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 70px;
  .logo {
    height: 30px;
  }
  .logo-text {
    height: 24px;
    margin: 0 0 0 10px;
  }
`
const StyledFooterCopyright = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 20px;
  padding: 0;
  margin: 0;
`
const StyledFooterUlContent = styled.div`
  display: flex;
`
const StyledFooterUl = styled.ul`
  padding: 0;
  margin: 0 40px;
  list-style: none;
  li {
    font-size: 16px;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 22px;
    margin: 16px 0;
  }
`


export default Footer