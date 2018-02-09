<template>
    <v-container fluid>
          <v-layout row wrap justify-center>
              <v-flex xs12 sm6>
                  <v-card>
                      <v-toolbar class="teal">
                          <v-spacer>系统登录</v-spacer>
                      </v-toolbar>
                      <v-card-text>
                          <v-container fluid>
                              <v-layout row wrap>
                                  <v-flex xs12>
                                      <v-text-field
                                              label="用户名"
                                              v-model="account"
                                              counter
                                              max="15"
                                              :rules="[rules.required]"
                                      ></v-text-field>
                                  </v-flex>
                                  <v-flex xs12>
                                      <v-text-field
                                              label="密码"
                                              type="password"
                                              v-model="password"
                                              :rules="[rules.required]"
                                      ></v-text-field>
                                  </v-flex>
                                  <v-flex xs12>
                                      <v-checkbox v-model="isRemember" label="记住密码" primary hide-details></v-checkbox>
                                  </v-flex>
                              </v-layout>
                              <div class="text-xs-center">
                                  <v-btn
                                          info
                                          @click.native="handleSubmit"
                                  >
                                      <span v-if="!loading">登录</span>
                                      <v-progress-circular v-else indeterminate class="primary--text"></v-progress-circular>
                                  </v-btn>
                              </div>
                          </v-container>
                      </v-card-text>
                  </v-card>

                  <div class="msgBox">
                    {{ showMsg }}
                  </div>



              </v-flex>
          </v-layout>
      </v-container>


    <!--<el-form v-show="chosedFunction" :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="0px" class="login-container">-->
      <!--<h3 class="title">系统登录</h3>-->
      <!--<el-form-item prop="account">-->
        <!--<el-input type="text" v-model="ruleForm.account" auto-complete="off" placeholder="账号"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item prop="checkPass">-->
        <!--<el-input type="password" v-model="ruleForm.checkPass" auto-complete="off" placeholder="密码"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-checkbox v-model="checked" class="remember">记住密码</el-checkbox>-->
      <!--<el-form-item style="width:100%;">-->
        <!--<el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">登录</el-button>-->
      <!--</el-form-item>-->
    <!--</el-form>-->
</template>

<script>
import { setToken, drProfile } from '../api/api';
import MD5 from 'spark-md5';
import axios from 'axios';
export default {
  name: 'login',
  components: {
  },
  data() {
    return {
        account: '',
        password: '',
      rules: {
          required: (value) => !!value || '必填.'
      },
        loading: false,
        isRemember: false,
        showMsg: ''
    };
  },
  methods: {
//    handleReset() {
//      this.$refs.ruleForm.resetFields();
//    },
    handleSubmit(ev) {
        var _this = this
        _this.loading = true
        var loginParams = {
            'UserName': _this.account,
            'Password': MD5.hash(_this.password),
            'Type': 2
        };
        axios.post('http://devapi.account.onenewcare.com/Account/Login', loginParams).then(res => {
            var data = res.data;
            console.log('data');
            console.log(data);
            if (data.Code === 0) {
                _this.loading = false
                sessionStorage.setItem('accessToken', data.Message);
                setToken();
                var userInfo = {
                    'UserName': _this.account,
                    'Password': _this.password
                }
                if (_this.isRemember) {
                    sessionStorage.setItem('user', JSON.stringify(userInfo));
                }
                _this.$router.push({path: '/information'});
            } else {
                let msgBox = document.getElementsByClassName('msgBox')[0];
                _this.loading = false
                this.showMsg = data.Message;
                msgBox.classList.add('msgBoxShow')
                setTimeout(function() {
                    this.showMsg = ''
                    msgBox.classList.remove('msgBoxShow')
                },4000)

                // document.getElementsByClassName('input-group__details')[1].innerText = '密码错误'
                // _this.$message({message: '登录失败', type: 'error'});
            }
        })
    }

  },
  mounted() {
    let userInfo = JSON.parse(sessionStorage.getItem('user'));
    if (userInfo) {
        console.log(userInfo)
      this.isRemember = true;
      this.account = userInfo.UserName;
      this.password = userInfo.Password;
    }
  }
};
</script>
<style scoped>
.custom-loader {
    animation: loader 1s infinite;
    display: flex;
}
@-moz-keyframes loader {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
@-webkit-keyframes loader {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
@-o-keyframes loader {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
@keyframes loader {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}

.msgBox {
    position: fixed;
    z-index: -1;
    left: 50%; 
    top: 30px;
    width: 30%;
    transform: translateX(-50%);
    padding: 8px 16px;
    margin: 0;
    box-sizing: border-box;
    border-radius: 4px;
    background-color: #fff;
    overflow: hidden;
    opacity: 1;
    display: flex;
    align-items: center;
    transition: opacity .2s;
    color:#ff5252; 
    
}
.msgBoxShow {
    position: fixed;
    z-index: 2000;
}
</style>
