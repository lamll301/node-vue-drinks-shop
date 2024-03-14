<template>
    <div class="admin-page" style="height: 800px;">
        <div class="admin-content">
            <div class="admin-content__heading">
                <h3>Quản lý đồ uống</h3>
            </div>
            <img src="">
            <!-- admin form -->
            <div class="admin-content__form">
                <div class="admin-content__header">
                    <h4 v-if="this.$route.params.id">Form sửa đồ uống</h4>
                    <h4 v-else>Form thêm đồ uống</h4>
                </div>
                <form @submit.prevent="save()" enctype="multipart/form-data">
                <div class="admin-content__form-body">
                    <div class="mb-16">
                        <h3 class="admin-content__form-text">Tên</h3>
                        <div class="valid-elm input-group">
                            <input type="text" class="fs-16 form-control" placeholder="Nhập tên đồ uống" 
                            v-model="beverage.name" v-bind:class="{'is-invalid': errors.name}" @blur="validate()">
                            <div class="invalid-feedback"
                                v-if="errors.name">
                                {{ errors.name }}
                            </div>
                        </div>
                    </div>
                    <div class="mb-16">
                        <h3 class="admin-content__form-text">Ảnh</h3>
                        <div class="valid-elm input-group">
                            <input type="file" class="fs-16 lh-30 form-control" name="image" accept="image/*" @change="handleImg($event)">
                        </div>
                    </div>
                    <div class="mb-16 height-105">
                        <h3 class="admin-content__form-text">Mô tả</h3>
                        <div class="valid-elm input-group">
                            <textarea class="fs-16 form-control" rows="3" v-model="beverage.description"></textarea>
                        </div>
                    </div>
                    <div class="mb-16">
                        <h3 class="admin-content__form-text">Giá niêm yết</h3>
                        <div class="valid-elm input-group">
                            <input type="number" class="fs-16 form-control" v-model="beverage.listingPrice">
                            <span class="fs-16 input-group-text">đồng</span>
                        </div>
                    </div>
                    <div class="admin-content__form-divided">
                        <div class="mb-16">
                            <h3 class="admin-content__form-text">Số lượng trên cửa hàng</h3>
                            <div class="valid-elm input-group">
                                <input type="number" class="fs-16 form-control" placeholder="" v-model="beverage.quantity">
                            </div>
                        </div>
                        <div class="mb-16">
                            <h3 class="admin-content__form-text">Số lượng tồn kho</h3>
                            <div class="valid-elm input-group">
                                <input type="number" class="fs-16 form-control" placeholder="" v-model="beverage.inventoryQuantity">
                            </div>
                        </div>
                    </div>
                    <div class="mb-16">
                        <h3 class="admin-content__form-text">Trạng thái</h3>
                        <select class="valid-elm form-select" v-model="beverage.status">
                            <option disabled value="">Chọn trạng thái đồ uống</option>
                            <option>Hoạt động</option>
                            <option>Hết hàng</option>
                            <option>Tạm ngưng</option>
                        </select>
                    </div>
                    <div class="mb-16 admin-content__form-btn">
                        <button type="submit" class="fs-16 btn btn-primary">Xác nhận</button>
                        <button v-if="this.$route.params.id" type="button" class="fs-16 btn btn-danger" @click="onDelete()">Xóa</button>
                    </div>
                </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name: 'BeverageForm',
    data() {
        return {
            errors: {
                name: '',
            },
            beverage: {}
        }
    },
    created() {
        let beverageId = this.$route.params.id
        if (beverageId) {
            this.getBeverage(beverageId)
        }
    },
    methods: {
        validate() {
            let isValid = true
            this.errors = {
                name: '',
            }
            if (!this.beverage.name) {
                this.errors.name = 'Tên đồ uống không được để trống'
                isValid = false
            }
            return isValid
        },
        getBeverage(beverageId) {
            this.$request.get(`http://localhost:8080/admin/beverage/${beverageId}`).then(res => {
                this.beverage = res.data
            })
        },
        handleImg(event) {
            let img = event.target.files[0]
            if (img) {
                this.beverage.image = img
            }
        },
        save() {
            if (this.validate()) {
                if (this.beverage._id) {
                    // sửa
                    const beverageForm = new FormData()
                    for (let key in this.beverage) {
                        beverageForm.append(key, this.beverage[key])
                    }
                    this.$request.put(`http://localhost:8080/admin/beverage/${this.beverage._id}`, beverageForm).then(res => {
                        this.$router.push({name: 'admin.beverages'})
                    })
                }
                else {
                    // thêm
                    const beverageForm = new FormData()
                    for (let key in this.beverage) {
                        beverageForm.append(key, this.beverage[key])
                    }
                    console.log(beverageForm)
                    this.$request.post('http://localhost:8080/admin/beverage/create', beverageForm).then(res => {
                        this.$router.push({name: 'admin.beverages'})
                    })
                }
            }
        },
        onDelete() {
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
                this.$request.delete(`http://localhost:8080/admin/beverage/${this.beverage._id}`).then(() => {
                    this.$swal.fire({
                    title: "Xóa thành công!",
                    text: "Dữ liệu của bạn đã được xóa.",
                    icon: "success"
                    })
                    .then(() => {
                        this.$router.push({name: 'admin.beverages'})
                    })
                })
            }
            });
        }
    }
}
</script>