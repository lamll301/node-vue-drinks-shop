<template>
    <AdminHeightWrapperComponent :addHeight="50" contentSelector=".admin-content__container">
        <div class="admin-content__heading">
            <h3>Quản lý đơn hàng</h3>
        </div>
        <div class="admin-content__container">
            <div class="admin-content__form">
                <div class="admin-content__header">
                    <h4>Form thông tin đơn hàng</h4>
                </div>
                <form @submit.prevent="save()">
                <div class="admin-content__form-body">
                    <div class="mb-16">
                        <h3 class="admin-content__form-text">Mã đơn hàng</h3>
                        <div class="valid-elm input-group">
                            <input type="text" class="fs-16 form-control" disabled v-model="order._id">
                        </div>
                    </div>
                    <div class="admin-content__form-divided-3">
                        <div class="mb-16" v-if="order.customerId">
                            <h3 class="admin-content__form-text">Tên khách hàng</h3>
                            <div class="valid-elm input-group">
                                <input type="text" class="fs-16 form-control" disabled v-model="order.customerId.name">
                            </div>
                        </div>
                        <div class="mb-16" v-if="order.customerId">
                            <h3 class="admin-content__form-text">Số điện thoại</h3>
                            <div class="valid-elm input-group">
                                <input type="text" class="fs-16 form-control" disabled v-model="order.customerId.phone">
                            </div>
                        </div>
                        <div class="mb-16" v-if="order.customerId">
                            <h3 class="admin-content__form-text">Email</h3>
                            <div class="valid-elm input-group">
                                <input type="text" class="fs-16 form-control" disabled v-model="order.customerId.email">
                            </div>
                        </div>
                    </div>
                    <div class="mb-16" v-if="order.customerId">
                        <h3 class="admin-content__form-text">Địa chỉ</h3>
                        <div class="valid-elm input-group">
                            <input type="text" class="fs-16 form-control" disabled v-model="order.customerId.address">
                        </div>
                    </div>
                    <div class="admin-content__form-divided-3">
                        <div class="mb-16">
                            <h3 class="admin-content__form-text">Tổng tiền hàng</h3>
                            <div class="valid-elm input-group">
                                <input type="number" class="fs-16 form-control" v-model="order.subTotal">
                                <span class="fs-16 input-group-text">đồng</span>
                            </div>
                        </div>
                        <div class="mb-16">
                            <h3 class="admin-content__form-text">Tiền phí vận chuyển</h3>
                            <div class="valid-elm input-group">
                                <input type="number" class="fs-16 form-control" v-model="order.shippingFee">
                                <span class="fs-16 input-group-text">đồng</span>
                            </div>
                        </div>
                        <div class="mb-16">
                            <h3 class="admin-content__form-text">Tiền thuế</h3>
                            <div class="valid-elm input-group">
                                <input type="number" class="fs-16 form-control" v-model="order.tax">
                                <span class="fs-16 input-group-text">đồng</span>
                            </div>
                        </div>
                    </div>
                    <div class="admin-content__form-divided">
                        <div class="mb-16" v-if="order.voucherId">
                            <h3 class="admin-content__form-text">Mã voucher (nếu có)</h3>
                            <div class="valid-elm input-group">
                                <input type="text" class="fs-16 form-control" readonly v-model="order.voucherId.code">
                            </div>
                        </div>
                        <div class="mb-16" v-if="order.voucherId">
                            <h3 class="admin-content__form-text">Tiền voucher (nếu có)</h3>
                            <div class="valid-elm input-group">
                                <input type="number" class="fs-16 form-control" readonly v-model="order.voucherId.value">
                                <span class="fs-16 input-group-text">đồng</span>
                            </div>
                        </div>
                    </div>
                    <div class="mb-16">
                        <h3 class="admin-content__form-text">Tổng cộng</h3>
                        <div class="valid-elm input-group">
                            <input type="number" class="fs-16 form-control" v-model="order.total">
                            <span class="fs-16 input-group-text">đồng</span>
                        </div>
                    </div>
                    <div class="mb-16">
                        <h3 class="admin-content__form-text">Trạng thái</h3>
                        <select class="valid-elm form-select" v-model="order.status">
                            <option disabled value="">Chọn trạng thái đơn hàng</option>
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
            <!-- order detail -->
            <div class="admin-content__table">
                <div class="admin-content__header d-flex align-items-center">
                    <h4>Form chi tiết đơn hàng</h4>
                </div>
                <table class="table admin-content__table-main">
                    <thead class="admin-content__table-main-head">
                        <tr class="admin-content__table-first-row">
                            <th scope="col">ID</th>
                            <th scope="col">Tên đồ uống</th>
                            <th scope="col">Size</th>
                            <th scope="col">Số lượng</th>
                            <th scope="col">Giá tiền</th>
                            <th scope="col">Tổng cộng</th>
                            <th scope="col" class="col"></th>
                        </tr>
                    </thead>
                    <tbody class="admin-content__table-main-body">
                        <template v-if="orderDetails.length > 0">
                            <tr class="admin-content__table-row" v-for="orderDetail in orderDetails" :key="orderDetail._id">
                                <th>{{ orderDetail._id }}</th>
                                <td>{{ getAttributeFromObject(orderDetail.beverageId, 'name') }}</td>
                                <td>{{ orderDetail.size }}</td>
                                <td>{{ orderDetail.quantity }}</td>
                                <td>{{ orderDetail.price }}</td>
                                <td>{{ orderDetail.total }}</td>
                                <td>
                                    <router-link :to="'/admin/order/detail/' + orderDetail._id" class="fs-16 btn btn-primary">Sửa</router-link>&nbsp;
                                    <button class="fs-16 btn btn-danger" @click="onDelete(orderDetail._id)">Xóa</button>
                                </td>
                            </tr>
                        </template>
                        <template v-else>
                            <tr>
                                <td colspan="8" class="text-center">
                                    Không có chi tiết đơn hàng nào để hiển thị.
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
import { getAttributeFromObject } from '@/helpers/helpers.js'
import { swalFire, swalMixin } from '@/helpers/swal.js'
import AdminHeightWrapperComponent from '@/components/AdminHeightWrapperComponent.vue'

export default {
    name: 'OrderForm',
    components: {
        AdminHeightWrapperComponent
    },
    data() {
        return {
            order: {},
            statusOptions: {},
            orderDetails: [], vouchers: [],
        }
    },
    created() {
        let orderId = this.$route.params.id
        if (orderId) {
            this.getOrder(orderId)
            this.getOrderDetails(orderId)
        }
    },
    methods: {
        swalFire, swalMixin, getAttributeFromObject,
        getOrder(orderId) {
            this.$request.get(`http://localhost:8080/admin/order/${orderId}`).then(res => {
                this.order = res.data.order
                this.statusOptions = res.data.ORDER_STATUS_OPTIONS
            })
        },
        getOrderDetails(orderId) {
            this.$request.get(`http://localhost:8080/admin/order/${orderId}/order-details`).then(res => {
                this.orderDetails = res.data
            })
        },
        save() {
            console.log(this.order)
        },
        onDelete(orderDetailId) {
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
                this.$request.delete(`http://localhost:8080/admin/order/detail/${orderDetailId}`).then(() => {
                    this.swalFire("Xóa chi tiết đơn hàng thành công!", "Chi tiết đơn hàng đã được xóa khỏi đồ uống.", "success")
                    .then(() => {
                        this.getOrder(this.order._id)
                        this.getOrderDetails(this.order._id)
                    })
                })
            }
            });
        },
    }
}
</script>