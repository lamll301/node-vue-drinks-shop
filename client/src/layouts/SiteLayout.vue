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
                                        <img src="" alt="" class="header__top-user-item-avatar">
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
        <div class="header__underline">
            <div class="grid header-function-bar">
                <div class="hidden header-function-bar-btn">
                    <a href="#" class="header-function-bar-link">
                        <i class="header-function-bar-icon-l fa-solid fa-table-list"></i>
                        Tất cả danh mục
                        <i class="header-function-bar-icon-r fa-solid fa-chevron-down"></i>
                        <i class="hidden header-function-bar-icon-r fa-solid fa-chevron-up"></i>
                    </a>
                </div>
                <ul class="header-function-bar-list">
                    <li class="header-function-bar-item">
                        <a href="" class="header-function-bar-name">
                            <i class="header-function-bar-name-icon-home fa-solid fa-house"></i>
                            TRANG CHỦ
                        </a>
                    </li>
                    <li class="header-function-bar-item header-function-bar-menu-block">
                        <a href="" class="header-function-bar-name">
                            MENU
                            <i class="header-function-bar-name-icon fa-solid fa-chevron-down"></i>
                        </a>
                        <div class="header-function-bar-menu">
                            <ul class="header-function-bar-menu-list">
                                <li class="header-function-bar-menu-item">
                                    <a href="">Cà phê Espresso</a>
                                </li>
                                <li class="header-function-bar-menu-item">
                                    <a href="">Cà phê Espresso</a>
                                </li>
                                <li class="header-function-bar-menu-item">
                                    <a href="">Cà phê Espresso</a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li class="header-function-bar-item">
                        <a href="" class="header-function-bar-name">
                            Nước ngọt
                            <i class="header-function-bar-name-icon fa-solid fa-chevron-down"></i>
                        </a>
                    </li>
                    <li class="header-function-bar-item">
                        <a href="" class="header-function-bar-name">
                            Trà
                            <i class="header-function-bar-name-icon fa-solid fa-chevron-down"></i>
                        </a>
                    </li>
                    <li class="header-function-bar-item header-function-bar-item--active">
                        <a href="" class="header-function-bar-name">TƯ VẤN</a>
                    </li>
                    <li class="header-function-bar-item">
                        <a href="" class="header-function-bar-name">LIÊN HỆ</a>
                    </li>
                </ul>
            </div>
        </div>
    </header>
    <div class="app__container">
        <router-view></router-view>
    </div>
    <footer class="footer">
        <nav class="py-5 px-5">
            <div class="flex px-5">
                <div class="col-width d-inline-block">
                    <h2 class="text-sm mb-4 fw-normal">About us</h2>
                    <ul class="d-inline-block">
                        <li class="mb-2 py-2"><a class="text-decoration-none sb-primary-link" href="">Our Company</a></li>
                        <li class="mb-2 py-2"><a class="text-decoration-none sb-primary-link" href="">Our Coffee</a></li>
                        <li class="mb-2 py-2"><a class="text-decoration-none sb-primary-link" href="">Stories and News</a></li>
                        <li class="mb-2 py-2"><a class="text-decoration-none sb-primary-link" href="">Starbucks Archive</a></li>
                        <li class="mb-2 py-2"><a class="text-decoration-none sb-primary-link" href="">Investor Relations</a></li>
                        <li class="mb-2 py-2"><a class="text-decoration-none sb-primary-link" href="">Customer Service</a></li>
                    </ul>
                </div>
                <div class="col-width d-inline-block px-2">
                    <h2 class="text-sm mb-4 fw-normal">Careers</h2>
                    <ul class="d-inline-block">
                        <li class="mb-2 py-2"><a class="text-decoration-none sb-primary-link" href="">Culture and Values</a></li>
                        <li class="mb-2 py-2"><a class="text-decoration-none sb-primary-link" href="">Inclusion, Diversity, and Equity</a></li>
                        <li class="mb-2 py-2"><a class="text-decoration-none sb-primary-link" href="">College Achievement Plan</a></li>
                        <li class="mb-2 py-2"><a class="text-decoration-none sb-primary-link" href="">Alumni Community</a></li>
                        <li class="mb-2 py-2"><a class="text-decoration-none sb-primary-link" href="">U.S. Careers</a></li>
                        <li class="mb-2 py-2"><a class="text-decoration-none sb-primary-link" href="">International Careers</a></li>
                    </ul>
                </div>
                <div class="col-width d-inline-block px-2">
                    <h2 class="text-sm mb-4 fw-normal">Social Impact</h2>
                    <ul class="d-inline-block">
                        <li class="mb-2 py-2"><a class="text-decoration-none sb-primary-link" href="">People</a></li>
                        <li class="mb-2 py-2"><a class="text-decoration-none sb-primary-link" href="">Planet</a></li>
                        <li class="mb-2 py-2"><a class="text-decoration-none sb-primary-link" href="">Environmental and Social Impact Reporting</a></li>
                    </ul>
                </div>
                <div class="col-width d-inline-block px-2">
                    <h2 class="text-sm mb-4 fw-normal">For Business Partners</h2>
                    <ul class="d-inline-block">
                        <li class="mb-2 py-2"><a class="text-decoration-none sb-primary-link" href="">Support Center</a></li>
                        <li class="mb-2 py-2"><a class="text-decoration-none sb-primary-link" href="">Suppliers</a></li>
                        <li class="mb-2 py-2"><a class="text-decoration-none sb-primary-link" href="">Gift Card Sales</a></li>
                        <li class="mb-2 py-2"><a class="text-decoration-none sb-primary-link" href="">Office and Foodservice Coffee</a></li>
                    </ul>
                </div>
                <div class="col-width d-inline-block px-2">
                    <h2 class="text-sm mb-4 fw-normal">Order and Pick Up</h2>
                    <ul class="d-inline-block">
                        <li class="mb-2 py-2"><a class="text-decoration-none sb-primary-link" href="">Order on the App</a></li>
                        <li class="mb-2 py-2"><a class="text-decoration-none sb-primary-link" href="">Order and Pick Up</a></li>
                        <li class="mb-2 py-2"><a class="text-decoration-none sb-primary-link" href="">Order on the Web</a></li>
                        <li class="mb-2 py-2"><a class="text-decoration-none sb-primary-link" href="">Explore and Find Coffee for Home</a></li>
                    </ul>
                </div>
            </div>
            <hr aria-hidden="true" class="py-5 my-2 hr_footer">
            <ul class="flex px-5 footer_icon list-unstyled">
                <li class="p-2"><a href="" class="position-relative d-inline-block footer-icon_items">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. --><path d="M42.9 240.32l99.62 48.61c19.2 9.4 16.2 37.51-4.5 42.71L30.5 358.45a22.79 22.79 0 0 1-28.21-19.6 197.16 197.16 0 0 1 9-85.32 22.8 22.8 0 0 1 31.61-13.21zm44 239.25a199.45 199.45 0 0 0 79.42 32.11A22.78 22.78 0 0 0 192.94 490l3.9-110.82c.7-21.3-25.5-31.91-39.81-16.1l-74.21 82.4a22.82 22.82 0 0 0 4.09 34.09zm145.34-109.92l58.81 94a22.93 22.93 0 0 0 34 5.5 198.36 198.36 0 0 0 52.71-67.61A23 23 0 0 0 364.17 370l-105.42-34.26c-20.31-6.5-37.81 15.8-26.51 33.91zm148.33-132.23a197.44 197.44 0 0 0-50.41-69.31 22.85 22.85 0 0 0-34 4.4l-62 91.92c-11.9 17.7 4.7 40.61 25.2 34.71L366 268.63a23 23 0 0 0 14.61-31.21zM62.11 30.18a22.86 22.86 0 0 0-9.9 32l104.12 180.44c11.7 20.2 42.61 11.9 42.61-11.4V22.88a22.67 22.67 0 0 0-24.5-22.8 320.37 320.37 0 0 0-112.33 30.1z"/>
                    <circle cx="50%" cy="50%" fill="transparent" r="75%"></circle></svg></a>
                </li>
                <li class="p-2"><a href="" class="position-relative d-inline-block footer-icon_items">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. --><path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/></svg></a>
                </li>
                <li class="p-2"><a href="" class="position-relative d-inline-block footer-icon_items">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. --><path d="M469.2 75A75.6 75.6 0 1 0 317.9 75a75.6 75.6 0 1 0 151.2 0zM154.2 240.7A75.6 75.6 0 1 0 3 240.7a75.6 75.6 0 1 0 151.2 0zM57 346C75.6 392.9 108 433 150 461.1s91.5 42.6 142 41.7c-14.7-18.6-22.9-41.5-23.2-65.2c-6.8-.9-13.3-2.1-19.5-3.4c-26.8-5.7-51.9-17.3-73.6-34s-39.3-38.1-51.7-62.5c-20.9 9.9-44.5 12.8-67.1 8.2zm395.1 89.8a75.6 75.6 0 1 0 -151.2 0 75.6 75.6 0 1 0 151.2 0zM444 351.6c18.5 14.8 31.6 35.2 37.2 58.2c33.3-41.3 52.6-92.2 54.8-145.2s-12.5-105.4-42.2-149.4c-8.6 21.5-24 39.6-43.8 51.6c15.4 28.6 22.9 60.8 21.9 93.2s-10.7 64-28 91.6zM101.1 135.4c12.4 2.7 24.3 7.5 35.1 14.3c16.6-24.2 38.9-44.1 64.8-58S255.8 70.4 285.2 70c.2-5.9 .9-11.9 2-17.7c3.6-16.7 11.1-32.3 21.8-45.5c-47.7-3.8-95.4 6-137.6 28.5S94.3 91.7 70.8 133.4c2.7-.2 5.3-.3 8-.3c7.5 0 15 .8 22.4 2.3z"/></svg></a>
                </li>
                <li class="p-2"><a href="" class="position-relative d-inline-block footer-icon_items">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/></svg></a>
                </li>
                <li class="p-2"><a href="" class="position-relative d-inline-block footer-icon_items">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M91.3 76h186l-7 18.9h-179c-39.7 0-71.9 31.6-71.9 70.3v205.4c0 35.4 24.9 70.3 84 70.3V460H91.3C41.2 460 0 419.8 0 370.5V165.2C0 115.9 40.7 76 91.3 76zm229.1-56h66.5C243.1 398.1 241.2 418.9 202.2 459.3c-20.8 21.6-49.3 31.7-78.3 32.7v-51.1c49.2-7.7 64.6-49.9 64.6-75.3 0-20.1.6-12.6-82.1-223.2h61.4L218.2 299 320.4 20zM448 161.5V460H234c6.6-9.6 10.7-16.3 12.1-19.4h182.5V161.5c0-32.5-17.1-51.9-48.2-62.9l6.7-17.6c41.7 13.6 60.9 43.1 60.9 80.5z"/></svg></a>
                </li>
            </ul>
            <ul class="flex px-5 mt-3 mb-1 footer_privacy">
                <li class="align-items-center text-center flex">
                    <a href="" class="block mb-1 my-2 text-decoration-none">Privacy Notice</a>
                </li>
                <li class="align-items-center text-center flex">
                    <span class="px-2 d-inline">|</span>
                    <a href="" class="block mb-1 my-2 p-1 text-decoration-none">Terms of Use</a>
                </li>
                <li class="align-items-center text-center flex">
                    <span class="px-2 d-inline">|</span>
                    <a href="" class="block mb-1 my-2 p-1 text-decoration-none">Do Not Share My Personal Information</a>
                </li>
                <li class="align-items-center text-center flex">
                    <span class="px-2 d-inline">|</span>
                    <a href="" class="block mb-1 my-2 p-1 text-decoration-none">CA Supply Chain Act</a>
                </li>
                <li class="align-items-center text-center flex">
                    <span class="px-2 d-inline">|</span>
                    <a href="" class="block mb-1 my-2 p-1 text-decoration-none">Accessibility</a>
                </li>
                <li class="align-items-center text-center flex">
                    <span class="px-2 d-inline">|</span>
                    <a href="" class="block mb-1 my-2 p-1 text-decoration-none">Cookie Preferences</a>
                </li>
            </ul>
        </nav>
        <p class="py-3 text-xxl-center footer_discription">© 2024 Starbucks Coffee Company. All rights reserved.</p>
    </footer>
</template>