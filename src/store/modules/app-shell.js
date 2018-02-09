/**
 * @file app shell store
 * @author chenqiushi(chenqiushi@baidu.com)
 */

import * as types from '../mutation-types';

const state = {

    /**
     * 是否需要页面切换动画
     *
     * @type {boolean}
     */
    needPageTransition: true,

    /**
     * 多个页面是否处于切换中
     *
     * @type {boolean}
     */
    isPageSwitching: false,

    /**
     * 多个页面切换效果名称
     *
     * @type {string}
     */
    pageTransitionName: ''

};

const actions = {

    /**
     * 开启页面切换动画
     *
     * @param {Function} commit commit
     */
    enablePageTransition({commit}) {
        commit(types.ENABLE_PAGE_TRANSITION, true);
    },

    /**
     * 关闭页面切换动画
     *
     * @param {Function} commit commit
     */
    disablePageTransition({commit}) {
        commit(types.DISABLE_PAGE_TRANSITION, false);
    },

    setPageSwitching({commit}, isPageSwitching) {
        commit(types.SET_PAGE_SWITCHING, isPageSwitching);
    }
};

const mutations = {
    [types.SET_PAGE_SWITCHING](state, isPageSwitching) {
        state.isPageSwitching = isPageSwitching;
    },
    [types.SET_PAGE_TRANSITION_NAME](state, {pageTransitionName}) {
        state.pageTransitionName = pageTransitionName;
    }
};

export default {
    namespaced: true,
    /* eslint-disable */
    state,
    actions,
    mutations,
    /* eslint-enable */
    modules: {
        /**
         * 顶部导航栏的数据
         *
         * @type {Object}
         */
        appHeader: {
            namespaced: true,
            state: {
                /**
                 * 是否展示顶部导航栏
                 *
                 * @type {boolean}
                 */
                show: true,

                /**
                 * logo图标名称
                 *
                 * @type {string}
                 */
                logoIcon: '',

                /**
                 * 是否展示左侧菜单图标
                 *
                 * @type {boolean}
                 */
                showMenu: true,

                /**
                 * 是否展示左侧返回图标
                 *
                 * @type {boolean}
                 */
                showBack: false,

                /**
                 * 是否展示左侧logo
                 *
                 * @type {boolean}
                 */
                showLogo: true,

                /**
                 * 中间操作按钮数组
                 *
                 * @type {Array}
                 */
                actions: [],
                /**
                 * 右侧用户avatar
                 *
                 * @type {string}
                 */
                title: '',
            },
            actions: {
                setAppHeader({commit}, appHeader) {
                    commit(types.SET_APP_HEADER, appHeader);
                }
            },
            mutations: {
                [types.SET_APP_HEADER](state, appHeader) {
                    state.appHeader = Object.assign(state, appHeader);
                }
            }
        },

        /**
         * 左侧侧边栏的数据
         *
         * @type {Object}
         */
        appSidebar: {
            namespaced: true,
            state: {
                show: false, // 是否显示sidebar
                slideFrom: 'left', // 划出的方向
                // 头部条的相关配置
                title: {
                    imageLeft: '',
                    altLeft: '',
                    svgLeft: '',
                    iconLeft: 'home',
                    text: 'Home',
                    imageRight: '',
                    altRight: '',
                    svgRight: '',
                    iconRight: ''
                },
                // 最大宽度，可以是百分比，也可以以px为单位
                width: 0.75,
                // 滑动距离展示阈值
                showWidthThreshold: 0.25,
                user: {
                    name: '李汤姆',
                    location: 'Beijing',
                    email: 'tom@baidu.com'
                },
                // 分块组
                blocks: [
                    {
                        // 子列表1
                        sublistTitle: '功能',
                        list: [
                            {
                                text: '动态资讯',
                                image: 'http://osp49ppau.bkt.clouddn.com/info.png',
                                alt: 'mood-bad',
                                route: '/information'
                            },
                            {
                                text: '在线学习',
                                image: 'http://osp49ppau.bkt.clouddn.com/learn.png',
                                alt: 'mood-bad',
                                route: '/onlineLearn'
                            },
                            {
                                text: '资格考试',
                                image: 'http://osp49ppau.bkt.clouddn.com/test.png',
                                alt: 'mood-bad',
                                route: '/qualification'
                            },
                            {
                                text: '我的成长',
                                image: 'http://osp49ppau.bkt.clouddn.com/grow.png',
                                alt: 'mood-bad',
                                route: '/myGrowth'
                            }
                        ]
                    }
                ]
            },
            actions: {
                showSidebar({commit}) {
                    commit(types.SET_SIDEBAR_VISIBILITY, true);
                },
                hideSidebar({commit}) {
                    commit(types.SET_SIDEBAR_VISIBILITY, false);
                }
            },
            mutations: {
                [types.SET_SIDEBAR_VISIBILITY](state, sidebarVisibility) {
                    state.show = sidebarVisibility;
                }
            }
        },

        /**
         * app shell 底部导航栏的数据
         *
         * @type {Object}
         */
        appBottomNavigator: {
            namespaced: true,
            state: {
                /**
                 * 是否展示底部导航栏
                 *
                 * @type {boolean}
                 */
                show: true,

                /**
                 * 导航按钮列表
                 *
                 * @type {Array.<Object>}
                 */
                navs: [
                    {
                        // 按钮的名字
                        name: 'home',
                        // 显示的 icon
                        icon: 'home',
                        // 显示的文字
                        text: '主页',
                        // 是否是当前激活的
                        active: true,
                        // 路由
                        route: {
                            name: 'home',
                            path: '/'
                        }
                    },
                    {
                        // 按钮的名字
                        name: 'user',
                        // 显示的 icon
                        icon: 'person',
                        // 显示的文字
                        text: '个人中心',
                        // 路由信息
                        route: '/user'
                    }
                ]
            },
            actions: {
                hideBottomNav({commit}) {
                    commit(types.SET_APP_BOTTOM_NAV, {show: false});
                },

                showBottomNav({commit}) {
                    commit(types.SET_APP_BOTTOM_NAV, {show: true});
                },

                activateBottomNav({commit}, name) {
                    commit(types.ACTIVATE_APP_BOTTOM_NAV, name);
                }
            },
            mutations: {
                [types.ACTIVATE_APP_BOTTOM_NAV](state, name) {
                    state.navs = state.navs.map(nav => {
                        if (nav.name === name) {
                            nav.active = true;
                        }
                        else {
                            nav.active = false;
                        }
                        return nav;
                    });
                },
                [types.SET_APP_BOTTOM_NAV](state, appBottomNavigator) {
                    state = Object.assign(state, appBottomNavigator);
                }
            }
        }
    }
};
