// Product view
// fetch inventory
$.getJSON("assets/inventory.json", (inventory) => {
    for (let product in inventory) {
        $(`.${inventory[product].cart}`).on("click", () => {
            // fetch cart
            let cart = JSON.parse(sessionStorage.getItem("cart"));
            cart[product] = product in cart ? cart[product] + 1 : 1;
            // store cart
            sessionStorage.setItem("cart", JSON.stringify(cart));
        });
    }
});
