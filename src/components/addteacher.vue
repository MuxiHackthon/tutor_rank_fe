<template>
<div>
    <div class="avatar_box">
        <img :src="this.photo_url" class="avatar big">
    </div>
    <div class="input_box">
        <div class="info_input">
            <span>姓名</span>
            <input class="info_input_cnt" v-model="teacher_name" type="text">
        </div>
        <div class="info_input">
            <span>研究方向</span>
            <input class="info_input_cnt" v-model="research_direction" type="text">
        </div>
        <div class="info_input">
            <span>性别</span>
            <div class="info_input_cnt">
                <input type="radio" id="male" v-model="sex" name="sex" value=1>
                <label for="male">男</label>
                <input type="radio" id="female" v-model="sex" name="sex" value=0>
                <label for="male">女</label>
            </div>
        </div>
        <div class="info_input">
            <span>出生年份</span>
            <input class="info_input_cnt" v-model="this.birth" type="number">
        </div>
    </div>
    <button v-on:click="submit" class="change box_height addbtn login_margin">提交</button>
</div>
</template>

<script>
  import Cookie from '../cookie.js';
  import Fetch from "../fetch.js";
  export default {
    data() {
      return {
        teacher_name:"",
        research_direction:"",
        photo_url:"https://avatars0.githubusercontent.com/u/14661192?s=460&v=4",
        sex:0,
        birth:1997
      }
    },
    methods: {
      submit(){
            fetch(`/api/teacher/`, {
            method: 'POST',
            headers: {
                'Authorization': Cookie.getCookie("token"),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                teacher_name:this.teacher_name,
                research_direction:this.research_direction,
                photo_url:this.photo_url,
                sex:this.sex,
                birth:this.birth
            })
            }).then((res) => {
                return res.json()
            }).then(value => {
                history.back();
        })
      }
    }
  }
</script>

<style lang="sass">
.avatar_box{
    text-align:center;
    
}
.input_box{
    margin-top:60px;
}
.big{
    width:100px;
    height:100px;
    margin:0 auto;
    margin-top:40px;
}
.info_input{
    margin:0 40px;
    padding:20px 0;
    border-bottom:1px solid silver;
    display:flex;
}
.info_input_cnt{
    margin-left:10px;
    flex-grow:1;
}
.info_input_select{
    margin-left:10px;
}
.addbtn{
    width:100px;
    display:block;
    margin:0 auto;
    margin-top:40px;
}
</style>
