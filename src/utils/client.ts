
import axios from 'axios'
// import { getCookie, removeCookie, clearAllCookie } from '@/utils/cookie'
// import store from './store'


const _axios = axios.create({
  baseURL: process.env.REACT_APP_API,
  timeout: 20000,
  headers: {},
})

_axios.interceptors.request.use(
  (config) => {
      // if (getCookie('ACCESS_TOKEN')) {
      //   config.headers['x-access-token'] = getCookie('ACCESS_TOKEN')
      // }
    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  (response) => {
    // if(loadingInstance) loadingInstance.close();
    // if(response.status === 429) {}
    return response.data
  },
  (error) => {
    // loadingInstance.close()
    console.log('axios interceptors response error', error)

    if (error.message.includes('status code 401')) {
      console.log('登录状态异常,请重新登录')
    }

    // 超时处理
    if (error.message.includes('timeout')) {
      console.log('请求超时')
    }
    if (error.message.includes('Network Error')) {
      console.log('Network Error')
    }
    // loadingInstance.close()
    return Promise.reject(error)
  }
)

export default _axios
