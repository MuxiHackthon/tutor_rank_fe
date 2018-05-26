<template>
	<div class="new_comment">
		<div class="new_comment_box">
			<textarea class="comment_cont" placeholder="留下你的评论吧" v-model="comment_text"></textarea>
		</div>
        <div class="comment_rate">
            <vm-rate v-model="score"></vm-rate>
	    </div>
		<div class="com_btns">
			<div class="com_btn com_btn_left" @click="backStep">返回</div>
			<div class="com_btn com_btn_right" @click="setComment">提交</div>
		</div>
    </div>
</template>

<script>

export default {
  data() {
    return {
      comment_text: "",
      score:0
    };
  },
  methods: {
    backStep() {
      history.back();
    },
    setComment(){
        console.log("haha")
    }
  },
};
</script>
<style lang='sass'>
.new_comment {
  padding-top: 17px;
  line-height: 14px;
  font-size: 0;
  padding-bottom: 20px;
}
.comment_rate{
    margin-top:30px;
    text-align:center;
}
.new_comment_box {
  width: 328px;
  margin: 0 auto;
}
.comment_cont {
  display: block;
  width: 100%;
  height: 150px;
  font-size: 14px; /*px*/
  box-sizing: border-box;
  padding: 17px 18px;
  border-top: 2px solid #ececec;
  border-bottom: 2px solid #ececec; 
}
.com_btns {
  width: 332px;
  margin: 50px auto 0;
}
.com_btn {
  display: inline-block;
  width: 156px;
  height: 36px;
  text-align: center;
  line-height: 36px;
  box-sizing: border-box;
  border: 1px solid rgb(246,185,61);
  border-radius: 2px;
  font-size: 14px; /*px*/
}
.com_btn_left {
  color: rgb(246,185,61);
  margin-right: 18px;
}
.com_btn_right {
  color: #fff;
  background: rgb(246,185,61);
}
</style>
