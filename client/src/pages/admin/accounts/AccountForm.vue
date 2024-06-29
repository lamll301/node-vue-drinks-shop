<template>
    <div class="admin-page" style="height: 800px;">
        <div class="admin-content">
            <div class="admin-content__heading">
                <h3>Quản lý tài khoản</h3>
            </div>
            <img src="">
            <!-- admin form -->
            <div class="admin-content__form">
                <div class="admin-content__header">
                    <h4>Form sửa tài khoản</h4>
                </div>
                <form @submit.prevent="save()">
                <div class="admin-content__form-body">
                    <div class="mb-16">
                        <h3 class="admin-content__form-text">Mã tài khoản</h3>
                        <div class="valid-elm input-group">
                            <input type="text" class="fs-16 form-control" disabled v-model="account._id">
                        </div>
                    </div>
                    <div class="mb-16">
                        <h3 class="admin-content__form-text">Tên tài khoản</h3>
                        <div class="valid-elm input-group">
                            <input type="text" class="fs-16 form-control" disabled v-model="account.username">
                        </div>
                    </div>
                    <div class="mb-16">
                        <h3 class="admin-content__form-text">Mật khẩu</h3>
                        <div class="valid-elm input-group">
                            <input type="text" class="fs-16 form-control" placeholder="Nhập mật khẩu" v-model="account.password">
                        </div>
                    </div>
                    <div class="mb-16">
                        <h3 class="admin-content__form-text">Quyền truy cập</h3>
                        <div class="valid-elm input-group">
                            <input type="text" class="fs-16 form-control" disabled :value="getAccountPermissionName()" ref="accountPermission">
                        </div>
                        <div class="input-group">
                            <select class="valid-elm form-select mt-4" ref="selectedPermission">
                                <option disabled value="">Chọn phân quyền</option>
                                <option v-for="permission in permissions" :key="permission._id">
                                    {{ permission.name }}
                                </option>
                            </select>
                            <button class="valid-elm mt-4 btn btn-outline-secondary" type="button" @click="addPermission">Thêm</button>
                            <button class="valid-elm mt-4 btn btn-outline-secondary" type="button" @click="removePermission">Xóa</button>
                        </div>
                    </div>
                    <div class="mb-16">
                        <h3 class="admin-content__form-text">Ngày tạo tài khoản</h3>
                        <div class="valid-elm input-group">
                            <input type="text" class="fs-16 form-control" disabled v-model="account.createdAt">
                        </div>
                    </div>
                    <div class="mb-16">
                        <h3 class="admin-content__form-text">Ngày cập nhật gần nhất</h3>
                        <div class="valid-elm input-group">
                            <input type="text" class="fs-16 form-control" disabled v-model="account.updatedAt">
                        </div>
                    </div>
                    <div class="mb-16">
                        <h3 class="admin-content__form-text">Trạng thái tài khoản</h3>
                        <select class="valid-elm form-select" v-model="account.status">
                            <option disabled value="">Chọn trạng thái tài khoản</option>
                            <option>Hoạt động</option>
                            <option>Bị khóa</option>
                            <option>Bị đình chỉ</option>
                        </select>
                    </div>
                    <div class="mb-16 admin-content__form-btn">
                        <button type="submit" class="fs-16 btn btn-primary">Lưu thay đổi</button>
                    </div>
                </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AccountForm',
    data() {
        return {
            account: {},
            permissions: [],
        }
    },
    created() {
        let accountId = this.$route.params.id
        if (accountId) {
            this.getAccount(accountId)
        }
        this.getAllPermissions()
    },
    methods: {
        getAccount(accountId) {
            this.$request.get(`http://localhost:8080/admin/account/${accountId}`).then(res => {
                this.account = res.data
            })
        },
        save() {
            let permissionId = this.account.permission_id.map(permission => permission._id)
            this.account.permission_id = permissionId
            // sửa
            this.$request.put(`http://localhost:8080/admin/account/${this.account._id}`, this.account).then(() => {
                this.$swal.fire({
                title: "Sửa thành công!",
                text: "Dữ liệu của bạn đã được chỉnh sửa!",
                icon: "success"
                }).then(() => {
                    this.$router.push({name: 'admin.accounts'})
                })
            })
        },
        getAccountPermissionName() {
            if (this.account.permission_id) {
                let allHaveName = this.account.permission_id.every(permission =>
                    permission.name !== undefined && permission.name !== null
                );
                if (allHaveName) {
                    return this.account.permission_id.map(permission => permission.name).join(', ');
                }
                else {
                    // thay vì để trống sẽ tiến hành tìm trong permissions lấy ra name và join
                    let permissionName = this.account.permission_id.map(id => {
                        let permission = this.permissions.find(permission => permission._id === id);
                        return permission ? permission.name : '';
                    }).filter(name => name);
                    return permissionName.join(', ');
                }
            }
        },
        getAllPermissions() {
            this.$request.get('http://localhost:8080/admin/permission').then(res => {
                this.permissions = res.data
            })
        },
        addPermission() {
            let selectedPermissionName = this.$refs.selectedPermission.value;
            let selectedPermission = this.permissions.find(permission => permission.name === selectedPermissionName);
            let selectedPermissionId = selectedPermission ? selectedPermission._id : null;
            if (selectedPermissionId) {
                // kiểm tra có tồn tại permission trong permission_id nếu chưa có tiến hành thêm
                let existingPermission = this.account.permission_id.find(permission => permission._id === selectedPermissionId);
                if (!existingPermission) {
                    let newPermission = {
                        _id: selectedPermissionId,
                        name: selectedPermissionName
                    }
                    // sau khi thêm mặc định hiển thị lên thẻ input luôn do getAccountPermissionName luôn được gọi
                    this.account.permission_id.push(newPermission)
                }
            }
        },
        removePermission() {
            let selectedPermissionName = this.$refs.selectedPermission.value;
            let selectedPermission = this.permissions.find(permission => permission.name === selectedPermissionName);
            let selectedPermissionId = selectedPermission ? selectedPermission._id : null;
            if (selectedPermissionId) {
                this.account.permission_id = this.account.permission_id.filter(permission => permission._id !== selectedPermissionId);
            }
        },
    }
}
</script>