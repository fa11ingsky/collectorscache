import json from '~/static/inventory.json'

export const getInventory = () => useState('inventory', () => json)
export const getCart = () => useState('cart', () => new Object())
export const getCartItems = () => useState('cartItems', () => 0)