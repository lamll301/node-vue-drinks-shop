<template>
    <AdminHeightWrapperComponent :addHeight="100" contentSelector=".admin-content__table">
        <div class="admin-content__heading">
            <h3>Quản lý thùng rác</h3>
            <router-link to="/admin/supplier/create" class="admin-content__create">Thêm nhà cung cấp</router-link>
        </div>
        <!-- admin table -->
        <div class="admin-content__table">
            <div class="admin-content__header d-flex align-items-center">
                <h4>Nhà cung cấp đã xóa</h4>
                <select id="selectCheckboxAction" class="form-select admin-content__checkbox-select-all-opts">
                    <option value="" selected>-- Hành động --</option>
                    <option value="forceDelete">Xóa vĩnh viễn</option>
                    <option value="restore">Khôi phục</option>
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
                        <th scope="col">Tên
                            <SortComponent field="name" :sort="sort"/>
                        </th>
                        <th scope="col">Địa chỉ
                            <SortComponent field="address" :sort="sort"/>
                        </th>
                        <th scope="col">Số điện thoại
                            <SortComponent field="phone" :sort="sort"/>
                        </th>
                        <th scope="col">Email
                            <SortComponent field="email" :sort="sort"/>
                        </th>
                        <th scope="col">Ngày xóa
                            <SortComponent field="deletedAt" :sort="sort"/>
                        </th>
                        <th scope="col" class="col-3"></th> 
                    </tr>
                </thead>
                <tbody class="admin-content__table-main-body">
                    <template v-if="suppliers.length > 0">
                        <tr class="admin-content__table-row" v-for="supplier in suppliers" :key="supplier._id">
                            <th>
                                <input class="form-check-input" type="checkbox" ref="checkboxes" :value="supplier._id" @change="onCheckboxChange()">
                            </th>
                            <th>{{ supplier._id }}</th>
                            <td>{{ supplier.name }}</td>
                            <td>{{ supplier.address }}</td>
                            <td>{{ supplier.phone }}</td>
                            <td>{{ supplier.email }}</td>
                            <td>{{ convertDate(supplier.deletedAt) }}</td>
                            <td>
                                <button class="fs-16 btn btn-primary" @click="onRestore(supplier._id)">Khôi phục</button>&nbsp;
                                <button class="fs-16 btn btn-danger" @click="onDelete(supplier._id)">Xóa vĩnh viễn</button>
                            </td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr>
                            <td colspan="8" class="text-center">
                                Thùng rác trống.
                                <router-link to="/admin/supplier">Danh sách nhà cung cấp</router-link>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
            <div class="admin-content__table-footer"></div>
        </div>
        <PaginationComponent :totalPages="totalPages" :currentPage="currentPage"/>
    </AdminHeightWrapperComponent>
</template>

<script>
/* eslint-disable */
import { convertDate } from '@/helpers/helpers.js'
import PaginationComponent from '@/components/PaginationComponent.vue'
import AdminHeightWrapperComponent from '@/components/AdminHeightWrapperComponent.vue'
import SortComponent from '@/components/SortComponent.vue'

export default {
    name: 'SupplierTrash',
    components: {
        PaginationComponent,
        AdminHeightWrapperComponent,
        SortComponent
    },
    watch: {
        '$route.query': 'getAll',
    },
    data() {
        return {
            suppliers: [],    // data
            totalPages: 0,
            sort: {},
            supplierIds: [],  // var
            currentPage: 1
        }
    },
    created() {
        this.getAll()
    },
    methods: {
        convertDate,
        getAll() {
            const params = new URLSearchParams(this.$route.query).toString()
            this.$request.get(`http://localhost:8080/admin/supplier/trash?${params}`).then(res => {
                this.suppliers = res.data.suppliers
                this.totalPages = res.data.totalPages
                this.sort = res.data._sort
                this.currentPage = parseInt(this.$route.query.page) || 1
            })
        },
        onDelete(supplierId) {
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
                this.$request.delete(`http://localhost:8080/admin/supplier/${supplierId}/force`).then(() => {
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
        },
        onRestore(supplierId) {
            this.$request.patch(`http://localhost:8080/admin/supplier/${supplierId}/restore`).then(() => {
                this.$swal.fire({
                title: "Khôi phục thành công!",
                text: "Dữ liệu của bạn đã được khôi phục!",
                icon: "success"
                }).then(() => {
                    this.getAll()
                })
            })
        },
        handleTag(array) {      // chuyển string[] => string
            if (Array.isArray(array)) {
                return array.join(', ')
            }
            return ''
        },
        handleDate(dateString) {
            return dateString.split('T')[0]
        },
        // checkbox
        onCheckboxAllChange(event) {
            let isChecked = event.target.checked
            let checkboxes = this.$refs.checkboxes
            if (!checkboxes) return
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
            this.supplierIds = []
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    i++
                    this.supplierIds.push(checkbox.value)
                }
            })
            return i
        },
        renderBtnCheckboxSubmit(checkedCount) {
            let btnCheckboxSubmit = document.getElementById('btnCheckboxSubmit')
            if (checkedCount > 0) {
                btnCheckboxSubmit.classList.remove('disabled')
            }
            else btnCheckboxSubmit.classList.add('disabled')
        },
        btnCheckboxSubmitClicked() {
            let selectedCheckboxAction = document.getElementById('selectCheckboxAction').value
            if (!selectedCheckboxAction) {
                const Toast = this.$swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = this.$swal.stopTimer;
                        toast.onmouseleave = this.$swal.resumeTimer;
                    }
                })
                Toast.fire({
                    icon: "error",
                    title: "Vui lòng chọn hành động trước khi thực hiện!",
                    padding: "2em",
                })
                return
            }
            this.$request.post(`http://localhost:8080/admin/supplier/handle-form-actions`, {
                action: selectedCheckboxAction,
                supplierIds: this.supplierIds,
            }).then(() => {
                this.$swal.fire({
                title: "Thực hiện thành công!",
                text: "Hành động của bạn đã được thực hiện thành công",
                icon: "success"
                }).then(() => {
                    this.getAll()
                    this.$refs.checkboxAll.checked = false;
                })
            })
        }
    }
}
</script>