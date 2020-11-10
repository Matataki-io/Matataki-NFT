import React, { useContext, useState } from 'react'
import { Form, Input, Modal, Button, message } from 'antd';
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import { Context } from '../../contexts/CreateItemProvider'
import UploadImage from '../UploadImage/index';
import { getContractMatatakiNFT } from '../../utils/erc20';
import { createNft } from '../../api/client';
import { MatatakiNFT } from '../../constants/tokenAddresses'
import { issueToken } from "../../utils/contract";

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};
const tailLayout = {
  wrapperCol: { offset: 0, span: 24 },
};

const CreateItemModal: React.FC = () => {
  const CreateItemContext = useContext(Context);
  console.log('CreateItemContext', CreateItemContext)
  const [form] = Form.useForm();
  const [requestedSubmit, setRequestedSubmit] = useState(false)
  const { ethereum, account }: { account: string; ethereum: provider } = useWallet()

  const handleOk = (e: any) => {
    console.log(e);
    CreateItemContext.setVisible(false)
  };

  const handleCancel = (e: any) => {
    console.log(e);
    CreateItemContext.setVisible(false)
  };

  const onFinish = async (values: any) => {
    console.log(values);
    try {
      setRequestedSubmit(true)
      message.success('Start Create NFT ...')

      const result = await createNft({
        account,
        logo: values.nft.logo,
        name: values.nft.name,
        externalLink: values.nft.externalLink,
        description: values.nft.description,
      })

      if (result.code !== 0) {
        console.log('create nft faild', result)
        setRequestedSubmit(false)
        return
      }

      const contract = await getContractMatatakiNFT(ethereum as provider, MatatakiNFT)
      const txHash = await issueToken(contract, account)

      if (txHash) {
        message.success('Create NFT Success...')
        form.resetFields()
        CreateItemContext.setVisible(false)
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

  const handleUploadImage = (src: string) => {
    form.setFieldsValue({ nft: { logo: src } });
  };

  return (
    <Modal
      title="Create a new NFT"
      visible={CreateItemContext.visible}
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
  )
}

export default CreateItemModal