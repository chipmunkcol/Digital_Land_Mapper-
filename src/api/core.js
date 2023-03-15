import axios from "axios";

const req = axios.create({
  baseURL: process.env.REACT_APP_CONTEXT_PATH,
  withCredentials: true,
})

const axiosGet = (url, params) => {
  if(!params) {
    return req({ url });
  } else {
    return req({ url, params })
  }
}

const axiosPost = (url, data) => {
  return req({
    method: 'post',
    url,
    data  // parameter로 받은 data 객체
  })
}

// const reqProxy = axios.create({
//   baseURL: process.env.REACT_APP_CONTEXT_PATH,
//   withCredentials: true,

  
//   proxy: {
//     protocol: 'http',
//     host: '127.0.0.1',
//     port: 21111,

//   }
// })  

// const _axiosGet = (url, params) => {
//   if(!params) {
//     return reqProxy({ url });
//   } else {
//     return reqProxy({ url, params })
//   }
// }

// const _axiosPost = (url, data) => {
//   return reqProxy({
//     method: 'post',
//     url,
//     data,
//   })
// }

export {
  axiosGet,
  axiosPost,
  // _axiosGet,
  // _axiosPost,
}