import * as ActionTypes from './ActionTypes';

export const usersReducer = (state = { isLoading: false,
                                            errMess: null,
                                            users: []}, action) => {

    switch(action.type) {
        case ActionTypes.FETCH_USERS_DATA_LOADING:
            return {...state, isLoading: true, errMess: null, users: []}
        
        case ActionTypes.FETCH_USERS_DATA:
            return {...state, isLoading: false, errMess: null, users: action.payload};
        
        case ActionTypes.FETCH_USERS_DATA_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        
        default:
            return state;
    }
}