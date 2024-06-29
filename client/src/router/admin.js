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
            // account
            {
                path: "account",
                name: "admin.accounts",
                component: () => import("../pages/admin/accounts/AccountList.vue"),
            },
            {
                path: "account/edit/:id",
                name: "admin.accounts.edit",
                component: () => import("../pages/admin/accounts/AccountForm.vue"),
            },
            // supplier
            {
                path: "supplier",
                name: "admin.suppliers",
                component: () => import("../pages/admin/suppliers/SupplierList.vue"),
            },
            {
                path: "supplier/edit/:id",
                name: "admin.suppliers.edit",
                component: () => import("../pages/admin/suppliers/SupplierForm.vue"),
            },
            {
                path: "supplier/create",
                name: "admin.suppliers.create",
                component: () => import("../pages/admin/suppliers/SupplierForm.vue"),
            },
        ]
    }
]

export default admin;