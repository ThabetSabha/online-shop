import React from 'react';
import './checkout.styles.scss';
//Redux
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';
//Components
import CheckoutItem from '../../Components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../Components/stripe-checkout-button/stripe-checkout-button.component';


const CheckoutPage = () => {
    const total = useSelector(selectCartTotal);
    const cartItems = useSelector(selectCartItems);
    return (
        <div className="checkout-page">
            <div className="checkout-header">
                <div className="header-block">
                    <span>Product</span>
                </div>
                <div className="header-block">
                    <span>Description</span>
                </div>
                <div className="header-block">
                    <span>Quantity</span>
                </div>
                <div className="header-block">
                    <span>Price</span>
                </div>
                <div className="header-block">
                    <span>Remove</span>
                </div>
            </div>
            {
                cartItems.length > 0 ?
                    cartItems.map(cartItem => (<CheckoutItem key={cartItem.id} cartItem={cartItem} />)) :
                    <span className="empty-cart-message">Your cart is empty!</span>
            }
            <div className="total">
                <span>TOTAL: ${total}</span>
            </div>
            {total > 0 ?
                <>
                    <div className="test-warning">
                        *Please use the following test card for payments*
                <br />
                        <span>4242-4242-4242-4242  -  Exp: Any Future Data  -  CVC: Any 3 digits</span>
                    </div>
                    <StripeCheckoutButton price={total} />
                </> :
                <div />
            }

        </div>
    )
}

export default CheckoutPage;