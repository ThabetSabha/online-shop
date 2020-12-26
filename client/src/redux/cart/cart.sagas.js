import { takeLatest, put, call, all, select } from 'redux-saga/effects';
import { updateUserCart } from '../../firebase/firebase.utils';
import { clearCart, setCartFromFirebase } from './cart.action';
import { selectCartItems } from './cart.selectors';


function* clearUserCart() {
    yield put(clearCart());
}

//This is fired when user signs in
function* loadCartFromFirebase({ payload }) {
    try {
        const { cartItems } = payload;
        yield put(setCartFromFirebase(cartItems));
    } catch (error) {
        console.log(error);
    }
}



function* updateFirebaseCart() {
    try {
        const updatedCart = yield select(selectCartItems);
        yield call(updateUserCart, updatedCart);
    } catch (error) {
        console.log(error);
    }

}

function* onLoadCartFromFirebase() {
    yield takeLatest("SIGN_IN_SUCCESS", loadCartFromFirebase)
}


function* onCartChange() {
    yield takeLatest(["DECREASE_ITEM_QUANTITY", "CLEAR_ITEM_FROM_CART", "ADD_ITEM", "SET_CART_FROM_FIREBASE"], updateFirebaseCart)
}

function* onSignOutClearCart() {
    yield takeLatest("SIGN_OUT_SUCCESS", clearUserCart);
}

export function* cartSagas() {
    yield all([call(onLoadCartFromFirebase), call(onCartChange), call(onSignOutClearCart)]);
} 