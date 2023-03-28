import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: "/ContentCollapse5",
        name: "ContentCollapse5",
        component: () => import("@/components/ContentCollapse5.vue"),
    },
    {
        path: "/",
        name: "Home",
        component: () => import("@/views/TrelloProjectSelector.vue"),
    },
    {
        path: "/ContentV1",
        name: "Home1",
        component: () => import("@/views/content/ContentV1.vue"),
    },
    {
        path: "/ContentV2",
        name: "ContentV2",
        component: () => import("@/views/content/ContentV2.vue"),
    },
    {
        path: "/ContentV3",
        name: "ContentV3",
        component: () => import("@/views/content/ContentV3.vue"),
    },
    {
        path: "/ContentV4",
        name: "ContentV4",
        component: () => import("@/views/content/ContentV4.vue"),
    },
    {
        path: "/ContentCollapse6View",
        name: "ContentCollapse6View",
        component: () => import("@/views/content/ContentCollapse6View.vue"),
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    base: process.env.BASE_URL,
    routes
});

export default router