import client from '../utils/client';

export interface nftInterface {
  tokenId?: number,
  account: string,
  transactionHash?: string,
  tx?: string,
  signature?: string,
  logo: string,
  name: string,
  externalLink: string,
  description: string,
}

export interface paramsPaginationInterface {
  page: number,
  size: number,
}

export interface axiosResult  {
  code: number,
  message: string,
  data?: any
}


// 创建NFT
export const createNft = (data: nftInterface): Promise<axiosResult> => client.post('/nft', data)
// 获取全部NFT
export const getNft = (params: paramsPaginationInterface): Promise<axiosResult> => client.get('/nft', { params })
// 获取NFT
export const getNftId = (tokenId: string): Promise<axiosResult> => client.get(`/nft/${tokenId}`)

// 图片上传
export const imageLogo = `${process.env.REACT_APP_API}/image/logo`
export const OSSIMG = 'https://ssimg.frontenduse.top'