<template>
    <v-container fluid style="padding: 0;margin: 0">
        <div v-if="'onlineLearn' === lastPath">
            <div fluid grid-list-xs class="app-onlineLearn-page" >
                <v-layout row wrap>
                    <v-flex xs1 class="clearPadding" >
                        <div class="sideWrap" >
                            <ul class="sidePanes">
                                <li v-for="(ele, index) in typeList" v-bind:class='{clicked: selectedP === index}'
                                    :id="index == 0 ? 'learnTarget': 'noLearnTarget'"
                                    @click="choseCourseList(index, ele.ID)">{{ ele.Name }}</li>
                            </ul>
                        </div>
                    </v-flex>
                    <!--<v-flex xs1 class="clearPadding"></v-flex>-->
                    <v-flex xs11 class="clearPadding">
                        <div class="mainContent">
                            <div>
                                <v-container fluid grid-list-xs>
                                    <v-layout row wrap>
                                        <v-flex
                                                xs6 sm3
                                                v-for="(ele, index) in courseList"
                                                :key="index"
                                        >
                                            <v-card flat tile class="elevation-5">
                                                <div class="imgWrap">
                                                    <img v-if="ele.Logo" :src="ele.Logo">
                                                    <img v-else src="http://placehold.it/360x230">
                                                </div>
                                                <p>{{ ele.Name}}</p>
                                                <div>
                                                    <span @click="jumpToDL(ele.ID)" class="startStudy">开始学习</span>
                                                </div>
                                            </v-card>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
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
                    <span @click="linkJump(index)">{{ setPathTitle(item.text) }}</span>
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
        name: 'onlineLearn',
        computed: {
            ...mapGetters([
                'typeList',
                'courseList'
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
                panes: ['全部','康复客场','教育课程'],
                selectedP: 0,
                pathSource: {
                    'onlineLearn': '在线学习',
                    'onlineLearnDL': '文件列表'
                }
            }
        },
        methods: {
            ...mapActions([
                'getCourseType',
                'getCourselist',
                'getResource'
            ]),
            choseCourseList(index, id) {
                this.selectedP = index
                this.getCourselist({
                    Type: id
                })
            },
            jumpToDL(id) {
                this.getResource({
                    courseId: id
                })
                this.$router.push('/onlineLearn/onlineLearnDL')
            },
            linkJump(index) {
                let xpath = this.xpath.map(ele => ele.text)
                let pathStr = '/' + xpath.slice(0,index + 1).join('/').trim()
                this.$router.push(pathStr);
            },
            setPathTitle(title) {
                return this.pathSource[title]
            },
            defaultClick() {
                document.getElementById('learnTarget').click()
            }
        },
        created() {
            this.getCourseType()

//            setTimeout(this.choseCourseList(0, this.typeList[0].ID), 1000)
        },
        mounted() {

//            this.choseCourseList(0, this.typeList[0].ID)
        }
    }
</script>
<style lang="stylus" scoped>
    $pre-color = #3d82d0

    .app-onlineLearn-page
        height calc(100vh - 120px)

    .mainContent
        height calc(100vh - 120px)
        padding-top 40px
        overflow-y scroll

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

    .clearPadding
        padding 0

    .clicked
        border-right 0.5vw solid $pre-color
        background-color #ffffff
        color $pre-color


    .startStudy
        padding 0.7vw 1.5vw
        background-color $pre-color
        color white
        border-radius 4px
        cursor pointer

    .imgWrap
        width 16.75vw
        height 10.7vw

    .imgWrap img
        width 100%
        height 100%


    .app-onlineLearn-page
        /*height 668px*/




</style>
