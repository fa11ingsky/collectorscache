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