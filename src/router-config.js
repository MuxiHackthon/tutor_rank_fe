import Vue from 'vue';
import VueRouter from "vue-router";
import Login from './components/login.vue'
import List from './components/list.vue'
import Comment from './components/comment.vue'
import Teacher from './components/teacher.vue'
import Add from './components/addteacher.vue'
Vue.use(VueRouter);
module.exports = new VueRouter({
    mode: "history",
    base: __dirname,
    routes: [{
        name: "index",
        path: "/",
        component: Login
    },{
        name:"list",
        path:"/list",
        component: List
    },{
        name:"comment",
        path:"/comment/:id",
        component: Comment
    },{
        name: "teacher",
        path: "/teacher/:id",
        component: Teacher
    },{
        name: "addteacher",
        path: "/addteacher",
        component: Add
    }]
})