<template>
    <AdminHeightWrapperComponent :addHeight="100" contentSelector=".admin-content__table">
        <div class="admin-content__heading">
            <h3>Quản lý đơn hàng</h3>
        </div>
        <!-- admin table -->
        <div class="admin-content__table">
            <div class="admin-content__header d-flex align-items-center">
                <h4>Tất cả đơn hàng</h4>
                <select id="selectCheckboxAction" class="form-select admin-content__checkbox-select-all-opts" @change="renderSelectChange">
                    <option value="" selected>-- Hành động --</option>
                    <option value="delete">Xóa</option>
                    <option value="setStatus">Đặt trạng thái</option>
                    <option value="filterByCustomer">Lọc theo khách hàng</option>
                    <option value="filterByStatus">Lọc theo trạng thái</option>
                </select>
                <select id="selectedCustomer" class="form-select admin-content__select-attribute admin-content__select-customer">
                    <option value="" selected>-- Chọn khách hàng --</option>
                    <option v-for="customer in customers" :key="customer._id" :value="customer._id">
                        {{ customer.name }}
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
                        <th scope="col">Khách hàng
                            <SortComponent field="customerId" :sort="sort"/>
                        </th>
                        <th scope="col">Mã tài khoản
                        </th>
                        <th scope="col">Voucher
                            <SortComponent field="voucherId" :sort="sort"/>
                        </th>
                        <th scope="col">Tiền mặt hàng
                            <SortComponent field="subTotal" :sort="sort"/>
                        </th>
                        <th scope="col">Tổng tiền
                            <SortComponent field="total" :sort="sort"/>
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
                    <template v-if="orders.length > 0">
                        <tr class="admin-content__table-row" v-for="order in orders" :key="order._id">
                            <th>
                                <input class="form-check-input" type="checkbox" ref="checkboxes" :value="order._id" @change="onCheckboxChange()">
                            </th>
                            <th>{{ order._id }}</th>
                            <td>{{ getAttributeFromObject(order.customerId, 'name') }}</td>
                            <td>{{ getAttributeFromObject(order.customerId, 'accountId') }}</td>
                            <td>{{ getAttributeFromObject(order.voucherId, 'code') }}</td>
                            <td>{{ order.subTotal }}</td>
                            <td>{{ order.total }}</td>
                            <td>{{ convertDate(order.createdAt) }}</td>
                            <td>{{ convertDate(order.updatedAt) }}</td>
                            <td>{{ statusOptions[order.status] || order.status }}</td>
                            <td>
                                <router-link :to="'/admin/order/edit/' + order._id" class="fs-16 btn btn-primary">Sửa</router-link>&nbsp;
                                <button class="fs-16 btn btn-danger" @click="onDelete(order._id)">Xóa</button>
                            </td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr>
                            <td colspan="13" class="text-center">
                                Không có đơn hàng nào để hiển thị.
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
            <div class="admin-content__table-footer">
                <router-link to="/admin/order/trash">Thùng rác
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
import { convertDate, attributeValuesToString, getAttributeFromObject } from '@/helpers/helpers.js'
import { swalMixin, swalFire } from '@/helpers/swal.js'
import PaginationComponent from '@/components/PaginationComponent.vue'
import AdminHeightWrapperComponent from '@/components/AdminHeightWrapperComponent.vue'
import SortComponent from '@/components/SortComponent.vue'

export default {
    name: 'OrderList',
    data() {
        return {
            orders: [],
            customers: [],
            deletedCount: 0,
            totalPages: 0,
            sort: {},
            currentPage: 1,
            orderIds: [],
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
        this.getAllCustomers()
    },
    methods: {
        swalMixin, swalFire, convertDate, attributeValuesToString, getAttributeFromObject,
        getAll() {
            const params = new URLSearchParams(this.$route.query).toString()
            this.$request.get(`http://localhost:8080/admin/order?${params}`).then(res => {
                this.orders = res.data.orders
                this.totalPages = res.data.totalPages
                this.deletedCount = res.data.deletedCount
                this.sort = res.data._sort
                this.statusOptions = res.data.ORDER_STATUS_OPTIONS
                this.currentPage = parseInt(this.$route.query.page) || 1
            })
        },
        getAllCustomers() {
            this.$request.get('http://localhost:8080/admin/customer/all').then(res => {
                this.customers = res.data
            })
        },
        onDelete(orderId) {
            this.$swal.fire({
            title: "Bạn chắc chắn?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Có, tôi muốn xóa!"
            }).then((result) => {
            if (result.isConfirmed) {
                this.$request.delete(`http://localhost:8080/admin/order/${orderId}`).then(() => {
                    this.swalFire("Xóa đơn hàng thành công!", "Đơn hàng đã được xóa khỏi hệ thống.", "success")
                    .then(() => {
                        this.getAll()
                    })
                })
            }
            });
        },
        btnCheckboxSubmitClicked() {
            let selectedCheckboxAction = document.getElementById('selectCheckboxAction').value
            let selectedCustomerId = document.getElementById('selectedCustomer').value
            let selectedStatus = document.getElementById('selectedStatus').value
            if (!selectedCheckboxAction) {
                this.swalMixin('error', 'Vui lòng chọn hành động trước khi thực hiện!')
                return
            }
            if ((selectedCheckboxAction === 'setCustomer' || selectedCheckboxAction === 'filterByCustomer') && !selectedCustomerId) {
                this.swalMixin('error', 'Vui lòng chọn khách hàng trước khi thực hiện!')
                return
            }
            if ((selectedCheckboxAction === 'setStatus' || selectedCheckboxAction === 'filterByStatus') && !selectedStatus) {
                this.swalMixin('error', 'Vui lòng chọn trạng thái trước khi thực hiện!');
                return;
            }
            if (selectedCheckboxAction.startsWith('filterBy')) {
                const params = new URLSearchParams(this.$route.query)
                let filterId
                switch (selectedCheckboxAction) {
                    case 'filterByCustomer':
                        filterId = selectedCustomerId
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
                this.$request.post(`http://localhost:8080/admin/order/handle-form-actions`, {
                    action: selectedCheckboxAction,
                    orderIds: this.orderIds,
                    selectedCustomerId: selectedCustomerId,
                    selectedStatus: selectedStatus
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
            this.orderIds = []
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    i++
                    this.orderIds.push(checkbox.value)
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
            else if (!selectedCheckboxAction.startsWith('filterBy')) 
            {
                btnCheckboxSubmit.classList.add('disabled')
            }
        },
        renderSelectChange() {
            let selectedCheckboxAction = document.getElementById('selectCheckboxAction').value
            let btnCheckboxSubmit = document.getElementById('btnCheckboxSubmit')
            let checkedCount = this.countCheckboxChecked()
            if (selectedCheckboxAction.startsWith('filterBy')) 
            {
                btnCheckboxSubmit.classList.remove('disabled')
            }
            else if (checkedCount === 0) btnCheckboxSubmit.classList.add('disabled')
        },
    }
}
</script>