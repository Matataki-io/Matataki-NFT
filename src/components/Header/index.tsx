import React, { useContext } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useWallet } from 'use-wallet'

import logo from "../../assets/img/logo.png";
import logoText from "../../assets/img/logo-text.png";
import AccountButton from '../TopBar/components/AccountButton'
import { Context } from '../../contexts/CreateItemProvider'

const Header: React.FC = () => {
  const { account }: { account: string } = useWallet()
  const CreateItemContext = useContext(Context);

  return (
    <StyledHeader>
      <StyledHeaderContainer>
        <StyledHeaderLogoLink to="/">
          <img className="logo" src={logo} alt="logo" aria-label="logo" />
          <img className="logo-text" src={logoText} alt="logo" aria-label="logo" />
        </StyledHeaderLogoLink>
        <StyledHeaderUser>
          {/* <input type="text"></input> */}
          {
            account ? ( <StyledCreateButton style={{ marginRight: 8 }} onClick={() => CreateItemContext.setVisible(true)}> Create NFT</StyledCreateButton>) : ''
          }
          <AccountButton />
        </StyledHeaderUser>
      </StyledHeaderContainer>
    </StyledHeader>
  )
}

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
const StyledHeaderLogoLink = styled(Link)`
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
  display: flex;
  align-items: center;
`
const StyledCreateText = styled.p`
  font-size: 14px;
  margin: -10px 0 10px;
  padding: 0;
  color: rgb(170, 170, 170);
  line-height: 1.5;
`

const StyledCreateButton = styled.button`
  outline: none;
  border-radius: 8px;
  border: 2px solid #FFFFFF;
  background-color: transparent;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  color: #FFFFFF;
  padding: 0 28px;
  text-transform: uppercase;
  box-sizing: border-box;
  height: 40px;
  cursor: pointer;
`


export default Header