<template>
    <div class="CartContainer container">
        <div class="Header">
            <h3 class="Heading">Shopping Cart</h3>
            <h5 class="Action">Remove all</h5>
        </div>

        <div class="cartEntries">
            <div class="Cart-Items" v-for="(data,product) in $root.cart">
                <template v-if="$root.cart[product]>0">
                    <div class="image-box">
                        <img :src="'assets/img/products/'+$root.inventory[product].img" />
                    </div>
                    <div class="about">
                        <h3 class="title">{{product}}</h3>
                    </div>
                    <div class="counter">
                        <i class="fa-solid fa-circle-plus"></i>
                        <div class="count">{{$root.cart[product]}}</div>
                        <i class="fa-solid fa-circle-minus"></i>
                    </div>
                    <div class="prices">
                        <div class="amount">{{$root.inventory[product].price * $root.cart[product]}}</div>
                        <div class="remove" @click="removeItem(product)"><u>Remove</u></div>
                    </div>
                </template>
            </div>
        </div>
        <hr>
        <div class="checkout">
            <div class="total">
                <div>
                    <div class="subtotal">Sub-Total</div>
                    <div class="total-items items">{{this.$root.cartItems}} items</div>
                </div>
                <div class="cart-total">${{subtotal}}</div>
            </div>
            <div id="smart-button-container">
                <div style="text-align: center;">
                    <div id="paypal-button-container" ref="vuePaypal"></div>
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
                description: ""
            }
        },
        methods: {
            removeItem: function (product) {
                this.$root.cart[product] -= 1
                this.calculateTotal()
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
                        console.log(self)
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
            calculateTotal: function () {
                this.subtotal = 0
                this.$root.cartItems = 0
                this.description = ""
                for (let product in this.$root.cart) {
                    this.subtotal += this.$root.inventory[product].price * this.$root.cart[product];
                    this.$root.cartItems += this.$root.cart[product];
                    this.description +=  this.$root.cart[product] > 0 ? `${product} x${this.$root.cart[product]} ; `  : ''
                }
                localStorage.cart = JSON.stringify(this.$root.cart)
                // clear paypal html
                this.$refs.vuePaypal.innerHTML = ""
            }
        },
        mounted() {
            this.calculateTotal()
            this.initPayPalButton(this)
        }
    }
</script>