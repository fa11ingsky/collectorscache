<template>
    <!-- header -->
    <div class="top-header-area" id="sticker">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 col-sm-12 text-center">
                    <div class="main-menu-wrap">
                        <!-- logo -->
                        <div class="site-logo">
                            <router-link to="/"><img src="/img/armourscope-title.png" alt=""></router-link>
                        </div>
                        <!-- logo -->
                        <!-- menu start -->
                        <nav class="main-menu">
                            <ul>
                                <li>
                                    <div class="header-icons">
                                        <router-link class="shopping-cart" to="/checkout"><i class="fas fa-lg fa-shopping-cart"></i><span class="cart-items fas">{{cartItems}}</span></router-link>
                                        <router-link class="home" to="/"><i class="fas fa-lg fa-home"></i></router-link>
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
                    <router-link to="/" class="breadcrumb-text">
                        <h1>Bounty Box</h1>
                        <p>an ArmourScope affliate</p>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
    <!-- end breadcrumb section -->
    <!-- products -->
    <div class="view-section mb-150">
        <router-view></router-view>
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
                <div class="col-lg-6 text-center">
                    <div class="footer-box about-widget">
                        <h2 class="widget-title">About us</h2>
                            <p>Bounty Box is an ArmourScope affiliate.</p>
                            <p>Registered ABN 40136037247.</p>
                    </div>
                </div>
                <div class="col-lg-6 text-center">
                    <div class="footer-box get-in-touch">
                        <h2 class="widget-title">Get in touch</h2>
                            <p>Canberra, ACT, Australia</p>
                            <p>contact.armourscope@gmail.com</p>
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
                <div class="text-center">
                    <div class="social-icons">
                    <ul>
                        <li><router-link to="/" target="_blank"><i class="fab fa-facebook-f"></i></router-link></li>
                        <li><router-link to="/" target="_blank"><i class="fab fa-twitter"></i></router-link></li>
                        <li><router-link to="/" target="_blank"><i class="fa fa-earth-americas"></i></router-link></li>
                    </ul>
                    </div>
                    <div class="text-center">
                     <p>Copyrights &copy; 2022 - <a href="https://www.armourscope.com/">ArmourScope</a>,  All Rights Reserved.</p>   
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    
    import json from "./assets/inventory.json"

    export default {
        data() {
            return {
                loading: true,
                cartItems: 0,
                cart: {},
                inventory: json
            }
        },
        methods: {
            addToCart: function (product) {
                if (product in this.cart) {
                    this.cart[product] ++
                } else {
                    this.cart[product] = 1
                }
                localStorage.cart = JSON.stringify(this.cart)
                this.cartItems += 1
            }
        },
        mounted() {
            this.loading = !this.loading

            // fetch cart
            this.cart = localStorage.cart ? JSON.parse(localStorage.cart) : {}
            for (let product in this.cart) {
                this.cartItems += this.cart[product]
            }
        }
    }
</script>

<style>
    .view-section {
        margin-top: 20px;
    }

</style>