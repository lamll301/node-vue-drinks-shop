<template>
    <AdminHeightWrapperComponent :addHeight="100" contentSelector=".admin-content__table">
        <div class="admin-content__heading">
            <h3>Quản lý thùng rác</h3>
            <router-link to="/admin/promotion/create" class="admin-content__create">Thêm khuyến mãi</router-link>
        </div>
        <!-- admin table -->
        <div class="admin-content__table">
            <div class="admin-content__header d-flex align-items-center">
                <h4>Khuyến mãi đã xóa</h4>
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
                        <th scope="col">Phần trăm giảm
                            <SortComponent field="discountPercentage" :sort="sort"/>
                        </th>
                        <th scope="col">Tiền giảm tối đa
                            <SortComponent field="maxDiscountAmount" :sort="sort"/>
                        </th>
                        <th scope="col">Ngày bắt đầu
                            <SortComponent field="startAt" :sort="sort"/>
                        </th>
                        <th scope="col">Ngày kết thúc
                            <SortComponent field="endAt" :sort="sort"/>
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
                    <template v-if="promotions.length > 0">
                        <tr class="admin-content__table-row" v-for="promotion in promotions" :key="promotion._id">
                            <th>
                                <input class="form-check-input" type="checkbox" ref="checkboxes" :value="promotion._id" @change="onCheckboxChange()">
                            </th>
                            <th>{{ promotion._id }}</th>
                            <td>{{ promotion.name }}</td>
                            <td>{{ promotion.discountPercentage }}</td>
                            <td>{{ promotion.maxDiscountAmount }}</td>
                            <td>{{ convertDate(promotion.startAt) }}</td>
                            <td>{{ convertDate(promotion.endAt) }}</td>
                            <td>{{ convertDate(promotion.deletedAt) }}</td>
                            <td>{{ statusOptions[promotion.status] || promotion.status }}</td>
                            <td>
                                <button class="fs-16 btn btn-primary" @click="onRestore(promotion._id)">Khôi phục</button>&nbsp;
                                <button class="fs-16 btn btn-danger" @click="onDelete(promotion._id)">Xóa vĩnh viễn</button>
                            </td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr>
                            <td colspan="10" class="text-center">
                                Thùng rác trống.
                                <router-link to="/admin/promotion">Danh sách khuyến mãi</router-link>
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
import { convertDate, getAttributeFromObject } from '@/helpers/helpers.js'
import { swalFire, swalMixin } from '@/helpers/swal.js'
import PaginationComponent from '@/components/PaginationComponent.vue'
import AdminHeightWrapperComponent from '@/components/AdminHeightWrapperComponent.vue'
import SortComponent from '@/components/SortComponent.vue'

export default {
    name: 'PromotionTrash',
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
            promotions: [],
            totalPages: 0,
            sort: {},
            promotionIds: [],
            currentPage: 1,
            statusOptions: {},
        }
    },
    created() {
        this.getAll()
    },
    methods: {
        convertDate, swalFire, swalMixin, getAttributeFromObject,
        getAll() {
            const params = new URLSearchParams(this.$route.query).toString()
            this.$request.get(`http://localhost:8080/admin/promotion/trash?${params}`).then(res => {
                this.promotions = res.data.promotions
                this.totalPages = res.data.totalPages
                this.sort = res.data._sort
                this.statusOptions = res.data.PROMOTION_STATUS_OPTIONS
                this.currentPage = parseInt(this.$route.query.page) || 1
            })
        },
        onDelete(promotionId) {
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
                this.$request.delete(`http://localhost:8080/admin/promotion/${promotionId}/force`).then(() => {
                    this.swalFire("Xóa thành công!", "Khuyến mãi của bạn đã được xóa vĩnh viễn khỏi hệ thống!", "success")
                    .then(() => {
                        this.getAll()
                    })
                })
            }
            });
        },
        onRestore(promotionId) {
            this.$request.patch(`http://localhost:8080/admin/promotion/${promotionId}/restore`).then(() => {
                this.swalFire("Khôi phục thành công!", "Khuyến mãi của bạn đã được khôi phục!", "success")
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
            this.$request.post(`http://localhost:8080/admin/promotion/handle-form-actions`, {
                action: selectedCheckboxAction,
                promotionIds: this.promotionIds,
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
            this.promotionIds = []
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    i++
                    this.promotionIds.push(checkbox.value)
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