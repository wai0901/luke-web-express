import * as ActionTypes from './ActionTypes';

export const signupReducer = (state = { isLoading: false,
                                            errMess: null,
                                            signup: []}, action) => {

    switch(action.type) {
        case ActionTypes.SIGNUP_LOADING:
            return {...state, isLoading: true, errMess: null, signup: []}
        
        case ActionTypes.SIGNUP_SUCCESS:
            return {...state, isLoading: false, errMess: null, signup: action.payload};
        
        case ActionTypes.SIGNUP_FAILURE:
            return {...state, isLoading: false, errMess: action.payload};
        
        default:
            return state;
    }
}