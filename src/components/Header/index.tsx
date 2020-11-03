import React from 'react'
import styled from 'styled-components'

import logo from "../../assets/img/logo.png";
import logoText from "../../assets/img/logo-text.png";

const Header: React.FC = () => (
  <StyledHeader>
    <StyledHeaderContainer>
      <StyledHeaderLogo>
        <img className="logo" src={logo} alt="logo" aria-label="logo" />
        <img className="logo-text" src={logoText} alt="logo" aria-label="logo" />
      </StyledHeaderLogo>
      <StyledHeaderUser>
        <input type="text"></input>
        <button>Create NFT</button>
        <span>user</span>
      </StyledHeaderUser>
    </StyledHeaderContainer>
  </StyledHeader>
)

const StyledHeader = styled.header`
  width: 100%;
  height: 60px;
  background: #193CB1;
`

const StyledHeaderContainer = styled.div`
  height: 100%;
  margin: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const StyledHeaderLogo = styled.div`
  display: flex;
  align-items: center;
  .logo {
    height: 30px;
  }
  .logo-text {
    height: 16px;
    margin-left: 10px;
  }
`
const StyledHeaderUser = styled.div`
  
`


export default Header