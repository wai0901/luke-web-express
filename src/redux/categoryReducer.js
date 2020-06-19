import * as ActionTypes from './ActionTypes';


export const categoryReducer = (state = { isLoading: false,
                                            errMess: null,
                                            category: []}, action) => {
    switch(action.type) {
        case ActionTypes.FETCH_CATEGORY_LOADING:
            return {...state, isLoading: true, errMess: null, category: []}

        case ActionTypes.FETCH_CATEGORY_DATA:
            return {...state, isLoading: false, errMess: null, category: action.payload};

        case ActionTypes.FETCH_CATEGORY_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
}