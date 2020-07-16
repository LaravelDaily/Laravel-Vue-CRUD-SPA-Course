require('./bootstrap');

import Vue from 'vue'

Vue.component('posts-index',
    require('./components/Posts/Index.vue').default)

Vue.component('pagination', require('laravel-vue-pagination'))

const app = new Vue({
    el: '#app'
});
