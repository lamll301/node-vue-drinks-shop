<template>
    <AdminHeightWrapperComponent :addHeight="100" contentSelector=".admin-content__table">
        <div class="admin-content__heading">
            <h3>Quản lý đồ uống</h3>
            <router-link to="/admin/beverage/create" class="admin-content__create">Thêm đồ uống</router-link>
        </div>
        <!-- admin table -->
        <div class="admin-content__table">
            <div class="admin-content__header d-flex align-items-center">
                <h4>Tất cả đồ uống</h4>
                <select id="selectCheckboxAction" class="form-select admin-content__checkbox-select-all-opts" @change="renderSelectChange">
                    <option value="" selected>-- Hành động --</option>
                    <option value="delete">Xóa</option>
                    <option value="addCategory">Thêm danh mục</option>
                    <option value="removeCategory">Xóa danh mục</option>
                    <option value="setSupplier">Đặt nhà cung cấp</option>
                    <option value="setPromotion">Đặt khuyến mãi</option>
                    <option value="setStatus">Đặt trạng thái</option>
                    <option value="filterByCategory">Lọc theo danh mục</option>
                    <option value="filterBySupplier">Lọc theo nhà cung cấp</option>
                    <option value="filterByPromotion">Lọc theo khuyến mãi</option>
                    <option value="filterByStatus">Lọc theo trạng thái</option>
                </select>
                <select id="selectedCategory" class="form-select admin-content__select-attribute admin-content__select-category">
                    <option value="" selected>-- Chọn danh mục --</option>
                    <option v-for="category in categories" :key="category._id" :value="category._id">
                        {{ category.name }}
                    </option>
                </select>
                <select id="selectedSupplier" class="form-select admin-content__select-attribute admin-content__select-supplier">
                    <option value="" selected>-- Chọn nhà cung cấp --</option>
                    <option v-for="supplier in suppliers" :key="supplier._id" :value="supplier._id">
                        {{ supplier.name }}
                    </option>
                </select>
                <select id="selectedPromotion" class="form-select admin-content__select-attribute admin-content__select-promotion">
                    <option value="" selected>-- Chọn khuyến mãi --</option>
                    <option v-for="promotion in promotions" :key="promotion._id" :value="promotion._id">
                        {{ promotion.name }}
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
                        <th scope="col">Tên đồ uống
                            <SortComponent field="username" :sort="sort"/>
                        </th>
                        <th scope="col">Danh mục
                            <SortComponent field="categoryId" :sort="sort"/>
                        </th>
                        <th scope="col">Nhà cung cấp
                            <SortComponent field="supplierId" :sort="sort"/>
                        </th>
                        <th scope="col">Giá
                            <SortComponent field="listPrice" :sort="sort"/>
                        </th>
                        <th scope="col">Khuyến mãi
                            <SortComponent field="promotionId" :sort="sort"/>
                        </th>
                        <th scope="col">Số lượng
                            <SortComponent field="quantity" :sort="sort"/>
                        </th>
                        <th scope="col">Đơn vị tính
                            <SortComponent field="unitId" :sort="sort"/>
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
                    <template v-if="beverages.length > 0">
                        <tr class="admin-content__table-row" v-for="beverage in beverages" :key="beverage._id">
                            <th>
                                <input class="form-check-input" type="checkbox" ref="checkboxes" :value="beverage._id" @change="onCheckboxChange()">
                            </th>
                            <th>{{ beverage._id }}</th>
                            <td>{{ beverage.name }}</td>
                            <td>{{ attributeValuesToString(beverage.categoryId, 'name') }}</td>
                            <td>{{ getAttributeFromObject(beverage.supplierId, 'name') }}</td>
                            <td>{{ beverage.listPrice }}</td>
                            <td>{{ getAttributeFromObject(beverage.promotionId, 'name') }}</td>
                            <td>{{ beverage.quantity }}</td>
                            <td>{{ getAttributeFromObject(beverage.unitId, 'name') }}</td>
                            <td>{{ convertDate(beverage.createdAt) }}</td>
                            <td>{{ convertDate(beverage.updatedAt) }}</td>
                            <td>{{ statusOptions[beverage.status] || beverage.status }}</td>
                            <td>
                                <router-link :to="'/admin/beverage/edit/' + beverage._id" class="fs-16 btn btn-primary">Sửa</router-link>&nbsp;
                                <button class="fs-16 btn btn-danger" @click="onDelete(beverage._id)">Xóa</button>
                            </td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr>
                            <td colspan="13" class="text-center">
                                Bạn chưa có đồ uống nào.
                                <router-link to="/admin/beverage/create">Thêm đồ uống</router-link>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
            <div class="admin-content__table-footer">
                <router-link to="/admin/beverage/trash">Thùng rác
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
    name: 'BeverageList',
    data() {
        return {
            beverages: [],
            categories: [], suppliers: [], promotions: [],
            deletedCount: 0,
            totalPages: 0,
            sort: {},
            currentPage: 1,
            beverageIds: [],
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
        this.getAllCategories()
        this.getAllSuppliers()
        this.getAllPromotions()
    },
    methods: {
        swalMixin, swalFire, convertDate, attributeValuesToString, getAttributeFromObject,
        getAll() {
            const params = new URLSearchParams(this.$route.query).toString()
            this.$request.get(`http://localhost:8080/admin/beverage?${params}`).then(res => {
                this.beverages = res.data.beverages
                this.totalPages = res.data.totalPages
                this.deletedCount = res.data.deletedCount
                this.sort = res.data._sort
                this.statusOptions = res.data.BEVERAGE_STATUS_OPTIONS
                this.currentPage = parseInt(this.$route.query.page) || 1
            })
        },
        getAllCategories() {
            this.$request.get('http://localhost:8080/admin/category/all').then(res => {
                this.categories = res.data
            })
        },
        getAllSuppliers() {
            this.$request.get('http://localhost:8080/admin/supplier/all').then(res => {
                this.suppliers = res.data
            })
        },
        getAllPromotions() {
            this.$request.get('http://localhost:8080/admin/promotion/all').then(res => {
                this.promotions = res.data
            })
        },
        onDelete(beverageId) {
            this.$swal.fire({
            title: "Bạn chắc chắn?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Có, tôi muốn xóa!"
            }).then((result) => {
            if (result.isConfirmed) {
                this.$request.delete(`http://localhost:8080/admin/beverage/${beverageId}`).then(() => {
                    this.swalFire("Xóa đồ uống thành công!", "Đồ uống đã được xóa khỏi hệ thống.", "success")
                    .then(() => {
                        this.getAll()
                    })
                })
            }
            });
        },
        btnCheckboxSubmitClicked() {
            let selectedCheckboxAction = document.getElementById('selectCheckboxAction').value
            let selectedCategoryId = document.getElementById('selectedCategory').value
            let selectedSupplierId = document.getElementById('selectedSupplier').value
            let selectedPromotionId = document.getElementById('selectedPromotion').value
            let selectedStatus = document.getElementById('selectedStatus').value
            if (!selectedCheckboxAction) {
                this.swalMixin('error', 'Vui lòng chọn hành động trước khi thực hiện!')
                return
            }
            if ((selectedCheckboxAction === 'addCategory' || selectedCheckboxAction === 'removeCategory' 
                || selectedCheckboxAction === 'filterByCategory') && !selectedCategoryId) {
                this.swalMixin('error', 'Vui lòng chọn danh mục trước khi thực hiện!')
                return
            }
            if ((selectedCheckboxAction === 'setSupplier' || selectedCheckboxAction === 'filterBySupplier') && !selectedSupplierId) {
                this.swalMixin('error', 'Vui lòng chọn nhà cung cấp trước khi thực hiện!')
                return
            }
            if ((selectedCheckboxAction === 'setPromotion' || selectedCheckboxAction === 'filterByPromotion') && !selectedPromotionId) {
                this.swalMixin('error', 'Vui lòng chọn khuyến mãi trước khi thực hiện!')
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
                    case 'filterByCategory':
                        filterId = selectedCategoryId
                        break
                    case 'filterBySupplier':
                        filterId = selectedSupplierId
                        break
                    case 'filterByPromotion':
                        filterId = selectedPromotionId
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
                this.$request.post(`http://localhost:8080/admin/beverage/handle-form-actions`, {
                    action: selectedCheckboxAction,
                    beverageIds: this.beverageIds,
                    selectedCategoryId: selectedCategoryId,
                    selectedSupplierId: selectedSupplierId,
                    selectedPromotionId: selectedPromotionId,
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
            this.beverageIds = []
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    i++
                    this.beverageIds.push(checkbox.value)
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