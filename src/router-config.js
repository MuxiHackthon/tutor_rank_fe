import Vue from 'vue';
import VueRouter from "vue-router";
import Login from "./components/login.vue";


Vue.use(VueRouter);
module.exports = new VueRouter({
    mode: "history",
    base: __dirname,
    routes: [{
        name: "index",
        path: "/",
        component: Login
    }]
})