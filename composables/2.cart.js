export const addToCart = function (product) {
    let cart = getCart()
    let cartItems = getCartItems()
    const inventory = getInventory()
    if (product in cart.value) {
        if (cart.value[product] + 1 <= inventory.value[product].stock) {
            cart.value[product]++
            cartItems.value += 1
        }
    } else {
        cart.value[product] = 1
        cartItems.value += 1
    }
}