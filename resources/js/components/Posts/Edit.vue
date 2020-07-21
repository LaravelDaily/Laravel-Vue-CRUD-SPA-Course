<template>
    <div>
        <form @submit.prevent="submit_form">
            Post title:
            <br />
            <input type="text" v-model="fields.title" class="form-control" />
            <div class="alert alert-danger" v-if="errors && errors.title">
                {{ errors.title[0] }}
            </div>
            <br />
            Post text:
            <br />
            <textarea rows="10" class="form-control" v-model="fields.post_text"></textarea>
            <div class="alert alert-danger" v-if="errors && errors.post_text">
                {{ errors.post_text[0] }}
            </div>
            <br />
            Category:
            <select class="form-control" v-model="fields.category_id">
                <option v-for="category in categories"
                    :value="category.id">{{ category.name }}</option>
            </select>
            <div class="alert alert-danger" v-if="errors && errors.category_id">
                {{ errors.category_id[0] }}
            </div>
            <br />
            Thumbnail:
            <br />
            <input type="file" @change="select_file">
            <br /><br />

            <input type="submit" class="btn btn-primary"
                   :value="form_submitting ? 'Saving post...' : 'Save post'"
                   :disabled="form_submitting" />
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
                    category_id: '',
                    thumbnail: null
                },
                errors: {},
                form_submitting: false
            }
        },

        mounted() {
            axios.get('/api/categories')
                .then(response => {
                    this.categories = response.data.data;
                });

            axios.get('/api/posts/' + this.$route.params.id)
                .then(response => {
                    this.fields = response.data.data;
                });
        },

        methods: {
            select_file(event) {
                this.fields.thumbnail = event.target.files[0];
            },
            submit_form() {
                this.form_submitting = true;

                axios.put('/api/posts/' + this.$route.params.id, this.fields)
                    .then(response => {
                        this.$swal('Post updated successfully');
                        this.$router.push('/');
                        this.form_submitting = false;
                    }).catch(error => {
                        this.$swal({ icon: 'error', title: 'Error happened'});
                        if (error.response.status === 422) {
                            this.errors = error.response.data.errors;
                        }
                        this.form_submitting = false;
                    });
            }
        }
    }
</script>
