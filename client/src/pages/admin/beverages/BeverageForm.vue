<template>
    <AdminHeightWrapperComponent :addHeight="50" contentSelector=".admin-content__container">
        <div class="admin-content__heading">
            <h3>Quản lý đồ uống</h3>
        </div>
        <div class="admin-content__container">
            <div class="admin-content__form">
                <div class="admin-content__header">
                    <h4 v-if="this.$route.params.id">Form sửa đồ uống</h4>
                    <h4 v-else>Form thêm đồ uống</h4>
                </div>
                <form @submit.prevent="save()">
                <div class="admin-content__form-body">
                    <div v-if="this.$route.params.id" class="mb-16">
                        <h3 class="admin-content__form-text">Mã đồ uống</h3>
                        <div class="valid-elm input-group">
                            <input type="text" class="fs-16 form-control" disabled v-model="beverage._id">
                        </div>
                    </div>
                    <div class="mb-16">
                        <h3 class="admin-content__form-text">Tên đồ uống</h3>
                        <div class="valid-elm input-group">
                            <input type="text" class="fs-16 form-control" placeholder="Nhập tên đồ uống" v-model="beverage.name"
                            v-bind:class="{'is-invalid': errors.name}" @blur="validate()">
                            <div class="invalid-feedback" v-if="errors.name">{{ errors.name }}</div>
                        </div>
                    </div>
                    <div class="mb-16 height-205">
                        <h3 class="admin-content__form-text">Mô tả</h3>
                        <div class="valid-elm input-group">
                            <textarea class="fs-16 form-control" placeholder="Nhập mô tả đồ uống" rows="6" v-model="beverage.description"></textarea>
                        </div>
                    </div>
                    <div class="mb-16">
                        <h3 class="admin-content__form-text">Ảnh</h3>
                        <div class="valid-elm input-group">
                            <input type="file" class="fs-16 lh-30 form-control" name="image" accept="image/*" ref="imageInput">
                            <button v-if="this.$route.params.id" type="button" class="btn btn-light fs-16 btn" @click="addImage()">Thêm ảnh</button>
                        </div>
                    </div>
                    <div>
                        <div v-for="image in beverage.images" :key="image.name" class="admin-content__image-container mr-16 mb-16">
                            <button type="button" class="btn btn-danger" @click="removeImage(image.name)">X</button>
                            <img v-bind:src="getImagePath(image.name, 'error.jpg')" class="img-thumbnail admin-content__image-report" alt="">
                        </div>
                    </div>
                    <div class="mb-16">
                        <h3 class="admin-content__form-text">Nhà cung cấp</h3>
                        <div class="input-group">
                            <select class="valid-elm form-select" v-model="beverage.supplierId">
                                <option disabled value="">Chọn nhà cung cấp đồ uống</option>
                                <option v-for="supplier in suppliers" :key="supplier._id" :value="supplier._id">
                                    {{ supplier.name }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="mb-16">
                        <h3 class="admin-content__form-text">Giá niêm yết</h3>
                        <div class="valid-elm input-group">
                            <input type="number" class="fs-16 form-control" placeholder="Nhập giá niêm yết" v-model="beverage.listPrice"
                            v-bind:class="{'is-invalid': errors.listPrice}" @blur="validate()">
                            <span class="fs-16 input-group-text">đồng</span>
                            <div class="invalid-feedback" v-if="errors.listPrice">{{ errors.listPrice }}</div>
                        </div>
                    </div>
                    <div class="mb-16">
                        <h3 class="admin-content__form-text">Khuyến mãi</h3>
                        <div class="input-group">
                            <select class="valid-elm form-select" v-model="beverage.promotionId">
                                <option disabled value="">Chọn khuyến mãi đồ uống</option>
                                <option v-for="promotion in promotions" :key="promotion._id" :value="promotion._id">
                                    {{ promotion.name }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="admin-content__form-divided">
                        <div class="mb-16">
                            <h3 class="admin-content__form-text">Số lượng</h3>
                            <div class="valid-elm input-group">
                                <input type="number" class="fs-16 form-control" placeholder="Nhập số lượng đồ uống" v-model="beverage.quantity"
                                v-bind:class="{'is-invalid': errors.quantity}" @blur="validate()">
                                <div class="invalid-feedback" v-if="errors.quantity">{{ errors.quantity }}</div>
                            </div>
                        </div>
                        <div class="mb-16">
                            <h3 class="admin-content__form-text">Đơn vị tính</h3>
                            <div class="input-group">
                                <select class="valid-elm form-select" v-model="beverage.unitId">
                                    <option disabled value="">Chọn đơn vị tính đồ uống</option>
                                    <option v-for="unit in units" :key="unit._id" :value="unit._id">
                                        {{ unit.name }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="admin-content__form-divided" v-if="this.$route.params.id">
                        <div class="mb-16">
                            <h3 class="admin-content__form-text">Danh mục đồ uống</h3>
                            <div class="valid-elm input-group mb-4">   
                                <input type="text" class="fs-16 form-control" readonly :value="getBeverageCategoryName">
                            </div>
                        </div>
                        <div class="mb-16">
                            <h3 class="admin-content__form-text white">.</h3>
                            <div class="input-group">
                                <select class="valid-elm form-select" ref="selectedCategory">
                                    <option disabled value="">Chọn danh mục đồ uống</option>
                                    <option v-for="category in categories" :key="category._id" :value="category._id">
                                        {{ category.name }}
                                    </option>
                                </select>
                                <button class="valid-elm btn btn-outline-secondary admin-content__form-btn-with-icon" type="button" @click="addCategory(parseInt($refs.selectedCategory.value))">
                                    Thêm
                                    <img src="@/assets/img/add.png">
                                </button>
                                <button class="valid-elm btn btn-outline-secondary admin-content__form-btn-with-icon" type="button" @click="removeCategory(parseInt($refs.selectedCategory.value))">
                                    Xóa
                                    <img src="@/assets/img/trash.png">
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="mb-16" v-else>
                        <h3 class="admin-content__form-text">Danh mục đồ uống</h3>
                        <div class="input-group">
                            <select class="valid-elm form-select" v-model="beverage.categoryId">
                                <option disabled value="">Chọn danh mục đồ uống</option>
                                <option v-for="category in categories" :key="category._id" :value="category._id">
                                    {{ category.name }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="mb-16" v-if="this.$route.params.id">
                        <h3 class="admin-content__form-text">Trạng thái</h3>
                        <select class="valid-elm form-select" v-model="beverage.status">
                            <option disabled value="">Chọn trạng thái đồ uống</option>
                            <option v-for="(label, value) in statusOptions" :key="value" :value="value">
                                {{ label }}
                            </option>
                        </select>
                    </div>
                    <div class="mb-16 admin-content__form-btn">
                        <button type="submit" class="fs-16 btn btn-primary">Xác nhận</button>
                    </div>
                </div>
                </form>
            </div>
            <!-- beverage ingredient -->
            <div class="admin-content__table" v-if="this.$route.params.id">
                <div class="admin-content__header d-flex align-items-center">
                    <h4>Form chi tiết thành phần</h4>
                </div>
                <table class="table admin-content__table-main">
                    <thead class="admin-content__table-main-head">
                        <tr class="admin-content__table-first-row">
                            <th scope="col">ID</th>
                            <th scope="col">Nguyên liệu</th>
                            <th scope="col">Số lượng</th>
                            <th scope="col">Đơn vị tính</th>
                            <th scope="col" class="col-2"></th>
                        </tr>
                    </thead>
                    <tbody class="admin-content__table-main-body">
                        <template v-if="beverageIngredients.length > 0">
                            <tr class="admin-content__table-row" v-for="beverageIngredient in beverageIngredients" :key="beverageIngredient._id">
                                <th>{{ beverageIngredient._id }}</th>
                                <td>{{ getAttributeFromObject(beverageIngredient.ingredientId, 'name') }}</td>
                                <td>{{ beverageIngredient.quantity }}</td>
                                <td>{{ getAttributeFromObject(beverageIngredient.unitId, 'name') }}</td>
                                <td>
                                    <router-link :to="'/admin/beverageIngredient/edit/' + beverageIngredient._id" class="fs-16 btn btn-primary">Sửa</router-link>&nbsp;
                                    <button class="fs-16 btn btn-danger" @click="onDelete(beverageIngredient._id)">Xóa</button>
                                </td>
                            </tr>
                        </template>
                        <template v-else>
                            <tr>
                                <td colspan="5" class="text-center">
                                    Bạn chưa có chi tiết thành phần nào.
                                    <router-link to="/admin/beverageIngredient/create">Thêm chi tiết thành phần</router-link>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
                <div class="admin-content__table-footer"></div>
            </div>
        </div>
    </AdminHeightWrapperComponent>
</template>

<script>
import { getImagePath, isExists, getAttributeFromObjectArray, getAttributeFromObject, attributeValuesToString } from '@/helpers/helpers.js'
import { swalFire, swalMixin } from '@/helpers/swal.js'
import AdminHeightWrapperComponent from '@/components/AdminHeightWrapperComponent.vue'

export default {
    name: 'BeverageForm',
    components: {
        AdminHeightWrapperComponent
    },
    computed: {
        getBeverageCategoryName() {
            return attributeValuesToString(this.beverage.categoryId, 'name')
        }
    },
    data() {
        return {
            errors: {
                name: '',
                listPrice: '',
                quantity: '',
            },
            beverage: {},
            statusOptions: {},
            categories: [], units: [], suppliers: [], promotions: [], beverageIngredients: [],
        }
    },
    created() {
        this.getAllCategories()
        this.getAllUnits()
        this.getAllSuppliers()
        this.getAllPromotions()
        let beverageId = this.$route.params.id
        if (beverageId) {
            this.getBeverage(beverageId)
            this.getBeverageIngredients(beverageId)
        }
    },
    methods: {
        swalFire, swalMixin, getImagePath, isExists, getAttributeFromObjectArray, getAttributeFromObject, attributeValuesToString,
        validate() {
            let isValid = true
            this.errors = {
                name: '',
                listPrice: '',
                quantity: '',
            }
            if (!this.beverage.name) {
                this.errors.name = 'Tên đồ uống không được để trống.'
                isValid = false
            }
            if (this.beverage.listPrice < 0) {
                this.errors.listPrice = 'Giá niêm yết phải lớn hơn hoặc bằng 0.'
                isValid = false
            }
            if (this.beverage.quantity < 0) {
                this.errors.quantity = 'Số lượng phải lớn hơn hoặc bằng 0.'
                isValid = false
            }
            return isValid
        },
        getBeverage(beverageId) {
            this.$request.get(`http://localhost:8080/admin/beverage/${beverageId}`).then(res => {
                this.beverage = res.data.beverage
                this.statusOptions = res.data.BEVERAGE_STATUS_OPTIONS
            })
        },
        getBeverageIngredients(beverageId) {
            this.$request.get(`http://localhost:8080/admin/beverageIngredient/findByBeverage/${beverageId}`).then(res => {
                this.beverageIngredients = res.data
            })
        },
        getAllCategories() {
            this.$request.get('http://localhost:8080/admin/category/all').then(res => {
                this.categories = res.data
            })
        },
        getAllUnits() {
            this.$request.get('http://localhost:8080/admin/unit/all').then(res => {
                this.units = res.data
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
        save() {
            if (!this.validate()) {
                this.swalMixin('error', 'Dữ liệu bạn nhập không đúng định dạng. Vui lòng kiểm tra lại!')
                return
            }
            const file = this.$refs.imageInput.files[0]
            const formData = new FormData()
            if (file) formData.append('image', file)
            for (let k in this.beverage) {
                formData.append(k, this.beverage[k])
            }
            if (this.beverage._id) {
                formData.delete('images')
                formData.delete('categoryId')
                this.$request.put(`http://localhost:8080/admin/beverage/${this.beverage._id}`, formData).then(() => {
                    this.swalFire("Cập nhật thành công!", "Thông tin về đồ uống đã được cập nhật!", "success")
                    .then(() => {
                        this.$router.push({name: 'admin.beverages'})
                    })
                })
            }
            else {
                this.$request.post('http://localhost:8080/admin/beverage/create', formData).then(() => {
                    this.swalFire("Thêm thành công!", "Đồ uống mới đã được thêm vào hệ thống!", "success")
                    .then(() => {
                        this.$router.push({name: 'admin.beverages'})
                    })
                })
            }
        },
        addImage() {
            const file = this.$refs.imageInput.files[0];
            if (!file) {
                this.swalMixin('error', 'Vui lòng chọn ảnh trước khi thêm!')
                return
            }
            if (this.beverage._id) {
                const formData = new FormData()
                formData.append('image', file)      // phải để dưới dạng image: xyz do bên server mình cấu hình chỉ nhận các file image 
                this.$request.patch(`http://localhost:8080/admin/beverage/${this.beverage._id}/addImage`, formData).then(() => {
                    this.swalFire("Thêm thành công!", "Ảnh của bạn đã được thêm vào đồ uống!", "success")
                    .then(() => {
                        this.getBeverage(this.beverage._id)
                    })
                })
            }
        },
        removeImage(imageName) {
            if (this.beverage._id && imageName) {
                this.$request.patch(`http://localhost:8080/admin/beverage/${this.beverage._id}/removeImage`, { imageName }).then(() => {
                    this.swalFire("Xóa thành công!", "Ảnh của bạn đã xóa khỏi đồ uống!", "success")
                    .then(() => {
                        this.getBeverage(this.beverage._id)
                    })
                })
            }
        },
        addCategory(selectedCategoryId) {
            const beverageCategoryId = getAttributeFromObjectArray(this.beverage.categoryId, '_id')
            if (isExists(beverageCategoryId, selectedCategoryId)) {
                this.swalMixin('error', 'Danh mục này đã có trong đồ uống!')
                return
            }
            this.$request.patch(`http://localhost:8080/admin/beverage/${this.beverage._id}/addCategory`, {
                selectedCategoryId: selectedCategoryId
            }).then(() => {
                this.swalFire("Thêm thành công!", "Danh mục đã được thêm vào đồ uống!", "success")
                .then(() => {
                    this.getBeverage(this.beverage._id)
                })
            })
        },
        removeCategory(selectedCategoryId) {
            const beverageCategoryId = getAttributeFromObjectArray(this.beverage.categoryId, '_id')
            if (!isExists(beverageCategoryId, selectedCategoryId)) {
                this.swalMixin('error', 'Danh mục này không có trong đồ uống!')
                return
            }
            this.$request.patch(`http://localhost:8080/admin/beverage/${this.beverage._id}/removeCategory`, {
                selectedCategoryId: selectedCategoryId
            }).then(() => {
                this.swalFire("Xóa thành công!", "Danh mục đã được xóa khỏi đồ uống!", "success")
                .then(() => {
                    this.getBeverage(this.beverage._id)
                })
            })
        },
        onDelete(beverageIngredientId) {
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
                this.$request.delete(`http://localhost:8080/admin/beverageIngredient/${beverageIngredientId}`).then(() => {
                    this.swalFire("Xóa chi tiết thành phần thành công!", "Chi tiết thành phần đã được xóa khỏi đồ uống.", "success")
                    .then(() => {
                        this.getBeverageIngredients(this.beverage._id)
                    })
                })
            }
            });
        },
    }
}
</script>