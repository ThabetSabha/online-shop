const INITIAL_STATE = {
    isLoading: true,
    currentUser: null,
    signOutError: null,
    signInError: null,
    signUpError:null,
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SIGN_UP_START":
        case "SIGN_IN_START":
            return {
                ...state,
                error:null,
                signInError: null,
                signUpError:null
            }
        case "SIGN_IN_SUCCESS":
            return {
                ...state,
                currentUser: action.payload,
                error: null,
                signInError: null,
                signUpError:null,
                isLoading: false,
            };

        case "SIGN_OUT_SUCCESS":
        case "SIGN_UP_SUCCESS":
        case "CHECK_USER_SESSION_FINISHED":
            return {
                ...state,
                currentUser: null,
                signInError: null,
                signUpError:null,
                isLoading: false,
                error: null,
            }
        case "SIGN_OUT_FAILURE":
            return {
                ...state,
                signOutError: action.payload,
                isLoading: false,
            }
        case "SIGN_UP_FAILURE":
            return {
                ...state,
                signUpError: action.payload,
                isLoading: false,
            }
        case "SIGN_IN_FAILURE":
            return{
                ...state,
                signInError:action.payload,
                isLoading:false,
            }
            
        default:
            return state;
    }
}

export default userReducer;