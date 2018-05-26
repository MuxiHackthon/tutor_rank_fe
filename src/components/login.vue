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
        <userInput v-model.trim="username" class="inputbox transparent inline_block vertical_align"></userInput>
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
      <div v-if="this.failed" class="check inline_block fail tip_color min_font">密码不正确</div>
    </div>
    <button v-on:click="submit" class="change box_height full_width login_margin">登录</button>
  </div>
</template>

<script>
  // import getCookie from '../getCookie'
  import userInput from './userInput.vue'
  import Fetch from "../fetch.js"
  export default {
    data() {
      return {
        username: '',
        passwordInput: '',
        failed: false,
        universities: ["华中师范大学"]
      }
    },
    components: {
      "userInput": userInput
    },
    mounted() {
      Fetch.FetchData("/api/universities/", "GET").then(res => {
        console.log(res)
        this.universities = res.universities
      })
    },
    methods: {
      // submit() {
      //   Fetch.FetchData(url, "POST", {
      //     // body
      //   }).then(res => {
      //     if (res !== null && res !== undefined) {
      //       // 跳转
      //     } else {
      //       this.failed = true
      //     }
      //   })
      // }
    }
  }
</script>

<style lang="sass">
@import "../scss/utility.scss";
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

</style>
