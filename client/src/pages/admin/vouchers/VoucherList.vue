<template>
    <AdminHeightWrapperComponent :addHeight="100" contentSelector=".admin-content__table">
        <div class="admin-content__heading">
            <h3>Quản lý voucher</h3>
            <router-link to="/admin/voucher/create" class="admin-content__create">Thêm voucher</router-link>
        </div>
        <div class="admin-content__table">
            <div class="admin-content__header d-flex align-items-center">
                <h4>Tất cả voucher</h4>
                <select id="selectCheckboxAction" class="form-select admin-content__checkbox-select-all-opts" @change="renderSelectChange">
                    <option value="" selected>-- Hành động --</option>
                    <option value="delete">Xóa</option>
                    <option value="filterByStatus">Lọc theo trạng thái</option>
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
                        <th scope="col">Code
                            <SortComponent field="code" :sort="sort"/>
                        </th>
                        <th scope="col">Giá trị
                            <SortComponent field="value" :sort="sort"/>
                        </th>
                        <th scope="col">Số lượng
                            <SortComponent field="quantity" :sort="sort"/>
                        </th>
                        <th scope="col">Ngày bắt đầu
                            <SortComponent field="startAt" :sort="sort"/>
                        </th>
                        <th scope="col">Ngày kết thúc
                            <SortComponent field="endAt" :sort="sort"/>
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
                    <template v-if="vouchers.length > 0">
                        <tr class="admin-content__table-row" v-for="voucher in vouchers" :key="voucher._id">
                            <th>
                                <input class="form-check-input" type="checkbox" ref="checkboxes" :value="voucher._id" @change="onCheckboxChange()">
                            </th>
                            <th>{{ voucher._id }}</th>
                            <td>{{ voucher.code }}</td>
                            <td>{{ voucher.value }}</td>
                            <td>{{ voucher.quantity }}</td>
                            <td>{{ convertDate(voucher.startAt) }}</td>
                            <td>{{ convertDate(voucher.endAt) }}</td>
                            <td>{{ convertDate(voucher.createdAt) }}</td>
                            <td>{{ convertDate(voucher.updatedAt) }}</td>
                            <td>{{ statusOptions[voucher.status] || voucher.status }}</td>
                            <td>
                                <router-link :to="'/admin/voucher/edit/' + voucher._id" class="fs-16 btn btn-primary">Sửa</router-link>&nbsp;
                                <button class="fs-16 btn btn-danger" @click="onDelete(voucher._id)">Xóa</button>
                            </td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr>
                            <td colspan="11" class="text-center">
                                Bạn chưa có voucher nào.
                                <router-link to="/admin/voucher/create">Thêm voucher</router-link>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
            <div class="admin-content__table-footer">
                <router-link to="/admin/voucher/trash">Thùng rác
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
import { convertDate, getAttributeFromObject } from '@/helpers/helpers.js'
import { swalFire, swalMixin } from '@/helpers/swal.js'
import PaginationComponent from '@/components/PaginationComponent.vue'
import AdminHeightWrapperComponent from '@/components/AdminHeightWrapperComponent.vue'
import SortComponent from '@/components/SortComponent.vue'

export default {
    name: 'VoucherList',
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
            vouchers: [],
            deletedCount: 0,
            totalPages: 0,
            sort: {},
            currentPage: 1,
            voucherIds: [],
            statusOptions: {},
        }
    },
    created() {
        this.getAll()
    },
    methods: {
        swalMixin, swalFire, convertDate, getAttributeFromObject,
        getAll() {
            const params = new URLSearchParams(this.$route.query).toString()
            this.$request.get(`http://localhost:8080/admin/voucher?${params}`).then(res => {
                this.vouchers = res.data.vouchers
                this.totalPages = res.data.totalPages
                this.deletedCount = res.data.deletedCount
                this.sort = res.data._sort
                this.statusOptions = res.data.VOUCHER_STATUS_OPTIONS
                this.currentPage = parseInt(this.$route.query.page) || 1
            })
        },
        onDelete(voucherId) {
            this.$swal.fire({
            title: "Bạn chắc chắn?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Có, tôi muốn xóa!"
            }).then((result) => {
            if (result.isConfirmed) {
                this.$request.delete(`http://localhost:8080/admin/voucher/${voucherId}`).then(() => {
                    this.swalFire("Xóa thành công!", "Voucher bạn chọn đã được xóa!", "success")
                    .then(() => {
                        this.getAll()
                    })
                })
            }
            });
        },
        btnCheckboxSubmitClicked() {
            let selectedCheckboxAction = document.getElementById('selectCheckboxAction').value
            let selectedStatus = document.getElementById('selectedStatus').value
            if (!selectedCheckboxAction) {
                this.swalMixin('error', 'Vui lòng chọn hành động trước khi thực hiện!')
                return
            }
            if (selectedCheckboxAction === 'filterByStatus' && !selectedStatus) {
                this.swalMixin('error', 'Vui lòng chọn trạng thái trước khi thực hiện!');
                return;
            }
            if (selectedCheckboxAction === 'filterByStatus') {
                const params = new URLSearchParams(this.$route.query)
                let filterId
                switch (selectedCheckboxAction) {
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
                this.$request.post(`http://localhost:8080/admin/voucher/handle-form-actions`, {
                    action: selectedCheckboxAction,
                    voucherIds: this.voucherIds,
                }).then(() => {
                    this.swalFire("Thực hiện thành công!", "Hành động của bạn đã được thực hiện thành công!", "success")
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
            this.voucherIds = []
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    i++
                    this.voucherIds.push(checkbox.value)
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
            else if (selectedCheckboxAction !== 'filterByStatus') {
                btnCheckboxSubmit.classList.add('disabled')
            }
        },
        renderSelectChange() {
            let selectedCheckboxAction = document.getElementById('selectCheckboxAction').value
            let btnCheckboxSubmit = document.getElementById('btnCheckboxSubmit')
            let checkedCount = this.countCheckboxChecked()
            if (selectedCheckboxAction === 'filterByStatus') {
                btnCheckboxSubmit.classList.remove('disabled')
            }
            else if (checkedCount === 0) btnCheckboxSubmit.classList.add('disabled')
        }
    }
}
</script>