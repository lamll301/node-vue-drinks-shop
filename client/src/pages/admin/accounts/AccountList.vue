<template>
    <AdminHeightWrapperComponent :addHeight="100" contentSelector=".admin-content__table">
        <div class="admin-content__heading">
            <h3>Quản lý tài khoản</h3>
            <router-link to="/admin/account/create" class="admin-content__create">Thêm tài khoản</router-link>
        </div>
        <!-- admin table -->
        <div class="admin-content__table">
            <div class="admin-content__header d-flex align-items-center">
                <h4>Tất cả tài khoản</h4>
                <select id="selectCheckboxAction" class="form-select admin-content__checkbox-select-all-opts" @change="renderSelectChange">
                    <option value="" selected>-- Hành động --</option>
                    <option value="delete">Xóa</option>
                    <option value="addPermission">Thêm phân quyền</option>
                    <option value="removePermission">Xóa phân quyền</option>
                    <option value="filterByPermission">Lọc theo phân quyền</option>
                    <option value="filterByStatus">Lọc theo trạng thái</option>
                </select>
                <select id="selectedPermissionId" class="form-select admin-content__select-permission">
                    <option value="" selected>-- Chọn phân quyền --</option>
                    <option v-for="permission in permissions" :key="permission._id" :value="permission._id">
                        {{ permission.name }}
                    </option>
                </select>
                <select id="selectedStatus" class="form-select admin-content__select-status">
                    <option value="" selected>-- Chọn trạng thái --</option>
                    <option v-for="(label, value) in statusOptions" :key="value" :value="value">
                        {{ label }}
                    </option>
                </select>
                <button class="fs-16 btn btn-primary disabled" id="btnCheckboxSubmit" @click="btnCheckboxSubmitClicked()">Thực hiện</button>
            </div>
            <table class="table admin-content__table-main">
                <thead class="admin-content__table-main-head">
                    <tr class="admin-content__table-first-row">
                        <th scope="col">
                            <input class="form-check-input admin-content__checkbox" type="checkbox" ref="checkboxAll" @change="onCheckboxAllChange($event)">
                        </th>
                        <th scope="col">ID
                            <SortComponent field="_id" :sort="sort"/>
                        </th>
                        <th scope="col">Tên tài khoản
                            <SortComponent field="username" :sort="sort"/>
                        </th>
                        <th scope="col">Phân quyền
                            <SortComponent field="permissionId" :sort="sort"/>
                        </th>
                        <th scope="col">Ngày tạo
                            <SortComponent field="createdAt" :sort="sort"/>
                        </th>
                        <th scope="col">Ngày cập nhật
                            <SortComponent field="updatedAt" :sort="sort"/>
                        </th>
                        <th scope="col">Trạng thái
                            <SortComponent field="status" :sort="sort"/>
                        </th>
                        <th scope="col" class="col-2"></th>
                    </tr>
                </thead>
                <tbody class="admin-content__table-main-body">
                    <template v-if="accounts.length > 0">
                        <tr class="admin-content__table-row" v-for="account in accounts" :key="account._id">
                            <th>
                                <input class="form-check-input" type="checkbox" ref="checkboxes" :value="account._id" @change="onCheckboxChange()">
                            </th>
                            <th>{{ account._id }}</th>
                            <td>{{ account.username }}</td>
                            <td>{{ attributeValuesToString(account.permissionId, 'name') }}</td>
                            <td>{{ convertDate(account.createdAt) }}</td>
                            <td>{{ convertDate(account.updatedAt) }}</td>
                            <td>{{ statusOptions[account.status] || account.status }}</td>
                            <td>
                                <router-link :to="'/admin/account/edit/' + account._id" class="fs-16 btn btn-primary">Sửa</router-link>&nbsp;
                                <button class="fs-16 btn btn-danger" @click="onDelete(account._id)">Xóa</button>
                            </td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr>
                            <td colspan="9" class="text-center">
                                Bạn chưa có tài khoản nào.
                                <router-link to="">Thêm tài khoản</router-link>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
            <div class="admin-content__table-footer">
                <router-link to="/admin/account/trash">Thùng rác
                    <i class="fa-solid fa-trash admin-content__trash"></i>
                </router-link>
                <span class="header__notice admin-content__trash-notice">{{ deletedCount }}</span>
            </div>
        </div>
        <PaginationComponent :totalPages="totalPages" :currentPage="currentPage"/>
    </AdminHeightWrapperComponent>
</template>

<script>
/* eslint-disable */
import { convertDate, attributeValuesToString } from '@/helpers/helpers.js'
import { swalMixin, swalFire } from '@/helpers/swal.js'
import PaginationComponent from '@/components/PaginationComponent.vue'
import AdminHeightWrapperComponent from '@/components/AdminHeightWrapperComponent.vue'
import SortComponent from '@/components/SortComponent.vue'

