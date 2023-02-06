<template>
    <div v-if="posts.length > 0">
        <h3>Список постов</h3>
        <transition-group name="post-list">
            <post-item :key="post.id" @remove="$emit('remove', post)" :post="post" v-for="post in posts"/> <!--... тут так же можно поменять @remove и 'remove' на что то другое... (см. App.vue)-->
        </transition-group>
    </div>
    <h2 v-else>Загрузка...</h2>
</template>

<script>
import PostItem from "@/components/PostItem";

export default {
    components: {
        PostItem
    },
    props: {
        posts: {
            type: Array,
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
}
.post-list-item {
  display: inline-block;
  margin-right: 10px;
}
.post-list-enter-active, .post-list-leave-active {
  transition: all 0.4s;
}
.post-list-enter, .post-list-leave-to /* .list-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateX(130px);
}

.post-list-move {
  transition: transform 0.4s;
}
</style>