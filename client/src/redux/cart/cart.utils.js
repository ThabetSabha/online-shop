export const addItemToCart = (cartItems, newItem) => {
    const isInCart = cartItems.find(cartItem => { return cartItem.id === newItem.id });

    if (isInCart) {
        return cartItems.map(cartItem =>
            cartItem.id === newItem.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        )
    }
    return [...cartItems, { ...newItem, quantity: 1 }];

}


export const decreaseItemQuantity = (cartItems, itemToDecrease) => {
    if (itemToDecrease.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== itemToDecrease.id)
    }

    return cartItems.map(cartItem =>
        cartItem.id === itemToDecrease.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    );

}


export const setCartItems = (cartItemsFromFirebase, cartItemsFromLS) => {
    if(cartItemsFromFirebase.length > 0){
        return cartItemsFromFirebase;
    }
    return cartItemsFromLS;
}