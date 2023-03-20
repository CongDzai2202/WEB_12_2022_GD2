import {createRouter,createWebHistory} from 'vue-router'
import MRestHome from "./views/MRestHome"
import MRestDetail from "./views/MRestDetail"
import MNotFound from "./views/M404"
const routes = [
    {
        path: "/",
        name: "RestHome",
        component: MRestHome,
    },
    {
        path: "/RestDetail",
        name: "RestDetailAdd",
        component: MRestDetail,
    },
    {
        path: "/RestDetail/:id",
        component: MRestDetail,
    },
    {
        path: "/test",
        redirect: "/",
    },
    {
        path: "/:pathMatch(.*)*",
        component: MNotFound,
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router;