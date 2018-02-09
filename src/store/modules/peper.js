/**
 * Created by Administrator on 2017/8/16 0016.
 */
/**
 * Created by Administrator on 2017/8/7 0007.
 */

import {requestPaperType, requestPaperes, requestPaperDetails} from '../../api/api.js'
import * as types from '../mutation-custom-types';

export default {
    state: {
        paperTypeList: [],
        paperList: [],
        paperDetails: []
    },
    getters: {
        paperTypeList(state) {
            return state.paperTypeList
        },
        paperList(state) {
            return state.paperList
        },
        paperDetails(state) {
            return state.paperDetails
        }
    },
    actions: {
        async getPaperType({commit}, params) {
            try {
                await requestPaperType(params).then(res => {
                    let typeList = res.data.Data
                    console.log(typeList)
                    commit(types.GET_PAPER_TYPE, typeList)
                })
            }
            catch (e){}
        },
        async getPaperlist({commit}, params) {
            try {
                await requestPaperes(params).then(res => {
                    if (res.Status) {
                        let typeList = res.Data.Records
                        console.log(typeList)
                        commit(types.GET_PAPER_LIST,typeList)
                    } else {

                    }
                })
            }
            catch (e){}
        },
        async getPaperDetails({commit}, params) {
            try {
                await requestPaperDetails(params).then(res => {
                    if (res.status === 200) {
                        let typeList = res.data.Data
                        console.log('kkkkkkkkk')
                        console.log(res.data.Data)
                        commit(types.GET_PAPER_CONTENT,typeList)
                    } else {

                    }
                })
            }
            catch (e){}
        }
    },
    mutations: {
        [types.GET_PAPER_TYPE](state, params) {
            state.paperTypeList = params
        },
        [types.GET_PAPER_LIST](state, params) {
            state.paperList = params
        },
        [types.GET_PAPER_CONTENT](state, params) {
            state.paperDetails = params
        }
    }
}




