import { createWebHistory, createRouter } from 'vue-router'
import Main from "@/pages/Main";
import PostPage from "@/pages/PostPage";
import About from "@/pages/About"
import PostIdPage from "@/pages/PostIdPage"
import PostPageWithStore from "@/pages/PostPageWithStore"
import PostPageCompositionApi from "@/pages/PostPageCompositionApi"


const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/posts',
        component: PostPage
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/posts/:id',
        component: PostIdPage
    },
    {
        path: '/store',
        component: PostPageWithStore
    },
    {
        path: '/composition',
        component: PostPageCompositionApi
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router;