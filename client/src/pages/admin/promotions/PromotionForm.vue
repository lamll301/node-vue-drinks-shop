<template>
    <AdminContentWrapper :addHeight="50" contentSelector=".admin-content__form">
        <div class="admin-content__heading">
            <h3>Quản lý khuyến mãi</h3>
        </div>
        <img src="">
        <div class="admin-content__form">
            <div class="admin-content__header">
                <h4 v-if="this.$route.params.id">Form sửa khuyến mãi</h4>
                <h4 v-else>Form thêm khuyến mãi</h4>
            </div>
            <form @submit.prevent="save()">
            <div class="admin-content__form-body">
                <div v-if="this.$route.params.id" class="mb-16">
                    <h3 class="admin-content__form-text">Mã khuyến mãi</h3>
                    <div class="valid-elm input-group">
                        <input type="text" class="fs-16 form-control" disabled v-model="promotion._id">
                    </div>
                </div>
                <div class="mb-16">
                    <h3 class="admin-content__form-text">Tên khuyến mãi</h3>
                    <div class="valid-elm input-group">
                        <input type="text" class="fs-16 form-control" placeholder="Nhập tên khuyến mãi" v-model="promotion.name"
                        v-bind:class="{'is-invalid': errors.name}" @blur="validate()">
                        <div class="invalid-feedback" v-if="errors.name">{{ errors.name }}</div>
                    </div>
                </div>
                <div class="mb-16 height-105">
                    <h3 class="admin-content__form-text">Mô tả</h3>
                    <div class="valid-elm input-group">
                        <textarea class="fs-16 form-control" rows="3" placeholder="Nhập mô tả khuyến mãi" v-model="promotion.description"></textarea>
                    </div>
                </div>
                <div class="admin-content__form-divided">
                    <div class="mb-16">
                        <h3 class="admin-content__form-text">Phần trăm giảm</h3>
                        <div class="valid-elm input-group">
                            <input type="number" class="fs-16 form-control" placeholder="Nhập phần trăm giảm" v-model="promotion.discountPercentage"
                            v-bind:class="{'is-invalid': errors.discountPercentage}" @blur="validate()">
                            <div class="invalid-feedback" v-if="errors.discountPercentage">{{ errors.discountPercentage }}</div>
                        </div>
                    </div>
                    <div class="mb-16">
                        <h3 class="admin-content__form-text">Tiền giảm tối đa</h3>
                        <div class="valid-elm input-group">
                            <input type="number" class="fs-16 form-control" placeholder="Nhập tiền giảm tối đa" v-model="promotion.maxDiscountAmount"
                            v-bind:class="{'is-invalid': errors.maxDiscountAmount}" @blur="validate()">
                            <div class="invalid-feedback" v-if="errors.maxDiscountAmount">{{ errors.maxDiscountAmount }}</div>
                            <span class="fs-16 input-group-text">đồng</span>
                        </div>
                    </div>
                </div>
                <div class="admin-content__form-divided">
                    <div class="mb-16">
                        <h3 class="admin-content__form-text">Ngày bắt đầu</h3>
                        <div class="valid-elm input-group">
                            <input type="date" class="fs-16 form-control" v-model="promotion.startAt">
                        </div>
                    </div>
                    <div class="mb-16">
                        <h3 class="admin-content__form-text">Ngày kết thúc</h3>
                        <div class="valid-elm input-group">
                            <input type="date" class="fs-16 form-control" v-model="promotion.endAt">
                        </div>
                    </div>
                </div>
                <div class="mb-16" v-if="this.$route.params.id">
                    <h3 class="admin-content__form-text" >Trạng thái</h3>
                    <select class="valid-elm form-select" v-model="promotion.status">
                        <option disabled value="">Chọn trạng thái khuyến mãi</option>
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
    </AdminContentWrapper>
</template>

<script>
import { swalFire } from '@/helpers/swal.js'
import AdminContentWrapper from '@/components/AdminHeightWrapperComponent.vue'

export default {
    name: 'PromotionForm',
    components: {
        AdminContentWrapper
    },
    data() {
        return {
            errors: {
                name: '',
                discountPercentage: '',
                maxDiscountAmount: '',
            },
            promotion: {},
            statusOptions: {},
        }
    },
    created() {
        let promotionId = this.$route.params.id
        if (promotionId) {
            this.getPromotion(promotionId)
        }
    },
    methods: {
        swalFire,
        validate() {
            let isValid = true;
            this.errors = {
                name: '',
                discountPercentage: '',
                maxDiscountAmount: '',
            }
            if (!this.promotion.name) {
                this.errors.name = 'Tên khuyến mãi không được để trống.'
                isValid = false
            }
            if (this.promotion.discountPercentage < 0 || this.promotion.discountPercentage > 100) {
                this.errors.discountPercentage = 'Phần trăm giảm phải lớn hơn hoặc bằng 0 và nhỏ hơn hoặc bằng 100.'
                isValid = false
            }
            if (this.promotion.maxDiscountAmount < 0) {
                this.errors.maxDiscountAmount = 'Tiền giảm tối đa phải lớn hơn hoặc bằng 0.'
                isValid = false
            }
            return isValid
        },
        getPromotion(promotionId) {
            this.$request.get(`http://localhost:8080/admin/promotion/${promotionId}`).then(res => {
                this.promotion = res.data.promotion
                this.statusOptions = res.data.PROMOTION_STATUS_OPTIONS
            })
        },
        save() {
            if (!this.validate()) return
            if (this.promotion._id) {
                this.$request.put(`http://localhost:8080/admin/promotion/${this.promotion._id}`, this.promotion).then(() => {
                    this.swalFire("Cập nhật thành công!", "Thông tin về khuyến mãi đã được cập nhật!", "success")
                    .then(() => {
                        this.$router.push({name: 'admin.promotions'})
                    })
                })
            }
            else {
                this.$request.post('http://localhost:8080/admin/promotion/create', this.promotion).then(() => {
                    this.swalFire("Thêm thành công!", "Khuyến mãi mới đã được thêm vào hệ thống!", "success")
                    .then(() => {
                        this.$router.push({name: 'admin.promotions'})
                    })
                })
            }
        },
    }
}
</script>