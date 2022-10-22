<template>
    <!-- single product -->
    <div class="single-product mt-150 mb-150">
        <div class="container">
            <div class="row">
                <div class="col-md-5">
                    <div class="single-product-img">
                        <img :src="'/img/products/'+$root.inventory[product].img" alt="">
                    </div>
                </div>
                <div class="col-md-7">
                    <div class="single-product-content">
                        <h3>{{product}}</h3>
                        <p class="single-product-pricing">${{$root.inventory[product].price}}</p>
                        <p>{{$root.inventory[product].description}}</p>
                        <div class="single-product-form">
                            <router-link to="/checkout" class="cart-btn" @click="$root.addToCart(product)"><i class="fas fa-shopping-cart"></i> Add to Cart</router-link>
                            <p><strong>Tags: </strong>{{productTags(product)}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- end single product -->
    <!-- more products
    <div class="more-products mb-150">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 offset-lg-2 text-center">
                    <div class="section-title">
                        <h3><span class="orange-text">Related</span> Products</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, fuga quas itaque eveniet beatae optio.</p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-4 col-md-6 text-center">
                    <div class="single-product-item">
                        <div class="product-image">
                            <a href="single-product.html"><img src="assets/img/products/product-img-1.jpg" alt=""></a>
                        </div>
                        <h3>Strawberry</h3>
                        <p class="product-price"><span>Per Kg</span> 85$ </p>
                        <a href="cart.html" class="cart-btn"><i class="fas fa-shopping-cart"></i> Add to Cart</a>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 text-center">
                    <div class="single-product-item">
                        <div class="product-image">
                            <a href="single-product.html"><img src="assets/img/products/product-img-2.jpg" alt=""></a>
                        </div>
                        <h3>Berry</h3>
                        <p class="product-price"><span>Per Kg</span> 70$ </p>
                        <a href="cart.html" class="cart-btn"><i class="fas fa-shopping-cart"></i> Add to Cart</a>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 offset-lg-0 offset-md-3 text-center">
                    <div class="single-product-item">
                        <div class="product-image">
                            <a href="single-product.html"><img src="assets/img/products/product-img-3.jpg" alt=""></a>
                        </div>
                        <h3>Lemon</h3>
                        <p class="product-price"><span>Per Kg</span> 35$ </p>
                        <a href="cart.html" class="cart-btn"><i class="fas fa-shopping-cart"></i> Add to Cart</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
     end more products -->
</template>
<script>
    export default {
        data() {
            return {
            }
        },
        mounted() {
            window.scrollTo(0, 0)
        },
        methods: {
            productTags: function (product) {
                let tags = this.$root.inventory[product].tags
                return tags.join(", ")
            }
        },
        computed: {
            product() {
                let inv = this.$root.inventory
                let productUrl = this.$route.params.product || null
                let productName = '' 
                if (!productUrl || Object.keys(inv).map(p => inv[p].url).indexOf(productUrl) === -1 ){
                    productUrl = null
                    window.location.href = '/notfound'
                }
                return Object.keys(inv).filter(p => inv[p].url == productUrl)[0]
            }
        }
    }
</script>
