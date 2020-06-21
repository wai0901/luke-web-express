import * as ActionTypes from './ActionTypes';

export const loginReducer = (state = { isLoading: false,
                                            errMess: null,
                                            login: []}, action) => {

    switch(action.type) {
        case ActionTypes.USER_LGOIN_LOADING:
            return {...state, isLoading: true, errMess: null, login: []}
        
        case ActionTypes.USER_LOGIN_DATA:
            return {...state, isLoading: false, errMess: null, login: action.payload};
        
        case ActionTypes.USER_LOGIN_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        
        default:
            return state;
    }
}