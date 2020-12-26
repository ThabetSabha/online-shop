const INTIAL_STATE = {
    collections: null,
    isFetching: false,
    errorMessage: undefined,
    isCollectionLoading: true,
}

const shopReducer = (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case "FETCH_COLLECTIONS_START":
            return ({
                ...state,
                isFetching: true,
            })

        case "FETCH_COLLECTIONS_SUCCESS":
            return ({
                ...state,
                isFetching: false,
                collections: action.payload,
                isCollectionLoading: false,
            })
        case "FETCH_COLLECTIONS_FAILURE":
            return ({
                ...state,
                isFetching: false,
                errorMessage: action.payload,
                isCollectionLoading: false,
            })
        default:
            return state;
    }
}

export default shopReducer;