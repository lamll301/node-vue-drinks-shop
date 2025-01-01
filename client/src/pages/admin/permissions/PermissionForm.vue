<template>
    <AdminContentWrapper :addHeight="50" contentSelector=".admin-content__form">
        <div class="admin-content__heading">
            <h3>Quản lý phân quyền</h3>
        </div>
        <div class="admin-content__form">
            <div class="admin-content__header">
                <h4 v-if="this.$route.params.id">Form sửa phân quyền</h4>
                <h4 v-else>Form thêm phân quyền</h4>
            </div>
            <form @submit.prevent="save()">
            <div class="admin-content__form-body">
                <div v-if="this.$route.params.id" class="mb-16">
                    <h3 class="admin-content__form-text">Mã phân quyền</h3>
                    <div class="valid-elm input-group">
                        <input type="text" class="fs-16 form-control" disabled v-model="permission._id">
                    </div>
                </div>
                <div class="mb-16">
                    <h3 class="admin-content__form-text">Tên phân quyền</h3>
                    <div class="valid-elm input-group">
                        <input type="text" class="fs-16 form-control" placeholder="Nhập tên phân quyền" v-model="permission.name">
                    </div>
                </div>
                <div class="mb-16 height-105">
                    <h3 class="admin-content__form-text">Mô tả</h3>
                    <div class="valid-elm input-group">
                        <textarea class="fs-16 form-control" rows="3" placeholder="Nhập mô tả phân quyền" v-model="permission.description"></textarea>
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
import { swalFire } from '@/helpers/swal.js'
import AdminContentWrapper from '@/components/AdminHeightWrapperComponent.vue'

export default {
    name: 'PermissionForm',
    components: {
        AdminContentWrapper
    },
    data() {
        return {
            permission: {}
        }
    },
    created() {
        let permissionId = this.$route.params.id
        if (permissionId) {
            this.getPermission(permissionId)
        }
    },
    methods: {
        swalFire,
        getPermission(permissionId) {
            this.$request.get(`http://localhost:8080/admin/permission/${permissionId}`).then(res => {
                this.permission = res.data
            })
        },
        save() {
            if (this.permission._id) {
                this.$request.put(`http://localhost:8080/admin/permission/${this.permission._id}`, this.permission).then(() => {
                    this.swalFire("Cập nhật thành công!", "Thông tin về phân quyền đã được cập nhật!", "success")
                    .then(() => {
                        this.$router.push({name: 'admin.permissions'})
                    })
                })
            }
            else {
                this.$request.post('http://localhost:8080/admin/permission/create', this.permission).then(() => {
                    this.swalFire("Thêm thành công!", "Phân quyền mới đã được thêm vào hệ thống!", "success")
                    .then(() => {
                        this.$router.push({name: 'admin.permissions'})
                    })
                })
            }
        },
    }
}
</script>