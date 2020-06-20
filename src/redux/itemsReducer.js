import * as ActionTypes from './ActionTypes';


export const itemsReducer = (state = { isLoading: false,
                                            errMess: null,
                                            items: []}, action) => {
                  
    switch(action.type) {
        case ActionTypes.FETCH_ITEMS_DATA:
            return {...state, isLoading: false, errMess: null, items: action.payload};

        case ActionTypes.FETCH_ITEMS_LOADING:
            return {...state, isLoading: true, errMess: null, items: []}
    
        case ActionTypes.FETCH_ITEMS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
}