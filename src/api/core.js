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

export {
  axiosGet,
  axiosPost,
}