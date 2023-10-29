<template>
    <div class="single-product mt-150 mb-150">
        <div class="container">
            <div class="row">
                <div class="col-md-5">
                    <!--<div v-if="inventory[product].stock==1" class="stock-banner">Only 1 left!</div>-->
                    <div v-if="inventory[product].stock==0" class="outofstock-banner">Out of Stock!</div>
                    <div class="single-product-img">
                        <img :src="'/img/products/'+inventory[product].img" :alt="product">
                    </div>
                </div>
                <div class="col-md-7">
                    <div class="single-product-content">
                        <h3>{{product}}</h3>
                        <p class="single-product-pricing">${{inventory[product].price}}</p>
                        <p>{{inventory[product].description}}</p>
                        <div class="single-product-form">
                            <nuxt-link v-if="inventory[product].stock != 0" to="/checkout" class="cart-btn" @click="addToCart(product)"><i class="fas fa-shopping-cart"></i> Add to Cart</nuxt-link>
                            <a v-if="inventory[product].stock == 0" class="outofstock-btn">Out of Stock</a>
                            <p><strong><br />Tags: </strong>{{productTags(product)}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        setup() {
            const inventory = getInventory()
            let cart = getCart()
            return {
                inventory,
                cart
            }
        },
        title() {
            return `Pokemon TCG: ${this.product} - Buy Now`
        },
        mounted() {
            window.scrollTo(0, 0)
        },
        methods: {
            productTags: function (product) {
                let tags = this.inventory[product].tags
                return tags.join(", ")
            }
        },
        computed: {
            product() {
                let inv = this.inventory
                let productUrl = this.$route.params.product || null
                if (!productUrl || Object.keys(inv).map(p => inv[p].url).indexOf(productUrl) === -1) {
                    productUrl = null
                    window.location.href = '/notfound'
                }
                return Object.keys(inv).filter(p => inv[p].url == productUrl)[0]
            }
        }
    }
</script>
