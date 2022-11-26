//http.ts
import axios, { AxiosRequestConfig } from 'axios'
import NProgress from 'nprogress'

// 设置请求头和请求路径
axios.defaults.baseURL = '/api'
axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.interceptors.request.use(
  (config): AxiosRequestConfig<any> => {
    const token = window.sessionStorage.getItem('token')
    if (token) {
      //@ts-ignore
      config.headers.token = token
    }
    return config
  },
  (error) => {
    return error
  }
)
// 响应拦截
axios.interceptors.response.use((res) => {
  if (res.data.code === 111) {
    sessionStorage.setItem('token', '')
    // token过期操作
  }
  return res
})

interface ResType<T> {
  code: number
  data?: T
  msg: string
  err?: string
}
interface requestType {
  url: string
  params?: unknown
}
interface uploadType {
  url: string
  file: unknown
}
interface Http {
  get<T>(config: requestType): Promise<ResType<T>>
  post<T>(config: requestType): Promise<ResType<T>>
  upload<T>(config: uploadType): Promise<ResType<T>>
  download(url: string): void
}

const http: Http = {
  get(config) {
    const { url, params } = config
    return new Promise((resolve, reject) => {
      NProgress.start()
      axios
        .get(url, { params })
        .then((res) => {
          NProgress.done()
          resolve(res.data)
        })
        .catch((err) => {
          NProgress.done()
          reject(err.data)
        })
    })
  },
  post(config) {
    const { url, params } = config
    return new Promise((resolve, reject) => {
      NProgress.start()
      axios
        .post(url, JSON.stringify(params))
        .then((res) => {
          NProgress.done()
          resolve(res.data)
        })
        .catch((err) => {
          NProgress.done()
          reject(err.data)
        })
    })
  },
  upload(config) {
    const { url, file } = config
    return new Promise((resolve, reject) => {
      NProgress.start()
      axios
        .post(url, file, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then((res) => {
          NProgress.done()
          resolve(res.data)
        })
        .catch((err) => {
          NProgress.done()
          reject(err.data)
        })
    })
  },
  download(url) {
    const iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.src = url
    iframe.onload = function () {
      document.body.removeChild(iframe)
    }
    document.body.appendChild(iframe)
  }
}
export default http

// import axios from 'axios'
// import { BASE_URL, TIMEOUT } from './config'
// // import useMainStore from '@/stores/modules/main'

// class Request {
//   instance: any
//   constructor(baseURL: string, timeout = 10000) {
//     this.instance = axios.create({
//       baseURL,
//       timeout,
//       withCredentials: true
//     })

//     this.instance.interceptors.request.use(
//       (config: any) => {
//         // useMainStore().isLoading = true
//         return config
//       },
//       (err: any) => {
//         return err
//       }
//     )
//     this.instance.interceptors.response.use(
//       (res: any) => {
//         // useMainStore().isLoading = false
//         return res
//       },
//       (err: any) => {
//         // useMainStore().isLoading = false
//         return err
//       }
//     )
//   }

//   request(config: any) {
//     // mainStore.isLoading = true
//     return new Promise((resolve, reject) => {
//       this.instance
//         .request(config)
//         .then((res: any) => {
//           resolve(res.data)
//           // mainStore.isLoading = false
//         })
//         .catch((err: any) => {
//           reject(err)
//           // mainStore.isLoading = false
//         })
//     })
//   }

//   get(config: any) {
//     return this.request({ ...config, method: 'get' })
//   }

//   post(config: any) {
//     return this.request({ ...config, method: 'post' })
//   }
// }

// export default new Request(BASE_URL, TIMEOUT)
