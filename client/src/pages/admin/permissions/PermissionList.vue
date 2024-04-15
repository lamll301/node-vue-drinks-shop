<template>
    <div class="admin-page" style="height: 1500px;">
        <div class="admin-content">
            <div class="admin-content__heading">
                <h3>Quản lý phân quyền</h3>
                <router-link to="/admin/permission/create" class="admin-content__create">Thêm phân quyền</router-link>
            </div>
            <!-- admin table -->
            <div class="admin-content__table">
                <div class="admin-content__header">
                    <h4>Tất cả phân quyền</h4>
                </div>
                <table class="table admin-content__table-main">
                    <thead class="admin-content__table-main-head">
                        <tr class="admin-content__table-first-row">
                            <th scope="col">#</th>
                            <th scope="col">Tên</th>
                            <th scope="col">Mô tả</th>
                            <th scope="col" class="col-2"></th>
                        </tr>
                    </thead>
                    <tbody class="admin-content__table-main-body">
                        <tr class="admin-content__table-row" v-for="(permission, index) in permissions" :key="index">
                            <th>{{ index + 1 }}</th>
                            <td>{{ permission.name }}</td>
                            <td>{{ permission.description }}</td>
                            <td>
                                <router-link :to="'/admin/permission/edit/' + permission._id" class="fs-16 btn btn-primary">Sửa</router-link>&nbsp;
                                <button class="fs-16 btn btn-danger" @click="onDelete(permission._id)">Xóa</button>
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
    name: 'PermissionList',
    data() {
        return {
            permissions: []
        }
    },
    created() {
        this.getAll()
    },
    methods: {
        getAll() {
            this.$request.get('http://localhost:8080/admin/permission').then(res => {
                this.permissions = res.data
            })
        },
        onDelete(permissionId) {
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
                this.$request.delete(`http://localhost:8080/admin/permission/${permissionId}`).then(() => {
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