<template>
    <v-container fluid style="padding: 0;margin: 0">
        <div v-if="'myGrowth' === lastPath">
            <div fluid class="app-onlineLearn-page" >
                <v-layout row wrap >
                    <v-flex xs1 class="clearPadding" >
                        <div class="sideWrap">
                            <ul class="sidePanes">
                                <li v-for="(ele, index) in panes" v-bind:class='{clicked: selectedP === index}' @click="choseCourseList(index, ele.type)">{{ ele.title }}</li>
                            </ul>
                        </div>
                    </v-flex>
                    <v-flex xs11 class="clearPadding">
                        <div class="mainContent">
                            <div v-show="selectedP === 0">

                                <v-layout row wrap>
                                        <v-flex  xs1></v-flex>

                                        <v-flex xs10 class="paperBox">

                                            <v-layout row wrap v-for="(item, index) in growthList" :key="item.CreatedOn" style="height: 140px;margin-bottom: 30px;">

                                                <v-flex xs3 sm3 md2 class="titlebox">
                                                    <div class="timebox">{{ item.CreatedOn.split('T')[0] }}</div>
                                                    <v-btn info class="recordDeatail">查看详情</v-btn>
                                                </v-flex>

                                                <v-flex xs9 sm9 md6 class="contentBox">
                                                    <span>{{ item.Content }}</span>
                                                </v-flex>

                                            </v-layout>

                                        </v-flex>
                                    <v-flex hidden-xs-only sm1></v-flex>

                                </v-layout>

                            </div>
                            <div v-show="selectedP === 1">

                                <v-layout row wrap>
                                    <v-flex  xs1></v-flex>

                                    <v-flex xs10 class="paperBox">

                                        <v-layout row wrap v-for="(item, index) in growthList" :key="item.CreatedOn" style="height: 140px;margin-bottom: 30px">

                                            <v-flex xs3 sm3 md2 class="titlebox">
                                                <div class="timebox">{{ item.CreatedOn.split('T')[0] }}</div>
                                                <v-btn info class="recordDeatail">查看详情</v-btn>
                                            </v-flex>

                                            <v-flex xs9 sm9 md6 class="contentBox">
                                                <span>{{ item.Content }}</span>
                                            </v-flex>

                                        </v-layout>

                                    </v-flex>
                                    <v-flex hidden-xs-only sm1></v-flex>

                                </v-layout>

                            </div>
                        </div>
                    </v-flex>
                </v-layout>
            </div>

        </div>
        <div v-else>
            <v-breadcrumbs icons divider="chevron_right" style="justify-content: flex-start;padding-left:0">
                <v-breadcrumbs-item
                        v-for="(item, index) in xpath" :key="item.text"
                        :disabled="item.disabled"
                >
                    <span @click="linkJump(index)">{{ item.text }}</span>
                </v-breadcrumbs-item>
            </v-breadcrumbs>
            <v-container fluid style="padding: 0;margin: 0">
                <router-view class="view"></router-view>
            </v-container>
        </div>
    </v-container>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex';
    export default {
        name: 'myGrowth',
        computed: {
            ...mapGetters([
                'growthList'
            ]),
            xpath: function () {
                let pathStr =  this.$route.path
                let pathArr = pathStr.split('/')
                pathArr.splice(0,1)
                let len = pathArr.length
                let newArr = pathArr.map(function (ele,index) {
                    let obj = {
                        text: ele,
                        disabled: index === (len - 1)
                    }
                    return  obj
                })
                return newArr
            },
            lastPath: function () {
                let pathStr =  this.$route.path
                let pathArr = pathStr.split('/')
                pathArr.splice(0,1)
                let len = pathArr.length
                return pathArr[len - 1]
            }
        },
        data() {
            return {
                panes: [
                    {
                        title: '我的学习',
                        type: 2
                    },
                    {
                        title: '我的考试',
                        type: 1
                    }
                ],
                selectedP: 0,
                size: 'sm'
            }
        },
        methods: {
            ...mapActions([
                'getGrowthList'
            ]),
            startTest() {
                this.$router.push('/qualification/qualificationTest')
            },
            linkJump(index) {
                let xpath = this.xpath.map(ele => ele.text)
                let pathStr = '/' + xpath.slice(0,index + 1).join('/').trim()
                this.$router.push(pathStr);
            },
            choseCourseList(index, type) {
                this.selectedP = index
                this.getGrowthList({
                    type: type
                })
            }

        },
        created() {
            this.getGrowthList({
                type: 0
            })
        }
    }
</script>
<style lang="stylus" scoped>
    $pre-color = #3d82d0

    .app-onlineLearn-page
        height calc(100vh - 120px)

    .sideWrap
        height 100%
        min-width 96px
        background-color #efefef
        .sidePanes
            padding 0
            width 100%
            height 100%
            li
                box-sizing border-box
                width 100%
                text-align center
                padding 0 5px
                height 60px
                line-height 60px
                cursor pointer


    .mainContent
        height calc(100vh - 120px)
        overflow-y scroll


    .clearPadding
        padding 0

    .paperBox
        margin-top: 44px
        border-left 1px dotted #30BCFC


    .contentBox
        height: 100%
        background-color: #ddf1be
        border-radius: 10px
        padding 2vw


    .titlebox
        height 100%
        text-align center
        margin 0
        padding 0
        flex-direction column
        justify-content center
        display flex
        color white


    .recordDeatail
        width 80%
        margin 10% auto
        color white
        border-radius 6px

    .clicked
        border-right .5vw solid $pre-color
        background-color #ffffff
        color $pre-color

    .timebox
        position relative
        width 80%
        background-color #89d327
        border-radius 10px
        margin 10px auto 0

    .timebox:before
        content '';
        position absolute
        top 0
        left -12.5%
        width 20px
        height 20px
        border-radius 10px
        background-color inherit
        transform translateX(-50%)


    .sth:before
        content '';
        position absolute
        left 0
        top 0
        width 20px
        height 20px
        border-radius 10px
        background-color red


    .img-fluid
        width 100%
        @media screen and (min-width 1920px)
            height 266px
        @media screen and (max-width 1920px)
            height 196px
        @media screen and (max-width 1440px)
            height 156px
        @media screen and (max-width 1024px)
            height 126px
        @media screen and (max-width 600px)
            height 106px
        @media screen and (max-width 600px)
            height 86px


</style>
