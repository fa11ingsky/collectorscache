<template>
    <!-- header -->
    <div class="top-header-area" id="sticker">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 col-sm-12 text-center">
                    <div class="main-menu-wrap">
                        <!-- logo -->
                        <div class="site-logo">
                            <a href="/">
                                <img src="/img/armourscope-title.png" alt="">
                            </a>
                        </div>
                        <!-- logo -->
                        <!-- menu start -->
                        <nav class="main-menu">
                            <ul>
                                <li>
                                    <div class="header-icons">
                                        <a class="shopping-cart" href="#/checkout"><i class="fas fa-lg fa-shopping-cart"></i><span class="cart-items fas">{{cartItems}}</span></a>
                                        <a class="home" href="#/"><i class="fas fa-lg fa-home"></i></a>
                                        <!--<a class="mobile-hide search-bar-icon" href="#"><i class="fas fa-search"></i></a>-->
                                    </div>
                                </li>
                            </ul>
                        </nav>
                        <!--<div class="mobile-menu"></div>-->
                        <!-- menu end -->
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- end header -->
    <!-- breadcrumb-section (title area) -->
    <div class="breadcrumb-section breadcrumb-bg">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 offset-lg-2 text-center">
                    <div class="breadcrumb-text">
                        <h1>Bounty Box</h1>
                        <p>an ArmourScope affliate</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- end breadcrumb section -->
    <!-- products -->
    <div class="product-section mt-100 mb-150">
        <component :is="currentView"/>
        <noscript class="nojs">JavaScript is required for this site!</noscript>
        <!--PreLoader-->
        <Transition>
            <div v-if="loading" class="loader">
                <div v-if="loading" class="loader-inner">
                    <div v-if="loading" class="circle"></div>
                </div>
            </div>
        </Transition>
    </div>
    <!-- end products -->
    <!-- footer -->
    <div class="footer-area">
        <div class="container">
            <div class="row">
                <div class="col-lg-3 col-md-6">
                    <div class="footer-box about-widget">
                        <h2 class="widget-title">About us</h2>
                        <p>Bounty Box is an ArmourScope affiliate.</p>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="footer-box get-in-touch">
                        <h2 class="widget-title">Get in Touch</h2>
                        <ul>
                            <li>Canberra, ACT, Australia</li>
                            <li>contact.armourscope@gmail.com</li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="footer-box subscribe">
                        <h2 class="widget-title">Subscribe</h2>
                        <p>Subscribe to our mailing list to get the latest updates.</p>
                        <form action="index.html">
                            <input type="email" placeholder="Email">
                            <button type="submit"><i class="fas fa-paper-plane"></i></button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- end footer -->
    <!-- copyright -->
    <div class="copyright">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 col-md-12">
                    <p>Copyrights &copy; 2022 - <a href="https://www.armourscope.com/">ArmourScope</a>,  All Rights Reserved.</p>
                </div>
                <div class="col-lg-6 text-right col-md-12">
                    <div class="social-icons">
                        <ul>
                            <li><a href="#" target="_blank"><i class="fab fa-facebook-f"></i></a></li>
                            <li><a href="#" target="_blank"><i class="fab fa-twitter"></i></a></li>
                            <li><a href="#" target="_blank"><i class="fa fa-earth-americas"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Checkout from './components/Checkout.vue'
    import Products from './components/Products.vue'
    import json from "./assets/inventory.json"
    export default {
        name: "AppModel",
        components: {
            "products-component": Products,
            "checkout-component": Checkout
        },
        data() {
            return {
                loading: true,
                cartItems: 0,
                cart: {},
                inventory: json,
                currentPath: window.location.hash
            }
        },
        computed: {
            currentView() {
                let component = Products
                if (( this.currentPath.slice(1) || '/') == '/checkout') {
                    component = Checkout
                }
                return component
            }
        },
        mounted() {
            // Regist page change listener
            window.addEventListener('hashchange', () => {
                this.currentPath = window.location.hash
            })

            this.loading = !this.loading
            // fetch cart
            this.cart = localStorage.cart ? JSON.parse(localStorage.cart) : {}
            for (let product in this.cart) {
                this.cartItems += this.cart[product]
            }
        }
    }
</script>