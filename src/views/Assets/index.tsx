import React, { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import Page from '../../components/Page'
import Banner from '../../components/Banner'
import { Tag } from 'antd'
import { useHistory } from 'react-router-dom'
import { getNftId, nftInterface, OSSIMG } from '../../api/client'
import { useParams } from "react-router-dom";
import { isEmpty } from 'lodash';
import { LeftOutlined, ShareAltOutlined, LinkOutlined } from '@ant-design/icons';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { message } from 'antd';
import { DescriptionIcon, HistoryIcon, PriceIcon } from '../../components/IconAnt'


interface nftResultInterface extends nftInterface {}

const Assets: React.FC = () => {
  let history = useHistory()
  const { id }: { id: string } = useParams()
  const [nftData, setNftData] = useState<nftResultInterface>()

  useEffect(() => {
    const getData = async () => {
      const result = await getNftId(id)
      console.log('result', result)
      if (result.code === 0) {
        setNftData(result.data)
      }
    }

    getData()
  }, [id])

  return (
    <Page>
      <StyledHead>
        <StyledHeadBack onClick={() => history.goBack()}>
          <LeftOutlined />
          Back To NFTs
        </StyledHeadBack>
      </StyledHead>
      {
        isEmpty(nftData) ? (<StyledLoading>Loading...</StyledLoading>) : (
          <StyledContent>
            <StyledContentInfo>
              <StyledContentCover>
                <img src={ `${OSSIMG}/${nftData.logo}`} alt="cover" aria-label="cover" />
              </StyledContentCover>
              <StyledContentCard className="assets-description">
                <StyledContentCardTitle>
                  <span><DescriptionIcon />&nbsp;Description</span>
                </StyledContentCardTitle>
                <StyledContentCardContent>
                  <StyledPriceDescription>{nftData.description}</StyledPriceDescription>
                  {/* <a href="#">Unfold</a> */}
                </StyledContentCardContent>
              </StyledContentCard>
            </StyledContentInfo>

            <StyledContentPrice>
              <StyledPriceHead>
                <Tag color="cyan">New</Tag>
                {/* <span>lock icon 3d 00:00:00</span> */}
                <StyledPriceHeadShare>
                  <StyledPriceHeadBlock>
                    <a href={nftData.externalLink} target="_blank" rel="noopener noreferrer"><LinkOutlined /></a>
                  </StyledPriceHeadBlock>
                  <StyledPriceHeadBlock>
                  <CopyToClipboard text={window.location.href} onCopy={() => message.success('Copy Success')}>
                    <ShareAltOutlined />
                  </CopyToClipboard>
                  </StyledPriceHeadBlock>
                </StyledPriceHeadShare>
              </StyledPriceHead>
              <StyledPriceTitle>{nftData.name}</StyledPriceTitle>
              <StyledPriceUser>
                <StyledPriceUserBy>Created by </StyledPriceUserBy>
                <StyledPriceUserByAuthor href={`${process.env.REACT_APP_ETHERSCAN_URL}/address/${nftData.account}`} target="_blank" rel="noopener noreferrer">{nftData.account}</StyledPriceUserByAuthor>
              </StyledPriceUser>

              <StyledContentCard>
                <StyledContentCardTitle>
                  <span><PriceIcon />&nbsp;Current Price</span>
                </StyledContentCardTitle>
                <StyledContentCardContent>
                  ...
                </StyledContentCardContent>
              </StyledContentCard>


              <StyledContentCard>
                <StyledContentCardTitle>
                  <span><HistoryIcon />&nbsp;Price History</span>
                </StyledContentCardTitle>
                <StyledContentCardContent>
                  ...
                </StyledContentCardContent>
              </StyledContentCard>

            </StyledContentPrice>
          </StyledContent>
        )
      }

    </Page>
  )
}

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
  flex-wrap: wrap;
  @media screen and (max-width: 992px) {
    .assets-description {
      margin-top: 0;
    }
  }
  @media screen and (max-width: 576px) {
    .assets-description {
      margin-top: 20px;
    }
  }
`
const StyledContentInfo = styled.div`
  width: calc(40% - 24px);
  margin-right: 24px;
  @media screen and (max-width: 992px) {
    width: 100%;
    margin-right: 0;
    display: flex;
  }
  @media screen and (max-width: 576px) {
    flex-wrap: wrap;
  }
`
const StyledContentPrice = styled.div`
  width: 60%;
  @media screen and (max-width: 992px) {
    width: 100%;
    margin-top: 20px;
  }
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
  @media screen and (max-width: 992px) {
    width: 50%;
    flex: 0 0 50%;
    margin-right: 20px;
  }
  @media screen and (max-width: 576px) {
    width: 100%;
    height: 345px;
    flex: 0 0 100%;
    margin-right: 0;
  }
`
// common card
const StyledContentCard = styled.div`
  background: #FFFFFF;
  border-radius: 16px;
  border: 1px solid #DBDBDB;
  overflow: hidden;
  margin-top: 20px;
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
    display: flex;
    align-items: center;
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
const StyledPriceHeadBlock = styled.div`
  display: inline-block;
  padding: 0 0 0 12px;
  cursor: pointer;
  color: #333;
  a {
    color: inherit;
  }
`
const StyledPriceTitle = styled.p`
  font-size: 36px;
  font-weight: 600;
  color: #333333;
  line-height: 50px;
  padding: 16px 0;
  margin: 0;
`
const StyledPriceDescription = styled.p`
  font-size: 16px;
  line-height: 1.5;
  color: #7f7f7f;
  word-break: break-word;
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
  word-break: break-word;
`
const StyledLoading = styled.div`
  margin: 0 auto;
  box-sizing: border-box;
  max-width: 100px;
  text-align: center;
`





export default Assets
