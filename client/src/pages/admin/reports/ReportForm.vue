<template>
    <AdminContentWrapper :addHeight="50" contentSelector=".admin-content__form">
        <div class="admin-content__heading">
            <h3>Quản lý tin tức</h3>
        </div>
        <!-- admin form -->
        <div class="admin-content__form">
            <div class="admin-content__header">
                <h4 v-if="this.$route.params.id">Form sửa tin tức</h4>
                <h4 v-else>Form thêm tin tức</h4>
            </div>
            <form @submit.prevent="save()">
            <div class="admin-content__form-body">
                <div v-if="this.$route.params.id" class="mb-16">
                    <h3 class="admin-content__form-text">Mã tin tức</h3>
                    <div class="valid-elm input-group">
                        <input type="text" class="fs-16 form-control" disabled v-model="report._id">
                    </div>
                </div>
                <div class="mb-16">
                    <h3 class="admin-content__form-text">Tiêu đề</h3>
                    <div class="valid-elm input-group">
                        <input type="text" class="fs-16 form-control" placeholder="Nhập tiêu đề" v-model="report.title"
                        v-bind:class="{'is-invalid': errors.title}" @blur="validate()">
                        <div class="invalid-feedback" v-if="errors.title">{{ errors.title }}</div>
                    </div>
                </div>
                <div class="mb-16">
                    <h3 class="admin-content__form-text">Tác giả</h3>
                    <div class="valid-elm input-group">
                        <input type="text" class="fs-16 form-control" placeholder="Nhập tác giả" v-model="report.author">
                    </div>
                </div>
                <div class="mb-16" v-if="this.$route.params.id">
                    <h3 class="admin-content__form-text">Slug</h3>
                    <div class="valid-elm input-group">
                        <input type="text" class="fs-16 form-control" readonly v-model="report.slug">
                    </div>
                </div>
                <div class="mb-16">
                    <h3 class="admin-content__form-text">Highlight</h3>
                    <div class="valid-elm input-group">
                        <input type="text" class="fs-16 form-control" placeholder="Nhập highlight tin tức" v-model="report.highlight">
                    </div>
                </div>
                <div class="mb-16 height-205">
                    <h3 class="admin-content__form-text">Nội dung</h3>
                    <div class="valid-elm input-group">
                        <textarea class="fs-16 form-control" placeholder="Nhập nội dung" rows="6" v-model="report.content"></textarea>
                    </div>
                </div>
                <div class="mb-16">
                    <h3 class="admin-content__form-text">Ảnh</h3>
                    <div class="valid-elm input-group">
                        <input type="file" class="fs-16 lh-30 form-control" name="image" accept="image/*" @change="handleImage($event)">
                        <button v-if="this.$route.params.id" type="button" class="btn btn-light fs-16 btn" @click="addImage()">Thêm ảnh</button>
                    </div>
                </div>
                <div>
                    <div v-for="image in report.images" :key="image._id" class="admin-content__image-container mr-16 mb-16">
                        <button type="button" class="btn btn-danger" @click="removeImage(image._id)">X</button>
                        <img v-bind:src="getImageSrc(image.name)" class="img-thumbnail height-width-200" alt="">
                    </div>
                </div>
                <div class="mb-16">
                    <h3 class="admin-content__form-text">Tags</h3>
                    <div class="valid-elm input-group">
                        <input type="text" class="fs-16 form-control" placeholder="Nhập tags" v-model="report.tags">
                    </div>
                </div>
                <div class="mb-16">
                    <h3 class="admin-content__form-text">Link</h3>
                    <div class="valid-elm input-group">
                        <input type="text" class="fs-16 form-control" placeholder="Nhập đường dẫn tới bài viết" v-model="report.link">
                    </div>
                </div>
                <div class="mb-16" v-if="this.$route.params.id">
                    <h3 class="admin-content__form-text">Trạng thái</h3>
                    <select class="valid-elm form-select" v-model="report.status">
                        <option disabled value="">Chọn trạng thái tin tức</option>
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
import AdminContentWrapper from '@/components/AdminHeightWrapperComponent.vue'

export default {
    name: 'ReportForm',
    components: {
        AdminContentWrapper
    },
    data() {
        return {
            errors: {
                title: '',
            },
            report: {},
            statusOptions: {}
        }
    },
    created() {
        let reportId = this.$route.params.id
        if (reportId) {
            this.getReport(reportId)
        }
    },
    methods: {
        validate() {
            let isValid = true
            this.errors = {
                title: '',
            }
            if (!this.report.title) {
                this.errors.title = 'Tiêu đề không được để trống.'
                isValid = false
            }
            if (!/[a-zA-Z0-9]/.test(this.report.title)) {
                this.errors.title = 'Tiêu đề phải chứa ít nhất một chữ cái hoặc chữ số.'
                isValid = false
            }
            return isValid
        },
        getReport(reportId) {
            this.$request.get(`http://localhost:8080/admin/report/${reportId}`).then(res => {
                this.report = res.data.report
                this.report.tags = this.handleTag(this.report.tags)
                this.statusOptions = res.data.REPORT_STATUS_OPTIONS
            })
        },
        save() {
            if (!this.validate()) {
                return;
            }
            // do formdata chỉ lưu string nên xử lý string phía server
            const reportForm = new FormData()
            for (let k in this.report) {
                reportForm.append(k, this.report[k])
            }
            if (this.report._id) {
                // sửa
                this.$request.put(`http://localhost:8080/admin/report/${this.report._id}`, reportForm).then(() => {
                    this.$swal.fire({
                    title: "Sửa thành công!",
                    text: "Dữ liệu của bạn đã được chỉnh sửa!",
                    icon: "success"
                    }).then(() => {
                        this.$router.push({name: 'admin.reports'})
                    })
                })
            }
            else {
                // thêm
                this.$request.post('http://localhost:8080/admin/report/create', reportForm).then(() => {
                    this.$swal.fire({
                    title: "Thêm thành công!",
                    text: "Dữ liệu của bạn đã được thêm!",
                    icon: "success"
                    }).then(() => {
                        this.$router.push({name: 'admin.reports'})
                    })
                })
            }
        },
        addImage() {
            if (this.report._id && this.report.image) {
                const reportForm = new FormData()
                for (let k in this.report) {
                    reportForm.append(k, this.report[k])
                }
                this.$request.put(`http://localhost:8080/admin/report/${this.report._id}/addImage`, reportForm).then(() => {
                    this.$swal.fire({
                    title: "Thêm thành công!",
                    text: "Dữ liệu của bạn đã được thêm!",
                    icon: "success"
                    }).then(() => {
                        this.getReport(this.report._id)
                    })
                })
            }
        },
        removeImage(imageId) {
            if (this.report._id && imageId) {
                this.$request.put(`http://localhost:8080/admin/report/${this.report._id}/removeImage`, { imageId }).then(() => {
                    this.$swal.fire({
                    title: "Xóa thành công!",
                    text: "Dữ liệu của bạn đã được xóa!",
                    icon: "success"
                    }).then(() => {
                        this.getReport(this.report._id)
                    })
                })
            }
        },
        //
        handleImage(event) {
            let img = event.target.files[0]
            if (img) {
                this.report.image = img
            }
        },
        getImageSrc(imageName) {
            try {
                return require(`@/assets/img/data/${imageName}`)
            } catch {
                return require('@/assets/img/error.jpg')
            }
        },
        handleTag(array) {      // chuyển string[] => string
            if (Array.isArray(array)) {
                return array.join(', ');
            }
            return '';
        },
    }
}
</script>