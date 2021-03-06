import React, { useEffect, useState, useCallback, useContext } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import chef from '../../assets/img/chef.png'
import Button from '../../components/Button'
import Container from '../../components/Container'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import Balances from './components/Balances'
import Banner from '../../components/Banner'
import { Pagination, Checkbox } from 'antd'
import { Link } from 'react-router-dom'
import { getNft, OSSIMG, myNftInterface } from '../../api/client'
import { providers, Contract } from 'ethers'
import { MatatakiNFT } from '../../constants/tokenAddresses'
import MatatakiNFTABI from '../../constants/abi/MatatakiNFT.json'
import { Network, NetworksName } from '../../config/index'
import { AuctionIcon } from '../../components/IconAnt'


const Home: React.FC = () => {
  const { account }: { account: string } = useWallet()
  const [current, setCurrent] = useState(1)
  const [page, setPage] = useState(1)
  const [size,] = useState(20)
  const [isAccount, setIsAccount] = useState(false)
  const [nftList, setNftList] = useState({
    count: 0,
    list: []
  })

  function HandleAccountOnChange(e: any) {
    console.log(`checked = ${e.target.checked}`);
    setIsAccount(e.target.checked)
  }
  function paginationChange(page: any, pageSize: any) {
    console.log(`page, pageSize = ${page} ${pageSize}`);
    setPage(page)
    setCurrent(page)
  }

  useEffect(() => {
    const getData = async () => {
      let params: myNftInterface = { page, size }
      // show self nft
      if (isAccount && account) {
        params = { ...params, account: account }
      }
      const result = await getNft(params)
      console.log('result', result)
      if (result.code === 0) {
        setNftList(result.data)
      }
    }
    getData()

    try {
      const init = async () => {
        // const provider = ethers.getDefaultProvider(NetworksName[Network]);
        const web3: any = (window as any).web3
        const provider = new providers.Web3Provider(web3.currentProvider);
        // const provider = new ethers.providers.JsonRpcProvider('https://eth-rinkeby.alchemyapi.io/v2/SLFdIfubZlDvaKjRv-rP3Ie0msesJydB');
        const contract = new Contract(MatatakiNFT, MatatakiNFTABI, provider);

        const contractName = await contract.name();
        console.log('current name', contractName);

        contract.on('Transfer', (address, to, tokenId, event) => {

          getData()

          console.log(address);
          console.log(to);
          console.log(tokenId);
          console.log(tokenId.toString());
          // 查看后面的事件触发器  Event Emitter 了解事件对象的属性
          console.log(event);
          console.log(event.blockNumber);
        });
      }
      init()
    } catch (e) {
      console.log('eth event error', e);
    }

  }, [account, isAccount, page, size])

  return (
    <Page>
      <Banner></Banner>
      <StyledContent>
        <StyledContentHead>
          <StyledFlexCenter>
            <AuctionIcon></AuctionIcon>
            <span style={{ marginLeft: 4 }}>Didital goods auction</span>
          </StyledFlexCenter>
          <StyledFlexCenter>
            {
              account ? <Checkbox onChange={HandleAccountOnChange}>My NFT</Checkbox> : ''
            }
          </StyledFlexCenter>
        </StyledContentHead>
        <StyledContentList>
          {
            nftList.list.map((i, idx) => (
              <StyledListLink to={`/assets/${MatatakiNFT}/${i.tokenId}`} key={idx}>
                <StyledListCover>
                  <img src={`${OSSIMG}/${i.logo}`} alt="cover" aria-label="cover" />
                </StyledListCover>
                <StyledListTitle>{i.name}</StyledListTitle>
                <StyledListTitle>{i.description}</StyledListTitle>
                {/* <StyledListInfo>
                  <span>3days</span>
                  <span>1.3434DPC</span>
                </StyledListInfo> */}
              </StyledListLink>
            ))
          }
        </StyledContentList>
        <StyledContentPagination>
          <Pagination current={current} total={nftList.count} defaultPageSize={size} onChange={paginationChange} />
        </StyledContentPagination>
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

const StyledFlexCenter = styled.div`
  display: flex;
  align-items: center;
`
const StyledContentList = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: 24px;
  grid-row-gap: 24px;
  margin-top: 24px;
  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media screen and (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 576px) {
    grid-template-columns: repeat(1, 1fr);
  }
`
const StyledContentPagination = styled.div`
  display: felx;
  align-items: cennter;
  justify-content: center;
  margin-top: 40px;

`
const StyledListLink = styled(Link)`
  /* max-width: 256px; */
  height: 360px;
  background: #FFFFFF;
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.06);
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all .2s;
  display: flex;
  flex-direction: column;
  &:hover {
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.16);
  }
  @media screen and (max-width: 576px) {
    height: 430px;
  }

`
const StyledListCover = styled.div`
  width: 100%;
  height: 256px;
  overflow: hidden;
  @media screen and (max-width: 576px) {
    height: 326px;
  }
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const StyledListInfo = styled.div`
  margin: 0 16px 0;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export default Home
