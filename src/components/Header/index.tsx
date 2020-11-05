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
import { getTokenInfo, approve, createMiningPool, issueToken } from "../../utils/contract";
import { StakingMiningPoolFactory, MatatakiNFT } from '../../constants/tokenAddresses'
import { parseUnits } from 'ethers/lib/utils'

const Header: React.FC = () => {

  const [visible, setVisible] = useState(false)
  const { ethereum, account }: { account: string; ethereum: provider } = useWallet()
  const [form] = Form.useForm();
  const [requestedSubmit, setRequestedSubmit] = useState(false)


  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const tailLayout = {
    wrapperCol: { offset: 6, span: 18 },
  };

  const onGenderChange = (value: any) => {
    switch (value) {
      case 'male':
        form.setFieldsValue({ note: 'Hi, man!' });
        return;
      case 'female':
        form.setFieldsValue({ note: 'Hi, lady!' });
        return;
      case 'other':
        form.setFieldsValue({ note: 'Hi there!' });
        return;
    }
  };

  const onFinish = async (values: any) => {
    console.log(values);
    try {
      setRequestedSubmit(true)
      message.success('Start Create NFT ...')

      const contract = await getContractMatatakiNFT(ethereum as provider, MatatakiNFT)
      const txHash = await issueToken(contract, account)

      if (txHash) {
        message.success('Create NFT Success...')
        // await reloadFarmClick()
        // await onDismiss()
      } else {
        // user rejected tx or didn't go thru
        message.success('Maybe the user rejected...')
      }
      console.log('txHash', txHash)
      setRequestedSubmit(false)
    } catch (e) {
      console.log(e)
      setRequestedSubmit(false)
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      note: 'Hello world!',
      gender: 'male',
    });
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
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
          <Form.Item name={['nft', 'logo']} label="LOGO" rules={[{ required: true, message: 'Please input logo url!' }]}>
            <Input placeholder="Please input logo url" />
          </Form.Item>
          <Form.Item name={['nft', 'name']} label="NAME" rules={[{ required: true, message: 'Please input name!' }]}>
            <Input placeholder="Please input name" />
          </Form.Item>
          <Form.Item name={['nft', 'symbol']} label="SYMBOL" rules={[{ required: true, message: 'Please input symbol!' }]}>
            <Input placeholder="Please input symbol" />
          </Form.Item>
          <Form.Item name={['nft', 'decription']} label="DESCRIPTIONN" rules={[{ required: true, message: 'Please input decription!' }]}>
            <Input.TextArea placeholder="Please input decription" />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
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


export default Header