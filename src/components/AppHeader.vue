<template>
    <transition name="slide-down">
        <header class="app-header-wrapper" v-show="show">
            <div class="app-header-left" >
                <v-btn
                        icon
                        v-if="showMenu"
                        class="hidden-sm-and-up"
                        @click.native="handleClick('menu')">
                    <v-icon class="app-header-icon">menu</v-icon>
                </v-btn>
                <v-btn
                        icon
                        v-if="showBack"
                        class="hidden-sm-and-up"
                        @click.native="handleClick('back')">
                    <v-icon class="app-header-icon">arrow_back</v-icon>
                </v-btn>
                <div v-if="showLogo" @click="handleClick('logo')" style="margin-left: 10px">
                    <slot name="logo">
                        <icon :name="logoIcon" class="app-header-icon"></icon>
                    </slot>
                </div>
            </div>
            <div class="app-header-middle">
                <slot name="actions"
                      v-for="action, actionIdx in actions"
                      :icon="action.icon"
                      :route="action.route">
                    <div style="display: inline-flex;flex-direction: column;justify-content: center;margin: 0 4vw">

                    <v-btn
                            icon="icon"
                            class="actionItem"
                            style="flex-direction: column"
                            @click.native="handleClick('action', {actionIdx, route: action.route})">
                        <img :src="action.route === topPath ? action.icon.replace(/\.png/,'-active.png') : action.icon" alt="action" style="display: block;width: 66px;height: 66px;margin: 0 auto">
                    </v-btn>
                    <span style="font-size: 12px;color: white;margin-top: 8px">{{ action.title}}</span>
                    </div>
                </slot>
            </div>

            <div class="app-header-right" v-cloak>
                <slot name="title">
                    <v-avatar class="showLogin">
                        <img v-bind:src="title"/>
                        <div class="hidetag">
                            <p @click="cancelLogin">退出登陆</p>
                        </div>
                    </v-avatar>
                </slot>
            </div>
        </header>
    </transition>
</template>

<script>
    import {mapState} from 'vuex';
    import EventBus from '@/event-bus';

    export default {
        name: 'appHeader',
        data() {
            return {
            }
        },
        computed: {
            topPath: function () {
                return this.$route.matched[0].path
            },
            ...mapState('appShell/appHeader', [
                'show',
                'showMenu',
                'showBack',
                'showLogo',
                'logoIcon',
                'actions',
                'title'
            ]),
            ...mapState('appShell', [
                'isPageSwitching'
            ])
        },
        methods: {
            /**
             * 处理按钮点击事件
             *
             * @param {string} source 点击事件源名称 menu/logo/action
             * @param {Object} data 随点击事件附带的数据对象
             */
            handleClick(source, {actionIdx, route} = {}) {
                // 页面正在切换中，不允许操作，防止滑动效果进行中切换
                if (this.isPageSwitching) {
                    return;
                }
                let eventData = {};
                // 点击右侧动作按钮，事件对象中附加序号
                if (source === 'action') {
                    eventData.actionIdx = actionIdx;
                }
                // 发送给父组件，内部处理
                this.$emit(`click-${source}`, eventData);
                // 发送全局事件，便于非父子关系的路由组件监听
                EventBus.$emit(`app-header:click-${source}`, eventData);
                // 如果传递了路由对象，进入路由
                if (route) {
                    this.$router.push(route);
                }
            },
            cancelLogin() {
                this.$router.push('/login')
            }
        }
    };
</script>

<style lang="stylus" scoped>

    $btn-color = #fff

    .app-header-wrapper
        display flex
        justify-content space-between
        align-items center
        height $app-header-height
        background-image url('../assets/background.png')
        background-size cover
        color $btn-color
        padding 0
        box-shadow 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px rgba(0,0,0,.14), 0 1px 10px rgba(0,0,0,.12)
        transition transform 0.3s ease-out

        &.slide-down-enter,
        &.slide-down-leave-to
            transform translate(0, -100%)

        & > div
            display flex
            align-items center

        .app-header-middle
            font-size 1.2em

    // 改变 icon 大小
        .app-header-icon
            color $btn-color
            width 20px
            height 20px

    /*.actionItem*/
        /*display flex*/
        /*flex-direction column*/


    .showLogin
        .hidetag
            color black
            position fixed
            right  10vw
            top 120px
            width 60px
            height 40px
            opacity 0
            background-color #f5f5f5
            border-radius 4px
            -webkit-transition: all ease-in-out .3s
            -moz-transition: all ease-in-out .3s
            -ms-transition: all ease-in-out .3s
            -o-transition: all ease-in-out .3s
            transition: all ease-in-out .3s
            p
                list-style-type none
                text-align center
                margin 10px 0
                cursor pointer
                &:hover
                    background-color #e1e1e1
                    color #3d82d0


    .showLogin:hover
        .hidetag
            opacity 1


    .app-header-right
        margin auto 0
        margin-right 10vw
        .avatar img
            width 66px
            height 66px




</style>
