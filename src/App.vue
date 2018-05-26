<template>
	<div class="main">
	
		<!-- <header class="header">
	
		</header> -->
		<div class="container">
			<div class="test">hahahh</div>
			<div>
			
			</div>
			<router-link to="/list">to List</router-link>
			<router-view></router-view>
		</div>
	</div>
</template>

<style lang='sass'>
.test{
	color:red;
}
</style>

<script>
	import Login from './components/login.vue'
	import List from './components/list.vue'
	export default {
		mounted() {
	
		},
		data() {
			return {
				valueA1:5
			}
		},
		methods: {},
		components: {
			"login": Login,
			"list": List
	
		},
	}
</script>