export default {
    name: 'AccountList',
    data() {
        return {
            accounts: [],
            permissions: [],
            deletedCount: 0,
            totalPages: 0,
            sort: {},
            currentPage: 1,
            accountIds: [],
            statusOptions: {},
        }
    },
    components: {
        PaginationComponent,
        AdminHeightWrapperComponent,
        SortComponent
    },
    watch: {
        '$route.query': 'getAll',
    },
    created() {
        this.getAll()
        this.getAllPermissions()
    },
    methods: {
        convertDate, attributeValuesToString, swalMixin, swalFire,
        getAll() {
            const params = new URLSearchParams(this.$route.query).toString()
            this.$request.get(`http://localhost:8080/admin/account?${params}`).then(res => {
                this.accounts = res.data.accounts
                this.totalPages = res.data.totalPages
                this.deletedCount = res.data.deletedCount
                this.sort = res.data._sort
                this.statusOptions = res.data.ACCOUNT_STATUS_OPTIONS
                this.currentPage = parseInt(this.$route.query.page) || 1
            })
        },
        getAllPermissions() {
            this.$request.get('http://localhost:8080/admin/permission/all').then(res => {
                this.permissions = res.data
            })
        },
        onDelete(accountId) {
            this.$swal.fire({
            title: "Bạn chắc chắn?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Có, tôi muốn xóa!"
            }).then((result) => {
            if (result.isConfirmed) {
                this.$request.delete(`http://localhost:8080/admin/account/${accountId}`).then(() => {
                    this.swalFire("Xóa tài khoản thành công!", "Tài khoản đã được xóa khỏi hệ thống.", "success")
                    .then(() => {
                        this.getAll()
                    })
                })
            }
            });
        },
        btnCheckboxSubmitClicked() {
            let selectedCheckboxAction = document.getElementById('selectCheckboxAction').value
            let selectedPermissionId = document.getElementById('selectedPermissionId').value
            let selectedStatus = document.getElementById('selectedStatus').value
            if (!selectedCheckboxAction) {
                this.swalMixin('error', 'Vui lòng chọn hành động trước khi thực hiện!')
                return
            }
            if ((selectedCheckboxAction === 'addPermission' || selectedCheckboxAction === 'removePermission' 
                || selectedCheckboxAction === 'filterByPermission') && !selectedPermissionId) {
                this.swalMixin('error', 'Vui lòng chọn phân quyền trước khi thực hiện!')
                return
            }
            if (selectedCheckboxAction === 'filterByStatus' && !selectedStatus) {
                this.swalMixin('error', 'Vui lòng chọn trạng thái trước khi thực hiện!');
                return;
            }
            if (selectedCheckboxAction === 'filterByPermission' || selectedCheckboxAction === 'filterByStatus') {
                const params = new URLSearchParams(this.$route.query)
                let filterId
                switch (selectedCheckboxAction) {
                    case 'filterByPermission':
                        filterId = selectedPermissionId
                        break
                    case 'filterByStatus':
                        filterId = selectedStatus
                        break
                    default:
                        break
                }
                if (selectedCheckboxAction && filterId) {
                    params.set('action', selectedCheckboxAction)
                    params.set('filterId', filterId)
                } else {
                    params.delete('action')
                    params.delete('filterId')
                }
                this.$router.push(this.$route.path + '?' + params.toString())
            }
            else {
                this.$request.post(`http://localhost:8080/admin/account/handle-form-actions`, {
                    action: selectedCheckboxAction,
                    accountIds: this.accountIds,
                    selectedPermissionId: selectedPermissionId
                })
                .then(() => {
                    this.swalFire("Thực hiện thành công!!", "Hành động của bạn đã được thực hiện thành công!", "success")
                    .then(() => {
                        this.getAll()
                        this.$refs.checkboxAll.checked = false
                    })
                })
            }
        },
        onCheckboxAllChange(event) {
            let checkboxes = this.$refs.checkboxes
            if (!checkboxes) return
            let isChecked = event.target.checked
            checkboxes.forEach(checkbox => {
                checkbox.checked = isChecked;
            })
            let checkedCount = this.countCheckboxChecked()
            this.renderBtnCheckboxSubmit(checkedCount)
        },
        onCheckboxChange() {
            let checkedCount = this.countCheckboxChecked()
            let isCheckedAll = checkedCount === this.$refs.checkboxes.length
            this.$refs.checkboxAll.checked = isCheckedAll
            this.renderBtnCheckboxSubmit(checkedCount)
        },
        countCheckboxChecked() {
            let checkboxes = this.$refs.checkboxes
            if (!checkboxes) return 0
            let i = 0
            this.accountIds = []
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    i++
                    this.accountIds.push(checkbox.value)
                }
            })
            return i
        },
        renderBtnCheckboxSubmit(checkedCount) {
            let btnCheckboxSubmit = document.getElementById('btnCheckboxSubmit')
            let selectedCheckboxAction = document.getElementById('selectCheckboxAction').value
            if (checkedCount > 0) {
                btnCheckboxSubmit.classList.remove('disabled')
            }
            else if (selectedCheckboxAction !== 'filterByPermission' && selectedCheckboxAction !== 'filterByStatus') {
                btnCheckboxSubmit.classList.add('disabled')
            }
        },
        renderSelectChange() {
            let selectedCheckboxAction = document.getElementById('selectCheckboxAction').value
            let btnCheckboxSubmit = document.getElementById('btnCheckboxSubmit')
            let checkedCount = this.countCheckboxChecked()
            if (selectedCheckboxAction === 'filterByPermission' || selectedCheckboxAction === 'filterByStatus') {
                btnCheckboxSubmit.classList.remove('disabled')
            }
            else if (checkedCount === 0) btnCheckboxSubmit.classList.add('disabled')
        }
    }
}
</script>