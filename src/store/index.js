/**
 * @file store index
 * @author chenqiushi(chenqiushi@baidu.com)
 */

import Vue from 'vue';
import Vuex from 'vuex';
import appShell from './modules/app-shell';
import blog from './modules/blog';
import article from './modules/article';
import course from './modules/course';
import paper from './modules/peper';
import growth from './modules/growth';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        appShell,
        blog,
        article,
        course,
        paper,
        growth
    }
});
