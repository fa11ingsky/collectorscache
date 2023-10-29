<template>
    <div class="CartContainer container">
        <div class="Header">
            <h3 class="Heading">Shopping Cart</h3>
            <h5 class="Action" @click="clearCart()">Remove all</h5>
        </div>

        <div class="cartEntries">
            <div class="Cart-Items" v-for="(data,product) in cart">
                <template v-if="cart[product]>0">
                    <div class="image-box">
                        <a :href="'/info/'+inventory[product].url"><img :src="'/img/products/'+inventory[product].img" /></a>
                    </div>
                    <div class="about">
                        <h3 class="title">{{product}}</h3>
                    </div>
                    <div class="counter">
                        <a class="mod-btn fa-solid fa-circle-plus" @click="modItem(product,1)"></a>
                        <div class="count">{{cart[product]}}</div>
                        <a class="mod-btn fa-solid fa-circle-minus" @click="modItem(product,-1)"></a>
                    </div>
                    <div class="prices">
                        <div class="amount">{{inventory[product].price * cart[product]}}</div>
                        <div class="remove" @click="modItem(product,0)"><u>Remove</u></div>
                    </div>
                </template>
            </div>
        </div>
        <hr>
        <div class="shipping-est row">
            <div class="deliver-to col-sm-3">Ship to:</div>
            <select v-model="country" class="col form-select">
                <option>Australia</option>
                <option>International</option>
            </select>
        </div>
        <hr>
        <div class="shipping-est row">
            <input class="form-control" v-model="promoCode" placeholder="Promo Code" />
        </div>
        <hr>
        <div class="checkout">
            <div class="row">
                <div class="subtotal col">Sub-Total</div>
                <div class="cost col">${{subtotal}}</div>
            </div>
            <div class="row">
                <div class="total-items items col">{{cartItems}} items</div>
            </div>
            <div class="row" v-if="promoApplied">
                <div class="col">Discount</div>
                <div class="cost col">{{discount}}% ({{promoCode.trim()}})</div>
            </div>
            <div class="row">
                <div class="col">Shipping</div>
                <div class="cost col">${{shipping}}</div>
            </div>
            <br />
            <div class="row">
                <div class="total col">Total</div>
                <div class="total cost col">AUD ${{finalTotal}}</div>
            </div>
        </div>
        <hr>
        <div class="checkout">
            <div v-if="loading" class="total">Loading Payment Options...</div>
            <div id="smart-button-container">
                <div style="text-align: center;">
                    <div id="paypal-button-container"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import promos from "../static/promos.json"

    export default {
        setup() {
            const inventory = getInventory()
            let cart = getCart()
            return {
                inventory,
                cart                
            }
        },
        head() {
            return {
                title: 'Bounty Box: Collectibles and More - Checkout'
            }
        },
        data() {
            return {
                country: "Australia",
                promoCode: "",
                loading:true
            }
        },
        computed: {
            cartItems() {
                return Object.keys(this.cart).length;
            },
            shipping() {
                return this.country == "Australia" ? 10 : 20
            },
            promoApplied() {
                return this.promoCode.trim() in promos;
            },
            discount() {
                return promos[this.promoCode.trim()] || 0
            },
            discountTotal() {
                return parseFloat((this.subtotal * (1 - (this.discount / 100))).toFixed(2))
            },
            finalTotal() {
                return this.cartItems > 0 ? this.discountTotal + this.shipping : 0;
            },
            subtotal() {
                let sub = 0;
                for (let product in this.cart) {
                    sub += this.inventory[product].price * this.cart[product];
                }
                return sub;
            },
            description() {
                let descr = ""
                for (let product in this.cart) {
                    descr += this.cart[product] > 0 ? `${product} x${this.cart[product]} ; ` : ''
                }
                descr += this.promoCode.trim() in promos ? `${this.promoCode.trim()}; ` : ''
                descr += `shp${this.shipping}; `
                return descr
            }
        },
        methods: {
            modItem: function (product, val) {
                if (val == 0) {
                    this.cart[product] = val;
                    delete this.cart[product];
                } else {
                    this.cart[product] + val > this.inventory[product].stock ? '' : this.cart[product] += val
                }
                // Sync cart state with localstorage
                localStorage.cart = JSON.stringify(this.cart)
            },
            clearCart: function () {
                this.cart = {}
                // Sync cart state with localstorage
                localStorage.cart = JSON.stringify(this.cart)
            },
            // paypal button
            initPayPalButton: function (self) {
                paypal.Buttons({
                    style: {
                        shape: 'rect',
                        color: 'blue',
                        layout: 'vertical',
                        label: 'checkout',

                    },

                    createOrder: function (data, actions) {
                        return actions.order.create({
                            purchase_units: [{ "description": self.description, "amount": { "currency_code": "AUD", "value": self.discountTotal + self.shipping } }]
                        });
                    },

                    onApprove: function (data, actions) {
                        return actions.order.capture().then(function (orderData) {

                            // Full available details
                            console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));

                            // Show a success message within this page, e.g.
                            const element = document.getElementById('paypal-button-container');
                            element.innerHTML = '';
                            element.innerHTML = '<h3>Thank you for your payment!</h3>';

                            // Or go to another URL:  actions.redirect('thank_you.html');

                        });
                    },
                    onError: function (err) {
                        console.log(err);
                    }
                }).render('#paypal-button-container');
            },
            btoa: function (s) {
                return btoa(s)
            }
        },
        mounted() {
            setTimeout(() => {
                this.loading = !this.loading
                if (Object.keys(this.cart).length > 0) {
                    this.initPayPalButton(this)
                }
            }, 1000)

        }
    }
</script>

<style>
    .mod-btn {
        color: black;
    }
</style>