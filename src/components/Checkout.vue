<template>
    <div class="CartContainer container">
        <div class="Header">
            <h3 class="Heading">Shopping Cart</h3>
            <h5 class="Action">Remove all</h5>
        </div>

        <div class="cartEntries">
            <div class="Cart-Items" v-for="(data,product) in $root.cart">
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
                    <div class="remove"><u>Remove</u></div>
                </div>
            </div>
        </div>
        <hr>
        <div class="checkout">
            <div class="total">
                <div>
                    <div class="subtotal">Sub-Total</div>
                    <div class="total-items items">{{items}} items</div>
                </div>
                <div class="cart-total">${{subtotal}}</div>
            </div>
            <div id="smart-button-container">
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
                items: 0,
                description: ""
            }
        },
        mounted() {
            for (let product in this.$root.cart) {
                this.subtotal += this.$root.inventory[product].price * this.$root.cart[product];
                this.items += this.$root.cart[product];
                this.description += `${product} x${this.$root.cart[product]} ; `
            }

            // paypal button
            function initPayPalButton(descr, subt) {
                paypal.Buttons({
                    style: {
                        shape: 'rect',
                        color: 'blue',
                        layout: 'vertical',
                        label: 'checkout',

                    },

                    createOrder: function (data, actions) {
                        return actions.order.create({
                            purchase_units: [{ "description": descr, "amount": { "currency_code": "AUD", "value": subt } }]
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
            }
            initPayPalButton(this.description, this.subtotal);
        }
    }
</script>