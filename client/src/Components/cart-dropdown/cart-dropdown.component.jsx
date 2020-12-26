import React from 'react';
import './cart-dropdown.styles.scss';
//Router
import { useHistory } from 'react-router';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../redux/cart/cart.selectors'
import { toggleCartVisability } from '../../redux/cart/cart.action';
//Components
import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';

const CartDropdwon = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    let history = useHistory();
    return (
        <div className="cart-dropdown">
            <div className="cart-items">
                {
                    cartItems.length ?

                        cartItems.map(cartItem => (<CartItem key={cartItem.id} item={cartItem} />))
                        :
                        <span className="empty-message">Your cart is empty!</span>
                }
            </div>
            <CustomButton onClick={() => {
                history.push('/checkout');
                dispatch(toggleCartVisability())
            }}>GO TO CHECKOUT</CustomButton>
        </div>
    )
}



export default CartDropdwon;
