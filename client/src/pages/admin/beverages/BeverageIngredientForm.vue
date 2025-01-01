<template>
    <AdminHeightWrapperComponent :addHeight="50" contentSelector=".admin-content__form">
        <div class="admin-content__heading">
            <h3>Quản lý đồ uống</h3>
        </div>
        <div class="admin-content__form">
            <div class="admin-content__header">
                <h4 v-if="this.$route.params.id">Form sửa chi tiết thành phần</h4>
                <h4 v-else>Form thêm chi tiết thành phần</h4>
            </div>
            <form @submit.prevent="save()">
            <div class="admin-content__form-body">
                <div v-if="this.$route.params.id" class="mb-16">
                    <h3 class="admin-content__form-text">Mã chi tiết thành phần</h3>
                    <div class="valid-elm input-group">
                        <input type="text" class="fs-16 form-control" disabled v-model="beverageIngredient._id">
                    </div>
                </div>
                <div class="mb-16">
                    <h3 class="admin-content__form-text">Đồ uống</h3>
                    <div class="input-group">
                        <select class="valid-elm form-select" v-model="beverageIngredient.beverageId"
                        v-bind:class="{'is-invalid': errors.beverageId}" @blur="validate()">
                            <option disabled value="">Chọn đồ uống</option>
                            <option v-for="beverage in beverages" :key="beverage._id" :value="beverage._id">
                                {{ beverage.name }}
                            </option>
                        </select>
                        <div class="invalid-feedback fs-14" v-if="errors.beverageId">{{ errors.beverageId }}</div>
                    </div>
                </div>
                <div class="mb-16">
                    <h3 class="admin-content__form-text">Nguyên liệu</h3>
                    <div class="input-group">
                        <select class="valid-elm form-select" v-model="beverageIngredient.ingredientId"
                        v-bind:class="{'is-invalid': errors.ingredientId}" @blur="validate()">
                            <option disabled value="">Chọn nguyên liệu</option>
                            <option v-for="ingredient in ingredients" :key="ingredient._id" :value="ingredient._id">
                                {{ ingredient.name }}
                            </option>
                        </select>
                        <div class="invalid-feedback fs-14" v-if="errors.ingredientId">{{ errors.ingredientId }}</div>
                    </div>
                </div>
                <div class="mb-16">
                    <h3 class="admin-content__form-text">Số lượng</h3>
                    <div class="valid-elm input-group">
                        <input type="number" class="fs-16 form-control" placeholder="Nhập số lượng nguyên liệu của chi tiết thành phần" v-model="beverageIngredient.quantity"
                        v-bind:class="{'is-invalid': errors.quantity}" @blur="validate()">
                        <div class="invalid-feedback" v-if="errors.quantity">{{ errors.quantity }}</div>
                    </div>
                </div>
                <div class="mb-16">
                    <h3 class="admin-content__form-text">Đơn vị tính</h3>
                    <div class="input-group">
                        <select class="valid-elm form-select" v-model="beverageIngredient.unitId"
                        v-bind:class="{'is-invalid': errors.unitId}" @blur="validate()">
                            <option disabled value="">Chọn đơn vị tính</option>
                            <option v-for="unit in units" :key="unit._id" :value="unit._id">
                                {{ unit.name }}
                            </option>
                        </select>
                        <div class="invalid-feedback fs-14" v-if="errors.unitId">{{ errors.unitId }}</div>
                    </div>
                </div>
                <div class="mb-16 admin-content__form-btn">
                    <button type="submit" class="fs-16 btn btn-primary">Xác nhận</button>
                </div>
            </div>
            </form>
        </div>
    </AdminHeightWrapperComponent>
</template>

<script>
import { swalFire, swalMixin } from '@/helpers/swal.js'
import AdminHeightWrapperComponent from '@/components/AdminHeightWrapperComponent.vue'

export default {
    name: 'BeverageIngredientForm',
    components: {
        AdminHeightWrapperComponent
    },
    data() {
        return {
            errors: {
                beverageId: '', ingredientId: '', unitId: '', quantity: ''
            },
            beverageIngredient: {},
            beverages: [], ingredients: [], units: [],
        }
    },
    created() {
        let beverageIngredientId = this.$route.params.id
        if (beverageIngredientId) {
            this.getBeverageIngredient(beverageIngredientId)
        }
        this.getAllBeverages()
        this.getAllIngredients()
        this.getAllUnits()
    },
    methods: {
        swalFire, swalMixin,
        validate() {
            let isValid = true
            this.errors = {
                beverageId: '', ingredientId: '', unitId: '', quantity: ''
            }
            if (!this.beverageIngredient.beverageId) {
                this.errors.beverageId = 'Đồ uống không được để trống.'
                isValid = false
            }
            if (!this.beverageIngredient.ingredientId) {
                this.errors.ingredientId = 'Nguyên liệu không được để trống.'
                isValid = false
            }
            if (!this.beverageIngredient.unitId) {
                this.errors.unitId = 'Đơn vị tính không được để trống.'
                isValid = false
            }
            if (this.beverageIngredient.quantity <= 0 || !this.beverageIngredient.quantity) {
                this.errors.quantity = 'Số lượng không được để trống và phải lớn hơn 0.'
                isValid = false
            }
            return isValid
        },
        getBeverageIngredient(beverageIngredientId) {
            this.$request.get(`http://localhost:8080/admin/beverageIngredient/${beverageIngredientId}`).then(res => {
                this.beverageIngredient = res.data
            })
        },
        getAllUnits() {
            this.$request.get('http://localhost:8080/admin/unit/all').then(res => {
                this.units = res.data
            })
        },
        getAllBeverages() {
            this.$request.get('http://localhost:8080/admin/beverage/all').then(res => {
                this.beverages = res.data
            })
        },
        getAllIngredients() {
            this.$request.get('http://localhost:8080/admin/ingredient/all').then(res => {
                this.ingredients = res.data
            })
        },
        save() {
            if (!this.validate()) {
                this.swalMixin('error', 'Dữ liệu không đúng định dạng. Vui lòng kiểm tra lại!')
                return
            }
            if (this.beverageIngredient._id) {
                this.$request.put(`http://localhost:8080/admin/beverageIngredient/${this.beverageIngredient._id}`, this.beverageIngredient).then(() => {
                    this.swalFire("Cập nhật thành công!", "Thông tin về chi tiết thành phần đã được cập nhật!", "success")
                    .then(() => {
                        this.$router.push(`/admin/beverage/edit/${this.beverageIngredient.beverageId}`)
                    })
                })
            }
            else {
                this.$request.post('http://localhost:8080/admin/beverageIngredient/create', this.beverageIngredient).then(() => {
                    this.swalFire("Thêm thành công!", "Chi tiết thành phần mới đã được thêm vào đồ uống!", "success")
                    .then(() => {
                        this.$router.push(`/admin/beverage/edit/${this.beverageIngredient.beverageId}`)
                    })
                })
            }
        },
    }
}
</script>