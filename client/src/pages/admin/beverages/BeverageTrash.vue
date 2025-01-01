<template>
    <AdminHeightWrapperComponent :addHeight="100" contentSelector=".admin-content__table">
        <div class="admin-content__heading">
            <h3>Quản lý thùng rác</h3>
            <router-link to="/admin/beverage/create" class="admin-content__create">Thêm đồ uống</router-link>
        </div>
        <div class="admin-content__table">
            <div class="admin-content__header d-flex align-items-center">
                <h4>Đồ uống đã xóa</h4>
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
                        <th scope="col">Ngày xóa
                            <SortComponent field="deletedAt" :sort="sort"/>
                        </th>
                        <th scope="col">Trạng thái
                            <SortComponent field="status" :sort="sort"/>
                        </th>
                        <th scope="col" class="col-3"></th> 
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
                            <td>{{ convertDate(beverage.deletedAt) }}</td>
                            <td>{{ statusOptions[beverage.status] || beverage.status }}</td>
                            <td>
                                <button class="fs-16 btn btn-primary" @click="onRestore(beverage._id)">Khôi phục</button>&nbsp;
                                <button class="fs-16 btn btn-danger" @click="onDelete(beverage._id)">Xóa vĩnh viễn</button>
                            </td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr>
                            <td colspan="13" class="text-center">
                                Thùng rác trống.
                                <router-link to="/admin/beverage">Danh sách đồ uống</router-link>
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
import { convertDate, attributeValuesToString, getAttributeFromObject } from '@/helpers/helpers.js'
import { swalMixin, swalFire } from '@/helpers/swal.js'
import PaginationComponent from '@/components/PaginationComponent.vue'
import AdminHeightWrapperComponent from '@/components/AdminHeightWrapperComponent.vue'
import SortComponent from '@/components/SortComponent.vue'

export default {
    name: 'BeverageTrash',
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
            beverages: [], statusOptions: {},
            totalPages: 0, currentPage: 1,
            sort: {},
            beverageIds: [],
        }
    },
    created() {
        this.getAll()
    },
    methods: {
        swalMixin, swalFire, convertDate, attributeValuesToString, getAttributeFromObject,
        getAll() {
            const params = new URLSearchParams(this.$route.query).toString()
            this.$request.get(`http://localhost:8080/admin/beverage/trash?${params}`).then(res => {
                this.beverages = res.data.beverages
                this.totalPages = res.data.totalPages
                this.sort = res.data._sort
                this.currentPage = parseInt(this.$route.query.page) || 1
                this.statusOptions = res.data.BEVERAGE_STATUS_OPTIONS
            })
        },
        onDelete(beverageId) {
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
                this.$request.delete(`http://localhost:8080/admin/beverage/${beverageId}/force`).then(() => {
                    this.swalFire("Xóa thành công!", "Đồ uống bạn chọn đã được xóa vĩnh viễn khỏi hệ thống!", "success")
                    .then(() => {
                        this.getAll()
                    })
                })
            }
            });
        },
        onRestore(beverageId) {
            this.$request.patch(`http://localhost:8080/admin/beverage/${beverageId}/restore`).then(() => {
                this.swalFire("Khôi phục thành công!", "Đồ uống bạn chọn đã được khôi phục!", "success")
                .then(() => {
                    this.getAll()
                })
            })
        },
        btnCheckboxSubmitClicked() {
            let selectedCheckboxAction = document.getElementById('selectCheckboxAction').value
            if (!selectedCheckboxAction) {
                this.swalMixin('error', 'Vui lòng chọn hành động trước khi thực hiện!')
                return
            }
            this.$request.post(`http://localhost:8080/admin/beverage/handle-form-actions`, {
                action: selectedCheckboxAction,
                beverageIds: this.beverageIds,
            }).then(() => {
                this.swalFire("Thực hiện thành công!", "Hành động của bạn đã được thực hiện thành công!", "success")
                .then(() => {
                    this.getAll()
                    this.$refs.checkboxAll.checked = false;
                })
            })
        },
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
            if (checkedCount > 0) {
                btnCheckboxSubmit.classList.remove('disabled')
            }
            else btnCheckboxSubmit.classList.add('disabled')
        },
    }
}
</script>