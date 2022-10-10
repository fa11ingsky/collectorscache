// Product view
// fetch inventory
$.getJSON("assets/inventory.json", (inventory) => {
    var productRowStart = `<div class="row product-row">`;
    var productRowEnd = `</div>`;
    var entries = 1;
    var productPage = productRowStart;
    for (let product in inventory) {   
        if (entries % 3 == 0) {
            productage += productRowEnd + productRowStart;
        }
            productPage += `<div class="col-md-4  text-center pokemon">
                <div class="single-product-item">
                    <div class="product-image">
                        <a><img src="assets/img/products/${inventory[product].img}" alt=""></a>
                    </div>
                    <h3>${product}</h3>
                    <p class="product-price"> $${inventory[product].price} </p>
                    <a class=".${inventory[product].cart} cart-btn"><i class="fas fa-shopping-cart"></i> Add to Cart</a>
                </div>
            </div>`;        
    }
    productPage += productRowEnd;
    $(".products").html(productPage);
});
