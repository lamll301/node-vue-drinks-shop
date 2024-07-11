<template>
    <div class="admin-page" :style="{ height: adminPageHeight }">
        <div class="admin-content">
            <div class="admin-content__heading">
                <h3>Quản lý tin tức</h3>
                <router-link to="/admin/report/create" class="admin-content__create">Thêm tin tức</router-link>
            </div>
            <!-- admin table -->
            <div class="admin-content__table">
                <div class="admin-content__header">
                    <h4>Tất cả tin tức</h4>
                </div>
                <table class="table admin-content__table-main">
                    <thead class="admin-content__table-main-head">
                        <tr class="admin-content__table-first-row">
                            <th scope="col">#</th>
                            <th scope="col">Tiêu đề</th>
                            <th scope="col">Tác giả</th>
                            <th scope="col">Tags</th>
                            <th scope="col">Ngày tạo</th>
                            <th scope="col">Ngày cập nhật</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col" class="col-2"></th>
                        </tr>
                    </thead>
                    <tbody class="admin-content__table-main-body">
                        <tr class="admin-content__table-row" v-for="(report, index) in reports" :key="index">
                            <th>{{ index + 1 }}</th>
                            <td>{{ report.title }}</td>
                            <td>{{ report.author }}</td>
                            <td>{{ report.tags }}</td>
                            <td>{{ report.createdAt }}</td>
                            <td>{{ report.updatedAt }}</td>
                            <td>{{ statusOptions[report.status] || report.status }}</td>
                            <td>
                                <router-link :to="'/admin/report/edit/' + report._id" class="fs-16 btn btn-primary">Sửa</router-link>&nbsp;
                                <button class="fs-16 btn btn-danger" @click="onDelete(report._id)">Xóa</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="admin-content__table-footer">
                    <a href="#">Xem tất cả</a>
                </div>
            </div>
            <nav>
                <ul class="pagination custom-pagination">
                  <li class="page-item custom-page-item">
                    <a class="page-link custom-page-link" href="#">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  <li class="page-item custom-page-item"><a class="page-link custom-page-link" href="#">1</a></li>
                  <li class="page-item custom-page-item"><a class="page-link custom-page-link" href="#">2</a></li>
                  <li class="page-item custom-page-item"><a class="page-link custom-page-link" href="#">3</a></li>
                  <li class="page-item custom-page-item">
                    <a class="page-link custom-page-link" href="#">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name: 'ReportList',
    data() {
        return {
            adminPageHeight: 'auto',
            reports: [],
            statusOptions: {}
        }
    },
    created() {
        this.getAll()
    },
    mounted() {
        this.$nextTick(() => {
            this.setAdminPageHeight();
        });
    },
    methods: {
        getAll() {
            this.$request.get('http://localhost:8080/admin/report').then(res => {
                this.reports = res.data.reports.map(report => {
                    return {
                        ...report,
                        tags: this.transformTagsToString(report.tags)
                    }
                })
                this.statusOptions = res.data.reportStatusOptions
                this.$nextTick(() => {
                    this.setAdminPageHeight()
                })
            })
        },
        onDelete(reportId) {
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
                this.$request.delete(`http://localhost:8080/admin/report/${reportId}`).then(() => {
                    this.$swal.fire({
                    title: "Xóa thành công!",
                    text: "Dữ liệu của bạn đã được xóa.",
                    icon: "success"
                    })
                    .then(() => {
                        this.getAll()
                    })
                })
            }
            });
        },
        transformTagsToString(tagsArray) {      // chuyển string[] => string
            if (Array.isArray(tagsArray)) {
                return tagsArray.join(', ');
            }
            return '';
        },
        setAdminPageHeight() {
            this.$nextTick(() => {
                const adminContentForm = document.querySelector('.admin-content__table');
                const adminContentFormHeight = adminContentForm.clientHeight
                this.adminPageHeight = `${adminContentFormHeight + 100}px`;
            })
        },
    }
}
</script>