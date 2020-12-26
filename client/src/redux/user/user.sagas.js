import { takeLatest, put, call, all } from 'redux-saga/effects';

import {
    emailSignInStart,
    signInSuccess,
    signInFailure,
    signOutFailure,
    signOutSuccess,
    signUpFailure,
    signUpSuccess,
    checkUserSessionFinished
} from './user.actions';

import { clearCart } from '../cart/cart.action';

import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils';


function* getUserSnapshotFromUserAuthAndSignIn(userAuth,additionalData) {
    try {
        const userRef = yield yield call(
            createUserProfileDocument,
            userAuth,
            additionalData
          );
        const userSnapshot = yield userRef.get();
        yield put(signInSuccess({
            id: userSnapshot.id,
            ...userSnapshot.data(),
        }));
    } catch (error) {
        console.log(error);
        yield put(signInFailure(error));
    }
}

function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        yield getUserSnapshotFromUserAuthAndSignIn(user,{cartItems:[]});
    } catch (error) {
        console.log(error);
        yield put(signInFailure(error));
    }
}

function* signInWithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getUserSnapshotFromUserAuthAndSignIn(user);
    } catch (error) {
        console.log(error);
        yield put(signInFailure(error));
    }

}

function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) {
            yield put(checkUserSessionFinished());
            return
        };
        yield getUserSnapshotFromUserAuthAndSignIn(userAuth);
    } catch (error) {
        yield put(signInFailure(error));
    }


}

function* signOut() {
    try {
        yield auth.signOut();
        yield put(clearCart());
        yield put(signOutSuccess())
    } catch (error) {
        console.log(error);
        yield put(signOutFailure(error))
    }
}



function* signUp({ payload: { email, password, displayName, cartItems } }) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        yield createUserProfileDocument(user, {displayName, cartItems});
        yield put(signUpSuccess());
        yield put(emailSignInStart({ email, password }));
    } catch (error) {
        console.log(error);
        yield put(signUpFailure(error));
    }

}




function* onGoogleSignInStart() {
    yield takeLatest("GOOGLE_SIGN_IN_START", signInWithGoogle)
}

function* onEmailSignInStart() {
    yield takeLatest("EMAIL_SIGN_IN_START", signInWithEmail)
}

function* onCheckUserSession() {
    yield takeLatest("CHECK_USER_SESSION", isUserAuthenticated)
}

function* onSignOut() {
    yield takeLatest("SIGN_OUT_START", signOut);
}

function* onSignUpStart() {
    yield takeLatest("SIGN_UP_START", signUp)
}

export function* userSagas() {
    yield all([call(onGoogleSignInStart), call(onEmailSignInStart), call(onCheckUserSession), call(onSignOut), call(onSignUpStart)]);
} 