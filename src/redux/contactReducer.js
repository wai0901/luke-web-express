import * as ActionTypes from './ActionTypes';

export const contactReducer = (state = { isLoading: false,
                                            errMess: null,
                                            contact: []}, action) => {

    switch(action.type) {
        case ActionTypes.CONTACT_LOADING:
            return {...state, isLoading: true, errMess: null, contact: []}
        
        case ActionTypes.ADD_CONTACT_DATA:
            return {...state, isLoading: false, errMess: null, contact: action.payload};
        
        case ActionTypes.CONTACT_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        
        default:
            return state;
    }
}