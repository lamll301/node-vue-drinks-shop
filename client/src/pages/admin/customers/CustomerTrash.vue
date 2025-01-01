    <template>
    <AdminHeightWrapperComponent :addHeight="100" contentSelector=".admin-content__table">
        <div class="admin-content__heading">
            <h3>Quản lý thùng rác</h3>
        </div>
        <div class="admin-content__table">
            <div class="admin-content__header d-flex align-items-center">
                <h4>Khách hàng đã xóa</h4>
                <select id="selectCheckboxAction" class="form-select admin-content__checkbox-select-all-opts">
                    <option value="" selected>-- Hành động --</option>
                    <option value="forceDelete">Xóa vĩnh viễn</option>
                    <option value="restore">Khôi phục</option>
                </select>
                <button class="fs-16 btn btn-primary disabled" id="btnCheckboxSubmit" @click="btnCheckboxSubmitClicked()">Thực hiện</button>
            </div>
            <table class="table admin-content__table-main">
                <thead class="admin-content__table-main-head">
                    <tr class="admin-content__table-first-row">
                        <th scope="col">
                            <input class="form-check-input admin-content__checkbox" type="checkbox" ref="checkboxAll" @change="onCheckboxAllChange($event)">
                        </th>
                        <th scope="col">ID
                            <SortComponent field="_id" :sort="sort"/>
                        </th>
                        <th scope="col">Tài khoản
                            <SortComponent field="accountId" :sort="sort"/>
                        </th>
                        <th scope="col">Tên khách hàng
                            <SortComponent field="name" :sort="sort"/>
                        </th>
                        <th scope="col">Địa chỉ
                            <SortComponent field="address" :sort="sort"/>
                        </th>
                        <th scope="col">Số điện thoại
                            <SortComponent field="phone" :sort="sort"/>
                        </th>
                        <th scope="col">Email
                            <SortComponent field="email" :sort="sort"/>
                        </th>
                        <th scope="col">Ngày xóa
                            <SortComponent field="deletedAt" :sort="sort"/>
                        </th>
                        <th scope="col" class="col-3"></th> 
                    </tr>
                </thead>
                <tbody class="admin-content__table-main-body">
                    <template v-if="customers.length > 0">
                        <tr class="admin-content__table-row" v-for="customer in customers" :key="customer._id">
                            <th>
                                <input class="form-check-input" type="checkbox" ref="checkboxes" :value="customer._id" @change="onCheckboxChange()">
                            </th>
                            <th>{{ customer._id }}</th>
                            <td>{{ getAttributeFromObject(customer.accountId, 'username') }}</td>
                            <td>{{ customer.name }}</td>
                            <td>{{ customer.address }}</td>
                            <td>{{ customer.phone }}</td>
                            <td>{{ customer.email }}</td>
                            <td>{{ convertDate(customer.deletedAt) }}</td>
                            <td>
                                <button class="fs-16 btn btn-primary" @click="onRestore(customer._id)">Khôi phục</button>&nbsp;
                                <button class="fs-16 btn btn-danger" @click="onDelete(customer._id)">Xóa vĩnh viễn</button>
                            </td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr>
                            <td colspan="9" class="text-center">
                                Thùng rác trống.
                                <router-link to="/admin/customer">Danh sách khách hàng</router-link>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
            <div class="admin-content__table-footer"></div>
        </div>
        <PaginationComponent :totalPages="totalPages" :currentPage="currentPage"/>
    </AdminHeightWrapperComponent>
</template>

<script>
/* eslint-disable */
import { convertDate, getAttributeFromObject } from '@/helpers/helpers.js'
import { swalMixin, swalFire } from '@/helpers/swal.js'
import PaginationComponent from '@/components/PaginationComponent.vue'
import AdminHeightWrapperComponent from '@/components/AdminHeightWrapperComponent.vue'
import SortComponent from '@/components/SortComponent.vue'

export default {
    name: 'CustomerTrash',
    components: {
        PaginationComponent,
        AdminHeightWrapperComponent,
        SortComponent
    },
    watch: {
        '$route.query': 'getAll',
    },
    data() {
        return {
            customers: [],
            totalPages: 0, currentPage: 1,
            sort: {},
            customerIds: [],
        }
    },
    created() {
        this.getAll()
    },
    methods: {
        swalMixin, swalFire, convertDate, getAttributeFromObject,
        getAll() {
            const params = new URLSearchParams(this.$route.query).toString()
            this.$request.get(`http://localhost:8080/admin/customer/trash?${params}`).then(res => {
                this.customers = res.data.customers
                this.totalPages = res.data.totalPages
                this.sort = res.data._sort
                this.currentPage = parseInt(this.$route.query.page) || 1
            })
        },
        onDelete(customerId) {
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
                this.$request.delete(`http://localhost:8080/admin/customer/${customerId}/force`).then(() => {
                    this.swalFire("Xóa thành công!", "Khách hàng bạn chọn đã được xóa vĩnh viễn khỏi hệ thống!", "success")
                    .then(() => {
                        this.getAll()
                    })
                })
            }
            });
        },
        onRestore(customerId) {
            this.$request.patch(`http://localhost:8080/admin/customer/${customerId}/restore`).then(() => {
                this.swalFire("Khôi phục thành công!", "Khách hàng bạn chọn đã được khôi phục!", "success")
                .then(() => {
                    this.getAll()
                })
            })
        },
        btnCheckboxSubmitClicked() {
            let selectedCheckboxAction = document.getElementById('selectCheckboxAction').value
            if (!selectedCheckboxAction) {
                this.swalMixin('error', 'Vui lòng chọn hành động trước khi thực hiện!')
                return
            }
            this.$request.post(`http://localhost:8080/admin/customer/handle-form-actions`, {
                action: selectedCheckboxAction,
                customerIds: this.customerIds,
            }).then(() => {
                this.swalFire("Thực hiện thành công!", "Hành động của bạn đã được thực hiện thành công!", "success")
                .then(() => {
                    this.getAll()
                    this.$refs.checkboxAll.checked = false;
                })
            })
        },
        onCheckboxAllChange(event) {
            let isChecked = event.target.checked
            let checkboxes = this.$refs.checkboxes
            if (!checkboxes) return
            checkboxes.forEach(checkbox => {
                checkbox.checked = isChecked;
            })
            let checkedCount = this.countCheckboxChecked()
            this.renderBtnCheckboxSubmit(checkedCount)
        },
        onCheckboxChange() {
            let checkedCount = this.countCheckboxChecked()
            let isCheckedAll = checkedCount === this.$refs.checkboxes.length
            this.$refs.checkboxAll.checked = isCheckedAll
            this.renderBtnCheckboxSubmit(checkedCount)
        },
        countCheckboxChecked() {
            let checkboxes = this.$refs.checkboxes
            if (!checkboxes) return 0

            let i = 0
            this.customerIds = []
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    i++
                    this.customerIds.push(checkbox.value)
                }
            })
            return i
        },
        renderBtnCheckboxSubmit(checkedCount) {
            let btnCheckboxSubmit = document.getElementById('btnCheckboxSubmit')
            if (checkedCount > 0) {
                btnCheckboxSubmit.classList.remove('disabled')
            }
            else btnCheckboxSubmit.classList.add('disabled')
        },
    }
}
</script>