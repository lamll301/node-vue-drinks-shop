<template>
    <AdminContentWrapper :addHeight="50" contentSelector=".admin-content__form">
        <div class="admin-content__heading">
            <h3>Quản lý voucher</h3>
        </div>
        <img src="">
        <div class="admin-content__form">
            <div class="admin-content__header">
                <h4 v-if="this.$route.params.id">Form sửa voucher</h4>
                <h4 v-else>Form thêm voucher</h4>
            </div>
            <form @submit.prevent="save()">
            <div class="admin-content__form-body">
                <div v-if="this.$route.params.id" class="mb-16">
                    <h3 class="admin-content__form-text">Mã voucher</h3>
                    <div class="valid-elm input-group">
                        <input type="text" class="fs-16 form-control" disabled v-model="voucher._id">
                    </div>
                </div>
                <div class="mb-16">
                    <h3 class="admin-content__form-text">Code</h3>
                    <div class="valid-elm input-group">
                        <input type="text" class="fs-16 form-control" placeholder="Nhập mã code cho voucher" v-model="voucher.code"
                        v-bind:class="{'is-invalid': errors.code}" @blur="validate()">
                        <div class="invalid-feedback" v-if="errors.code">{{ errors.code }}</div>
                    </div>
                </div>
                <div class="mb-16 height-105">
                    <h3 class="admin-content__form-text">Mô tả</h3>
                    <div class="valid-elm input-group">
                        <textarea class="fs-16 form-control" rows="3" placeholder="Nhập mô tả voucher" v-model="voucher.description"></textarea>
                    </div>
                </div>
                <div class="admin-content__form-divided">
                    <div class="mb-16">
                        <h3 class="admin-content__form-text">Giá trị</h3>
                        <div class="valid-elm input-group">
                            <input type="number" class="fs-16 form-control" placeholder="Nhập giá trị voucher" v-model="voucher.value"
                            v-bind:class="{'is-invalid': errors.value}" @blur="validate()">
                            <div class="invalid-feedback" v-if="errors.value">{{ errors.value }}</div>
                            <span class="fs-16 input-group-text">đồng</span>
                        </div>
                    </div>
                    <div class="mb-16">
                        <h3 class="admin-content__form-text">Số lượng</h3>
                        <div class="valid-elm input-group">
                            <input type="number" class="fs-16 form-control" placeholder="Nhập số lượng voucher" v-model="voucher.quantity"
                            v-bind:class="{'is-invalid': errors.quantity}" @blur="validate()">
                            <div class="invalid-feedback" v-if="errors.quantity">{{ errors.quantity }}</div>
                        </div>
                    </div>
                </div>
                <div class="admin-content__form-divided">
                    <div class="mb-16">
                        <h3 class="admin-content__form-text">Ngày bắt đầu</h3>
                        <div class="valid-elm input-group">
                            <input type="date" class="fs-16 form-control" v-model="voucher.startAt">
                        </div>
                    </div>
                    <div class="mb-16">
                        <h3 class="admin-content__form-text">Ngày kết thúc</h3>
                        <div class="valid-elm input-group">
                            <input type="date" class="fs-16 form-control" v-model="voucher.endAt">
                        </div>
                    </div>
                </div>
                <div class="mb-16" v-if="this.$route.params.id">
                    <h3 class="admin-content__form-text" >Trạng thái</h3>
                    <select class="valid-elm form-select" v-model="voucher.status">
                        <option disabled value="">Chọn trạng thái voucher</option>
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
    name: 'VoucherForm',
    components: {
        AdminContentWrapper
    },
    data() {
        return {
            errors: {
                code: '',
                value: '',
                quantity: '',
            },
            voucher: {},
            statusOptions: {},
        }
    },
    created() {
        let voucherId = this.$route.params.id
        if (voucherId) {
            this.getVoucher(voucherId)
        }
    },
    methods: {
        swalFire,
        validate() {
            let isValid = true;
            this.errors = {
                code: '',
                value: '',
                quantity: '',
            }
            if (!this.voucher.code) {
                this.errors.code = 'Code voucher không được để trống.'
                isValid = false
            }
            if (this.voucher.value <= 0) {
                this.errors.value = 'Giá trị voucher phải lớn hơn 0.'
                isValid = false
            }
            if (this.voucher.quantity < 0) {
                this.errors.quantity = 'Số lượng voucher phải lớn hơn hoặc bằng 0.'
                isValid = false
            }
            return isValid
        },
        getVoucher(voucherId) {
            this.$request.get(`http://localhost:8080/admin/voucher/${voucherId}`).then(res => {
                this.voucher = res.data.voucher
                this.statusOptions = res.data.VOUCHER_STATUS_OPTIONS
            })
        },
        save() {
            if (!this.validate()) return
            if (this.voucher._id) {
                this.$request.put(`http://localhost:8080/admin/voucher/${this.voucher._id}`, this.voucher).then(() => {
                    this.swalFire("Cập nhật thành công!", "Thông tin về voucher đã được cập nhật!", "success")
                    .then(() => {
                        this.$router.push({name: 'admin.vouchers'})
                    })
                })
            }
            else {
                this.$request.post('http://localhost:8080/admin/voucher/create', this.voucher).then(() => {
                    this.swalFire("Thêm thành công!", "Voucher mới đã được thêm vào hệ thống!", "success")
                    .then(() => {
                        this.$router.push({name: 'admin.vouchers'})
                    })
                })
            }
        },
    }
}
</script>