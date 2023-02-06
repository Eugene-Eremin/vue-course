import axios from "axios"

export const postModule = { // Все кроме состояния (state) - это объект, а состояние это функция, которая этот объъект меняет
    state: () => ({ // так же в state лучше объявлять функцию, можно как обычную так и стрелочную
        posts: [],
        searchQuery: '',
        selectedSort: '',
        totalPages: 0,
        page: 1,
        limit: 10,
        sortOptions: [
            { value: 'title', name: 'По названию' },
            { value: 'body', name: 'По описанию' }
        ]
    }),
    getters: { // перенесли сюда т.к. геттерс работает как computed
        sortedPosts(state) { // и также здесь они принимают состояния || ... - оператор спрэт
            return [...state.posts].sort((post1, post2) => { // берет 2 эелемента массива по порядку
                return post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]) // функция, с помощью которой мы отсортировываем массив по алфавиту (по title или body)
                // Работает примерно так. Функция localeCompare возвращает число, а то есть индексы, в каком порядке они должны стоять в массиве. ХЗ кароч
            })
        },
        sortedAndSearchedPosts(state, getters) { // и данные из вне
            return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
        }
    },
    mutations: { // для дефолтного изменения данных в state на прямую
        setPosts(state, posts) { // параметром мы принимаем само хранилищи и еще какие то данные извне
            state.posts = posts;
        },
        setPage(state, page) {
            state.page = page;
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort;
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages;
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery;
        },
    },
    actions: { // глобальное изменение данных в state
        async fetchPosts({state, commit}) { // actions параметрами в себя принимает некий объект контекст (их несколько 6 шт.). Можно посмотреть в документации
            try {
                const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    }
                })
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit)) // с помощью commit мы изменяем данные
                commit('setPosts', response.data)
            } catch (e) {
                console.log(e)
            }
        },
        async loadMorePosts({state, commit}) {
            try {
                commit('setPage', state.page + 1)
                const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    }
                })
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit));
                commit('setPosts', [...state.posts, ...response.data]);
            } catch (e) {
                console.log(e)
            } finally {
            }
        },
    },
    namespaced: true // Когда приложение разростается то некоторые мутации могут носить одинаковые названия, и поэтому придумали флаги. Например в данном случае чтобы вызвать мутацию тут, нам нужно указать. И для того чтобы сюда что то закомитить нужно будет указать на подобии {{ $store.commit('user/setLoading') }}

}