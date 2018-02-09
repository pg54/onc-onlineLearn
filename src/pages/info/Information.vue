<template>
    <v-container fluid style="padding: 0;margin: 0">
        <div v-if="'information' === lastPath">
            <v-layout row wrap style="padding: 10px">
                <v-flex xs12 sm12 md4 order-md1 order-sm1 >
                    <v-card  class="grey lighten-4 text-black onc-gap">
                        <v-list subheader class="listArea">
                            <v-subheader class="cardHeader">
                                <span class="cardHeader-title">患教中心
                                    <img src="http://osp49ppau.bkt.clouddn.com/edu.png" alt="">
                                </span>
                                <span @click="toInfoList(eduType)" class="moreInfo">更多
                                    <i class="material-icons">chevron_right</i>
                                </span>
                            </v-subheader>
                            <v-list-tile avatar v-for="(item, index) in educList" v-bind:key="item.title">
                                <v-list-tile-avatar>
                                    <span class="dotLinker"></span>
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                    <v-list-tile-title v-html="item.Title" class="linker" @click="toInfoItem(item.Path,eduType)"></v-list-tile-title>
                                </v-list-tile-content>

                                <v-list-tile-action>
                                    <span>{{ item.CreatedOn }}</span>
                                </v-list-tile-action>
                            </v-list-tile>
                        </v-list>
                    </v-card>
                </v-flex>
                <v-flex xs12 sm12 md8 order-md2 order-sm2>

                    <v-card class="text-black onc-gap">

                        <v-list subheader class="listArea">
                            <v-subheader class="cardHeader">
                                <span class="cardHeader-title">新闻快讯
                                    <img src="http://osp49ppau.bkt.clouddn.com/news.png" alt="">
                                </span>
                                <span @click="toInfoList(eduType)" class="moreInfo">更多
                                    <i class="material-icons">chevron_right</i>
                                </span>
                            </v-subheader>
                            <v-list-tile avatar v-for="(item, index) in newsList" v-bind:key="item.title">
                                <v-list-tile-avatar>
                                    <img v-bind:src="item.Logo"/>
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                    <v-list-tile-title v-html="item.Title" class="linker" @click="toInfoItem(item.Path,newsType)"></v-list-tile-title>
                                </v-list-tile-content>

                                <v-list-tile-content>
                                    <span class="hot" v-show="index < 3">hot</span>
                                </v-list-tile-content>

                                <v-list-tile-action>
                                    <span>{{ item.CreatedOn }}</span>
                                </v-list-tile-action>
                            </v-list-tile>
                        </v-list>
                    </v-card>


                    <v-card class="grey lighten-4 text-black onc-gap">
                        <v-list subheader class="listArea">
                            <v-subheader class="cardHeader">
                                <span class="cardHeader-title">医生文章
                                    <img src="http://osp49ppau.bkt.clouddn.com/article.png" alt="">
                                </span>
                                <span @click="toInfoList(eduType)" class="moreInfo">更多
                                    <i class="material-icons">chevron_right</i>
                                </span>
                            </v-subheader>
                            <v-list-tile avatar v-for="(item, index) in articleList" v-bind:key="item.title">
                                <v-list-tile-avatar>
                                    <img v-bind:src="item.Logo"/>
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                    <v-list-tile-title v-html="item.Title" class="linker" @click="toInfoItem(item.Path,articleType)"></v-list-tile-title>
                                </v-list-tile-content>

                                <v-list-tile-content>
                                    <span class="hot" v-show="index < 3">hot</span>
                                </v-list-tile-content>

                                <v-list-tile-action>
                                    <span>{{ item.CreatedOn }}</span>
                                </v-list-tile-action>
                            </v-list-tile>
                        </v-list>
                    </v-card>
                </v-flex>
            </v-layout>
        </div>
        <div v-else>
            <v-breadcrumbs icons divider="chevron_right" style="justify-content: flex-start;padding-left:0;">
                    <v-breadcrumbs-item
                            v-for="(item, index) in xpath" :key="item.text"
                            :disabled="item.disabled"
                    >
                        <span @click="linkJump(index)">{{ setPathTitle(item.text) }}</span>
                    </v-breadcrumbs-item>
                </v-breadcrumbs>
            <div class="routerViewWrap">
                <router-view class="view"></router-view>
            </div>
        </div>
    </v-container>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex';
    import api from '../../api/index.js'
    export default {
        name: 'information',
        computed: {
            ...mapGetters([
                'educList',
                'articleList',
                'newsList'
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
                console.log(pathArr[0])
                return pathArr[len - 1]

            }
        },
        data() {
            return {
                eduType: 3,
                newsType: 5,
                articleType: 2,
                pathSource: {
                    'information': '动态资讯',
                    'infoItemList': '新闻资讯',
                    'infoItem': '新闻详情'
                }
            }
        },
        methods: {
            ...mapActions('appShell/appHeader', [
                'setAppHeader'
            ]),
            ...mapActions([
                'getArticleList',
                'setInfoItemPath',
                'setListType'
            ]),
            linkJump(index) {
                let xpath = this.xpath.map(ele => ele.text)
                let pathStr = '/' + xpath.slice(0,index + 1).join('/').trim()
                this.$router.push(pathStr);
            },
            toInfoItem(path,type) {
                this.setListType(type)
                this.setInfoItemPath(path)
                this.$router.push('/information/infoItemList/infoItem')
            },
            toInfoList(type) {
                this.setListType(type)
                this.$router.push('/information/infoItemList')
            },
            setPathTitle(title) {
                return this.pathSource[title]
            }
        },
        watch: {

        },
        created() {
            this.getArticleList({
                type: 3,
                pageIndex: 1,
                pageSize: 10
            })
            this.getArticleList({
                type: 5,
                pageIndex: 1,
                pageSize: 10
            })
            this.getArticleList({
                type: 2,
                pageIndex: 1,
                pageSize: 10
            })
            //测试网络请求
            api.requestCourseType().then(res => {
                console.log('获取课程分类')
                console.log(res.data.Data)
            })
        }
     }
</script>
<style lang="stylus" scoped>
    .articleWrap
        margin 10px 0
        overflow auto
        zoom 1
        .textRight
            float right
            margin-right 5px

    .linker:hover
        color #3d82d0

    .dotLinker
        width 20px
        height 20px
        border-radius 10px
        background-color #3d82d0
        position absolute

    .hot {
        display inline-block
        width 35px
        height 20px
        margin-left 5px
        text-align center
        line-height 20px
        background-color #FBBB2C
        color #FEF8ED
    }

    .onc-gap
        margin-bottom 56px

    .cardHeader
        display flex
        justify-content space-between
        border 1px solid #efefef
        .cardHeader-title
            color #3d82d0
            font-weight bold
            font-size 16px
        img
            vertical-align middle


    .moreInfo
        display inline-flex
        align-items center
        cursor pointer
        &:hover
            color #3d82d0


    .testLink:active
        color blue

    

    // .listArea {
    //     height 615px
    // }



</style>
