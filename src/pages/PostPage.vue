<template>
    <div>
        <h1>Страница с постами</h1>
        <my-input v-focus v-model="searchQuery" placeholder="Поиск...">
        </my-input>
        <div class="app__btns">
            <my-button @click="showDialog">Создать пост</my-button>
            <my-select :options="sortOptions" v-model="selectedSort"></my-select>
        </div>
        <my-dialog v-model:show="dialogVisible">
            <post-form @create="createPost"/> <!--...и тут мы пишем как мы назвали первую строчку, в даном случае 'create'. Ну и дальше если в PostForm сработала функция и от туда пришли данные сюда-->
        </my-dialog>
        <post-list :posts="sortedAndSearchedPosts" @remove="removePost"/> <!--короткое v-bind:posts--> <!--... и тут вместо @remove подставить то, что указывал в прошлых компонентах и из любого компонента, которого хочешь отправить что то, можно передавать в другие комп.-->
        <div v-intersection="loadMorePosts" class="observer"></div> <!--v-intersection - директива которая подключается в папке directives. v-intersection="{name: 'ULBI TV'}" или v-intersection="someFunct" где уже внутри директивы можем использовать эту функцию и так же динамический изменять ее--> <!--раньше был ref="observer"-->
    <!-- <div class="page__wrapper">
        <div v-for="pageNumber in totalPages" :key="pageNumber" class="page" :class="{
            'current-page': page === pageNumber
        }" @click="changePage(pageNumber)">{{pageNumber}}</div>
    </div> -->
    </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import axios from 'axios';

export default {
    components: { // Указываются дочерние компоненты
        PostList, PostForm
    },
    data() { // Указываются все данные, с которыми мы будем работать в этом компоненте
        return {
            posts: [],
            dialogVisible: false,
            searchQuery: '',
            selectedSort: '',
            totalPages: 0,
            page: 1,
            limit: 10,
            sortOptions: [
                {value: 'title', name: 'По названию'},
                {value: 'body', name: 'По описанию'}
            ]
        }
    },
    methods: { // Место, где находятся функции
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
        async fetchPosts() {
            try {
                const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
                    params: {
                    _page: this.page,
                    _limit: this.limit
                }
            })
                this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
                this.posts = response.data;
            } catch (e) {
                alert('Ошибка')
            }
        },
        async loadMorePosts() {
            try {
                this.page += 1;
                const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
                    params: {
                    _page: this.page,
                    _limit: this.limit
                }
            })
                this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
                this.posts = [...this.posts, ...response.data];
            } catch (e) {
                alert('Ошибка')
            } finally {
            }
        },
        // changePage (pageNumber) {
        //     this.page = pageNumber;
        // }
    },
    mounted() { // Когда компонент монтируется, в конце эта функция сробатывает
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
    computed: {
        sortedPosts() {
            return [...this.posts].sort((post1, post2) => { // берет 2 эелемента массива по порядку
                return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]) // функция, с помощью которой мы отсортировываем массив по алфавиту (по title или body)
                // Работает примерно так. Функция localeCompare возвращает число, а то есть индексы, в каком порядке они должны стоять в массиве. ХЗ кароч
            })
        },
        sortedAndSearchedPosts() {
            return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
        }
    },
    // watch: { // Если какая либо переменная изменяется, то с помощью названиепеременной() { тут мы можем что то сделать }
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
