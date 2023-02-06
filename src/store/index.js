import { createStore } from "vuex";
import { postModule } from "@/store/postModule";

export default createStore({
    // state: { // Место где хранятся все данные. Тут я забыл добавить state: () => ({})
    //     likes: 1,
    //     isAuth: false,
    // },
    // getters: { // getters представляет из себя функции на подобии computed функций
    //     doubleLikes(state) {
    //         return state.likes * 2
    //     }
    // },
    // mutations: { // Позволяет изменять состояние данных
    //     incrementLikes(state) {
    //         return state.likes += 1
    //     },
    //     decrementLikes(state) {
    //         return state.likes -= 1
    //     }
    // },
    // actions: {
        
    // }
    modules: {
        post: postModule
    }
})