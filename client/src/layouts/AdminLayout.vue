<template>
    <div class=" app flex">
        <header class="header-admin">
            <div class="header-admin__label">
                <router-link to="/admin" class="header-admin__text">Admin Dashboard</router-link>
            </div>
            <router-link to="/admin" class="header-admin__dash">
                <i class="header-admin__icon fa-solid fa-house"></i>
                Trang chủ
            </router-link>
            <div class="header-admin__label1">QUẢN TRỊ VIÊN</div>
            <div class="header-admin__dropdown">
                <div class="header-admin__dropdown-content">
                    <div class="header-admin__dropdown-content-text">
                        <i class="fa-solid fa-users header-admin__dropdown-icon"></i>
                        Quản lý phân quyền
                    </div>
                    <i class="fa-solid fa-chevron-down"></i>
                </div>
                <ul class="header-admin__dropdown-menu">
                    <li class="header-admin__dropdown-item"><router-link to="/admin/permission">Tất cả phân quyền</router-link></li>
                    <li class="header-admin__dropdown-item"><router-link to="/admin/permission/create">Thêm phân quyền</router-link></li>
                </ul>
            </div>
            <div class="header-admin__dropdown">
                <div class="header-admin__dropdown-content">
                    <div class="header-admin__dropdown-content-text">
                        <i class="fa-solid fa-user-tie header-admin__dropdown-icon"></i>
                        Quản lý tài khoản
                    </div>
                    <i class="fa-solid fa-chevron-down"></i>
                </div>
                <ul class="header-admin__dropdown-menu">
                    <li class="header-admin__dropdown-item"><router-link to="/admin/account">Tất cả tài khoản</router-link></li>
                    <li class="header-admin__dropdown-item"><router-link to="/admin/account/create">Thêm tài khoản</router-link></li>
                </ul>
            </div>
            <div class="header-admin__dropdown">
                <div class="header-admin__dropdown-content">
                    <div class="header-admin__dropdown-content-text">
                        <i class="fa-solid fa-icons header-admin__dropdown-icon"></i>
                        Quản lý đơn vị tính
                    </div>
                    <i class="fa-solid fa-chevron-down"></i>
                </div>
                <ul class="header-admin__dropdown-menu">
                    <li class="header-admin__dropdown-item"><router-link to="/admin/unit">Tất cả đơn vị tính</router-link></li>
                    <li class="header-admin__dropdown-item"><router-link to="/admin/unit/create">Thêm đơn vị tính</router-link></li>
                </ul>
            </div>
            <div class="header-admin__label1">NHÂN VIÊN HỆ THỐNG</div>
            <div class="header-admin__dropdown">
                <div class="header-admin__dropdown-content">
                    <div class="header-admin__dropdown-content-text">
                        <i class="fa-solid fa-mug-hot header-admin__dropdown-icon"></i>
                        Quản lý đồ uống
                    </div>
                    <i class="fa-solid fa-chevron-down"></i>
                </div>
                <ul class="header-admin__dropdown-menu">
                    <li class="header-admin__dropdown-item"><router-link to="/admin/beverage">Tất cả đồ uống</router-link></li>
                    <li class="header-admin__dropdown-item"><router-link to="/admin/beverage/create">Thêm đồ uống</router-link></li>
                    <li class="header-admin__dropdown-item"><router-link to="/admin/beverageIngredient/create">Thêm chi tiết thành phần</router-link></li>
                </ul>
            </div>
            <div class="header-admin__dropdown">
                <div class="header-admin__dropdown-content">
                    <div class="header-admin__dropdown-content-text">
                        <i class="fa-solid fa-seedling header-admin__dropdown-icon"></i>
                        Quản lý nguyên liệu
                    </div>
                    <i class="fa-solid fa-chevron-down"></i>
                </div>
                <ul class="header-admin__dropdown-menu">
                    <li class="header-admin__dropdown-item"><router-link to="/admin/ingredient">Tất cả nguyên liệu</router-link></li>
                    <li class="header-admin__dropdown-item"><router-link to="/admin/ingredient/create">Tạo nguyên liệu</router-link></li>
                </ul>
            </div>
            <div class="header-admin__dropdown">
                <div class="header-admin__dropdown-content">
                    <div class="header-admin__dropdown-content-text">
                        <i class="fa-solid fa-table-list header-admin__dropdown-icon"></i>
                        Quản lý danh mục
                    </div>
                    <i class="fa-solid fa-chevron-down"></i>
                </div>
                <ul class="header-admin__dropdown-menu">
                    <li class="header-admin__dropdown-item"><router-link to="/admin/category">Tất cả danh mục</router-link></li>
                    <li class="header-admin__dropdown-item"><router-link to="/admin/category/create">Thêm danh mục</router-link></li>
                </ul>
            </div>
            <div class="header-admin__dropdown">
                <div class="header-admin__dropdown-content">
                    <div class="header-admin__dropdown-content-text">
                        <i class="fa-solid fa-building header-admin__dropdown-icon"></i>
                        Quản lý nhà cung cấp
                    </div>
                    <i class="fa-solid fa-chevron-down"></i>
                </div>
                <ul class="header-admin__dropdown-menu">
                    <li class="header-admin__dropdown-item"><router-link to="/admin/supplier">Tất cả nhà cung cấp</router-link></li>
                    <li class="header-admin__dropdown-item"><router-link to="/admin/supplier/create">Thêm nhà cung cấp</router-link></li>
                </ul>
            </div>
            <div class="header-admin__dropdown">
                <div class="header-admin__dropdown-content">
                    <div class="header-admin__dropdown-content-text">
                        <i class="fa-solid fa-newspaper header-admin__dropdown-icon"></i>
                        Quản lý tin tức
                    </div>
                    <i class="fa-solid fa-chevron-down"></i>
                </div>
                <ul class="header-admin__dropdown-menu">
                    <li class="header-admin__dropdown-item"><router-link to="/admin/report">Tất cả tin tức</router-link></li>
                    <li class="header-admin__dropdown-item"><router-link to="/admin/report/create">Thêm tin tức</router-link></li>
                </ul>
            </div>
            <div class="header-admin__dropdown">
                <div class="header-admin__dropdown-content">
                    <div class="header-admin__dropdown-content-text">
                        <i class="fa-solid fa-percent header-admin__dropdown-icon"></i>
                        Quản lý khuyến mãi
                    </div>
                    <i class="fa-solid fa-chevron-down"></i>
                </div>
                <ul class="header-admin__dropdown-menu">
                    <li class="header-admin__dropdown-item"><router-link to="/admin/promotion">Tất cả khuyến mãi</router-link></li>
                    <li class="header-admin__dropdown-item"><router-link to="/admin/promotion/create">Thêm khuyến mãi</router-link></li>
                </ul>
            </div>
            <div class="header-admin__dropdown">
                <div class="header-admin__dropdown-content">
                    <div class="header-admin__dropdown-content-text">
                        <i class="fa-solid fa-ticket header-admin__dropdown-icon"></i>
                        Quản lý voucher
                    </div>
                    <i class="fa-solid fa-chevron-down"></i>
                </div>
                <ul class="header-admin__dropdown-menu">
                    <li class="header-admin__dropdown-item"><router-link to="/admin/voucher">Tất cả voucher</router-link></li>
                    <li class="header-admin__dropdown-item"><router-link to="/admin/voucher/create">Thêm voucher</router-link></li>
                </ul>
            </div>
            
            <!-- Nhan vien ban hang -->
            <div class="header-admin__label1">NHÂN VIÊN BÁN HÀNG</div>
            <div class="header-admin__dropdown">
                <div class="header-admin__dropdown-content">
                    <div class="header-admin__dropdown-content-text">
                        <i class="fa-solid fa-file header-admin__dropdown-icon"></i>
                        Quản lý đơn hàng
                    </div>
                    <i class="fa-solid fa-chevron-down"></i>
                </div>
                <ul class="header-admin__dropdown-menu">
                    <li class="header-admin__dropdown-item"><router-link to="/admin/order">Tất cả đơn hàng</router-link></li>
                    <li class="header-admin__dropdown-item"><router-link to="/admin/order/create">In hóa đơn</router-link></li>
                </ul>
            </div>
            <div class="header-admin__dropdown">
                <div class="header-admin__dropdown-content">
                    <div class="header-admin__dropdown-content-text">
                        <i class="fa-solid fa-address-card header-admin__dropdown-icon"></i>
                        Quản lý khách hàng
                    </div>
                    <i class="fa-solid fa-chevron-down"></i>
                </div>
                <ul class="header-admin__dropdown-menu">
                    <li class="header-admin__dropdown-item"><router-link to="/admin/customer">Tất cả khách hàng</router-link></li>
                </ul>
            </div>
        </header>

        <div class="container">
            <nav class="nav-admin">
                <div class="nav-admin__left">
                    <i class="fa-solid fa-bars nav-admin__icon"></i>
                    <input type="text" class="nav-admin__search" placeholder="Tìm kiếm" @keyup.enter="search">
                </div>
                <div class="nav-admin__right">
                    <div class="nav-admin__circle">
                        <!-- admin notify -->
                        <i class="fa-regular fa-bell nav-admin__icon"></i>
                        <div class="nav-admin__notify">
                            <header class="nav-admin__notify-header">
                                <h3>
                                    Thông báo
                                    <i class="fa-solid fa-gear nav-admin__icon"></i>
                                </h3>
                            </header>
                            <ul class="nav-admin__notify-list">
                                <li class="nav-admin__notify-item nav-admin__notify-item-active">
                                    <a href="" class="nav-admin__notify-link">
                                        <p class="nav-admin__notify-name">Namesadasdasdasdadasdasdad asd1</p>
                                        <p class="nav-admin__notify-describe">asdadsadasd sad asdsad asdasdasd</p>
                                    </a>
                                </li>
                                <li class="nav-admin__notify-item">
                                    <a href="" class="nav-admin__notify-link">
                                        <p class="nav-admin__notify-name">Name1</p>
                                        <p class="nav-admin__notify-describe">asasdsadasdadsadadasd sad asdsad asdasdasd</p>
                                    </a>
                                </li>
                                <li class="nav-admin__notify-item nav-admin__notify-item-active">
                                    <a href="" class="nav-admin__notify-link">
                                        <p class="nav-admin__notify-name">Name1</p>
                                        <p class="nav-admin__notify-describe">asdadsadasd sad asdsad asdasdasd</p>
                                    </a>
                                </li>
                            </ul>
                            <div class="nav-admin__notify-footer">
                                <a href="#">Xem tất cả thông báo</a>
                            </div>
                        </div>
                    </div>
                    <!-- admin avatar -->
                    <div class="nav-admin__avatar">
                        <img class="nav-admin__avatar-img" src="/assets/img/avatar.jpg" alt="">
                        <div class="nav-admin__avatar-content">
                            <header class="nav-admin__avatar-header">
                                <h3>Nguyen VzaAnh</h3>
                                <p>nva@gmail.com</p>
                            </header>
                            <ul class="nav-admin__avatar-list">
                                <li class="nav-admin__avatar-item">
                                    <a href="" class="nav-admin__avatar-link">
                                        <i class="fa-solid fa-gear nav-admin__icon"></i>
                                        <span>Cài đặt tài khoản</span>
                                    </a>
                                </li>
                                <li class="nav-admin__avatar-item">
                                    <a href="" class="nav-admin__avatar-link">
                                        <i class="fa-solid fa-gear nav-admin__icon"></i>
                                        <span>Cài đặt tài khoản</span>
                                    </a>
                                </li>
                                <li class="nav-admin__avatar-item">
                                    <a href="" class="nav-admin__avatar-link">
                                        <i class="fa-solid fa-gear nav-admin__icon"></i>
                                        <span>Cài đặt tài khoản</span>
                                    </a>
                                </li>
                                <li class="nav-admin__avatar-item">
                                    <a href="" class="nav-admin__avatar-link">
                                        <i class="fa-solid fa-power-off nav-admin__icon"></i>
                                        <span>Đăng xuất</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            
            <div class="admin-background"></div>
            <!-- admin page show -->
            <router-view></router-view>
            <!-- admin footer -->
            <div class="footer-admin">
                <p>Ghé thăm website
                    <a href="/" class="footer-admin-link">tại đây</a>
                </p>
                <p>Made by lamlely</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        search(event) {
            const key = event.target.value
            const params = new URLSearchParams(this.$route.query)
            if (key) {
                params.set('key', key)
            } else {
                params.delete('key')
            }
            this.$router.push(this.$route.path + '?' + params.toString())
        }
    }
}
</script>