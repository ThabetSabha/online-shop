import React from 'react';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { toggleCartVisability } from '../../redux/cart/cart.action';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';



const CartIcon = () => {
    const dispatch = useDispatch();
    const itemsCount = useSelector(selectCartItemsCount);
    return (
        <div className="cart-icon" onClick={() => dispatch(toggleCartVisability())}>
            <ShoppingIcon className="shopping-icon" />
            <span className="item-count">{itemsCount}</span>
        </div>
    )
}



export default CartIcon;