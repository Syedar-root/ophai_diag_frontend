<script setup lang="ts">
  import { ref } from 'vue'
  import { Key, User } from '@element-plus/icons-vue'
  import logo from '@/shared/assets/logo/logo.svg?url'
  import type { userDto } from '@/shared/components/business/login/types.ts'
  import { loginService, registerService } from '@/libs/api/login'
  import { validate, registerSchema } from '@/libs/utils/validate'
  import { useTokenStore } from '@/libs/store/token'
  import {useUserStore} from "@/libs/store/user";
  import {ElMessage} from "element-plus";

  const tokenStore = useTokenStore()
  const userStore = useUserStore()

  const query = ref<userDto>({
    userId: '',
    passwordHash: ''
  })
  const registerQuery = ref<userDto>({
    userName: '',
    passwordHash: '',
    confirmPassword: '',
    email: '',
    gender: '', // 性别改为空字符串
    phone: '', // 手机号改为空字符串
    age: null, // 数值类型可以保持 null
    hospital: '',
    position: '',
    idNumber: '',
    invitationCode: '',
  })

  // 登录流程
  const handleLogin = async () => {
    // try {
    //   // console.log(query.value)
    //   //   验证参数
    //   await validate(query.value, loginSchema)
    // } catch (error) {
    //   // console.error(error)
    //   return
    // }
    try {
      //   登录
      await loginService(query.value).then((res: any) => {
        if (res.data.token === null) {
          return;
        }
        ElMessage({
          message: res.data.message || "登录成功",
          type: 'success',
          duration: 2000
        })
        tokenStore.setToken(res.data.token)
        userStore.setUser({
          userId: res.data.userId,
          userName: res.data.userName,
          hospital: res.data.hospital,
          gender: res.data.gender,
          age: res.data.age,
          permission: res.data.permission > 4 ? 4 : res.data.permission,
        })

        loginShow.value = false
        handleClose()
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      })
    } catch (error) {
      // console.error(error)
      return
    }
  }

  // 注册流程
  const handleRegister = async () => {
    try {
      //   验证参数
      await validate(registerQuery.value, registerSchema)
      //   注册
      await registerService(registerQuery.value).then((res) => {
        registerShow.value = false
        loginShow.value = true
        query.value.userId = res.data.idNumber;
        alert('注册成功,请使用身份证号登录');
      })
    } catch (error) {
      console.error(error)
      return
    }
  }

  // 控制登录注册显示
  const loginContainer = ref<HTMLDivElement>()
  const handleClose = () => {
    tokenStore.toggleLogin(false);
  }
  const registerShow = ref(false)
  const loginShow = ref(true)
  function handleRegisterShow() {
    registerShow.value = !registerShow.value
    loginShow.value = !loginShow.value
  }
</script>

<template>
  <div class="login-container" ref="loginContainer">
    <div class="login-content" :class="{ 'register-content': registerShow }" @click.stop>
      <transition name="fade" mode="out-in">
        <section class="login-section" v-if="loginShow">
          <!--      登录部分-->
          <div class="login-content__logo">
            <img class="logo" :src="logo" alt="logo" />
          </div>
          <div class="login-content__title">医生登录</div>
          <div class="login-content__form">
            <el-form>
              <el-form-item prop="username">
                <el-input placeholder="请输入账号" v-model="query.userId" :prefix-icon="User"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  placeholder="请输入密码"
                  v-model="query.passwordHash"
                  type="password"
                  :prefix-icon="Key"
                  show-password></el-input>
              </el-form-item>
              <el-form-item class="password-opt">
                <el-checkbox>记住密码</el-checkbox>
                <el-link>忘记密码？</el-link>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleLogin">登录</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="login-content__register">
            <a href="#" @click="handleRegisterShow">注册为管理员</a>
          </div>
        </section>
      </transition>
      <transition name="fade" mode="out-in">
        <section class="register-section" v-if="registerShow">
          <!--     注册表单-->
          <div class="register-content__title">
            <span>管理员注册</span>
          </div>
          <div class="register-content__text">
            <span>加入我们的医疗团队，为您提供更好的医疗服务</span>
          </div>
          <div class="register-content__form">
            <el-form>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item prop="username" label="姓名" label-position="top">
                    <el-input placeholder="请输入真实姓名" v-model="registerQuery.userName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="gender" label="性别" label-position="top">
                    <el-radio-group v-model="registerQuery.gender" label="性别" label-position="top">
                      <el-radio value="0" size="large">男</el-radio>
                      <el-radio value="1" size="large">女</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item prop="phone" label="手机号" label-position="top">
                    <el-input placeholder="请输入手机号" v-model="registerQuery.phone"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="idCard" label="身份证号" label-position="top">
                    <el-input placeholder="请输入身份证号" v-model="registerQuery.idNumber"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-form-item prop="proDoctorId" label="邮箱" label-position="top">
                    <el-input placeholder="请输入邮箱" v-model="registerQuery.email"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="12">
                  <el-form-item prop="hospital" label="所属医院" label-position="top">
                    <el-input placeholder="请输入医院" v-model="registerQuery.hospital"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="position" label="职位" label-position="top">
                    <el-input placeholder="请输入职称" v-model="registerQuery.position"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item prop="password" label="密码" label-position="top">
                    <el-input
                      placeholder="请输入密码"
                      v-model="registerQuery.passwordHash"
                      type="password"
                      show-password></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="confirmPassword" label="确认密码" label-position="top">
                    <el-input
                      placeholder="请确认密码"
                      v-model="registerQuery.confirmPassword"
                      type="password"
                      show-password></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-form-item label="管理员认证码" label-position="top">
                    <el-input
                      placeholder="请输入管理员认证码"
                      v-model="registerQuery.invitationCode"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item>
                <el-button type="primary" @click="handleRegister">注册</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="register-content--login">
            <a href="#">
              已有账号？
              <span @click="handleRegisterShow">去登陆</span>
            </a>
          </div>
        </section>
      </transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @use 'styles';
</style>
