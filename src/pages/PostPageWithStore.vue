<template>
    <div>
        <!-- <h1>{{$store.state.post.limit}}</h1> --> <!--обратились к post потому что в модуле мы указали postModule как post и у него берем уже поля-->
        <!-- <h1>{{ $store.state.isAuth ? "Пользователь авторизован" : "Пользователь не авторизован"}}</h1> -->
        
        <!-- <h1>{{ $store.state.likes }}</h1> --> <!--С помощью $store через . мы можем обращаться к определенным полям и выводить данные из vuex-->
        <!-- <h1>{{ $store.getters.doubleLikes }}</h1> --> <!--так же можем вызвать функцию обращаясь к getters и через . название функции--> <!--но механически получается что мы функцию не вызываем а обращаемся как к объекту-->
        <!-- <div> -->
            <!-- <my-button @click="$store.commit('incrementLikes')">Увеличить количество лайков на 1</my-button> --> <!--тут с помощью $store.commit('incrementLikes') мы можем мутировать данные в vuex. commit вместо mutations и далее в скобках указываем название функции-->
            <!-- <my-button @click="$store.commit('decrementLikes')">Уменьшить количество лайков на 1</my-button> -->
        <!-- </div> -->

        <h1>Страница с постами</h1>
        <my-input v-focus :model-value="searchQuery" @update:model-value="setSearchQuery" placeholder="Поиск..."></my-input> <!--При vuex v-model не получится использовать. Только пропсом, и далее прослушивать-->
        <div class="app__btns">
            <my-button @click="showDialog">Создать пост</my-button>
            <my-select :options="sortOptions" :model-value="selectedSort" @update:model-value="setSelectedSort"></my-select>
        </div>
        <my-dialog v-model:show="dialogVisible">
            <post-form @create="createPost"/> <!--...и тут мы пишем как мы назвали первую строчку, в даном случае 'create'. Ну и дальше если в PostForm сработала функция и от туда пришли данные сюда-->
        </my-dialog>
        <post-list :posts="sortedAndSearchedPosts" @remove="removePost"/> <!--короткое v-bind:posts--> <!--... и тут вместо @remove подставить то, что указывал в прошлых компонентах и из любого компонента, которого хочешь отправить что то, можно передавать в другие комп.-->
        <div v-intersection="loadMorePosts" class="observer"></div> <!--v-intersection - директива которая подключается в папке directives. v-intersection="{name: 'ULBI TV'}" или v-intersection="someFunct" где уже внутри директивы можем использовать эту функцию и так же динамический изменять ее--> <!--раньше был ref="observer"-->
    
        <div class="page__wrapper">
            <div v-for="pageNumber in totalPages" :key="pageNumber" class="page" :class="{
                'current-page': page === pageNumber
            }" @click="changePage(pageNumber)">{{pageNumber}}</div>
        </div>
    </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import {mapState, mapGetters, mapActions, mapMutations} from "vuex" // упращает процесс получения мутации, акшионов и др...

export default {
    components: {
        PostList, PostForm
    },
    data() {
        return {
            dialogVisible: false
        }
    },
    methods: { // В методы можно замапить только изменения (Mutations и Actions)
        ...mapMutations({
            setPage: 'post/setPage',
            setSearchQuery: 'post/setSearchQuery',
            setSelectedSort: 'post/setSelectedSort'
        }),
        ...mapActions({ // И тут мы можем вместо того чтобы прописывать $store.getters.post/loadMorePosts мы можем в этом так сказать методе указать так. Не забываем про флаг post/ потому что в модуле мы указали namespaced: true 
            loadMorePosts: 'post/loadMorePosts',
            fetchPosts: 'post/fetchPosts'
        }),

        createPost(post) /* И тут в качестве аргумента от дочернег. мы выкавыриваем post*/ {
            this.posts.push(post);
            this.dialogVisible = false;
        },
        removePost(post) {
            this.posts = this.posts.filter(p => p.id !== post.id) // Функция filter вытягивает из массива posts элементы (p) и дальше в зависимости от условия, если true, то этот элемент не будет записываться обратнл в массив
        },
        showDialog() {
            this.dialogVisible = true
        },

        // fetchPosts() и loadMorePosts() мы перенесли в action

        // changePage (pageNumber) {
        //     this.page = pageNumber;
        // }
    },
    mounted() {
        this.fetchPosts();
        // const options = {
        //     rootMargin: '0px',
        //     threshold: 1.0
        // }
        // const callback = (entries, observer) => {
        //     if (entries[0].isIntersecting && this.page < this.totalPages) {
        //         this.loadMorePosts();
        //     }
        // };
        // const observer = new IntersectionObserver(callback,options);
        // observer.observe(this.$refs.observer)
    },
    computed: { // А здесь могут быть только State и Getters
        ...mapState({
            posts: state => state.post.posts, // тут так же мы делаем. Мне каежтся что это все вообще очень бесмысленно, странно и сложно. Но на видосе сказано что стоит только привыкнуть и это покажется легким
            searchQuery: state => state.post.searchQuery,
            selectedSort: state => state.post.selectedSort,
            totalPages: state => state.post.totalPages,
            page: state => state.post.page,
            limit: state => state.post.limit,
            sortOptions: state => state.post.sortOptions,
        }),
        ...mapGetters({
            sortedPosts: 'post/sortedPosts',
            sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
        })
        //Отсюда удалили функции и перенесли в postModule.js в папке store
    },
    // watch: {
    //     page() { // если page изменяется, watch это видит
    //         this.fetchPosts();
    //     }
    // }
    /*
    watch: {
        selectedSort(newValue) {
            this.posts.sort((post1, post2) => { // берет 2 эелемента массива по порядку
                return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]) // функция, с помощью которой мы отсортировываем массив по алфавиту (по title или body)
                // Работает примерно так. Функция localeCompare возвращает число, а то есть индексы, в каком порядке они должны стоять в массиве. ХЗ кароч
            })
        }
    }
    */
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
