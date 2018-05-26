<template>
	<div id="js_courses_list" class="list">
		<div v-for="item in listCnt" class="item" :key="item.id">
            <div class="course space">
                <img :src="item.photo" class="avatar">
                <div class="list_content">
                    <div class="info space">
                        <span class="teacher">{{ item.name }}</span>
                        <div class="likes flex">
                            <div><vm-rate v-model="item.score" :allow-half="true" disabled></vm-rate> {{ item.score }}</div>
                        </div>
                    </div>
                    <div class="list_title c_link">{{ item.direction }}</div>
                </div>
            </div>
		</div>
        <div class="mobile_page_row full_width">
            <button class="mobile_page_button mobile_button_size" v-on:click="page_down">&lt;</button>
            <span>{{current}}/{{total}}</span>
            <button class="mobile_right_button mobile_button_size" v-on:click="page_up"> > </button>
        </div>
	</div>
</template>

<script>
import FETCH from '../fetch.js'
import Cookie from '../cookie.js'
export default {
  data() {
    return {
        listCnt:[],
        university:"",
        total:1,
        current:1
    };
  },
  methods: {
    page_down(){
        this.current--
        if(this.current>0){
            this.fetchdata(this.current)
        }        
    },
    page_up(){
        this.current++
        if(this.current<=this.total){
            this.fetchdata(this.current)
        }  
    },
    fetchdata(page){
        FETCH.FetchData(`/api/teacher/${this.university}/page/${page}/`, "GET")
        .then(res => {
            this.total = res.allpages
            this.listCnt = res.teachers
        })
    }
  },
  mounted() {
    this.university = Cookie.getCookie("university")
    this.fetchdata(1)
  }
};
</script>

<style lang='sass'>
.flex {
  display: flex;
  align-items: center;
}
.list {
  width: 100%;
}
.course {
  font-size: 0;
  width: 333px;
  margin: 0 auto;
  padding: 20px 0 16px;
  border-bottom: 1px solid #ececec; /*px*/
}
.avatar {
  font-size: 20px; /*px*/
  margin-right: 16px;
  width: 40px;
  height: 40px;
  line-height: 40px;
  color: #fff;
  border-radius: 50%;
  overflow: hidden;
  background-color: #eeab5d;
  text-align: center;
}
.avatar,
.list_content {
  display: inline-block;
  vertical-align: top;
}
.list_content {
  width: 276px;
}
.vm-rate{
    display:inline-block;
    vertical:center;
}
.list_title {
    font-size:12px;
  width: 100%;
  color: #333;
  padding-bottom: 12px;
}
.info {
  width: 100%;
  color: #999;
  display: flex;
  font-size: 12px; /*px*/
  align-items: center;
}
.teacher {
  font-size: 16px; /*px*/
  width: 72px;
  margin-right: 40px;
  color:black;
}
.va_item {
  font-size: 12px; /*px*/
  display: inline-block;
  vertical-align: top;
}
.logo {
  display: inline-block;
  width: 13px;
  height: 12px;
  vertical-align: -2px;
  margin-right: 6px;
}
.logo use {
  fill: #999;
}
.comments {
  margin-right: 16px;
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
.mobile_button_size {
  width: 16px;
  height: 16px;
  color: white;
  line-height: 16px;
}
</style>
