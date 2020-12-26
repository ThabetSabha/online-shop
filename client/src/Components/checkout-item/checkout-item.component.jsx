import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem, clearItemFromCart, decreaseItemQuantity } from '../../redux/cart/cart.action';
import './checkout-item.styles.scss';


const CheckoutItem = ({ cartItem }) => {
    const { imageUrl, name, quantity, price } = cartItem;
    const dispatch = useDispatch();

    return (
        <div className="checkout-item">
            <div className="image-container">
                <img alt="item" src={imageUrl} />
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
                <div className="arrow" onClick={() => dispatch(decreaseItemQuantity(cartItem))}>&#10094;</div>
                <span className="value">{quantity}</span>
                <div className="arrow" onClick={() => dispatch(addItem(cartItem))}>&#10095;</div>
            </span>
            <span className="price">${price}</span>
            <div className="remove-button" onClick={() => dispatch(clearItemFromCart(cartItem))}>&#10005;</div>
        </div>
    )
}

export default CheckoutItem;