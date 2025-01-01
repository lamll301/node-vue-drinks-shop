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
                path: "beverage/trash",
                name: "admin.beverages.trash",
                component: () => import("../pages/admin/beverages/BeverageTrash.vue"),
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
            // beverage ingredient
            {
                path: "beverageIngredient/create",
                name: "admin.beverageIngredients.create",
                component: () => import("../pages/admin/beverages/BeverageIngredientForm.vue"),
            },
            {
                path: "beverageIngredient/edit/:id",
                name: "admin.beverageIngredients.edit",
                component: () => import("../pages/admin/beverages/BeverageIngredientForm.vue"),
            },
            // ingredient
            {
                path: "ingredient",
                name: "admin.ingredients",
                component: () => import("../pages/admin/ingredients/IngredientList.vue"),
            },
            {
                path: "ingredient/trash",
                name: "admin.ingredients.trash",
                component: () => import("../pages/admin/ingredients/IngredientTrash.vue"),
            },
            {
                path: "ingredient/edit/:id",
                name: "admin.ingredients.edit",
                component: () => import("../pages/admin/ingredients/IngredientForm.vue"),
            },
            {
                path: "ingredient/create",
                name: "admin.ingredients.create",
                component: () => import("../pages/admin/ingredients/IngredientForm.vue"),
            },
            // promotion
            {
                path: "promotion",
                name: "admin.promotions",
                component: () => import("../pages/admin/promotions/PromotionList.vue"),
            },
            {
                path: "promotion/trash",
                name: "admin.promotions.trash",
                component: () => import("../pages/admin/promotions/PromotionTrash.vue"),
            },
            {
                path: "promotion/edit/:id",
                name: "admin.promotions.edit",
                component: () => import("../pages/admin/promotions/PromotionForm.vue"),
            },
            {
                path: "promotion/create",
                name: "admin.promotions.create",
                component: () => import("../pages/admin/promotions/PromotionForm.vue"),
            },
            // unit
            {
                path: "unit",
                name: "admin.units",
                component: () => import("../pages/admin/units/UnitList.vue"),
            },
            {
                path: "unit/trash",
                name: "admin.units.trash",
                component: () => import("../pages/admin/units/UnitTrash.vue"),
            },
            {
                path: "unit/edit/:id",
                name: "admin.units.edit",
                component: () => import("../pages/admin/units/UnitForm.vue"),
            },
            {
                path: "unit/create",
                name: "admin.units.create",
                component: () => import("../pages/admin/units/UnitForm.vue"),
            },
            // permission
            {
                path: "permission",
                name: "admin.permissions",
                component: () => import("../pages/admin/permissions/PermissionList.vue"),
            },
            {
                path: "permission/trash",
                name: "admin.permissions.trash",
                component: () => import("../pages/admin/permissions/PermissionTrash.vue"),
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
                path: "account/trash",
                name: "admin.accounts.trash",
                component: () => import("../pages/admin/accounts/AccountTrash.vue"),
            },
            {
                path: "account/edit/:id",
                name: "admin.accounts.edit",
                component: () => import("../pages/admin/accounts/AccountForm.vue"),
            },
            {
                path: "account/create",
                name: "admin.accounts.create",
                component: () => import("../pages/admin/accounts/AccountForm.vue"),
            },
            // supplier
            {
                path: "supplier",
                name: "admin.suppliers",
                component: () => import("../pages/admin/suppliers/SupplierList.vue"),
            },
            {
                path: "supplier/trash",
                name: "admin.suppliers.trash",
                component: () => import("../pages/admin/suppliers/SupplierTrash.vue"),
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
            // category
            {
                path: "category",
                name: "admin.categories",
                component: () => import("../pages/admin/categories/CategoryList.vue"),
            },
            {
                path: "category/trash",
                name: "admin.categories.trash",
                component: () => import("../pages/admin/categories/CategoryTrash.vue"),
            },
            {
                path: "category/edit/:id",
                name: "admin.categories.edit",
                component: () => import("../pages/admin/categories/CategoryForm.vue"),
            },
            {
                path: "category/create",
                name: "admin.categories.create",
                component: () => import("../pages/admin/categories/CategoryForm.vue"),
            },
            // report
            {
                path: "report",
                name: "admin.reports",
                component: () => import("../pages/admin/reports/ReportList.vue"),
            },
            {
                path: "report/trash",
                name: "admin.reports.trash",
                component: () => import("../pages/admin/reports/ReportTrash.vue"),
            },
            {
                path: "report/edit/:id",
                name: "admin.reports.edit",
                component: () => import("../pages/admin/reports/ReportForm.vue"),
            },
            {
                path: "report/create",
                name: "admin.reports.create",
                component: () => import("../pages/admin/reports/ReportForm.vue"),
            },
            // order
            {
                path: "order",
                name: "admin.orders",
                component: () => import("../pages/admin/orders/OrderList.vue"),
            },
            {
                path: "order/trash",
                name: "admin.orders.trash",
                component: () => import("../pages/admin/orders/OrderTrash.vue"),
            },
            {
                path: "order/edit/:id",
                name: "admin.orders.edit",
                component: () => import("../pages/admin/orders/OrderForm.vue"),
            },
            // customer
            {
                path: "customer",
                name: "admin.customers",
                component: () => import("../pages/admin/customers/CustomerList.vue"),
            },
            {
                path: "customer/trash",
                name: "admin.customers.trash",
                component: () => import("../pages/admin/customers/CustomerTrash.vue"),
            },
            // voucher
            {
                path: "voucher",
                name: "admin.vouchers",
                component: () => import("../pages/admin/vouchers/VoucherList.vue"),
            },
            {
                path: "voucher/trash",
                name: "admin.vouchers.trash",
                component: () => import("../pages/admin/vouchers/VoucherTrash.vue"),
            },
            {
                path: "voucher/edit/:id",
                name: "admin.vouchers.edit",
                component: () => import("../pages/admin/vouchers/VoucherForm.vue"),
            },
            {
                path: "voucher/create",
                name: "admin.vouchers.create",
                component: () => import("../pages/admin/vouchers/VoucherForm.vue"),
            },
        ]
    }
]

export default admin;