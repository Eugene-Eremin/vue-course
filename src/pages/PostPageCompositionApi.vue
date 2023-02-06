<template>
    <div>
        <h1>Страница с постами</h1>
        <my-input v-focus v-model="searchQuery" placeholder="Поиск...">
        </my-input>
        <div class="app__btns">
            <my-select :options="sortOptions" v-model="selectedSort"></my-select>
        </div>
        <post-list :posts="sortedAndSearchedPosts" @remove="removePost"/>
        <div v-intersection="loadMorePosts" class="observer"></div> 
    </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import axios from 'axios';
import {ref} from "vue";

import usePosts from "@/hooks/usePosts"
import useSortedPosts from "@/hooks/useSortedPosts"
import useSortedAndSearchedPosts from "@/hooks/useSortedAndSearchedPosts"

export default {
    components: {
        PostList, PostForm
    },
    data() {
        return {
            dialogVisible: false,
            sortOptions: [
                {value: 'title', name: 'По названию'},
                {value: 'body', name: 'По описанию'}
            ]
        }
    },
    setup(props) {
        const {posts, totalPages} = usePosts(10); // в {} указывается что должен вернуть этот хук, а через равно можем что то передать ему
        const {sortedPosts, selectedSort} = useSortedPosts(posts);
        const {searchQuery, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts)

        return {
            posts,
            totalPages,
            sortedPosts, 
            selectedSort,
            searchQuery, 
            sortedAndSearchedPosts,
        }
    }
}
</script>

<style>

form {
    display: flex;
    flex-direction: column;
}

.app__btns {
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
}

.page__wrapper {
    display:flex;
    margin-top: 15px;
}

.page {
    border: 1px solid black;
    padding: 10px;
}
.current-page {
    border: 2px solid teal;
}
.observer {
    height: 30px;
}
</style>
