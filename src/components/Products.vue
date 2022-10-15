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
                <div class="row product-row" v-if="pageNumber == chunk.pageNumber">
                    <div v-for="(data,product) in chunk" class="col-md-4  text-center pokemon">
                        <template v-if="product != 'pageNumber'">
                            <div class="single-product-item">
                                <div class="product-image">
                                    <a><img :src="'img/products/'+data.img" /></a>
                                </div>
                                <h3>{{product}}</h3>
                                <p class="product-price"> ${{data.price}} </p>
                                <a :class="'.'+data.cart+' cart-btn'" @click="addToCart(product)"><i class="fas fa-shopping-cart"></i> Add to Cart</a>
                            </div>
                        </template>    
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12 text-center">
                    <div class="pagination-wrap">
                        <ul>
                            <li><a @click="pageNumber=pageNumber>1 ? pageNumber-1 : pageNumber">Prev</a></li>
                            <li><a :class="pageNumber==1 ? 'active' : ''" @click="pageNumber=pageNumber>1 ? pageNumber-1 : pageNumber">{{pageNumber>1 ? pageNumber-1 : pageNumber}}</a></li>
                            <li><a :class="(pageNumber!=1 && pageNumber!=Math.ceil(items/3)+1) ? 'active' : ''" @click="pageNumber=pageNumber>1 ? pageNumber : pageNumber+1">{{pageNumber>1 ? pageNumber : pageNumber+1}}</a></li>
                            <li><a @click="pageNumber=pageNumber>1 ? (pageNumber <= Math.ceil(items/3)-1 ? pageNumber+1 : pageNumber) : pageNumber+2">{{pageNumber>1 ? pageNumber+1 : pageNumber+2}}</a></li>
                            <li><a @click="pageNumber=pageNumber <= Math.ceil(items/3)-1 ? pageNumber+1 : pageNumber">Next</a></li>
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
                "chunks": [],
                "pageNumber": 1,
                "items": 0
            }
        },
        mounted() {
            // chunk up inventory into rows of 3
            let entries = 1
            let pageNumber = 1
            let count = 1
            let chunk = {}
            for (let product in this.$root.inventory) {
                chunk[product] = this.$root.inventory[product]
                if (entries % 3 == 0) {
                    chunk.pageNumber = pageNumber
                    pageNumber ++
                    this.chunks.push(chunk)
                    chunk = {}
                }                
                entries += 1
            }
            this.items = entries
            chunk.pageNumber = pageNumber
            this.chunks.push(chunk)

        },
        methods: {
            addToCart: function (product) {
                if (product in this.$root.cart) {
                    this.$root.cart[product] ++
                } else {
                    this.$root.cart[product] = 1
                }
                localStorage.cart = JSON.stringify(this.$root.cart)
                this.$root.cartItems += 1
            }
        }
    }

</script>
