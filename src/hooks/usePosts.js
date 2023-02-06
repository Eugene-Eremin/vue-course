import axios from "axios";
import {ref, onMounted} from "vue";

// Таким образом CompositionAPI позволяет нам сделать декомпозитию кода и в этом файле мы отдельно создали переменные и паработали с этими данными в функции

export default function usePosts(limit) {
    const posts = ref([]) // ref получает что то из вне. 
    const totalPages = ref(0)
    const fetching = async () => {
        try {
            const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
                params: {
                    _page: 1,
                    _limit: limit
                }
            })
            totalPages.value = Math.ceil(response.headers['x-total-count'] / limit)
            posts.value = response.data;
        } catch (e) {
            alert('Ошибка')
        }
    }    

    onMounted(fetching) // Указали когда компонент монтируется то это функция сразу должна отрабатывать
    
    return { // и тут вернули отработанные данные
        posts, totalPages
    }
}