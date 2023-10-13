import {create} from 'zustand'
import axios from 'axios'
import {produce} from 'immer'
import { Toast } from '@ant-design/react-native'

/* 参考dva接口绑定 */
const config: any = {}
const store: any = {}
const netInfo:{
  isConnected:boolean
  type:any
} = {
  isConnected:false,
  type:null
}
const immer = (config: any) => (set: any, get: any, api: any) => config((fn: any) => set(produce(fn)), get, api)
const wrapPromise = (promise: any) => {
  let status: string = 'pending'
  let result: any
  let suspender = promise.then(
    (r: any) => {
      status = 'success'
      result = r
    },
    (e: any) => {
      status = 'error'
      result = e
    }
  )
  return {
    read() {
      if (status === 'pending') {
        throw suspender
      } else if (status === 'error') {
        throw result
      } else if (status === 'success') {
        return result
      }
    }
  }
}
export function initDva(models: any, { printLog = false, useImmer = true }: any = {}) {
  Object.assign(config, { printLog, useImmer })
  for (let { namespace, state, reducers, effects } of models) {
    bindModel({ namespace, state, reducers, effects })
  }
}
export function bindModel({ namespace, state, reducers, effects }: any) {
  let vo: any = { suspense: {}, reducers, effects }
  const exec = (set: any, get: any) => {
    vo.set = set
    vo.get = get
    return {
      ...state,
      suspense: (type: any, pendingWithoutPromise = true) => {
        config.printLog && console.log('[suspense]', namespace, type)
        if (vo.suspense[type]) {
          vo.suspense[type].read()
        } else if (pendingWithoutPromise) {
          throw new Promise(res => res).then()
        }
      },
    }
  }
  vo.zustand = config.useImmer ? create(immer(exec)) : create(exec)
  store[namespace] = vo
  config.printLog && console.log('[model]', namespace)
}
export function useStore(namespace: string) {
  // config.printLog && console.log("store", { store, namespace });
  return store[namespace] ? { ...store[namespace].zustand() } : null
}
export function dispatch(namespace: any, type: any, payload: any) {
  config.printLog && console.log('[dispatch]', namespace, type, payload)
  let { reducers, effects } = store[namespace]
  if (reducers[type]) {
    reducer(namespace, type, payload)
  } else if (effects[type]) {
    effect(namespace, type, payload)
  } else {
    console.error(`dispatch[${type}] function not exsits in models[${namespace}]`)
  }
}
export function reducer(namespace: any, type: any, payload: any) {
  config.printLog && console.log('[reducer]', namespace, type, payload)
  let { set, get, reducers } = store[namespace]
  if (reducers[type]) {
    set(() => reducers[type](get(), { payload }))
  } else {
    console.error(`reducers[${type}] function not exsits in models[${namespace}]`)
  }
}
export async function effect(namespace: string, type: any, payload: any | null | object = null) {
  config.printLog && console.log('[effect]', namespace, type, payload)
  let { set, get, reducers, effects, suspense }: any = store[namespace]
  if (effects[type]) {
    const data = await effects[type](
      payload,
      {
        call: (func: any, params: any) => func(params),
        reducer: (...args: any) => {
          if (args.length <= 2) {
            args.unshift(namespace)
          }
          // @ts-ignore
          reducer(...args)
        },
        effect: (...args: any) => {
          if (args.length <= 2) {
            args.unshift(namespace)
          }
          // @ts-ignore
          effect(...args)
        },
        select: (namespace: any) => store[namespace].get(),
      }
    )
    suspense[type] = {
      read:()=>{
        return data
      }
    }
    return data
  } else {
    console.error(`effects[${type}] function not exsits in models[${namespace}]`)
  }
}
export function setNetInfo(state:any) {
  Object.keys(state).forEach(key=>{
    // @ts-ignore
    netInfo[key] = state[key]
  })
}
export function getNetInfo() {
  return netInfo
}

/* restful + json + jwt基本网络库 */
const requstParams: any = {
  serverHome: null,
  errorHanlder: null,
  extraHeaders: {},
}
export function initRequest(serverHome: any, errorHanlder: any) {
  if (requstParams) {
    requstParams.serverHome = serverHome
    requstParams.errorHanlder = errorHanlder
  }
}
export function bindHeader(key: string | number, value: any) {
  requstParams.extraHeaders[key] = value
}
export function bindJWTToken(token: string | null): void {
  requstParams.extraHeaders['Authorization'] = token ? `Bearer ${token}` : undefined
}
export function requestGet(url: string, body: any | null = null, loadingTips: string | null = null) {
  return request(url, { method: 'GET', body }, '', loadingTips)
}
export function requestDelete(url: any, body: any, loadingTips: string | null = null) {
  return request(url, { method: 'DELETE', body }, '', loadingTips)
}
export function requestPost(url: string, body: any, loadingTips: string | null = null) {
  return request(url, { method: 'POST', body }, '', loadingTips)
}
export function requestPatch(url: any, body: any) {
  return request(url, { method: 'PATCH', body })
}
export function requestPut(url: any, body: any, loadingTips: string | null = null) {
  return request(url, { method: 'PUT', body }, '', loadingTips)
}
export function requestFile(url: any, file: string | Blob | any) {
  let body = new FormData()
  body.append('file', file)
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body,
  }).then(response => response.text())
  // return request(url, { method: 'POST', body }, 'application/form-data')
}
function request(url: string, options: { method: any; body: any }, ContentType: string | null = null, loadingTips: string | null = null) {
  if(!netInfo.isConnected){
    Toast.fail('网络连接失败')
    return null
  }
  return new Promise((resolve, reject) => {
    let { method, body } = options
    // 添加url前缀
    if (url.indexOf('https://') === -1 && url.indexOf('http://') === -1) {
      url = requstParams.serverHome + (url.indexOf('/') === 0 ? url.substr(1) : url)
    }
    let option: any = {
      method,
      url,
      headers: {
        Accept: 'application/json',
        Pragma: 'no-cache',
        'Cache-Control': 'no-cache',
        Expires: 0,
        'Content-Type': ContentType || 'application/json; charset=utf-8',
        ...requstParams.extraHeaders,
      },
    }
    // 参数赋值
    switch (method.toUpperCase()) {
      case 'GET':
      case 'DELETE':
        option.params = body || {}
        break
      case 'POST':
      case 'PATCH':
      case 'PUT':
        option.data = body || {}
        break
    }
    config.printLog && console.log('[req]', method, url, body)
    let loading: any
    if (loadingTips) loading = Toast.loading(loadingTips, 0)
    axios(option)
      .then(({ data }: any) => {
        loading && Toast.remove(loading)
        config.printLog && console.log('[res]', method, url, data)
        resolve(data)
      })
      .catch((e: { response: { status: any; data: any } }) => {
        loading && Toast.remove(loading)
        config.printLog && console.error('[catch]', e)
        reject(e)
        if (e.response) {
          let { status, data } = e.response

          requstParams.errorHanlder(status, data)
        } else {
          requstParams.errorHanlder(e)
        }
      })
  })
}
