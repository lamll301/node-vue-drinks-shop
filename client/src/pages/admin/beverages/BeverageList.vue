<template>
    <div class="admin-page" style="height: 1500px;">
        <div class="admin-content">
            <div class="admin-content__heading">
                <h3>Quản lý đồ uống</h3>
                <router-link to="/admin/beverage/create" class="admin-content__create">Thêm đồ uống</router-link>
            </div>
            <!-- admin table -->
            <div class="admin-content__table">
                <div class="admin-content__header">
                    <h4>Tất cả đồ uống</h4>
                </div>
                <table class="table admin-content__table-main">
                    <thead class="admin-content__table-main-head">
                        <tr class="admin-content__table-first-row">
                            <th scope="col">#</th>
                            <th scope="col">Tên</th>
                            <th scope="col">Giá niêm yết</th>
                            <th scope="col">Trạng thái</th>
                            
                        </tr>
                    </thead>
                    <tbody class="admin-content__table-main-body">
                        <tr class="admin-content__table-row" v-for="(beverage, index) in beverages" :key="index">
                            <th>{{ index + 1}}</th>
                            <td >
                                <div class="admin-content__table-name-cell">
                                    <div class="admin-content__table-img-cell">
                                        <img :src="getImgPath(beverage.imageName)" alt="">
                                    </div>
                                    <router-link :to="{ name: 'admin.beverages.edit', params: { id: beverage._id } }">{{ beverage.name }}</router-link>
                                </div>
                            </td>
                            <td>{{ beverage.listingPrice }}</td>
                            <td>{{ beverage.status }}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="admin-content__table-footer">
                    <a href="">Xem tất cả</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BeverageList',
    data() {
        return {
            beverages: []
        }
    },
    created() {
        this.getAll()
    },
    methods: {
        getAll() {
            this.$request.get('http://localhost:8080/admin/beverage').then(res => {
                this.beverages = res.data
            })
        },
        getImgPath(imgName) {
            try {
                return require(`../../../assets/img/products/${imgName}`)
            }
            catch {
                return require(`../../../assets/img/no-img-available.jpg`)
            }
        }
    }
}
</script>