import * as ActionTypes from './ActionTypes';

export const ordersReducer = (state = { isLoading: false,
                                            errMess: null,
                                            orders: []}, action) => {

    switch(action.type) {
        case ActionTypes.FETCH_ORDERS_DATA_LOADING:
            return {...state, isLoading: true, errMess: null, orders: []}
        
        case ActionTypes.FETCH_ORDERS_DATA:
            return {...state, isLoading: false, errMess: null, orders: action.payload};
        
        case ActionTypes.FETCH_ORDERS_DATA_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        
        default:
            return state;
    }
}