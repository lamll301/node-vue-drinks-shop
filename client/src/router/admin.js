const admin = [
    {
        path: "/admin",
        component: () => import("../layouts/AdminLayout.vue"),
        children: [
            {
                path: "",
                name: "admin-home",
                component: () => import("../pages/admin/AdminHome.vue"),
            },
            {
                path: "beverages",
                name: "admin-beverages",
                component: () => import("../pages/admin/beverages/BeverageList.vue"),
            },
            {
                path: "beverages/create",
                name: "admin-beverages-create",
                component: () => import("../pages/admin/beverages/BeverageForm.vue"),
            },
        ]
    }
]

export default admin;