const site = [
    {
        path: "/",
        component: () => import("../layouts/SiteLayout.vue"),
        children: [
            {
                path: "",
                name: "site-home",
                component: () => import("../pages/site/SiteHome.vue"),
            },
        ]
    }
]

export default site;