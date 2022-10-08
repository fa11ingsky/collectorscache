// Fetch cart
var cart = JSON.parse(sessionStorage.getItem("cart"));
$.getJSON("assets/inventory.json", (inventory) => {
    var subtotal = 0;
    var items = 0;
    var cartList = "";
    var description = "";
    for (let product in cart) {
        subtotal += inventory[product].price * cart[product];
        items += cart[product];
        description += `${product} x${cart[product]} ; `;
        // Build cart
        cartList += `
        <div class="Cart-Items">
            <div class="image-box">
                <img src="assets/img/products/${inventory[product].img}" style={{ height="120px" }} />
            </div>
            <div class="about">
                <h3 class="title">${product}</h3>
            </div>
            <div class="counter">
                <div class="btn">+</div>
                <div class="count">${cart[product]}</div>
                <div class="btn">-</div>
            </div>
            <div class="prices">
                <div class="amount">$${inventory[product].price * cart[product]}</div>
                <div class="remove"><u>Remove</u></div>
            </div>
        </div>
        `;
    }
    $(".cart-total").html(`AUD $${subtotal}`);
    $(".total-items").html(`${items} items`);
    sessionStorage.setItem("total", subtotal);

    $(".cartEntries").html(cartList);



    // paypal button
    function initPayPalButton() {
        paypal.Buttons({
            style: {
                shape: 'rect',
                color: 'blue',
                layout: 'vertical',
                label: 'checkout',

            },

            createOrder: function (data, actions) {
                return actions.order.create({
                    purchase_units: [{ "description": description, "amount": { "currency_code": "AUD", "value": subtotal } }]
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
    initPayPalButton();

});



