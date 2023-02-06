<template>
    <div class="post">
        <div>
            <div>{{ post.id }} likes = {{ $store.state.likes }}</div>
            <div><strong>Название:</strong> {{ post.title }}</div>
            <div><strong>Описание:</strong> {{ post.body }}</div>
        </div>
        <div class="post__btns">
            <my-button @click="$router.push(`/posts/${post.id}`)">Открыть</my-button> <!--с помощью ${} мы можем вставлять динамический в текст какие либо данные но при этом вместо '' и "" используем `` (можно просто '/posts/' + post.id, но ${} читабельней наверн прост)-->
            <my-button @click="$emit('remove', post)">Удалить</my-button> <!--вместо remove также можно указать что угодно и... (см PostList))-->
        </div>
    </div>
</template>

<script>
export default {

    props: {
        post: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>
.post {
    padding: 15px;
    border: 2px solid teal;
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.post__btns {
    display: flex;
}
</style>