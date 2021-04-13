import { takeLatest, all, call, put} from "redux-saga/effects";
import { auth, createUserProfileDocument, googleProvider } from "../../firebase/firebase.utils";
import UserActionTypes from "./user-types";


export function* signInWithGoogle() {
    try {
        const userRef = yield auth.signInWithPopup(googleProvider)
        console.log(userRef)
    } catch (error) {

    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START)
}



export function* userSagas() {
    yield all([call(onGoogleSignInStart)])
}