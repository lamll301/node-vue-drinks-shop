<template>
    <AdminContentWrapper :addHeight="50" contentSelector=".admin-content__form">
        <div class="admin-content__heading">
            <h3>Quản lý tài khoản</h3>
        </div>
        <div class="admin-content__form">
            <div class="admin-content__header">
                <h4 v-if="this.$route.params.id">Form sửa tài khoản</h4>
                <h4 v-else>Form thêm tài khoản</h4>
            </div>
            <form @submit.prevent="save()">
            <div class="admin-content__form-body">
                <div v-if="this.$route.params.id" class="mb-16">
                    <h3 class="admin-content__form-text">Mã tài khoản</h3>
                    <div class="valid-elm input-group">
                        <input type="text" class="fs-16 form-control" disabled v-model="account._id">
                    </div>
                </div>
                <div class="mb-16">
                    <h3 class="admin-content__form-text">Tên tài khoản</h3>
                    <div class="valid-elm input-group">
                        <input type="text" class="fs-16 form-control" :disabled="this.$route.params.id" placeholder="Nhập tên tài khoản" v-model="account.username">
                    </div>
                </div>
                <div class="mb-16">
                    <h3 class="admin-content__form-text">Mật khẩu</h3>
                    <div class="valid-elm input-group">
                        <input type="text" class="fs-16 form-control" placeholder="Nhập mật khẩu" v-model="account.password">
                    </div>
                </div>
                <div v-if="this.$route.params.id" class="mb-16">
                    <h3 class="admin-content__form-text">Avatar</h3>
                </div>
                <div v-if="this.$route.params.id">
                    <div class="admin-content__image-container mr-16 mb-16">
                        <img v-bind:src="getImagePath(account.avatar, 'empty-avatar.webp')" class="img-thumbnail admin-content__image-report" alt="">
                    </div>
                </div>
                <div class="mb-16" v-if="this.$route.params.id">
                    <h3 class="admin-content__form-text">Trạng thái</h3>
                    <select class="valid-elm form-select" v-model="account.status">
                        <option disabled value="">Chọn trạng thái tài khoản</option>
                        <option v-for="(label, value) in statusOptions" :key="value" :value="value">
                            {{ label }}
                        </option>
                    </select>
                </div>
                <div class="mb-16" v-if="this.$route.params.id">
                    <h3 class="admin-content__form-text">Quyền truy cập</h3>
                    <div class="valid-elm input-group mb-4">   
                        <input type="text" class="fs-16 form-control" readonly v-model="account.permissionName">
                    </div>
                    <div class="input-group">
                        <select class="valid-elm form-select" ref="selectedPermission">
                            <option disabled value="">Chọn phân quyền</option>
                            <option v-for="permission in permissions" :key="permission._id" :value="permission._id">
                                {{ permission.name }}
                            </option>
                        </select>
                        <button class="valid-elm btn btn-outline-secondary admin-content__form-btn-with-icon" type="button" @click="add">
                            Thêm
                            <img src="@/assets/img/add.png">
                        </button>
                        <button class="valid-elm btn btn-outline-secondary admin-content__form-btn-with-icon" type="button" @click="remove">
                            Xóa
                            <img src="@/assets/img/trash.png">
                        </button>
                    </div>
                </div>
                <div class="mb-16 admin-content__form-btn">
                    <button type="submit" class="fs-16 btn btn-primary">Xác nhận</button>
                </div>
            </div>
            </form>
        </div>
    </AdminContentWrapper>
</template>

<script>
import { getImagePath, attributeValuesToString, getAttributeFromObjectArray, isExists } from '@/helpers/helpers.js'
import { swalFire, swalMixin } from '@/helpers/swal.js'
import AdminContentWrapper from '@/components/AdminHeightWrapperComponent.vue'

export default {
    name: 'AccountForm',
    components: {
        AdminContentWrapper
    },
    computed: {
        permissionIdArray() {
            return getAttributeFromObjectArray(this.account.permissionId, '_id');
        }
    },
    data() {
        return {
            account: {},
            statusOptions: {},
            permissions: []
        }
    },
    created() {
        this.getAllPermissions()
        let accountId = this.$route.params.id
        if (accountId) {
            this.getAccount(accountId)
        }
    },
    methods: {
        getImagePath, attributeValuesToString, getAttributeFromObjectArray, isExists, swalFire, swalMixin,
        getAccount(accountId) {
            this.$request.get(`http://localhost:8080/admin/account/${accountId}`).then(res => {
                this.account = res.data.account
                this.statusOptions = res.data.ACCOUNT_STATUS_OPTIONS
                this.account.permissionName = attributeValuesToString(this.account.permissionId, 'name')
            })
        },
        getAllPermissions() {
            this.$request.get('http://localhost:8080/admin/permission/all').then(res => {
                this.permissions = res.data
            })
        },
        save() {
            if (this.account._id) {
                let selectedPermissionId = parseInt(this.$refs.selectedPermission.value)
                if (!isExists(this.permissionIdArray, selectedPermissionId)) this.account.selectedPermissionId = selectedPermissionId
                else delete this.account.selectedPermissionId
                
                this.$request.put(`http://localhost:8080/admin/account/${this.account._id}`, this.account).then(() => {
                    this.swalFire("Cập nhật thành công!", "Thông tin về tài khoản đã được cập nhật!", "success")
                    .then(() => {
                        this.$router.push({name: 'admin.accounts'})
                    })
                })
            }
            else {
                this.$request.post('http://localhost:8080/admin/account/create', this.account).then(() => {
                    this.swalFire("Thêm thành công!", "Tài khoản mới đã được thêm vào hệ thống!", "success")
                    .then(() => {
                        this.$router.push({name: 'admin.accounts'})
                    })
                })
            }
        },
        add() {
            let selectedPermissionId = parseInt(this.$refs.selectedPermission.value)
            if (isExists(this.permissionIdArray, selectedPermissionId)) {
                this.swalMixin('error', 'Phân quyền này đã có trong tài khoản!')
                return
            }
            this.$request.patch(`http://localhost:8080/admin/account/${this.account._id}/addPermission`, {
                selectedPermissionId: selectedPermissionId
            }).then(() => {
                this.swalFire("Thêm thành công!", "Phân quyền đã được thêm vào tài khoản!", "success")
                .then(() => {
                    this.getAccount(this.account._id)
                })
            })
        },
        remove() {
            let selectedPermissionId = parseInt(this.$refs.selectedPermission.value)
            if (!isExists(this.permissionIdArray, selectedPermissionId)) {
                this.swalMixin('error', 'Phân quyền này không có trong tài khoản!')
                return
            }
            this.$request.patch(`http://localhost:8080/admin/account/${this.account._id}/removePermission`, {
                selectedPermissionId: selectedPermissionId
            }).then(() => {
                this.swalFire("Xóa thành công!", "Phân quyền đã được xóa khỏi tài khoản!", "success")
                .then(() => {
                    this.getAccount(this.account._id)
                })
            })
        }
    }
}
</script>