<template>
  <div class="login_container">
    <div class="row first_row">
      <div class="box box_height transparent">
      <span class="select_list">选择学校：</span>
      <select v-model="university">
        <option v-for="option in universities" :key="universities.indexOf(option)"  v-bind:value="option" class="univer">{{ option }}</option>
      </select>
    </div>
    </div>
    <div class="row">
      <div class="box box_height transparent">
        <div class="iconbox full_height width inline_block vertical_align">
          <svg viewBox="0 0 200 200" class="login_icon">
                <use xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#username"></use>
              </svg>
        </div>
        <userInput v-model.trim="userID" class="inputbox transparent inline_block vertical_align"></userInput>
      </div>
    </div>
    <div class="row">
      <div class="box box_height transparent">
        <div class="iconbox full_height width inline_block vertical_align">
          <svg viewBox="0 0 200 200" class="login_icon">
                <use xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#password"></use>
              </svg>
        </div>
        <input v-model.trim="passwordInput" type="password" class="inputbox transparent inline_block vertical_align" placeholder="密码">
      </div>
      <div v-if="this.failed" class="check inline_block fail tip_color min_font">密码或验证码不正确</div>
    </div>
    <img v-if="this.img_required" :src="this.img_url" class="verify_img">
    <div v-if="this.img_required" class="row flex">
      <div class="box box_height transparent verify_box">
        <input v-model.trim="verify" type="text" placeholder="验证码">
      </div>
    </div>
    <button v-on:click="submit1" class="change box_height full_width login_margin" v-if="!this.img_required">登录</button>
    <button v-on:click="submit2" class="change box_height full_width login_margin" v-if="this.img_required">登录</button>
  </div>
</template>

<script>
  import Cookie from '../cookie.js';
  import userInput from './userInput.vue';
  import Fetch from "../fetch.js";
  export default {
    data() {
      return {
        userID: '',
        passwordInput: '',
        failed: false,
        universities: [""],
        university: "CCNU",
        img_url: "",
        img_required: false,
        verify: "",
        session: ""
      }
    },
    components: {
      "userInput": userInput
    },
    mounted() {
      Fetch.FetchData("/api/universities/", "GET").then(res => {
        this.universities = res.universities
      })
    },
    methods: {
      submit1() {
        Fetch.FetchData("/api/universities/schema/", "POST", {
          university_name: this.university
        }).then(res => {
          if(res.verify === 1) {
            Fetch.FetchData("/api/universities/pre_verify/", "POST", {
              university_name: this.university
            }).then(response => {
              if(response.msg == "ok") {
                Fetch.FetchData("/api/universities/verify/", "POST", {
                  university_name: this.university
                }).then(res => {
                  this.img_url = res.verify_url,
                  this.img_required = true
                })
              }
            })
          } else {
            Fetch.FetchData("/api/login/", "POST", {
              university_name: this.university,
              login_info: {
                username: this.userID,  //大学学号
                password: this.passwordInput
              }
            }, function(){
              this.failed = true
            }).then(res => {
              this.$router.push("list")
              Cookie.setCookie("token", res.token);
              Cookie.setCookie("school", this.university);
            })
          }
        })
      },
      submit2() {
        Fetch.FetchData("/api/login/", "POST", {
          university_name: this.university,
          login_info: {
            username: this.userID,  //大学学号
            password: this.passwordInput,
            verify: this.verify
          }
        },function(){
          console.log("failes")
          this.failed = true
        }).then(res => {
          this.$router.push("list")
          Cookie.setCookie("token", res.token);
          Cookie.setCookie("school", this.university);
        })
      }
    }
  }
</script>

<style lang="sass">
@import "../scss/utility.scss";
.flex {
  displsy: flex;
}
.box_height {
  height: 30px;
}
.first_row {
   margin-top: 100px;
}
.login_container {
  width: 202px;
  margin: 0 auto;
}
.secret {
  width: 14px;
  height: 12px;
}
  
.forget {
  margin-top: 5px;
  cursor: pointer;
}
  
.fail {
  float: right;
}
  
.login-margin {
  margin-top: 20px;
}
.router-margin {
  margin-bottom: 10px;
}

.change {
  color: #ffffff;
  font-size: 14px;
  border-radius: 4px;
  border: none;
  background: #fd860e;
}

.change:hover {
  background-color: #df6b0f;
}

.row {
  height: 50px;
}

.box {
  border: none;
  position: relative;
  z-index: 3;
  font-size: 0;
}

.box:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  color: #0b2029;
  border-radius: 4px;
  border: 1px solid #737373;
  font-size: 0;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  z-index: -1;
}

@media screen and (-webkit-min-device-pixel-ratio:1.5) {
  .box:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 200%;
    height: 200%;
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
    color: #0b2029;
    border-radius: 8px;
    border: 2px solid #737373;
    font-size: 0;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    z-index: -1;
  }
}

.iconbox {
  position: relative;
}

.login_icon {
  width: 17px;
  height: 16px;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  position: absolute;
}

.height {
  height: 20px;
}

.width {
  width: 16%;
}

.check {
  text-align: right;
}

.inputbox {
   width: 65%;
}

.univer {
  font-size: 12px;
}

.select_list {
  font-size: 14px;
  margin-left: 4px;
}

.verify_img {
  width: 202px;
  height: 50px;
}

.verify_box {
  border: none;
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
}
</style>
