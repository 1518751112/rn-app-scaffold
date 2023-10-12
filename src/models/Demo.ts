import { EGet, NDemo, RSetState } from "common/constant";
import { requestGet } from 'utils/dva16'

export default {
  namespace: NDemo,
  state: {
    name:"测试昵称"
  },
  reducers: {
    [RSetState](state: any, { payload }: any) {
      return {
        ...state,
        ...payload,
      }
    },
  },
  effects: {
    async [EGet]({ payload }: any, { call, reducer, select, effect }: any) {
      const res = await requestGet('basic/information', payload)
      reducer(RSetState, { newsList: res })
    },
  },
}
