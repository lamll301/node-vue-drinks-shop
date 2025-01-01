<template>
    <AdminHeightWrapperComponent :addHeight="100" contentSelector=".admin-content__table">
        <div class="admin-content__heading">
            <h3>Quản lý tin tức</h3>
            <router-link to="/admin/report/create" class="admin-content__create">Thêm tin tức</router-link>
        </div>
        <!-- admin table -->
        <div class="admin-content__table">
            <div class="admin-content__header d-flex align-items-center">
                <h4>Tất cả tin tức</h4>
                <select id="selectCheckboxAction" class="form-select admin-content__checkbox-select-all-opts">
                    <option value="" selected>-- Hành động --</option>
                    <option value="delete">Xóa</option>
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
                        <th scope="col">
                            Tiêu đề
                            <SortComponent field="title" :sort="sort"/>
                        </th>
                        <th scope="col">Tác giả
                            <SortComponent field="author" :sort="sort"/>
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
                    <template v-if="reports.length > 0">
                        <tr class="admin-content__table-row" v-for="report in reports" :key="report._id">
                            <th>
                                <input class="form-check-input" type="checkbox" ref="checkboxes" :value="report._id" @change="onCheckboxChange()">
                            </th>
                            <th>{{ report._id }}</th>
                            <td>{{ report.title }}</td>
                            <td>{{ report.author }}</td>
                            <!-- <td>{{ arrayToString(report.tags) }}</td> -->
                            <td>{{ convertDate(report.createdAt) }}</td>
                            <td>{{ convertDate(report.updatedAt) }}</td>
                            <td>{{ statusOptions[report.status] || report.status }}</td>
                            <td>
                                <router-link :to="'/admin/report/edit/' + report._id" class="fs-16 btn btn-primary">Sửa</router-link>&nbsp;
                                <button class="fs-16 btn btn-danger" @click="onDelete(report._id)">Xóa</button>
                            </td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr>
                            <td colspan="8" class="text-center">
                                Bạn chưa có tin tức nào.
                                <router-link to="/admin/report/create">Thêm tin tức</router-link>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
            <div class="admin-content__table-footer">
                <router-link to="/admin/report/trash">Thùng rác
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
import { convertDate, arrayToString } from '@/helpers/helpers.js'
import PaginationComponent from '@/components/PaginationComponent.vue'
import AdminHeightWrapperComponent from '@/components/AdminHeightWrapperComponent.vue'
import SortComponent from '@/components/SortComponent.vue'

export default {
    name: 'ReportList',
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
            reports: [],
            deletedCount: 0,    // số lượng obj trong thùng rác
            totalPages: 0,
            sort: {},
            currentPage: 1,
            reportIds: [],
            statusOptions: {},
        }
    },
    created() {
        this.getAll()
    },
    methods: {
        convertDate, arrayToString,
        getAll() {
            const params = new URLSearchParams(this.$route.query).toString()
            this.$request.get(`http://localhost:8080/admin/report?${params}`).then(res => {
                this.reports = res.data.reports
                this.statusOptions = res.data.REPORT_STATUS_OPTIONS
                this.totalPages = res.data.totalPages
                this.deletedCount = res.data.deletedCount
                this.sort = res.data._sort
                this.currentPage = parseInt(this.$route.query.page) || 1
            })
        },
        onDelete(reportId) {
            this.$swal.fire({
            title: "Bạn chắc chắn?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Có, tôi muốn xóa!"
            }).then((result) => {
            if (result.isConfirmed) {
                this.$request.delete(`http://localhost:8080/admin/report/${reportId}`).then(() => {
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
        // checkbox
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
            this.reportIds = []
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    i++
                    this.reportIds.push(checkbox.value)
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
            this.$request.post(`http://localhost:8080/admin/report/handle-form-actions`, {
                action: selectedCheckboxAction,
                reportIds: this.reportIds,
            }).then(() => {
                this.$swal.fire({
                title: "Thực hiện thành công!",
                text: "Hành động của bạn đã được thực hiện thành công",
                icon: "success"
                }).then(() => {
                    this.getAll()
                    this.$refs.checkboxAll.checked = false
                })
            })
        },
    }
}
</script>