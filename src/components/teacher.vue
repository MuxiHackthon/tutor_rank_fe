<template>
  <div>
    <div class="info_box">
      <img class="tea_avatar" :src="tea_avatar">
      <div class="info_list">
        <div class="info_box_row">
          <div class="tea_sex" v-if="this.male">
          
        </div>
        <div class="tea_sex" v-if="!this.male">
          
        </div>
        <div class="tea_name">{{name}}</div>
        <div><vm-rate v-model="score" :allow-half="true" disabled></vm-rate> {{ score }}</div>
        </div>
        <div class="info_col">
          <div class="tea_school">{{school}}</div>
          <div class="major">{{major}}</div>
          <div class="year">{{year}}</div>
        </div>
      </div>
    </div>
    <div class="comment_box">
      <div v-for="item in comments" :key="comments.indexOf(item)">
        <div class="com_info">
          <div><vm-rate v-model="item.score" :allow-half="true" disabled></vm-rate> {{ item.score }}</div>
          <div class="com_content">{{item.content}}</div>
        </div>
      </div>
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
      page_sum: 5
    }
  },
  mounted() {
    this.t_id = window.location.href.split("/")[2];
    Fetch.FetchData("/api/teacher/" + this.t_id + "/info/page/1").then(res => {
      this.page_sum = res.allpages,
      this.name = res.teacher.name,
      this.photo = res.teacher.photo,
      this.direction = res.teacher.major,
      this.score = res.teacher.score,
      this.comments = res.comments
    })
  },
  nextPage(page) {
    this.page_num++;
    this.getComments(this.page_num)
  },
  prePage(page) {
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

</style>
