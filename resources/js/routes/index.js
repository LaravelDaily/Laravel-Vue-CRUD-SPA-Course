import PostsIndex from '../components/Posts/Index.vue'
import PostsCreate from '../components/Posts/Create.vue'

export default {
    mode: 'history',
    routes: [
        {
            path: '/',
            component: PostsIndex,
            name: 'posts.index'
        },
        {
            path: '/create',
            component: PostsCreate,
            name: 'posts.create'
        },
    ]
}
