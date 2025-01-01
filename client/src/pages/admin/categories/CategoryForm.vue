<template>
    <AdminContentWrapper :addHeight="50" contentSelector=".admin-content__form">
        <div class="admin-content__heading">
            <h3>Quản lý danh mục đồ uống</h3>
        </div>
        <!-- admin form -->
        <div class="admin-content__form">
            <div class="admin-content__header">
                <h4 v-if="this.$route.params.id">Form sửa danh mục đồ uống</h4>
                <h4 v-else>Form thêm danh mục đồ uống</h4>
            </div>
            <form @submit.prevent="save()">
            <div class="admin-content__form-body">
                <div v-if="this.$route.params.id" class="mb-16">
                    <h3 class="admin-content__form-text">Mã danh mục đồ uống</h3>
                    <div class="valid-elm input-group">
                        <input type="text" class="fs-16 form-control" disabled v-model="category._id">
                    </div>
                </div>
                <div class="mb-16">
                    <h3 class="admin-content__form-text">Tên danh mục đồ uống</h3>
                    <div class="valid-elm input-group">
                        <input type="text" class="fs-16 form-control" placeholder="Nhập tên danh mục đồ uống" v-model="category.name">
                    </div>
                </div>
                <div class="mb-16" v-if="this.$route.params.id">
                    <h3 class="admin-content__form-text">Slug</h3>
                    <div class="valid-elm input-group">
                        <input type="text" class="fs-16 form-control" readonly v-model="category.slug">
                    </div>
                </div>
                <div class="mb-16 height-105">
                    <h3 class="admin-content__form-text">Mô tả</h3>
                    <div class="valid-elm input-group">
                        <textarea class="fs-16 form-control" placeholder="Nhập mô tả danh mục đồ uống" rows="3" v-model="category.description"></textarea>
                    </div>
                </div>
                <div class="mb-16">
                    <h3 class="admin-content__form-text">Phân loại theo</h3>
                    <div class="valid-elm input-group">
                        <input type="text" class="fs-16 form-control" placeholder="Nhập phân loại danh mục đồ uống" v-model="category.type">
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
    name: 'CategoryForm',
    components: {
        AdminContentWrapper
    },
    data() {
        return {
            category: {}
        }
    },
    created() {
        let categoryId = this.$route.params.id
        if (categoryId) {
            this.getCategory(categoryId)
        }
    },
    methods: {
        getCategory(categoryId) {
            this.$request.get(`http://localhost:8080/admin/category/${categoryId}`).then(res => {
                this.category = res.data
            })
        },
        save() {
            if (this.category._id) {
                // sửa
                this.$request.put(`http://localhost:8080/admin/category/${this.category._id}`, this.category).then(() => {
                    this.$swal.fire({
                    title: "Sửa thành công!",
                    text: "Dữ liệu của bạn đã được chỉnh sửa!",
                    icon: "success"
                    }).then(() => {
                        this.$router.push({name: 'admin.categories'})
                    })
                })
            }
            else {
                // thêm
                this.$request.post('http://localhost:8080/admin/category/create', this.category).then(() => {
                    this.$swal.fire({
                    title: "Thêm thành công!",
                    text: "Dữ liệu của bạn đã được thêm!",
                    icon: "success"
                    }).then(() => {
                        this.$router.push({name: 'admin.categories'})
                    })
                })
            }
        },
    }
}
</script>