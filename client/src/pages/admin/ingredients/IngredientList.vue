<template>
    <AdminHeightWrapperComponent :addHeight="100" contentSelector=".admin-content__table">
        <div class="admin-content__heading">
            <h3>Quản lý nguyên liệu</h3>
            <router-link to="/admin/ingredient/create" class="admin-content__create">Thêm nguyên liệu</router-link>
        </div>
        <div class="admin-content__table">
            <div class="admin-content__header d-flex align-items-center">
                <h4>Tất cả nguyên liệu</h4>
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
                        <th scope="col">Tên
                            <SortComponent field="name" :sort="sort"/>
                        </th>
                        <th scope="col">Số lượng
                            <SortComponent field="quantity" :sort="sort"/>
                        </th>
                        <th scope="col">Đơn vị tính</th>
                        <th scope="col">Ngày tạo
                            <SortComponent field="createdAt" :sort="sort"/>
                        </th>
                        <th scope="col">Ngày cập nhật
                            <SortComponent field="updatedAt" :sort="sort"/>
                        </th>
                        <th scope="col" class="col-2"></th>
                    </tr>
                </thead>
                <tbody class="admin-content__table-main-body">
                    <template v-if="ingredients.length > 0">
                        <tr class="admin-content__table-row" v-for="ingredient in ingredients" :key="ingredient._id">
                            <th>
                                <input class="form-check-input" type="checkbox" ref="checkboxes" :value="ingredient._id" @change="onCheckboxChange()">
                            </th>
                            <th>{{ ingredient._id }}</th>
                            <td>{{ ingredient.name }}</td>
                            <td>{{ ingredient.quantity }}</td>
                            <td>{{ getAttributeFromObject(ingredient.unitId, 'name') }}</td>
                            <td>{{ convertDate(ingredient.createdAt) }}</td>
                            <td>{{ convertDate(ingredient.updatedAt) }}</td>
                            <td>
                                <router-link :to="'/admin/ingredient/edit/' + ingredient._id" class="fs-16 btn btn-primary">Sửa</router-link>&nbsp;
                                <button class="fs-16 btn btn-danger" @click="onDelete(ingredient._id)">Xóa</button>
                            </td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr>
                            <td colspan="9" class="text-center">
                                Bạn chưa có nguyên liệu nào.
                                <router-link to="/admin/ingredient/create">Thêm nguyên liệu</router-link>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
            <div class="admin-content__table-footer">
                <router-link to="/admin/ingredient/trash">Thùng rác
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
    name: 'IngredientList',
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
            ingredients: [],
            deletedCount: 0,
            totalPages: 0,
            sort: {},
            currentPage: 1,
            ingredientIds: [],
        }
    },
    created() {
        this.getAll()
    },
    methods: {
        swalMixin, swalFire, convertDate, getAttributeFromObject,
        getAll() {
            const params = new URLSearchParams(this.$route.query).toString()
            this.$request.get(`http://localhost:8080/admin/ingredient?${params}`).then(res => {
                this.ingredients = res.data.ingredients
                this.totalPages = res.data.totalPages
                this.deletedCount = res.data.deletedCount
                this.sort = res.data._sort
                this.currentPage = parseInt(this.$route.query.page) || 1
            })
        },
        onDelete(ingredientId) {
            this.$swal.fire({
            title: "Bạn chắc chắn?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Có, tôi muốn xóa!"
            }).then((result) => {
            if (result.isConfirmed) {
                this.$request.delete(`http://localhost:8080/admin/ingredient/${ingredientId}`).then(() => {
                    this.swalFire("Xóa thành công!", "Nguyên liệu của bạn đã được xóa!", "success")
                    .then(() => {
                        this.getAll()
                    })
                })
            }
            });
        },
        btnCheckboxSubmitClicked() {
            let selectedCheckboxAction = document.getElementById('selectCheckboxAction').value
            if (!selectedCheckboxAction) {
                this.swalMixin('error', 'Vui lòng chọn hành động trước khi thực hiện!')
                return
            }
            this.$request.post(`http://localhost:8080/admin/ingredient/handle-form-actions`, {
                action: selectedCheckboxAction,
                ingredientIds: this.ingredientIds,
            }).then(() => {
                this.swalFire("Thực hiện thành công!", "Hành động của bạn đã được thực hiện thành công!", "success")
                .then(() => {
                    this.getAll()
                    this.$refs.checkboxAll.checked = false
                })
            })
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
            this.ingredientIds = []
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    i++
                    this.ingredientIds.push(checkbox.value)
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