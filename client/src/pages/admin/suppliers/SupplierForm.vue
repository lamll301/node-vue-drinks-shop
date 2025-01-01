<template>
    <AdminContentWrapper :addHeight="50" contentSelector=".admin-content__form">
        <div class="admin-content__heading">
            <h3>Quản lý nhà cung cấp</h3>
        </div>
        <img src="">
        <!-- admin form -->
        <div class="admin-content__form">
            <div class="admin-content__header">
                <h4 v-if="this.$route.params.id">Form sửa nhà cung cấp</h4>
                <h4 v-else>Form thêm nhà cung cấp</h4>
            </div>
            <form @submit.prevent="save()">
            <div class="admin-content__form-body">
                <div v-if="this.$route.params.id" class="mb-16">
                    <h3 class="admin-content__form-text">Mã nhà cung cấp</h3>
                    <div class="valid-elm input-group">
                        <input type="text" class="fs-16 form-control" disabled v-model="supplier._id">
                    </div>
                </div>
                <div class="mb-16">
                    <h3 class="admin-content__form-text">Tên nhà cung cấp</h3>
                    <div class="valid-elm input-group">
                        <input type="text" class="fs-16 form-control" placeholder="Nhập tên nhà cung cấp" v-model="supplier.name">
                    </div>
                </div>
                <div class="mb-16">
                    <h3 class="admin-content__form-text">Địa chỉ</h3>
                    <div class="valid-elm input-group">
                        <input type="text" class="fs-16 form-control" placeholder="Nhập địa chỉ nhà cung cấp" v-model="supplier.address">
                    </div>
                </div>
                <div class="mb-16">
                    <h3 class="admin-content__form-text">Số điện thoại</h3>
                    <div class="valid-elm input-group">
                        <input type="text" class="fs-16 form-control" placeholder="Nhập số điện thoại nhà cung cấp" v-model="supplier.phone"
                        v-bind:class="{'is-invalid': errors.phone}" @blur="validate()">
                        <div class="invalid-feedback" v-if="errors.phone">{{ errors.phone }}</div>
                    </div>
                </div>
                <div class="mb-16">
                    <h3 class="admin-content__form-text">Email</h3>
                    <div class="valid-elm input-group">
                        <input type="text" class="fs-16 form-control" placeholder="Nhập email nhà cung cấp" v-model="supplier.email"
                        v-bind:class="{'is-invalid': errors.email}" @blur="validate()">
                        <div class="invalid-feedback" v-if="errors.email">{{ errors.email }}</div>
                    </div>
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
import AdminContentWrapper from '@/components/AdminHeightWrapperComponent.vue'

export default {
    name: 'SupplierForm',
    components: {
        AdminContentWrapper
    },
    data() {
        return {
            errors: {
                phone: '',
                email: '',
            },
            supplier: {}
        }
    },
    created() {
        let supplierId = this.$route.params.id
        if (supplierId) {
            this.getSupplier(supplierId)
        }
    },
    methods: {
        validate() {
            let isValid = true;
            this.errors = {
                phone: '',
                email: '',
            }
            const phoneRegex = /^0\d{9}$/
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            // có thể để trống nhưng khi đã nhập phải đúng định dạng
            if (this.supplier.phone && !phoneRegex.test(this.supplier.phone)) {
                this.errors.phone = 'Số điện thoại không hợp lệ. Phải bắt đầu bằng số 0 và có 10 chữ số.'
                isValid = false
            }
            if (this.supplier.email && !emailRegex.test(this.supplier.email)) {
                this.errors.email = 'Email không hợp lệ.';
                isValid = false;
            }
            return isValid
        },
        getSupplier(supplierId) {
            this.$request.get(`http://localhost:8080/admin/supplier/${supplierId}`).then(res => {
                this.supplier = res.data
            })
        },
        save() {
            if (!this.validate()) {
                return
            }
            if (this.supplier._id) {
                // sửa
                this.$request.put(`http://localhost:8080/admin/supplier/${this.supplier._id}`, this.supplier).then(() => {
                    this.$swal.fire({
                    title: "Sửa thành công!",
                    text: "Dữ liệu của bạn đã được chỉnh sửa!",
                    icon: "success"
                    }).then(() => {
                        this.$router.push({name: 'admin.suppliers'})
                    })
                })
            }
            else {
                // thêm
                this.$request.post('http://localhost:8080/admin/supplier/create', this.supplier).then(() => {
                    this.$swal.fire({
                    title: "Thêm thành công!",
                    text: "Dữ liệu của bạn đã được thêm!",
                    icon: "success"
                    }).then(() => {
                        this.$router.push({name: 'admin.suppliers'})
                    })
                })
            }
        },
    }
}
</script>