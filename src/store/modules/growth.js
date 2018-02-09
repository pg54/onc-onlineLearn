/**
 * Created by Administrator on 2017/8/18 0018.
 */
/**
 * Created by Administrator on 2017/8/16 0016.
 */
/**
 * Created by Administrator on 2017/8/7 0007.
 */

import { requestGrowth} from '../../api/api.js'
import * as types from '../mutation-custom-types';

export default {
    state: {
        growthList: []
    },
    getters: {
        growthList(state) {
            return state.growthList
        }
    },
    actions: {
        async getGrowthList({commit}, params) {
            try {
                await requestGrowth(params).then(res => {
                    console.log(res)
                    let typeList = res.Data
                    console.log(typeList)
                    commit(types.GET_GROWTH_LIST, typeList)
                })
            }
            catch (e){}
        }
    },
    mutations: {
        [types.GET_GROWTH_LIST](state, params) {
            state.growthList = params
        }
    }
}




