import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'

// 定义拦截器函数类型
type RequestInterceptor = (
  config: InternalAxiosRequestConfig
) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
type ResponseInterceptor<T = any> = (
  res: AxiosResponse<T>
) => AxiosResponse<T> | Promise<AxiosResponse<T>>;
type RequestInterceptorError = (err: any) => any;
type ResponseInterceptorError = (err: any) => any;

// 定义 HYRequestConfig 类型
export interface HYRequestConfig<T = any> extends AxiosRequestConfig {
  interceptors?: {
    requestSuccessFn?: RequestInterceptor;
    requestFailureFn?: RequestInterceptorError;
    responseSuccessFn?: ResponseInterceptor<T>;
    responseFailureFn?: ResponseInterceptorError;
  };
}

class HYRequest {
  instance: AxiosInstance

  // request实例 => axios的实例
  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config)

    // 每个instance实例都添加拦截器
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // loading/token
        return config
      },
      (err: any) => {
         return Promise.reject(err)
      }
    )
    this.instance.interceptors.response.use(
      (res: AxiosResponse<any>) => {
        return res.data
      },
      (err: any) => {
          return Promise.reject(err)
      }
    )

    // 针对特定的hyRequest实例添加拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    )
  }

  // 封装网络请求的方法
  // T => IHomeData
  request<T = any>(config: HYRequestConfig<T>): Promise<T> {
    // 单次请求的成功拦截处理
    let requestConfig = { ...config }
    if (requestConfig.interceptors?.requestSuccessFn) {
        requestConfig = requestConfig.interceptors.requestSuccessFn(
        requestConfig as InternalAxiosRequestConfig
      ) as HYRequestConfig<T>
    }

    // 返回Promise
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(requestConfig)
        .then((res) => {
            let response = res as AxiosResponse<T>;
           // 单词响应的成功拦截处理
          if (requestConfig.interceptors?.responseSuccessFn) {
               response = requestConfig.interceptors.responseSuccessFn(
                response
            ) as AxiosResponse<T>
          }
          resolve(response.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default HYRequest
