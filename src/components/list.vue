<template>
	<div id="js_courses_list" class="list">
		<div v-for="item in listCnt" class="item" :key="item.id">
            <div class="course space">
                <img :src="item.photo" class="avatar">
                <div class="content">
                    <div class="info space">
                        <span class="teacher">{{ item.name }}</span>
                        <div class="likes flex">
                            <div><vm-rate v-model="item.score" :allow-half="true" disabled></vm-rate> {{ item.score }}</div>
                        </div>
                    </div>
                    <div class="title c_link">{{ item.direction }}</div>
                </div>
            </div>
		</div>
	</div>
</template>

<script>
import FETCH from '../fetch.js'
export default {
  data() {
    return {
        listCnt:[]
    };
  },
  methods: {},
  mounted() {
    FETCH.FetchData("/api/v1.0/courses", "GET")
    .then(res => {
        this.listCnt = res
        console.log(this.listCnt)
    })
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
.content {
  display: inline-block;
  vertical-align: top;
}
.content {
  width: 260px;
}
.vm-rate{
    display:inline-block;
    vertical:center;
}
.title {
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
</style>
