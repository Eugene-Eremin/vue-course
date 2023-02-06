<template>
    <form @submit.prevent>
        <h4>Создание поста</h4>
        <!--!!! при изменения значения post.title будет менятся... (см. MyInput.vue)--> <my-input v-focus v-model="post.title" type="text" placeholder="Название"/> <!--@input короткот v-on:input=""--> <!--v-model (слушатель только для данных, не для 'click...') позволяет не писать @input, @textarea.., и связывать поля-->
        <my-input v-model="post.body" type="text" placeholder="Описание"/> <!--Так же мы можем указать например: v-model:value="post.body" и... (см. PostInput)-->
        <my-button style="align-self: flex-end; margin-top: 15px;" @click="createPost">Создать</my-button>
    </form>
</template>

<script>
export default {

    data() {
        return {
            post: {
                title: '',
                body: ''
            }
        }
    },
    methods: {
        createPost() {
            this.post.id = Date.now();
            this.$emit('create', this.post) // Вместо 'create' можно написать что угодно и см. в App.vue...
            this.post = {
                title: '',
                body: ''
            }
        }
    }
}
</script>

<style scoped>
</style>