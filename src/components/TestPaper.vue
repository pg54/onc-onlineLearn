<template>
    <div class="testPaper">
        <div class="secondLevel">
            <v-card style="margin: 1vw;height: 80%">
                <div v-for="(section, sectionIndex) in paperDetails.Sections">
                    <ul>
                        <li class="chaptTitle"
                            :class="{secondActive : secondTab === sectionIndex }"
                            @click="secondTab = sectionIndex"
                            v-badge="{ value: section.Questions.map(ele => ele.Result === null).length, right: true}"
                        >
                            <span>{{section.Name}}</span>
                        </li>
                    </ul>
                    <div v-show="secondTab === sectionIndex" class="questionsBox">
                        <div class="cardBox">
                            <div class="centerBox">
                                <p class="testTitle">{{ paperDetails.Name }}评测</p>
                                <p class="testSubTitle" v-if="false">{{ paperDetails.Description }}</p>
                                <div class="questionContent">
                                    <div v-for="(question, questionIndex) in section.Questions" class="questiones">
                                        <p class="questionDescrib">
                                            题{{questionIndex+1}}:  {{ question.Description}}
                                        </p>
                                        <div v-for="(option, optionIndex) in question.Options" class="questionChoses">
                                            <input  class="radioclass " type="radio" :disabled="isComplete" :value="option.Code" :id="option.ID"
                                                    :name="question.ID"
                                                    v-model="testPaperFormData.Sections[sectionIndex].Questions[questionIndex].Result"
                                            >
                                            <label :for="option.ID" class="simbleBox"></label>
                                            <label :for="option.ID" class="testLabel">{{ option.Code }}&nbsp;{{ option.Name }}</label>
                                        </div>
                                        <br>
                                    </div>
                                </div>
                                <div class="completeWrap" v-show="!isComplete">
                                    <v-btn primary class="completeBtn" @click.native="submitTestContent">完成</v-btn>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </v-card>

        </div>
    </div>

</template>
<script>
    import { sendPaperTest} from '../api/api.js';
import {mapGetters, mapActions} from 'vuex';
    export default {
        name: 'testPaper',
        props: ['isComplete'],
        computed: {
            ...mapGetters([
                'paperDetails'
            ]),
            testPaperFormData: function () {
                return Object.assign({},this.paperDetails);
            },
            allQuestion: function () {
                let arr = this.paperDetails.Sections
                let result = 0
                for (let i = 0;i < arr.length;i++) {
                    result += arr[i].Questions.length
                }
                return result
            }

        },
        data() {
            return {
                secondTab: 0,
                snackbar: false,
                y: 'top',
                x: null,
                mode: '',
                timeout: 6000,
                alertText: '提交成功'
            };
        },
        methods: {
            submitTestContent() {
                let qustionAnswers = [];
                let originData = this.testPaperFormData;

                for (let j = 0; j < originData.Sections.length; j++) {  //章节
                    for (let k = 0; k < originData.Sections[j].Questions.length; k++) {  //问题

                            if (originData.Sections[j].Questions[k].Result) {
                                let unitForm = {
                                    QuestionID: originData.Sections[j].Questions[k].ID,
                                    Result: originData.Sections[j].Questions[k].Result
                                };
                                console.log('单个问题');
                                console.log(unitForm);
                                qustionAnswers.push(unitForm);
                                //data
                                //paperID
                            }
                        }
                }

                if (this.allQuestion === qustionAnswers.length) {
                    let params = {
                        paperID: this.paperDetails.ID,
                        data: qustionAnswers
                    }
                    console.log('填写的数据')
                    console.log(params)
                    sendPaperTest(params).then(res => {
                        console.log(res)
                        if (res.Status) {
                            this.alertText = res.Msg
                            this.snackbar = true
                        }
                    })

                } else {
                    let a = this.allQuestion - qustionAnswers.length
                    this.alertText = `请完成剩下的${a}道题后提交`
                    this.snackbar = true
                }
            },
//            checkBoxChange() {
//                console.log('asa')
//            }
        },
        created() {

        },
        mounted() {
        }
    };
</script>
<style scoped>
    .testPaper {
        position: relative;
        width: 100vw;
        height: calc(100vh - 160px);
    }
    .secondLevel {position: absolute;width: 20vw;left: 0;top: 0;}

    .questionsBox {
        position: absolute;
        width: 70vw;
        left: 20vw;
        top: 0;
        margin-bottom: 2vw;
    }

    .centerBox {width: 90%; margin: 0 auto;}

    .testTitle {font-size: 18px;font-weight: bold;text-align: center;margin: 0;}
    .testSubTitle {font-size: 16px;font-weight: bold}

    .questionContent {width: 100%;height: calc(100vh - 250px);border-bottom: 1px dotted #cccccc;overflow-y: scroll}

    .questiones {}

    .chaptTitle {
        width: 100%;
        height: 40px;
        font-size: 14px;
        padding-left: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        cursor: pointer;
    }
    .chaptTitle:hover {
        background-color: #efefef;
        color: #3d82d0;
    }
    .questionDescrib {font-size: 16px;margin-top: 24px;margin-bottom: 12px}

    .sectionhasAnswered {
        width: 18px;
        height: 18px;
        background-image: url("../assets/sectionStatus.png");
        background-repeat: no-repeat;
    }
    .radioclass {
        display: inline-block;
        width: 18px;
        height: 18px;
        opacity: 0;
        cursor: pointer;
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
        filter: alpha(opacity=0);
    }
    .simbleBox {
        display: inline-block;
        width: 18px;
        height: 18px;
        margin-right: 5px;
        cursor: pointer;
        background-image: url("../assets/默认选框.png");
    }
    .testLabel {
        cursor: pointer;
        display: inline-block;
        width: calc(100% - 41px);
    }
    input[type=radio]:checked + label {
        background-image: url("../assets/选中选框.png");
    }

    .completeWrap {
        display: flex;
        justify-content: flex-end;
    }
    .completeBtn {
        color: white;
    }
    .questionChoses {
        display: flex;
        align-items: center;
        height: 28px;
        margin: 5px 0;
        z-index: 1000;
        cursor: pointer;
    }
    .questionChoses:hover {
        background-color: rgba(239, 239, 239, 1);
    }

    .roundSpan{
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background-color: #4285d1;
    }

    .cardBox {
        box-shadow: 0 1px 5px rgba(0,0,0,0.2), 0 2px 2px rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12);
        border-radius: 2px;
        height: calc(100vh - 180px);
    }



</style>
