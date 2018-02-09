<template>
    <div>
        <div>
            <v-btn @click.native="toggleAll">全部</v-btn>
            <v-btn info @click.native="downloadAll">下载</v-btn>
        </div>

        <v-container fluid>


            <v-layout row class="headRow">
                    <v-flex class="text-xs-" sm3>
                        <v-checkbox
                                    primary
                                    :input-value="!!selected.length"
                                    id="checkAll"
                                    @click.native="changeSelecte"
                        ></v-checkbox>
                    </v-flex>
                    <v-flex class="text-xs-left" v-for="header in headers" sm3>
                        {{ header.text }}
                    </v-flex>
                </v-layout>

            <v-layout row v-for="item in items" class="itemRow">


                <v-flex sm3 class="text-xs-left">
                    <v-checkbox
                            primary
                            v-model="selected"
                            :value="item.Path"
                    ></v-checkbox>
                </v-flex>

                <v-flex sm3 class="text-xs-left miniTD">
                    <a class="downFileName" :href="baseUrl + item.ID + '&did=' + item.DoctorID" :download="baseUrl + item.ID + '&did=' + item.DoctorID" :id="setID(item.Path)">
                        <img :src="setBgd(item.Name)" alt="icon">
                        <span>&nbsp;&nbsp;&nbsp;</span>
                        <span style="vertical-align: middle">{{ item.Name }}</span>
                    </a>
                </v-flex>

                <v-flex sm3 class="text-xs-left">
                    {{ setSize( item.FileSize) }}
                </v-flex>

                <v-flex sm3 class="text-xs-left">
                    {{ item.CreatedOn.split('T')[0].replace(/-/g,'/') }}
                </v-flex>

            </v-layout>
        </v-container>

    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import api from '../../../api/index.js'
    export default {
        data () {
            return {
                search: '',
                selected: [],
                headers: [
                    {
                        text: '文件名',value: 'name',
                        align: 'right',
                        sortable: false
                    },
                    {
                        text: '大小',
                        value: 'size',
                        sortable: false
                    },
                    {   text: '修改时间',
                        value: 'time',
                        sortable: false
                    },
                ],
                allChecked: false,
                baseUrl: 'http://devapi.app.onenewcare.com/Dr/Learning/DownloadRes?ResId='
            }
        },
        computed: {
            ...mapGetters([
                'resource'
            ]),
            items: function () {
               this.resource.forEach(function (ele) {
                   ele.value = false
               })
                return this.resource
            },
            linkArr: function () {
                return this.resource.map(ele => ele.Path)
            }
        },
        methods: {
            downloadAll() {
                let arr = this.selected
                console.log(arr)
                for (let i = 0, j = arr.length;i< j; i++) {
                    let k = this.linkArr.indexOf(arr[i])
                    let id = 'oncdl' + k
                    console.log(id)
                    let ele = document.getElementById(id)
                    ele.click()
                }
            },
            toggleAll () {
                console.log('sth')
                if (this.selected.length) this.selected = []
                else this.selected = this.linkArr
            },
            setBgd(name) {
                let urlArr =  name.split('.')
                let fileType = urlArr[urlArr.length - 1];
                let result = 'http://osp49ppau.bkt.clouddn.com/'
                if (fileType === 'pptx') {
                    return result + 'PPT.png'
                }
                else if (fileType === 'xlsx') {
                    return result + 'Excel.png'
                }
                else if (fileType === 'zip') {
                    return result + 'ZIP.png'
                }
                else if (fileType === 'txt') {
                    return result + 'Text.png'
                }
                else if (fileType === 'doc') {
                    return result + 'doc.png'
                }
                else if (fileType === 'pdf') {
                    return result + 'PDF.png'
                }
                else if (fileType === 'jpg' || fileType === 'png') {
                    return result + 'Picture.png'
                }
                else {
                    return result + 'Cloud.png'
                }
            },
            setID(str) {
                let index = this.linkArr.indexOf(str)
                const IDpre = 'oncdl'
                let id = IDpre + index
                return id
            },
            setSize(size) {
                let a = Math.floor(size/1024)
                if (a === 0) {
                    return 0.1 + 'k'
                } else {
                    if (a > 1021) {
                        return Math.floor(a/1024)
                    } else {
                        return a + 'k'
                    }
                }
            },
            changeSelecte() {
                if (this.selected.length) {
                    this.selected = []
                } else {
                    this.selected = this.linkArr
                }
            }
        },
        mounted() {
            console.log('items')
            console.log(this.items)
        }
    }
</script>

<style lang="stylus" scoped>
    .miniTD
        min-width 192px
        a
            text-decoration none
        a:link
            color #000
            img
                margin-top 1px


    .itemRow
        align-items center
        border 1px solid #efefef
        border-top none
        &:hover
            background-color #ecf9ff

    .headRow
        align-items center
        border 1px solid #efefef
        background-color #eeeeee

    .downFileName
        display flex
        justify-content flex-start
        align-items center
</style>
