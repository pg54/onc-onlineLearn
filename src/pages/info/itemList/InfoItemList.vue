<template>
    <v-container fluid>
        <div v-if="'infoItemList' === lastPath">
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card class="grey lighten-4 text-black" v-if="5 === listType">

                        <v-list subheader>
                            <v-list-tile avatar v-for="(item, index) in newsList" v-bind:key="item.title">
                                <v-list-tile-avatar>
                                    <img v-bind:src="item.Logo"/>
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                    <v-list-tile-title v-html="item.Title" class="linker" @click="toInfoItem(item.Path)"></v-list-tile-title>
                                </v-list-tile-content>

                                <v-list-tile-action>
                                    <span>{{ item.CreatedOn }}</span>
                                </v-list-tile-action>
                            </v-list-tile>
                        </v-list>
                    </v-card>

                    <v-card class="grey lighten-4 text-black" v-if="3 === listType">
                        <v-list subheader>
                            <v-list-tile avatar v-for="(item, index) in educList" v-bind:key="item.title">
                                <v-list-tile-avatar>
                                    <img v-bind:src="item.Logo"/>
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                    <v-list-tile-title v-html="item.Title" class="linker" @click="toInfoItem(item.Path)"></v-list-tile-title>
                                </v-list-tile-content>

                                <v-list-tile-action>
                                    <span>{{ item.CreatedOn }}</span>
                                </v-list-tile-action>
                            </v-list-tile>
                        </v-list>
                    </v-card>


                    <v-card class="grey lighten-4 text-black" v-if="2 === listType">
                        <v-list subheader>
                            <v-list-tile avatar v-for="(item, index) in articleList" v-bind:key="item.title">
                                <v-list-tile-avatar>
                                    <img v-bind:src="item.Logo"/>
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                    <v-list-tile-title v-html="item.Title" class="linker" @click="toInfoItem(item.Path)"></v-list-tile-title>
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
            <v-container fluid style="padding: 0;margin: 0" class="routerViewWrap">
                <router-view class="view"></router-view>
            </v-container>
        </div>
    </v-container>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex';
    export default{
        name: 'infoItemList',
        data () {
            return {

            }
        },
        computed: {
            ...mapGetters(
                [
                    'educList',
                    'articleList',
                    'newsList',
                    'listType'
                ]
            ),
            lastPath: function () {
                let pathStr =  this.$route.path
                let pathArr = pathStr.split('/')
                pathArr.splice(0,1)
                let len = pathArr.length
                return pathArr[len - 1]
            }
        },
        methods: {
            ...mapActions([
                'getArticleList',
                'setInfoItemPath'
            ]),
            toInfoItem(path) {
                this.setInfoItemPath(path)
                this.$router.push('/information/infoItemList/infoItem')
            },
        },
        activated() {
            this.getArticleList({
                type: this.listType,
                pageIndex: 1,
                pageSize: 10
            })
        }
    }
</script>
<style lang="stylus" scoped>
    .linker:hover
        color blue
</style>
