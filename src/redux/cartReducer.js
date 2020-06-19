import * as ActionTypes from './ActionTypes';

export const cartReducer = (state = { isLoading: false,
                                            errMess: null,
                                            cart: []}, action) => {



    switch(action.type) {
        case ActionTypes.FETCH_CART_LOADING:
            return {...state, isLoading: true, errMess: null, category: []}
        
        case ActionTypes.FETCH_CART_DATA:
            return {...state, isLoading: false, errMess: null, cart: action.payload};
        
        case ActionTypes.FETCH_CART_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        
        default:
            return state;
    }
}

