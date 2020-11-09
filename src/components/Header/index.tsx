import React, { useState } from 'react'
import styled from 'styled-components'
import { Form, Input, Modal, Button, message } from 'antd';
import logo from "../../assets/img/logo.png";
import logoText from "../../assets/img/logo-text.png";
import { Link } from 'react-router-dom'
import { provider } from 'web3-core'
import { useWallet } from 'use-wallet'

import AccountButton from '../TopBar/components/AccountButton'
import { getContract, getContractFactory, getContractMatatakiNFT } from '../../utils/erc20';
import { getTokenInfo, approve, createMiningPool, issueToken, totalSupply } from "../../utils/contract";
import { StakingMiningPoolFactory, MatatakiNFT } from '../../constants/tokenAddresses'
import { parseUnits } from 'ethers/lib/utils'
import { createNft, axiosResult } from '../../api/client';
import UploadImage from '../UploadImage';

const Header: React.FC = () => {

  const [visible, setVisible] = useState(false)
  const { ethereum, account }: { account: string; ethereum: provider } = useWallet()
  const [form] = Form.useForm();
  const [requestedSubmit, setRequestedSubmit] = useState(false)


  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };
  const tailLayout = {
    wrapperCol: { offset: 0, span: 24 },
  };

  const onFinish = async (values: any) => {
    console.log(values);
    try {
      setRequestedSubmit(true)
      message.success('Start Create NFT ...')

      const contract = await getContractMatatakiNFT(ethereum as provider, MatatakiNFT)
      const txHash = await issueToken(contract, account)
      const totalSupplyResult = await totalSupply(contract)
      const result = await createNft({
        tokenId: totalSupplyResult,
        account,
        transactionHash: txHash.transactionHash,
        tx: JSON.stringify(txHash),
        logo: values.nft.logo,
        name: values.nft.name,
        externalLink: values.nft.externalLink,
        description: values.nft.description,
      })

      if (txHash) {
        message.success('Create NFT Success...')
        // await reloadFarmClick()
        // await onDismiss()
      } else {
        // user rejected tx or didn't go thru
        message.success('Maybe the user rejected...')
      }
      console.log('txHash', txHash)
      console.log('totalSupplyResult', totalSupplyResult)
      setRequestedSubmit(false)

      if (result.code === 0) {
        setVisible(false)
      }
    } catch (e) {
      console.log(e)
      setRequestedSubmit(false)
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  const showModal = () => {
    setVisible(true)
  };

  const handleOk = (e: any) => {
    console.log(e);
    setVisible(false)
  };

  const handleCancel = (e: any) => {
    console.log(e);
    setVisible(false)
  };

  const handleUploadImage = (src: string) => {
    form.setFieldsValue({ nft: { logo: src } });
  };

  return (
    <StyledHeader>
      <StyledHeaderContainer>
        <StyledHeaderLogoLink to="/">
          <img className="logo" src={logo} alt="logo" aria-label="logo" />
          <img className="logo-text" src={logoText} alt="logo" aria-label="logo" />
        </StyledHeaderLogoLink>
        <StyledHeaderUser>
          <input type="text"></input>
          <Button type="primary" onClick={() => showModal()} loading={requestedSubmit}>
            Create NFT
          </Button>
          <AccountButton />
        </StyledHeaderUser>
      </StyledHeaderContainer>
      <Modal
        title="Create a new NFT"
        visible={visible}
        onOk={e => handleOk(e)}
        onCancel={e => handleCancel(e)}
        footer={null}
      >
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}
        layout="vertical">
          <Form.Item name={['nft', 'logo']} label="LOGO" rules={[{ required: true, message: 'Please input logo url!' }]}>
            <UploadImage onUploadImage={handleUploadImage}></UploadImage>
            {/* <Input placeholder="Please input logo url" /> */}
          </Form.Item>
          <Form.Item name={['nft', 'name']} label="NAME" rules={[{ required: true, message: 'Please input name!' }]}>
            <Input placeholder="Please input name" />
          </Form.Item>
          <Form.Item name={['nft', 'externalLink']} label="EXTERNAL LINK" rules={[{ required: true, message: 'Please input external link' }]}>
            {/* <StyledCreateText>Matataki-NFT will include a link to this URL on this item's detail page, so that users can click to learn more about it. You are welcome to link to your own webpage with more details.</StyledCreateText> */}
            <Input placeholder="Please input external link" />
          </Form.Item>
          <Form.Item name={['nft', 'description']} label="DESCRIPTION" rules={[{ required: true, message: 'Please input description!' }]}>
            <Input.TextArea placeholder="Please input description" rows={4} />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={requestedSubmit}>
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
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


export default Header