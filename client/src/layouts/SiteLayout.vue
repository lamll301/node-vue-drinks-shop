<template>
    <header class="header">
        <div class="header__underline">
            <div class="grid">
                <div class="header__top">
                    <ul class="header__top-list">
                        <!-- not logged -->
                        <li class="header__top-item">Hi!
                            <a href="">Đăng nhập</a>
                            hoặc
                            <a href="">Đăng ký</a>
                        </li>
                        <!-- logged -->
                        <li class="header__top-item header__top-user">Hi!
                            <span class="header__top-user-name">Lam!</span>
                            <i class="fa-solid fa-chevron-down"></i>
                            <ul class="header__top-user-menu">
                                <li class="header__top-user-item">
                                    <a class="header__top-user-item-info">
                                        <img src="https://photo.znews.vn/w1200/Uploaded/mdf_eioxrd/2021_07_06/1q.jpg" alt="" class="header__top-user-item-avatar">
                                        <p class="header__top-user-item-name">Lam Le</p>
                                    </a>
                                </li>
                                <li class="header__top-user-item header__top-user-item-option">
                                    <a href="">Cài đặt tài khoản</a>
                                </li>
                                <li class="header__top-user-item header__top-user-item-option">
                                    <a href="">Đăng xuất</a>
                                </li>
                            </ul>
                        </li>
                        <li class="header__top-item">Kết nối
                            <a href="" class="header__top-icon-link">
                                <i class="fa-brands fa-facebook fa-xl"></i>
                            </a>
                            <a href="" class="header__top-icon-link">
                                <i class="fa-brands fa-instagram fa-xl"></i>
                            </a>
                        </li>
                    </ul>
                    <ul class="header__top-list">
                        <li class="header__top-item">
                            <a href="" class="header__top-text-link">Hỗ trợ</a>
                        </li>
                        <li class="header__top-item header__top-item-notify">
                            <a href="" class="header__top-icon-link">
                                <i class="fa-regular fa-bell fa-xl"></i>
                                <span class=" header__notice header__notify-notice">5</span>
                            </a>
                            <!--class empty notify: header__notify--empty -->
                            <div class="header__notify header__notify--empty">
                                <img src="../assets/img/empty-notify.webp" alt="" class="header__notify--empty-img">
                                <p class="header__notify--empty-msg">
                                    Chưa có thông báo
                                </p>
                                <!-- have notify -->
                                
                            </div>
                        </li>
                        <li class="header__top-item header__cart">
                            <a href="" class="header__top-icon-link">
                                <i class="fa-solid fa-cart-shopping fa-xl"></i>
                                <span class="header__notice header__cart-notice">5</span>
                            </a>
                            <!--class empty cart: header__cart-list--empty-cart-->
                            <div class="header__cart-list ">
                                <img src="../assets/img/empty-cart.png" alt="" class="hidden header__cart-list--empty-cart-img">
                                <p class="hidden header__cart-list--empty-cart-msg">
                                    Chưa có sản phẩm
                                </p>
                                <!-- have cart -->
                                <ul class=" header__cart-list-item">
                                    <li class="header__cart-item">
                                        <img src="https://nest-frontend-v6.netlify.app/assets/imgs/shop/thumbnail-3.jpg" alt="">
                                        <div class="header__cart-item-content">
                                            <div class="header__cart-item-title">
                                                <a href="">Daissy Casual Bag</a>
                                                <h4>1 x 800.000đ</h4>
                                            </div>
                                            <div class="header__cart-item-delete">
                                                <i class="fa-solid fa-x"></i>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="header__cart-item">
                                        <img src="https://nest-frontend-v6.netlify.app/assets/imgs/shop/thumbnail-3.jpg" alt="">
                                        <div class="header__cart-item-content">
                                            <div class="header__cart-item-title">
                                                <a href="">Daissy Casual Bag</a>
                                                <h4>1 x 800.000đ</h4>
                                            </div>
                                            <div class="header__cart-item-delete">
                                                <i class="fa-solid fa-x"></i>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="header__cart-item">
                                        <img src="https://nest-frontend-v6.netlify.app/assets/imgs/shop/thumbnail-3.jpg" alt="">
                                        <div class="header__cart-item-content">
                                            <div class="header__cart-item-title">
                                                <a href="">Daissy Casual Bag</a>
                                                <h4>1 x 800.000đ</h4>
                                            </div>
                                            <div class="header__cart-item-delete">
                                                <i class="fa-solid fa-x"></i>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="header__cart-item">
                                        <img src="https://nest-frontend-v6.netlify.app/assets/imgs/shop/thumbnail-3.jpg" alt="">
                                        <div class="header__cart-item-content">
                                            <div class="header__cart-item-title">
                                                <a href="">Daissy Casual Bag</a>
                                                <h4>1 x 800.000đ</h4>
                                            </div>
                                            <div class="header__cart-item-delete">
                                                <i class="fa-solid fa-x"></i>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="header__cart-item">
                                        <img src="https://nest-frontend-v6.netlify.app/assets/imgs/shop/thumbnail-3.jpg" alt="">
                                        <div class="header__cart-item-content">
                                            <div class="header__cart-item-title">
                                                <a href="">Daissy Casual Bag</a>
                                                <h4>1 x 800.000đ</h4>
                                            </div>
                                            <div class="header__cart-item-delete">
                                                <i class="fa-solid fa-x"></i>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="header__cart-item">
                                        <img src="https://nest-frontend-v6.netlify.app/assets/imgs/shop/thumbnail-3.jpg" alt="">
                                        <div class="header__cart-item-content">
                                            <div class="header__cart-item-title">
                                                <a href="">Daissy Casual Bag</a>
                                                <h4>1 x 800.000đ</h4>
                                            </div>
                                            <div class="header__cart-item-delete">
                                                <i class="fa-solid fa-x"></i>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <div class=" header__cart-footer">
                                    <div class="header__cart-footer-total">
                                        <h4>Tổng tiền</h4>
                                        <span>4.000.000.000đ</span>
                                    </div>
                                    <div class="header__cart-btn">
                                        <a href="" class="button header__cart-btn--view-cart">Xem giỏ hàng</a>
                                        <a href="" class="button header__cart-btn--checkout">Thanh toán</a>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- header with search -->
        <div class="header__underline">
            <div class="header-with-search">
                <a href="" class="header__logo">
                    <img src="../assets/img/logo.jpg" alt="" class="header__logo-img">
                </a>
                <div class="header__search">
                    <input type="text" class="header__search-input" placeholder="Nhập để tìm kiếm sản phẩm">
                    <i class="header__search-icon fa-solid fa-magnifying-glass"></i>
                    <button class="button header__search-btn">Tìm kiếm</button>
                </div>
            </div>
        </div>
        <!-- header func bar -->
        <div class="grid header-function-bar">
            <ul class="header-function-bar-list">
                <li class="header-function-bar-item">
                    <a href="" class="header-function-bar-name">
                        Trang chủ
                    </a>
                </li>
                <li class="header-function-bar-item">
                    <a href="" class="header-function-bar-name">
                        Khuyến mãi/Ưu đãi
                    </a>
                </li>
                <li class="header-function-bar-item header-function-bar-menu-block">
                    <a href="" class="header-function-bar-name">
                        Cà phê
                    </a>
                    <div class="header-function-bar-menu">
                        <div class="header-function-bar-menu-content">
                            <div class="header-function-bar-menu-left">
                                <div class="header-function-bar-menu-section">
                                    <h4 class="header-function-bar-menu-text header__underline">
                                        Các đồ uống phổ biến nhất
                                    </h4>
                                    <ul class="header-function-bar-menu-list">
                                        <li class="header-function-bar-menu-item">
                                            <a href="">Cà phê</a>
                                        </li>
                                        <li class="header-function-bar-menu-item">
                                            <a href="">Trà sữa</a>
                                        </li>
                                        <li class="header-function-bar-menu-item">
                                            <a href="">Sinh tố và nước ép</a>
                                        </li>
                                        <li class="header-function-bar-menu-item">
                                            <a href="">Nước đóng chai</a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="header-function-bar-menu-section">
                                    <h4 class="header-function-bar-menu-text header__underline">
                                        Các đồ uống mới nhất
                                    </h4>
                                    <ul class="header-function-bar-menu-list">
                                        <li class="header-function-bar-menu-item">
                                            <a href="">Cà phê</a>
                                        </li>
                                        <li class="header-function-bar-menu-item">
                                            <a href="">Trà sữa</a>
                                        </li>
                                        <li class="header-function-bar-menu-item">
                                            <a href="">Sinh tố và nước ép</a>
                                        </li>
                                        <li class="header-function-bar-menu-item">
                                            <a href="">Nước đóng chai</a>
                                        </li>
                                        <li class="header-function-bar-menu-item">
                                            <a href="">Cà phê</a>
                                        </li>
                                        <li class="header-function-bar-menu-item">
                                            <a href="">Trà sữa</a>
                                        </li>
                                        <li class="header-function-bar-menu-item">
                                            <a href="">Sinh tố và nước ép</a>
                                        </li>
                                        <li class="header-function-bar-menu-item">
                                            <a href="">Nước đóng chai</a>
                                        </li>
                                        
                                    </ul>
                                </div>
                            </div>
                            <div class="header-function-bar-menu-right">
                                <a href="#">
                                    <img src="https://ir.ebaystatic.com/cr/v/c01/ROW-19399_Fallback_PandA_770x270.png" alt="">
                                </a>
                            </div>
                        </div>
                    </div>
                </li>
                <li class="header-function-bar-item header-function-bar-menu-block">
                    <a href="" class="header-function-bar-name">
                       Trà sữa
                    </a>
                    <div class="header-function-bar-menu">
                        <div class="header-function-bar-menu-content">
                            <div class="header-function-bar-menu-left">
                                <div class="header-function-bar-menu-section">
                                    <h4 class="header-function-bar-menu-text header__underline">
                                        Các đồ uống phổ biến nhất
                                    </h4>
                                    <ul class="header-function-bar-menu-list">
                                        <li class="header-function-bar-menu-item">
                                            <a href="">Cà phê</a>
                                        </li>
                                        <li class="header-function-bar-menu-item">
                                            <a href="">Trà sữa</a>
                                        </li>
                                        <li class="header-function-bar-menu-item">
                                            <a href="">Sinh tố và nước ép</a>
                                        </li>
                                        <li class="header-function-bar-menu-item">
                                            <a href="">Nước đóng chai</a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="header-function-bar-menu-section">
                                    <h4 class="header-function-bar-menu-text header__underline">
                                        Các đồ uống mới nhất
                                    </h4>
                                    <ul class="header-function-bar-menu-list">
                                        <li class="header-function-bar-menu-item">
                                            <a href="">Cà phê</a>
                                        </li>
                                        <li class="header-function-bar-menu-item">
                                            <a href="">Trà sữa</a>
                                        </li>
                                        <li class="header-function-bar-menu-item">
                                            <a href="">Sinh tố và nước ép</a>
                                        </li>
                                        <li class="header-function-bar-menu-item">
                                            <a href="">Nước đóng chai</a>
                                        </li>
                                        <li class="header-function-bar-menu-item">
                                            <a href="">Cà phê</a>
                                        </li>
                                        <li class="header-function-bar-menu-item">
                                            <a href="">Trà sữa</a>
                                        </li>
                                        <li class="header-function-bar-menu-item">
                                            <a href="">Sinh tố và nước ép</a>
                                        </li>
                                        <li class="header-function-bar-menu-item">
                                            <a href="">Nước đóng chai</a>
                                        </li>
                                        
                                    </ul>
                                </div>
                            </div>
                            <div class="header-function-bar-menu-right">
                                <a href="#">
                                    <img src="https://content-prod-live.cert.starbucks.com/binary/v2/asset/137-95715.jpg" alt="">
                                </a>
                            </div>
                        </div>
                    </div>
                </li>
                <li class="header-function-bar-item header-function-bar-menu-block">
                    <a href="" class="header-function-bar-name">
                        Sinh tố và nước ép
                    </a>
                    <div class="header-function-bar-menu">
                        <div class="header-function-bar-menu-content">
                            <div class="header-function-bar-menu-left">
                                <div class="header-function-bar-menu-section">
                                    <h4 class="header-function-bar-menu-text header__underline">
                                        Các đồ uống phổ biến nhất
                                    </h4>
                                    <ul class="header-function-bar-menu-list">
                                        <li class="header-function-bar-menu-item">
                                            <a href="">Cà phê</a>
                                        </li>
                                        <li class="header-function-bar-menu-item">
                                            <a href="">Trà sữa</a>
                                        </li>
                                        <li class="header-function-bar-menu-item">
                                            <a href="">Sinh tố và nước ép</a>
                                        </li>
                                        <li class="header-function-bar-menu-item">
                                            <a href="">Nước đóng chai</a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="header-function-bar-menu-section">
                                    <h4 class="header-function-bar-menu-text header__underline">
                                        Các đồ uống mới nhất
                                    </h4>
                                    <ul class="header-function-bar-menu-list">
                                        <li class="header-function-bar-menu-item">
                                            <a href="">Cà phê</a>
                                        </li>
                                        <li class="header-function-bar-menu-item">
                                            <a href="">Trà sữa</a>
                                        </li>
                                        <li class="header-function-bar-menu-item">
                                            <a href="">Sinh tố và nước ép</a>
                                        </li>
                                        <li class="header-function-bar-menu-item">
                                            <a href="">Nước đóng chai</a>
                                        </li>
                                        <li class="header-function-bar-menu-item">
                                            <a href="">Cà phê</a>
                                        </li>
                                        <li class="header-function-bar-menu-item">
                                            <a href="">Trà sữa</a>
                                        </li>
                                        <li class="header-function-bar-menu-item">
                                            <a href="">Sinh tố và nước ép</a>
                                        </li>
                                        <li class="header-function-bar-menu-item">
                                            <a href="">Nước đóng chai</a>
                                        </li>
                                        
                                    </ul>
                                </div>
                            </div>
                            <div class="header-function-bar-menu-right">
                                <a href="#">
                                    <img src="../assets/img/empty-avatar.webp" alt="">
                                </a>
                            </div>
                        </div>
                    </div>
                </li>
                <li class="header-function-bar-item header-function-bar-menu-block">
                    <a href="" class="header-function-bar-name">
                        Nước đóng chai
                    </a>
                    <div class="header-function-bar-menu">
                        <div class="header-function-bar-menu-content">
                            <div class="header-function-bar-menu-left">
                                <div class="header-function-bar-menu-section">
                                    <h4 class="header-function-bar-menu-text header__underline">
                                        Các đồ uống phổ biến nhất
                                    </h4>
                                    <ul class="header-function-bar-menu-list">
                                        <li class="header-function-bar-menu-item">
                                            <a href="">Cà phê</a>
                                        </li>
                                        <li class="header-function-bar-menu-item">
                                            <a href="">Trà sữa</a>
                                        </li>
                                        <li class="header-function-bar-menu-item">
                                            <a href="">Sinh tố và nước ép</a>
                                        </li>
                                        <li class="header-function-bar-menu-item">
                                            <a href="">Nước đóng chai</a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="header-function-bar-menu-section">
                                    <h4 class="header-function-bar-menu-text header__underline">
                                        Các đồ uống mới nhất
                                    </h4>
                                    <ul class="header-function-bar-menu-list">
                                        <li class="header-function-bar-menu-item">
                                            <a href="">Cà phê</a>
                                        </li>
                                        <li class="header-function-bar-menu-item">
                                            <a href="">Trà sữa</a>
                                        </li>
                                        <li class="header-function-bar-menu-item">
                                            <a href="">Sinh tố và nước ép</a>
                                        </li>
                                        <li class="header-function-bar-menu-item">
                                            <a href="">Nước đóng chai</a>
                                        </li>
                                        <li class="header-function-bar-menu-item">
                                            <a href="">Cà phê</a>
                                        </li>
                                        <li class="header-function-bar-menu-item">
                                            <a href="">Trà sữa</a>
                                        </li>
                                        <li class="header-function-bar-menu-item">
                                            <a href="">Sinh tố và nước ép</a>
                                        </li>
                                        <li class="header-function-bar-menu-item">
                                            <a href="">Nước đóng chai</a>
                                        </li>
                                        
                                    </ul>
                                </div>
                            </div>
                            <div class="header-function-bar-menu-right">
                                <a href="#">
                                    <img src="https://ir.ebaystatic.com/cr/v/c01/ROW-19398_Fallback_IndustrialEquipment_770x270.png" alt="">
                                </a>
                            </div>
                        </div>
                    </div>
                </li>
                <li class="header-function-bar-item">
                    <a href="" class="header-function-bar-name">
                        Về chúng tôi
                    </a>
                </li>
                <li class="header-function-bar-item">
                    <a href="" class="header-function-bar-name">
                        Liên hệ
                    </a>
                </li>
            </ul>
        </div>
    </header>
    <div class="app__container">
        <router-view></router-view>
    </div>
    <footer class="footer">
        <div class="footer-container">
            <div class="grid__row">
                <div class="grid__column-2-4">
                    <h3 class="footer__heading">
                        Thông tin công ty
                    </h3>
                    <ul class="footer__list">
                        <li class="footer__list-item">
                            <a href="#" class="footer__list-item-link">Giới thiệu về chúng tôi</a>
                        </li>
                        <li class="footer__list-item">
                            <a href="#" class="footer__list-item-link">Sứ mệnh & tầm nhìn</a>
                        </li>
                        <li class="footer__list-item">
                            <a href="#" class="footer__list-item-link">Liên hệ</a>
                        </li>
                        <li class="footer__list-item">
                            <a href="#" class="footer__list-item-link">Địa chỉ cửa hàng</a>
                        </li>
                        <li class="footer__list-item">
                            <a href="#" class="footer__list-item-link">Giờ mở cửa</a>
                        </li>
                    </ul>
                </div>
                <div class="grid__column-2-4">
                    <h3 class="footer__heading">
                        Hỗ trợ khách hàng
                    </h3>
                    <ul class="footer__list">
                        <li class="footer__list-item">
                            <a href="#" class="footer__list-item-link">Chính sách giao hàng</a>
                        </li>
                        <li class="footer__list-item">
                            <a href="#" class="footer__list-item-link">Chính sách đổi trả</a>
                        </li>
                        <li class="footer__list-item">
                            <a href="#" class="footer__list-item-link">Câu hỏi thường gặp (FAQ)</a>
                        </li>
                        <li class="footer__list-item">
                            <a href="#" class="footer__list-item-link">Hướng dẫn đặt hàng</a>
                        </li>
                        <li class="footer__list-item">
                            <a href="#" class="footer__list-item-link">Liên hệ hỗ trợ</a>
                        </li>
                    </ul>
                </div>
                <div class="grid__column-2-4">
                    <h3 class="footer__heading">
                        Kết nối với chúng tôi
                    </h3>
                    <ul class="footer__list">
                        <li class="footer__list-item">
                            <i class="fa-brands fa-facebook footer__list-item-icon"></i>
                            <a href="https://fb.com/" class="footer__list-item-link">Facebook</a>
                        </li>
                        <li class="footer__list-item">
                            <i class="fa-brands fa-instagram footer__list-item-icon"></i>
                            <a href="https://www.instagram.com/" class="footer__list-item-link">Instagram</a>
                        </li>
                        <li class="footer__list-item">
                            <i class="fa-brands fa-youtube footer__list-item-icon"></i>
                            <a href="https://www.youtube.com/" class="footer__list-item-link">Youtube</a>
                        </li>
                    </ul>
                </div>
                <div class="grid__column-2-4">
                    <h3 class="footer__heading">
                        Chính sách và quy định
                    </h3>
                    <ul class="footer__list">
                        <li class="footer__list-item">
                            <a href="#" class="footer__list-item-link">Điều khoản sử dụng</a>
                        </li>
                        <li class="footer__list-item">
                            <a href="#" class="footer__list-item-link">Chính sách bảo mật thông tin</a>
                        </li>
                        <li class="footer__list-item">
                            <a href="#" class="footer__list-item-link">Chính sách thanh toán</a>
                        </li>
                    </ul>
                </div>
                <div class="grid__column-2-4">
                    <h3 class="footer__heading">
                        Thông tin khác
                    </h3>
                    <ul class="footer__list">
                        <li class="footer__list-item">
                            <a href="#" class="footer__list-item-link">Tin tức & Blog</a>
                        </li>
                        <li class="footer__list-item">
                            <a href="#" class="footer__list-item-link">Tuyển dụng</a>
                        </li>
                        <li class="footer__list-item">
                            <a href="#" class="footer__list-item-link">Đối tác & nhà cung cấp</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="footer-copyright">
                <br>Địa chỉ: Tầng X, tòa nhà Y, số Z, Phường A, Quận B, Thành phố C, Việt Nam. Số điện thoại: 0999.999.999 - Email: congtyabc@gmail.com<br>
                <br>© 2025 - Bản quyền thuộc về lamll301.<br>
            </div>
        </div>
    </footer>
</template>

<script>
import { onMounted } from 'vue';

export default {
    setup() {
        const centerHeaderMenus = () => {
            const menuBlocks = document.querySelectorAll('.header-function-bar-menu-block');
            let value = -142;
            menuBlocks.forEach((block, i) => {
                if (i === 0) {
                    block.querySelector('.header-function-bar-menu').style.left = `${value}px`;
                } else {
                    const prevBlock = menuBlocks[i - 1];
                    const prevWidth = prevBlock.offsetWidth;
                    value -= prevWidth;
                    block.querySelector('.header-function-bar-menu').style.left = `${value}px`;
                }
            });
        }
        onMounted(() => {
            centerHeaderMenus();
        })
    },
}
</script>