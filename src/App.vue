<template>
	<div class="main">
		<div class="nav_bar">
			<div class="nav">
				<!-- <div class="title_set flex"> -->
					<div class="flex align_center">
						<router-link to="/" class="flex">
							<svg class="app_logo">
								<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#logo"></use>
							</svg>
							<div class="title">导师评价</div>
						</router-link>
					</div>
					<div class="icon_box flex">
					<div class="icon" v-if="addtag">
						<svg viewBox="0 0 34 34" class="flex back">
							<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#back"></use>
						</svg>
					</div>
					<div class="icon icon_user">
						<svg viewBox="0 0 34 34">
							<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use>
						</svg>
				</div>
				</div>
				</div>
		</div>
		<div class="content">
			<div class="container">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
	import Login from './components/login.vue'
	import List from './components/list.vue'
	export default {
		mounted() {
			
		},
		watch: {
			'$route' (to, from) {
				this.addtag = this.$route.path=="/"?false:true
			}
		},
		data() {
			return {
				valueA1:5,
				addtag:false
			}
		},
		methods: {},
		components: {
			"login": Login,
			"list": List
	
		},
	}
</script>

<style lang="sass">
@import "./scss/reset.scss";
@import "./scss/utility.scss";
.main {
	height: 100%;
	width: 100%;
}

.align_center {
  align-items: center;
}
.nav_bar {
	width: 100%;
  height: 58px;
  position: fixed;
  top: 0;
  left: 0;
  border-bottom: 1px solid grey;
  position: fixed;
  background: #fff;
  z-index: 101;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
}
.nav {
	display: flex;
	justify-content: space-between;
	height: 100%;
	align-items: center;
}
.content {
	margin-top: 56px;
}
.icon {
	width: 35px;
	height: 35px;
	align-items: center;
}

.icon_user {
	margin: 0 20px;
}
.title {
	margin-left: 10px;
	height: 35px;
  line-height: 35px;
}
.app_logo {
	width: 35px;
	height: 35px;
}
</style>
