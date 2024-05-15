import axios from "axios"

import storage from "./storage"

console.log("process.env", process.env)
const instance = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 1000,
  token: storage.get("token")
})

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 待开发——下载或者上传需要修改数据格式
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

/**
 * url:请求的地址
 * params:放在请求url中的参数
 * data：放在body中的参数
 * config:其他额外的配置
 * */
export function GET(url, params, config) {
  return instance.get(url, { params, ...config })
}

export function POST(url, data, config) {
  return instance.post(url, { data, ...config })
}

export function PUT(url, data, config) {
  return instance.post(url, { data, ...config })
}
