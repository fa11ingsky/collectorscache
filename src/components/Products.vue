<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="product-filters">
                    <ul>
                        <li class="active" data-filter="*">All</li>
                        <li data-filter=".pokemon">Pokemon</li>
                        <li data-filter=".mats">Mats</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="products">
            <div v-for="chunk in chunks">
                <div class="row product-row">
                    <div v-for="(data,product) in chunk" class="col-md-4  text-center pokemon">
                            <div class="single-product-item">
                                <div class="product-image">
                                    <a :href="'#/info='+btoa(product)"><img :src="'img/products/'+data.img" /></a>
                                </div>
                                <h3>{{product}}</h3>
                                <p class="product-price"> ${{data.price}} </p>
                                <a :class="'.'+data.cart+' cart-btn'" @click="$root.addToCart(product)"><i class="fas fa-shopping-cart"></i> Add to Cart</a>
                            </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12 text-center">
                    <div class="pagination-wrap">
                        <ul>
                            <li><a href="#/">Prev</a></li>
                            <li><a href="#/">1</a></li>
                            <li><a class="active" href="#">2</a></li>
                            <li><a href="#/">3</a></li>
                            <li><a href="#/">Next</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Products",
        data() {
            return {
                "chunks": []
            }
        },
        mounted() {
            // chunk up inventory into rows of 3
            let entries = 1
            let chunk = {}
            for (let product in this.$root.inventory) {
                chunk[product] = this.$root.inventory[product]
                if (entries % 3 == 0) {
                    this.chunks.push(chunk)
                    chunk = {}
                }                
                entries += 1
            }
            this.chunks.push(chunk)

        },
        methods: {
            btoa: function (s) {
                return btoa(s)
            }
        }
    }

</script>
