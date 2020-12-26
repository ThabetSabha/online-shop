import React from 'react';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import './header.styles.scss';
//Router
import { Link } from 'react-router-dom';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartVisability } from '../../redux/cart/cart.selectors';
import { signOutStart } from '../../redux/user/user.actions';
//Components
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';


const Header = () => {
    const dispatch = useDispatch();
    const signOut = () => dispatch(signOutStart());
    const hidden = useSelector(selectCartVisability);
    const currentUser = useSelector(selectCurrentUser);

    return (
        <div className="header">
            <Link className='logo-container' to='/'>
                <Logo className='logo' />
            </Link>
            <div className="options">
                <Link className='option' to='/shop'>
                    SHOP
                </Link>
                <Link className='option' to='/contact'>
                    CONTACT
                </Link>
                {
                    currentUser ?
                        <Link className='option' to='/' onClick={() => signOut()}>
                            SIGN OUT
                        </Link> :
                        <Link className='option' to='/signin'>
                            SIGN IN
                        </Link>
                }
                <CartIcon />
            </div>
            {
                hidden ? null : <CartDropdown />
            }
        </div>
    )
}


export default Header;