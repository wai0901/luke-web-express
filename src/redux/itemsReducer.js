import * as ActionTypes from './ActionTypes';


export const itemsReducer = (state = { isLoading: false,
                                            errMess: null,
                                            ItemsData: []}, action) => {
                                                
    switch(action.type) {
        case ActionTypes.FETCH_ITEMS_DATA:
            return {...state, isLoading: false, errMess: null, ItemsData: action.payload};

        case ActionTypes.FETCH_ITEMS_LOADING:
            return {...state, isLoading: true, errMess: null, ItemsData: []}
    
        case ActionTypes.FETCH_ITEMS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
}