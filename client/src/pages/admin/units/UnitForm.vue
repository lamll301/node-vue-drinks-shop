<template>
    <AdminContentWrapper :addHeight="50" contentSelector=".admin-content__form">
        <div class="admin-content__heading">
            <h3>Quản lý đơn vị tính</h3>
        </div>
        <img src="">
        <div class="admin-content__form">
            <div class="admin-content__header">
                <h4 v-if="this.$route.params.id">Form sửa đơn vị tính</h4>
                <h4 v-else>Form thêm đơn vị tính</h4>
            </div>
            <form @submit.prevent="save()">
            <div class="admin-content__form-body">
                <div v-if="this.$route.params.id" class="mb-16">
                    <h3 class="admin-content__form-text">Mã đơn vị tính</h3>
                    <div class="valid-elm input-group">
                        <input type="text" class="fs-16 form-control" disabled v-model="unit._id">
                    </div>
                </div>
                <div class="mb-16">
                    <h3 class="admin-content__form-text">Tên đơn vị tính</h3>
                    <div class="valid-elm input-group">
                        <input type="text" class="fs-16 form-control" placeholder="Nhập tên đơn vị tính" v-model="unit.name"
                        v-bind:class="{'is-invalid': errors.name}" @blur="validate()">
                        <div class="invalid-feedback" v-if="errors.name">{{ errors.name }}</div>
                    </div>
                </div>
                <div class="mb-16 height-105">
                    <h3 class="admin-content__form-text">Mô tả</h3>
                    <div class="valid-elm input-group">
                        <textarea class="fs-16 form-control" rows="3" placeholder="Nhập mô tả đơn vị tính" v-model="unit.description"></textarea>
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
import { swalFire } from '@/helpers/swal.js'
import AdminContentWrapper from '@/components/AdminHeightWrapperComponent.vue'

export default {
    name: 'UnitForm',
    components: {
        AdminContentWrapper
    },
    data() {
        return {
            errors: {
                name: '',
            },
            unit: {}
        }
    },
    created() {
        let unitId = this.$route.params.id
        if (unitId) {
            this.getUnit(unitId)
        }
    },
    methods: {
        swalFire,
        validate() {
            let isValid = true;
            this.errors = {
                name: '',
            }
            if (!this.unit.name) {
                this.errors.name = 'Tên đơn vị tính không được để trống.'
                isValid = false
            }
            return isValid
        },
        getUnit(unitId) {
            this.$request.get(`http://localhost:8080/admin/unit/${unitId}`).then(res => {
                this.unit = res.data
            })
        },
        save() {
            if (!this.validate()) return
            if (this.unit._id) {
                this.$request.put(`http://localhost:8080/admin/unit/${this.unit._id}`, this.unit).then(() => {
                    this.swalFire("Cập nhật thành công!", "Thông tin về đơn vị tính đã được cập nhật!", "success")
                    .then(() => {
                        this.$router.push({name: 'admin.units'})
                    })
                })
            }
            else {
                this.$request.post('http://localhost:8080/admin/unit/create', this.unit).then(() => {
                    this.swalFire("Thêm thành công!", "Đơn vị tính mới đã được thêm vào hệ thống!", "success")
                    .then(() => {
                        this.$router.push({name: 'admin.units'})
                    })
                })
            }
        },
    }
}
</script>