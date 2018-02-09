/**
 * Created by Administrator on 2017/8/16 0016.
 */
/**
 * Created by Administrator on 2017/8/7 0007.
 */

import {requestCourseType, requestCourse, requestCourseResource} from '../../api/api.js'
import * as types from '../mutation-custom-types';

export default {
    state: {
        typeList: [],
        courseList: [],
        resource: []
    },
    getters: {
        typeList(state) {
            return state.typeList
        },
        courseList(state) {
            return state.courseList
        },
        resource(state) {
            return state.resource
        }
    },
    actions: {
        async getCourseType({commit}, params) {
            try {
                await requestCourseType(params).then(res => {
                    let typeList = res.data.Data
                    commit(types.GET_TYPE_LIST, typeList)
                })
            }
            catch (e){}
        },
        async getCourselist({commit}, params) {
            try {
                await requestCourse(params).then(res => {
                    if (res.Status) {
                        let typeList = res.Data
                        commit(types.GET_COURSE_LIST,typeList)
                    } else {

                    }
                })
            }
            catch (e){}
        },
        async getResource({commit}, params) {
            try {
                await requestCourseResource(params).then(res => {
                    console.log(res)
                    if (res.status === 200) {
                        let typeList = res.data.Data
                        commit(types.GET_COURSE_RESOURCE,typeList)
                    } else {

                    }
                })
            }
            catch (e){}
        }
    },
    mutations: {
        [types.GET_TYPE_LIST](state, params) {
            state.typeList = params
        },
        [types.GET_COURSE_LIST](state, params) {
            state.courseList = params
        },
        [types.GET_COURSE_RESOURCE](state, params) {
            state.resource = params
        }
    }
}


