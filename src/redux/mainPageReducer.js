import * as ActionTypes from './ActionTypes';


export const mainPageReducer = (state = { isLoading: false,
                                            errMess: null,
                                            homeMenu: []}, action) => {
    switch(action.type) {
        case ActionTypes.FETCH_MAIN_DATA:
            return {...state, isLoading: false, errMess: null, homeMenu: action.payload};

        case ActionTypes.FETCH_MAIN_LOADING:
            return {...state, isLoading: true, errMess: null, homeMenu: []};
    
        case ActionTypes.FETCH_MAIN_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
}