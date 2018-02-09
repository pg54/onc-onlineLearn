/**
 * @file router
 * @author chenqiushi(chenqiushi@baidu.com)
 */

import Vue from 'vue';
import Router from 'vue-router';
import * as types from './store/mutation-types';

// 定义切割点，异步加载路由组件
const Home = () => import('@/pages/Home.vue');
const Login = () => import('@/pages/Login.vue');
const Detail = () => import('@/pages/Detail.vue');
const NotFound = () => import('@/pages/NotFound.vue');
const User = () => import('@/pages/User.vue');
const Search = () => import('@/pages/Search.vue');
const MyGrowth = () => import('@/pages/MyGrowth.vue');
const Qualification = () => import('@/pages/qualification/Qualification.vue');
const QualificationTest = () => import('@/pages/qualification/qualificationTest/QualificationTest.vue');

const Information = () => import('@/pages/info/Information.vue');
const InfoItemList = () => import('@/pages/info/itemList/InfoItemList.vue');
const InfoItem = () => import('@/pages/info/itemList/infoItem//infoItem.vue');

const OnlineLearn = () => import('@/pages/onlineLearn/OnlineLearn.vue');
const OnlineLearnDL = () => import('@/pages/onlineLearn/onlineLearn_dl/OnlineLearnDL.vue');

Vue.use(Router);

export function createRouter() {

    const router = new Router({
        // mode: 'history',
        routes: [
            {
                path: '/',
                name: 'information',
                component: Information
            },
            {
                path: '/home',
                name: 'home',
                component: Home
            },
            {
                path: '/login',
                name: 'login',
                component: Login,
                meta: {
                    notKeepAlive: true
                }
            },
            {
                path: '/detail/:id',
                name: 'detail',
                component: Detail,
                meta: {
                    notKeepAlive: true
                }
            },
            {
                path: '/user',
                name: 'user',
                component: User
            },
            {
                path: '/search',
                name: 'search',
                component: Search
            },
            {
                path: '/information',
                name: 'information',
                component: Information,
                children: [
                    {
                        path: 'infoItemList',
                        component: InfoItemList,
                        name: 'infoItemList',
                        // meta: { notKeepAlive: true},
                        children:
                            [
                                {
                                    path: 'infoItem',
                                    component: InfoItem,
                                    name: 'infoItem'
                                    // meta: { notKeepAlive: true}
                                }
                            ]
                    }
                ]
            },
            {
                path: '/onlineLearn',
                name: 'onlineLearn',
                component: OnlineLearn,
                children:
                    [
                        {
                            path: 'onlineLearnDL',
                            component: OnlineLearnDL,
                            name: 'onlineLearnDL'
                        }
                    ]
            },
            {
                path: '/qualification',
                name: 'qualification',
                component: Qualification,
                children:
                    [
                        {
                            path: 'qualificationTest',
                            name: 'qualificationTest',
                            component: QualificationTest
                        }
                    ]
            },
            {
                path: '/myGrowth',
                name: 'myGrowth',
                component: MyGrowth
            },

            {
                path: '*',
                name: 'notFound',
                component: NotFound
            }
        ]
    });

    /**
     * 切换动画名称
     *
     * @type {string}
     * @const
     */
    const SLIDE_LEFT = 'slide-left';

    /**
     * 切换动画名称
     *
     * @type {string}
     * @const
     */
    // const SLIDE_RIGHT = 'slide-right';
    //
    // router.beforeEach((to, from, next) => {
    //     if (router.app.$store) {
    //         // 如果不需要切换动画，直接返回
    //         if (router.app.$store.state.appShell.needPageTransition) {
    //             // 判断当前是前进还是后退，添加不同的动画效果
    //             let pageTransitionName = isForward(to, from) ? SLIDE_LEFT : SLIDE_RIGHT;
    //             router.app.$store.commit(`appShell/${types.SET_PAGE_TRANSITION_NAME}`, {pageTransitionName});
    //         }
    //     }
    //     next();
    // });

    return router;

}

/**
 * to 如果在这个列表中，始终采用从左到右的滑动效果，首页比较适合用这种方式
 *
 * @type {Array.<string>}
 * @const
 */
const ALWAYS_BACK_PAGE = ['home'];

/**
 * to 如果在这个列表中，始终采用从右到左的滑动效果
 *
 * @type {Array.<string>}
 * @const
 */
const ALWAYS_FORWARD_PAGE = ['search'];

/**
 * 历史记录，记录访问过的页面的 fullPath
 *
 * @const
 * @type {Array.<string>}
 */
const HISTORY_STACK = [];

/**
 * 判断当前是否是前进，true 表示是前进，否则是回退
 *
 * @param {Object} to 目标 route
 * @param {Object} from 源 route
 * @return {boolean} 是否表示返回
 */
function isForward(to, from) {
    let res = true;

    // to 如果在这个列表中，始终认为是后退
    if (to.name && ALWAYS_BACK_PAGE.indexOf(to.name) !== -1) {
        // 清空历史
        HISTORY_STACK.length = 0;
        res = false;
    }
    else if (from.name && ALWAYS_BACK_PAGE.indexOf(from.name) !== -1) {
        // 如果是从 ALWAYS_BACK_PAGE 过来的，那么永远都是前进
        HISTORY_STACK.push(to.fullPath);
    }
    else if (to.name && ALWAYS_FORWARD_PAGE.indexOf(to.name) !== -1) {
        // to 如果在这个列表中，始终认为是前进
        HISTORY_STACK.push(to.fullPath);
    }
    else {
        // 根据 fullPath 判断当前页面是否访问过，如果访问过，则属于返回
        let index = HISTORY_STACK.indexOf(to.fullPath);
        if (index !== -1) {
            HISTORY_STACK.length = index + 1;
            res = false;
        }
        else {
            // 将 to.fullPath 加到栈顶
            HISTORY_STACK.push(to.fullPath);
        }
    }

    return res;
}
