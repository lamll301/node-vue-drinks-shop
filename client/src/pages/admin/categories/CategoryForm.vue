<template>
    <div class="admin-page" :style="{ height: adminPageHeight }">
        <div class="admin-content">
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
                            <input type="text" class="fs-16 form-control" disabled v-model="category.slug">
                        </div>
                    </div>
                    <div class="mb-16 height-105">
                        <h3 class="admin-content__form-text">Mô tả</h3>
                        <div class="valid-elm input-group">
                            <textarea class="fs-16 form-control" placeholder="Nhập mô tả danh mục đồ uống" rows="3" v-model="category.description"></textarea>
                        </div>
                    </div>
                    <div class="mb-16">
                        <h3 class="admin-content__form-text">Ảnh danh mục đồ uống</h3>
                        <div class="valid-elm input-group">
                            <input type="file" class="fs-16 lh-30 form-control" name="image" accept="image/*" @change="handleImage($event)">
                            <button v-if="this.$route.params.id" type="button" class="btn btn-light fs-16 btn" @click="addImage()">Thêm ảnh</button>
                        </div>
                    </div>
                    <div>
                        <div v-for="image in category.images" :key="image._id" class="admin-content__image-container mr-16 mb-16">
                            <button type="button" class="btn btn-danger" @click="removeImage(image._id)">X</button>
                            <img v-bind:src="getImageSrc(image.name)" class="img-thumbnail height-width-200" alt="">
                        </div>
                    </div>
                    <div class="mb-16">
                        <h3 class="admin-content__form-text">Phân loại theo</h3>
                        <div class="valid-elm input-group">
                            <input type="text" class="fs-16 form-control" placeholder="Nhập phân loại danh mục đồ uống" v-model="category.classify">
                        </div>
                    </div>
                    <div class="mb-16 admin-content__form-btn">
                        <button type="submit" class="fs-16 btn btn-primary">Xác nhận</button>
                    </div>
                </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CategoryForm',
    data() {
        return {
            adminPageHeight: 'auto',
            category: {}
        }
    },
    created() {
        let categoryId = this.$route.params.id
        if (categoryId) {
            this.getCategory(categoryId)
        }
    },
    mounted() {     // được gọi khi component gán vào DOM và DOM sẵn sàng
        this.$nextTick(() => {      // đảm bảo render và DOM hoàn tất rồi mới tiến hành set height
            this.setAdminPageHeight();
        });
    },
    methods: {
        getCategory(categoryId) {
            this.$request.get(`http://localhost:8080/admin/category/${categoryId}`).then(res => {
                this.category = res.data
                // khi điền dữ liệu làm thay đổi height admin-content__form sẽ tiến hành cập nhật heigh admin-page
                this.$nextTick(() => {
                    this.setAdminPageHeight()
                })
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
                const categoryForm = new FormData()
                for (let k in this.category) {
                    categoryForm.append(k, this.category[k])
                }
                this.$request.post('http://localhost:8080/admin/category/create', categoryForm).then(() => {
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
        addImage() {
            if (this.category._id && this.category.image) {
                const categoryForm = new FormData()
                for (let k in this.category) {
                    categoryForm.append(k, this.category[k])
                }
                this.$request.put(`http://localhost:8080/admin/category/${this.category._id}/addImage`, categoryForm).then(() => {
                    this.$swal.fire({
                    title: "Thêm thành công!",
                    text: "Dữ liệu của bạn đã được thêm!",
                    icon: "success"
                    }).then(() => {
                        this.getCategory(this.category._id)
                        // khi thêm ảnh làm thay đổi height admin-content__form sẽ tiến hành cập nhật heigh admin-page
                        this.$nextTick(() => {
                            this.setAdminPageHeight()
                        })
                    })
                })
            }
        },
        removeImage(imageId) {
            if (this.category._id && imageId) {
                this.$request.put(`http://localhost:8080/admin/category/${this.category._id}/removeImage`, { imageId }).then(() => {
                    this.$swal.fire({
                    title: "Xóa thành công!",
                    text: "Dữ liệu của bạn đã được xóa!",
                    icon: "success"
                    }).then(() => {
                        this.getCategory(this.category._id)
                    })
                })
            }
        },
        handleImage(event) {
            let img = event.target.files[0]
            if (img) {
                this.category.image = img
            }
        },
        setAdminPageHeight() {
            this.$nextTick(() => {
                const adminContentForm = document.querySelector('.admin-content__form');
                const adminContentFormHeight = adminContentForm.clientHeight
                this.adminPageHeight = `${adminContentFormHeight + 50}px`;
            })
        },
        getImageSrc(imageName) {
            try {
                return require(`@/assets/img/data/${imageName}`)
            } catch {
                return require('@/assets/img/error.jpg')
            }
        }
    }
}
</script>