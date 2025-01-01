<template>
    <AdminContentWrapper :addHeight="50" contentSelector=".admin-content__form">
        <div class="admin-content__heading">
            <h3>Quản lý nguyên liệu</h3>
        </div>
        <img src="">
        <div class="admin-content__form">
            <div class="admin-content__header">
                <h4 v-if="this.$route.params.id">Form sửa nguyên liệu</h4>
                <h4 v-else>Form thêm nguyên liệu</h4>
            </div>
            <form @submit.prevent="save()">
            <div class="admin-content__form-body">
                <div v-if="this.$route.params.id" class="mb-16">
                    <h3 class="admin-content__form-text">Mã nguyên liệu</h3>
                    <div class="valid-elm input-group">
                        <input type="text" class="fs-16 form-control" disabled v-model="ingredient._id">
                    </div>
                </div>
                <div class="mb-16">
                    <h3 class="admin-content__form-text">Tên nguyên liệu</h3>
                    <div class="valid-elm input-group">
                        <input type="text" class="fs-16 form-control" placeholder="Nhập tên nguyên liệu" v-model="ingredient.name"
                        v-bind:class="{'is-invalid': errors.name}" @blur="validate()">
                        <div class="invalid-feedback" v-if="errors.name">{{ errors.name }}</div>
                    </div>
                </div>
                <div class="mb-16 height-105">
                    <h3 class="admin-content__form-text">Mô tả</h3>
                    <div class="valid-elm input-group">
                        <textarea class="fs-16 form-control" rows="3" placeholder="Nhập mô tả nguyên liệu" v-model="ingredient.description"></textarea>
                    </div>
                </div>
                <div class="mb-16">
                    <h3 class="admin-content__form-text">Số lượng</h3>
                    <div class="valid-elm input-group">
                        <input type="number" class="fs-16 form-control" placeholder="Nhập tên nguyên liệu" v-model="ingredient.quantity"
                        v-bind:class="{'is-invalid': errors.quantity}" @blur="validate()">
                        <div class="invalid-feedback" v-if="errors.quantity">{{ errors.quantity }}</div>
                    </div>
                </div>
                <div class="mb-16">
                    <h3 class="admin-content__form-text">Đơn vị tính</h3>
                    <select class="valid-elm form-select" v-model="ingredient.unitId">
                        <option disabled value="">Chọn đơn vị tính nguyên liệu</option>
                        <option v-for="unit in units" :key="unit._id" :value="unit._id">
                            {{ unit.name }}
                        </option>
                    </select>
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
    name: 'IngredientForm',
    components: {
        AdminContentWrapper
    },
    data() {
        return {
            errors: {
                name: '',
                quantity: '',
            },
            ingredient: {},
            units: [],
        }
    },
    created() {
        this.getAllUnits()
        let ingredientId = this.$route.params.id
        if (ingredientId) {
            this.getIngredient(ingredientId)
        }
    },
    methods: {
        swalFire,
        validate() {
            let isValid = true;
            this.errors = {
                name: '',
                quantity: '',
            }
            if (!this.ingredient.name) {
                this.errors.name = 'Tên nguyên liệu không được để trống.'
                isValid = false
            }
            if (this.ingredient.quantity < 0) {
                this.errors.quantity = 'Số lượng phải lớn hơn hoặc bằng 0.'
                isValid = false
            }
            return isValid
        },
        getAllUnits() {
            this.$request.get('http://localhost:8080/admin/unit/all').then(res => {
                this.units = res.data
            })
        },
        getIngredient(ingredientId) {
            this.$request.get(`http://localhost:8080/admin/ingredient/${ingredientId}`).then(res => {
                this.ingredient = res.data
            })
        },
        save() {
            if (!this.validate()) return
            if (this.ingredient._id) {
                this.$request.put(`http://localhost:8080/admin/ingredient/${this.ingredient._id}`, this.ingredient).then(() => {
                    this.swalFire("Cập nhật thành công!", "Thông tin về nguyên liệu đã được cập nhật!", "success")
                    .then(() => {
                        this.$router.push({name: 'admin.ingredients'})
                    })
                })
            }
            else {
                this.$request.post('http://localhost:8080/admin/ingredient/create', this.ingredient).then(() => {
                    this.swalFire("Thêm thành công!", "Nguyên liệu mới đã được thêm vào hệ thống!", "success")
                    .then(() => {
                        this.$router.push({name: 'admin.ingredients'})
                    })
                })
            }
        },
    }
}
</script>