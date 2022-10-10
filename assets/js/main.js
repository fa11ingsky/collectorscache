(function ($) {
    "use strict";

    $(document).ready(function($){

        // projects filters isotop
        $(".product-filters li").on('click', function () {
            $(".product-filters li").removeClass("active");
            $(this).addClass("active");

            var selector = $(this).attr('data-filter');

            $(".product-lists").isotope({
                filter: selector,
            });
            
        });

        // Handle click events for dynamic HTML
        $.getJSON("assets/inventory.json", (inventory) => {
            var cartClasses = {};
            for (let product in inventory) {
                // fetch all classes
                cartClasses[inventory[product].cart] = product;
            }

            $(".product-section").on('click', function (event) {
                var cartElement = $(event.target)[0];
                var product = null;
                for (var i in cartClasses) {
                    if (cartElement.className.indexOf(i) !== -1) {
                        product = cartClasses[i];
                    }
                };                
                if (!product) {
                    for (var i in cartClasses) {
                        if (cartElement.parentElement.className.indexOf(i) !== -1) {
                            product = cartClasses[i];
                        }
                    }
                }
                if (!product) {
                    return;
                }
                // fetch cart
                let cart = JSON.parse(sessionStorage.getItem("cart"));
                cart[product] = product in cart ? cart[product] + 1 : 1;
                // store cart
                sessionStorage.setItem("cart", JSON.stringify(cart));
            });            
        });

        // isotop inner
        $(".product-lists").isotope();

        // stikcy js
        $("#sticker").sticky({
            topSpacing: 0
        });

        // Global Cart
        sessionStorage.setItem("cart", JSON.stringify({}));

        // Home icon toggle
        $(".home").on("click", () => {
            $(".product-section").load(`pages/products.html`);
        });

        // Shopping cart toggle
        $(".shopping-cart").on("click", () => {
            $(".product-section").load(`pages/checkout.html`);
        });

        // Initial page
        $(".product-section").load(`pages/products.html`);
        
        

    });

    jQuery(window).on("load",function(){
        jQuery(".loader").fadeOut(1000);
    });

   

}(jQuery));