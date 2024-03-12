const admin = [
    {
        path: "/admin",
        component: () => import("../layouts/AdminLayout.vue"),
        children: [
            {
                path: "",
                name: "admin.home",
                component: () => import("../pages/admin/AdminHome.vue"),
            },
            {
                path: "beverage",
                name: "admin.beverages",
                component: () => import("../pages/admin/beverages/BeverageList.vue"),
            },
            {
                path: "beverage/create",
                name: "admin.beverages.create",
                component: () => import("../pages/admin/beverages/BeverageForm.vue"),
            },
            {
                path: "beverage/edit/:id",
                name: "admin.beverages.edit",
                component: () => import("../pages/admin/beverages/BeverageForm.vue"),
            },
        ]
    }
]

export default admin;