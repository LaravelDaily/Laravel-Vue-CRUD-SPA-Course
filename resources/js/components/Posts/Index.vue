<template>
    <div>
        <select v-model="category_id" class="form-control col-md-3">
            <option value="">-- choose category --</option>
            <option v-for="category in categories"
                :value="category.id">
                {{ category.name }}
            </option>
        </select>
    <table class="table">
        <thead>
            <tr>
                <th>Title</th>
                <th>Post text</th>
                <th>Created date</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="post in posts.data">
                <td>{{ post.title }}</td>
                <td>{{ post.post_text.substring(0, 50) }}</td>
                <td>{{ post.created_at }}</td>
                <td></td>
            </tr>
        </tbody>
    </table>

    <pagination :data="posts" @pagination-change-page="getResults"></pagination>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                posts: {},
                categories: {},
                category_id: ''
            }
        },
        mounted() {
            axios.get('/api/categories')
                .then(response => {
                    this.categories = response.data.data;
                });
            this.getResults();
        },
        watch: {
            category_id(value) { this.getResults(); }
        },
        methods: {
            // Our method to GET results from a Laravel endpoint
            getResults(page = 1) {
                axios.get('/api/posts?page=' + page + '&category_id=' + this.category_id)
                    .then(response => {
                        this.posts = response.data;
                    });
            }
        }
    }
</script>
