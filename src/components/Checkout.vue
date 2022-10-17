<template>
    <div class="CartContainer container">
        <div class="Header">
            <h3 class="Heading">Shopping Cart</h3>
            <h5 class="Action" @click="clearCart()">Remove all</h5>
        </div>

        <div class="cartEntries">
            <div class="Cart-Items" v-for="(data,product) in $root.cart">
                <template v-if="$root.cart[product]>0">
                    <div class="image-box">
                        <img :src="'img/products/'+$root.inventory[product].img" />
                    </div>
                    <div class="about">
                        <h3 class="title">{{product}}</h3>
                    </div>
                    <div class="counter">
                        <a class="fa-solid fa-circle-plus" @click="modItem(product,1)"></a>
                        <div class="count">{{$root.cart[product]}}</div>
                        <a class="fa-solid fa-circle-minus" @click="modItem(product,-1)"></a>
                    </div>
                    <div class="prices">
                        <div class="amount">{{$root.inventory[product].price * $root.cart[product]}}</div>
                        <div class="remove" @click="modItem(product,0)"><u>Remove</u></div>
                    </div>
                </template>
            </div>
        </div>
        <!-- Shipping calculator -->
        <div>

        </div>
        <hr>
        <div class="checkout">
            <div class="row">
                <div class="subtotal col">Sub-Total</div>
                <div class="cost col">${{subtotal}}</div>
            </div>
            <div class="row">
                <div class="total-items items col">{{this.$root.cartItems}} items</div>
            </div>
            <div class="row">
                <div class="col">Shipping</div>
                <div class="cost col">${{shipping}}</div>
            </div>
            </div><hr><div class="checkout"> 
            
            <div v-if="Object.keys($root.cart).length>0" id="smart-button-container">
                <div style="text-align: center;">
                    <div id="paypal-button-container"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

    export default {
        data() {
            return {
                subtotal: 0,
                description: "",
                shipping: 0
            }
        },
        methods: {
            modItem: function (product, val) {
                if (val == 0) {
                    this.$root.cart[product] = val
                } else {
                    this.$root.cart[product] += val
                }
                this.refreshCart()
            },
            clearCart: function () {
                this.$root.cart = {}
                this.refreshCart()
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
                            purchase_units: [{ "description": self.description, "amount": { "currency_code": "AUD", "value": self.subtotal } }]
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
            refreshCart: function () {
                this.subtotal = 0
                this.$root.cartItems = 0
                this.description = ""
                for (let product in this.$root.cart) {
                    this.subtotal += this.$root.inventory[product].price * this.$root.cart[product];
                    this.$root.cartItems += this.$root.cart[product];
                    this.description += this.$root.cart[product] > 0 ? `${product} x${this.$root.cart[product]} ; ` : ''
                }
                localStorage.cart = JSON.stringify(this.$root.cart)
            }
        },
        mounted() {
            this.refreshCart()
            if (Object.keys(this.$root.cart).length > 0) {
                this.initPayPalButton(this)
            }
        }
    }
</script>