import client from '../utils/client';

export interface nftInterface {
  tokenId: number,
  account: string,
  transactionHash: string,
  tx: string,
  signature?: string,
  logo: string,
  name: string,
  symbol: string,
  description: string,
}

export interface axiosResult  {
  code: number,
  message: string,
  data?: any
}


// 创建NFT
export const createNft = (data: nftInterface): Promise<axiosResult> => client.post('/nft', data)