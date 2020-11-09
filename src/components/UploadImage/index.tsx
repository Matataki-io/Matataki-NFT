import React from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { imageLogo } from '../../api/client'

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

function beforeUpload(file: { type: string, size: number }) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
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
      <Upload
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={imageLogo}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    );
  }
}

export default UploadImage