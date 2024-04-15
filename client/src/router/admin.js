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
            // beverage
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
            // permission
            {
                path: "permission",
                name: "admin.permissions",
                component: () => import("../pages/admin/permissions/PermissionList.vue"),
            },
            {
                path: "permission/edit/:id",
                name: "admin.permissions.edit",
                component: () => import("../pages/admin/permissions/PermissionForm.vue"),
            },
            {
                path: "permission/create",
                name: "admin.permissions.create",
                component: () => import("../pages/admin/permissions/PermissionForm.vue"),
            },
        ]
    }
]

export default admin;