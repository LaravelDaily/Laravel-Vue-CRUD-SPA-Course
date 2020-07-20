<template>
    <div>
        <form @submit.prevent="submit_form">
            Post title:
            <br />
            <input type="text" v-model="fields.title" class="form-control" />
            <br />
            Post text:
            <br />
            <textarea rows="10" class="form-control" v-model="fields.post_text"></textarea>
            <br />
            Category:
            <select class="form-control" v-model="fields.category_id">
                <option v-for="category in categories"
                    :value="category.id">{{ category.name }}</option>
            </select>
            <br />
            <input type="submit" class="btn btn-primary" value="Save post" />
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                categories: {},
                fields: {
                    title: '',
                    post_text: '',
                    category_id: ''
                }
            }
        },

        mounted() {
            axios.get('api/categories')
                .then(response => {
                    this.categories = response.data.data;
                });
        },

        methods: {
            submit_form() {
                axios.post('api/posts', this.fields)
                    .then(response => {
                        this.$router.push('/');
                    });
            }
        }
    }
</script>
