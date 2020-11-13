import React from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { imageLogo } from '../../api/client'
import styled from 'styled-components'
import * as imageConversion from 'image-conversion';
import { AnyARecord, AnyRecordWithTtl } from 'dns';

interface StateInterface {
  imageUrl: string,
  loading: Boolean
}
interface Props {
  onUploadImage: Function
}

function getBase64(img: Blob, callback: Function) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file: { type: string, size: number, name: string }) {
  console.log('file', file)
  const isJpgOrPng = file.type === 'image/jpeg' ||
                    file.type === 'image/png' ||
                    file.type === 'image/gif' ||
                    file.type === 'image/bmp' ||
                    file.type === 'image/webp'

  if (!isJpgOrPng) {
    message.error('You can only upload JPG, JPEG, JFIF, BMP, WEBP, PNG, GIF file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

function blobToFile(blob: any, fileName: string) {
  blob.lastModifiedDate = new Date();
  blob.name = fileName;
  return blob;
}

async function transformFile(file: File): Promise<string | Blob | File> {
  // https://blog.csdn.net/qq_21937107/article/details/91424611
  // base64 to blob then file
  console.log('file', file)
  try {
    const fileImg = await imageConversion.filetoDataURL(file)
    const blob = await imageConversion.dataURLtoFile(fileImg)

    const fileName = file.name.split('.')
    let fileType = fileName[fileName.length - 1]

    // 如果文件类型是 jfif 使用 jpg 否则使用默认
    if (fileType === 'jfif') {
      fileType = 'jpg'
    }
    const result = blobToFile(blob, `${fileName[0] || Date.now()}.${fileType}`)
    console.log('result', result)

    return result
  } catch (e) {
    console.log('e', e)
    return file
  }
}

class UploadImage extends React.Component<Props> {

  state: StateInterface = {
    imageUrl: '',
    loading: false,
  };

  handleChange = (info: any ) => {
    console.log('info', info)
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'error') {
      message.error('Upload faild!');
      this.setState({
        imageUrl: '',
        loading: false,
      })
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl: string) =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
    if (info.file.status === 'done' && info.file.response.code === 0) {
      this.props.onUploadImage(info.file.response.data)
      // console.log('this', this.props)
    }

  };

  render() {
    const { loading, imageUrl } = this.state;
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <StyledUpload
        listType="picture-card"
        showUploadList={false}
        action={imageLogo}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
        transformFile={transformFile}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </StyledUpload>
    );
  }
}

const StyledUpload = styled(Upload)`
  & > .ant-upload {
    width: 110px;
    height: 110px;
    overflow: hidden;
  }
`

export default UploadImage