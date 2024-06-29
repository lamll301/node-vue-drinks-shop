<template>
    <div class="admin-page" style="height: 1500px;">
        <div class="admin-content">
            <div class="admin-content__heading">
                <h3>Quản lý tài khoản</h3>
            </div>
            <!-- admin table -->
            <div class="admin-content__table">
                <div class="admin-content__header">
                    <h4>Tất cả tài khoản</h4>
                </div>
                <table class="table admin-content__table-main">
                    <thead class="admin-content__table-main-head">
                        <tr class="admin-content__table-first-row">
                            <th scope="col">#</th>
                            <th scope="col">Tên tài khoản</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col">Phân quyền</th>
                            <th scope="col" class="col-2"></th>
                        </tr>
                    </thead>
                    <tbody class="admin-content__table-main-body">
                        <tr class="admin-content__table-row" v-for="(account, index) in accounts" :key="index">
                            <th>{{ index + 1 }}</th>
                            <td>{{ account.username }}</td>
                            <td>{{ account.status }}</td>
                            <td>
                                <span v-if="account.permission_id.length > 0">
                                    {{ account.permission_id.map(permission => permission.name).join(', ') }}
                                </span>
                                <span v-else>
                                    Không có quyền
                                </span>
                            </td>
                            <td>
                                <router-link :to="'/admin/account/edit/' + account._id" class="fs-16 btn btn-primary">Sửa</router-link>&nbsp;
                                <button class="fs-16 btn btn-danger" @click="onDelete(account._id)">Xóa</button>
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
    name: 'AccountList',
    data() {
        return {
            accounts: []
        }
    },
    created() {
        this.getAll()
    },
    methods: {
        getAll() {
            this.$request.get('http://localhost:8080/admin/account').then(res => {
                this.accounts = res.data
            })
        },
        onDelete(accountId) {
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
                this.$request.delete(`http://localhost:8080/admin/account/${accountId}`).then(() => {
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