<template>
    <div class="admin-page" style="height: 1500px;">
        <div class="admin-content">
            <div class="admin-content__heading">
                <h3>Quản lý danh mục đồ uống</h3>
                <router-link to="/admin/category/create" class="admin-content__create">Thêm DM đồ uống</router-link>
            </div>
            <!-- admin table -->
            <div class="admin-content__table">
                <div class="admin-content__header">
                    <h4>Tất cả danh mục đồ uống</h4>
                </div>
                <table class="table admin-content__table-main">
                    <thead class="admin-content__table-main-head">
                        <tr class="admin-content__table-first-row">
                            <th scope="col">#</th>
                            <th scope="col">Tên</th>
                            <th scope="col">Mô tả</th>
                            <th scope="col">Phân loại theo</th>
                            <th scope="col">Slug</th>
                            <th scope="col" class="col-2"></th>
                        </tr>
                    </thead>
                    <tbody class="admin-content__table-main-body">
                        <tr class="admin-content__table-row" v-for="(category, index) in categories" :key="index">
                            <th>{{ index + 1 }}</th>
                            <td>{{ category.name }}</td>
                            <td>{{ category.description }}</td>
                            <td>{{ category.classify }}</td>
                            <td>{{ category.slug }}</td>
                            <td>
                                <router-link :to="'/admin/category/edit/' + category._id" class="fs-16 btn btn-primary">Sửa</router-link>&nbsp;
                                <button class="fs-16 btn btn-danger" @click="onDelete(category._id)">Xóa</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="admin-content__table-footer">
                    <a href="#">Xem tất cả</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name: 'CategoryList',
    data() {
        return {
            categories: []
        }
    },
    created() {
        this.getAll()
    },
    methods: {
        getAll() {
            this.$request.get('http://localhost:8080/admin/category').then(res => {
                this.categories = res.data
            })
        },
        onDelete(categoryId) {
            this.$swal.fire({
            title: "Bạn chắc chắn?",
            text: "Bạn sẽ không thể khôi phục lại dữ liệu!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Có, tôi muốn xóa!"
            }).then((result) => {
            if (result.isConfirmed) {
                this.$request.delete(`http://localhost:8080/admin/category/${categoryId}`).then(() => {
                    this.$swal.fire({
                    title: "Xóa thành công!",
                    text: "Dữ liệu của bạn đã được xóa.",
                    icon: "success"
                    })
                    .then(() => {
                        this.getAll()
                    })
                })
            }
            });
        }
    }
}
</script>