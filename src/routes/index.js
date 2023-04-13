import { createRouter, createWebHistory } from 'vue-router'

let routes = [
    {
        path: "/ContentCollapse5",
        name: "ContentCollapse5",
        component: () => import("@/components/ContentCollapse5.vue"),
    },
    {
        path: "/TrelloProjectSelector",
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
        path: "/ContentCollapseView",
        name: "ContentCollapseView",
        component: () => import("@/views/content/ContentCollapseView.vue"),
    },
    {
        path: "/NavigationTreeView",
        name: "NavigationTreeView",
        component: () => import("@/views/content/NavigationTreeView.vue"),
    },
    {
        path: "/CompletedView",
        name: "CompletedView",
        component: () => import("@/views/content/CompletedViewV1.vue"),
    },
    {
        path: "/ParentComponent",
        name: "ParentComponent",
        component: () => import("@/views/content/ParentComponent.vue"),
    },
    {
        path: "/ContentDisplayView",
        name: "ContentDisplayView",
        component: () => import("@/views/content/ContentDisplayView.vue"),
    },
    {
        path: "/Demo",
        name: "Demo",
        component: () => import("@/views/demo/DemoDisplay1.vue"),
    },
    //CollapseExpendDemo.vue
    {
        path: "/CollapseExpendDemo",
        name: "CollapseExpendDemo",
        component: () => import("@/views/demo/CollapseExpendDemo.vue"),//✅正常工作
    },
    //CollapseExpendDemoV2.vue
    {
        path: "/CollapseExpendDemoV2",
        name: "CollapseExpendDemoV2",
        component: () => import("@/views/demo/CollapseExpendDemoV2.vue"),
    },
    {
        path: "/CollapseExpendDemoV3",
        name: "CollapseExpendDemoV3",
        component: () => import("@/views/demo/CollapseExpendDemoV3.vue"),//✅正常工作
    },
    {
        path: "/CollapseExpendDemoV4",
        name: "CollapseExpendDemoV4",
        component: () => import("@/views/demo/CollapseExpendDemoV4.vue"),//✅正常工作
    },
    {
        path: "/ViewList",
        name: "ViewList",
        component: () => import("@/views/demo/ViewList.vue"),//✅正常工作
    },
    {
        path: "/project/:uuid",
        name: "project",
        component: () => import("@/views/ProjectView.vue"),//
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    base: process.env.BASE_URL,
    routes
});

export default router