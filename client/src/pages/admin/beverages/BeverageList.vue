<template>
    <div class="admin-page" style="height: 1500px;">
        <div class="admin-content">
            <div class="admin-content__heading">
                <h3>Quản lý danh mục</h3>
                <router-link to="/admin/beverages/create" class="admin-content__create">Thêm danh mục</router-link>
            </div>
            <!-- admin table -->
            <div class="admin-content__table">
                <div class="admin-content__header">
                    <h4>Active Projects</h4>
                </div>
                <table class="table admin-content__table-main">
                    <thead class="admin-content__table-main-head">
                        <tr class="admin-content__table-first-row">
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">test2</th>
                            <th scope="col">test2</th>
                        </tr>
                    </thead>
                    <tbody class="admin-content__table-main-body">
                        <tr class="admin-content__table-row" v-for="(beverage, index) in beverages" :key="index">
                            <th>{{ index + 1}}</th>
                            <td >
                                <div class="admin-content__table-name-cell">
                                    <div class="admin-content__table-img-cell">
                                        <img src="" alt="">
                                    </div>
                                    <a href="">{{ beverage.name }}</a>
                                </div>
                            </td>
                            <td>@</td>
                            <td>@masdaád</td>
                        </tr>
                    </tbody>
                </table>
                <div class="admin-content__table-footer">
                    <a href="">Xem tất cả</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BeverageList',
    data() {
        return {
            beverages: [
                { name: 'Coffee' },
                { name: 'Tea' },
            ]
        }
    },
    created() {
        console.log('OK')
        this.getAll()
    },
    methods: {
        getAll() {
            this.$request.get('http://localhost:8080/admin').then(res => {
                console.log(res.data)
            })
            // error
            // Network Error
            // AxiosError: Network Error
            //     at XMLHttpRequest.handleError (webpack-internal:///./node_modules/axios/lib/adapters/xhr.js:160:14)
            //     at Axios.request (webpack-internal:///./node_modules/axios/lib/core/Axios.js:54:41)
        }
    }
}
</script>