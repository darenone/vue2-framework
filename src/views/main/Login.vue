<template>
  <div id="login-wrapper" class=" flex flex-column h-100">
    <div class="sysLogo" />
    <div class="sysName">{{ $config.sysName[$i18n.locale] }}</div>
    <div class="flex align-start justify-between flex-1" style="position:relative;">
      <div class="bgMap" />
      <el-card class="box-card">
        <div class="login-title">{{ $t('LOGIN_SYSTEM') }}</div>
        <el-form ref="form" :model="data" :rules="rules" label-width="0px">
          <el-form-item prop="username" style="margin-bottom:25px;">
            <el-input v-model="data.username" prefix-icon="el-icon-user-solid" :placeholder="$t('IN_USERNAME')" maxlength="32" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="data.password"
              prefix-icon="el-icon-lock"
              :placeholder="$t('IN_PASSWORD')"
              type="password"
              maxlength="32"
              @keyup.enter.native="submit"
            />
          </el-form-item>
          <div class="flex align-center justify-between" style="margin-bottom:20px;">
            <el-checkbox
              v-model="checked"
              style="margin:0"
              @change="rememberPass"
            >{{ $t('REMEMBER_USERNAME') }}
            </el-checkbox>
            <el-button type="text" class="forgotPwd" @click="forgotPassword">{{ $t('FORGOT_PASSWORD') }}</el-button>
          </div>
          <div class="login-btn">
            <el-button type="primary" style="font-size:20px;" @click="submit">{{ $t('LOGIN') }}</el-button>
          </div>
        </el-form>
      </el-card>
    </div>
    <div class="footer-copy">{{ $config.copyright[$i18n.locale] }}</div>
  </div>
</template>

<script>
  import cryptoJs from 'crypto-js'
  import { mapActions, mapGetters } from 'vuex'
  // import SystemApi from '@/api/SystemApi'
  export default {
    data() {
      return {
        checked: false,
        data: {
          username: '',
          password: ''
        }
      }
    },
    computed: {
      ...mapGetters(['getUser']),
      rules() {
        return {
          username: [{
            required: true,
            message: this.$t('IN_USERNAME'),
            trigger: 'blur'
          }], password: [{
            required: true,
            message: this.$t('IN_PASSWORD'),
            trigger: 'blur'
          }]
        }
      }
    },
    created() {
      this.$store.commit('CLEAR_NOTIFY_LIST')
      document.onkeydown = event => {
        var theEvent = window.event || event
        var code = theEvent.keyCode || theEvent.which || theEvent.charCode
        if (code === 13) {
          this.submit()
        }
      }

      const username = localStorage.getItem('userName')
      if (username && username !== 'null') {
        this.checked = true
        this.data.userName = username
      } else {
        localStorage.removeItem('userName')
      }
      console.log(this.loadImage)
    },
    methods: {
      ...mapActions(['loadDict', 'loadInfo']),
      submit() {
        this.$refs.form.validate(valid => {
          if (!valid) {
            return false
          }
          if (this.checked === true) {
            localStorage.setItem('userName', this.data.username.trim())
          } else {
            localStorage.setItem('userName', '')
          }
          this.login(this.data)
        })
      },
      login() {
        const pwd = cryptoJs.enc.Utf8.parse(this.data.password)
        const password = cryptoJs.enc.Base64.stringify(pwd)
        const data = {
          username: this.data.username,
          password: password
        }
        console.log(data)
        // SystemApi.login(data).then(result => {
        //   if (result) {
        //     this.updateCookie(result)
        //     this.loadDict()
        //     this.loadInfo(true)
        //   }
        // })
      },
      rememberPass() {
        localStorage.setItem('rememberMe', this.checked)
      },
      forgotPassword() {
        this.$notify.error({
          title: '系统提示',
          message: '请联系上级管理员重置密码',
          duration: 5000
        })
      },
      updateCookie(result) {
        localStorage.setItem('token', result)
      }
    }
  }
</script>
