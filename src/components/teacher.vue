<template>
  <div class="margin tea_container">
    <div class="info_box full_width">
      <img class="tea_avatar" :src="tea_avatar">
      <div class="info_list">
        <div class="info_box_row flex">
          <div class="tea_sex" v-if="this.male">
            <svg viewBox="0 0 200 200">
              <use xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#male"></use>
            </svg> 
        </div>
        <div class="tea_sex" v-if="!this.male">
          <svg viewBox="0 0 200 200">
            <use xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#female"></use>
          </svg>
        </div>
        <span class="tea_name">{{name}}</span><span class="average_score">平均评分:</span>{{score}}
        </div>
        <div class="info_col">
          <div class="info_col_item"><span>学校:</span>{{school}}</div>
          <div class="info_col_item"><span>专业方向:</span>{{major}}</div>
          <div class="info_col_item"><span>出生年份:</span>{{year}}</div>
        </div>
      </div>
    </div>
    <div class="comment_box">
      <div v-for="item in comments" :key="comments.indexOf(item)" class="comment_item">
        <div>
          <div class="com_score flex"><vm-rate v-model="item.score" :allow-half="true" disabled></vm-rate> {{ item.score }}</div>
          <div class="com_content">{{item.content}}</div>
        </div>
      </div>
    </div>
    <div class="mobile_page_row full_width">
      <button class="mobile_page_button mobile_left_button mobile_button_size" v-on:click="page_down">&lt;</button>
        <span>{{page_num}}/{{page_sum}}</span>
      <button class="mobile_right_button mobile_button_size" v-on:click="page_up"> > </button>
    </div>
  </div>
</template>
<script>
import Cookie from '../cookie.js';
import Fetch from "../fetch.js";
export default {
  data() {
    return {
      tea_avatar: "",
      name: "",
      male: true,
      school: "",
      major: "",
      year: 1970,
      comments: [],
      t_id:2,
      page_num: 1,
      page_sum: 1,
      score: 4.5
    }
  },
  mounted() {
    this.t_id = window.location.pathname.split("/")[2];
    Fetch.FetchData("/api/teacher/" + this.t_id + "/info/page/1/", "GET").then(res => {
      this.page_sum = res.allpages,
      this.school = res.teacher.school,
      this.name = res.teacher.name,
      this.male = (res.teacher.sex === 1) ? true : false,
      this.tea_avatar = res.teacher.photo,
      this.major = res.teacher.direction,
      this.score = res.teacher.score,
      this.comments = res.comments,
      this.year = res.teacher.birth
    })
  },
  page_up(page) {
    this.page_num++;
    this.getComments(this.page_num)
  },
  page_down(page) {
    this.page_num--;
    this.getComments(this.page_num)
  },
  getComments(page) {
    Fetch.FetchData("/api/teacher/" + this.t_id + "/info/page/" + page).then(res => {
      this.comments = res.comments
    })
  }
}
</script>
<style lang="sass">
@import "../scss/reset.scss";
@import "../scss/utility.scss";
.info_box {
  height: 140px;
  display: flex;
  padding: 20px 10px;
  align-items: flex-start;
}
.tea_avatar {
  width: 70px;
  height: 70px;
  margin-right: 10px;
}
.tea_sex {
  width: 30px;
  height: 30px;
}
.tea_container {
  width: 300px;
}
.info_box_row {
  align-items: center;
}
.tea_name {
  font-size: 18px;
  margin-right: 10px;
}
.average_score{
  margin-left: 10px;
}
.info_col_item {
  margin: 5px 0 10px 30px;
}
.comment_item {
  padding-top: 10px;
}
.mobile_page_row {
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  margin-top: 20px;
}
.mobile_page_button:hover,
.mobile_right_button:hover {
  background-color:rgb(246,185,61);
}
.mobile_right_button {
  margin-left: 20px;
}
.mobile_left_button{
  margin-right: 20px;
}
.mobile_button_size {
  width: 16px;
  height: 16px;
  color: white;
  line-height: 16px;
}
.com_score {
  align-items: center;
}
.com_content {
  padding: 10px 0;
}
</style>
