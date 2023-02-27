import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "login",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/user/login.vue"),
  },
  {
    path: "/main",
    name: "main",
    component: () => import("../views/layout/index.vue"),
    children: [
      {
        path: "/main",
        name: "main",
        component: () => import("../views/resource/resourceQuery.vue"),
      },
    ],
  },
  // ,
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
