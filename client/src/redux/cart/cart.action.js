export const toggleCartVisability = () => (
    {
        type: "TOGGLE_CART_VISABILITY",
    }
)

export const addItem = (item) => ({
    type: "ADD_ITEM",
    payload: item,
})

export const clearItemFromCart = (item) => ({
    type: "CLEAR_ITEM_FROM_CART",
    payload: item,
})

export const decreaseItemQuantity = (item) => ({
    type: "DECREASE_ITEM_QUANTITY",
    payload: item
})

export const clearCart = () => ({
    type:"CLEAR_CART",
})

export const setCartFromFirebase = (cartItems) => ({
    type:"SET_CART_FROM_FIREBASE",
    payload: cartItems
})