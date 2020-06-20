import * as ActionTypes from './ActionTypes';
import axios from 'axios';
import { baseUrl } from '../shared/baseUrl';

const tempCart = []

//Fetch Data from server
export const fetchMainData = () => async dispatch => {
    dispatch(mainDataLoading());

    try {
        const response = await axios.get(baseUrl + 'main');
        dispatch(addMainData(response));
    }
    catch (error) {
        dispatch(mainFailed(error));
    }
};

export const mainDataLoading = () => ({
    type: ActionTypes.FETCH_MAIN_LOADING,
});

export const mainFailed = errMess => ({
    type: ActionTypes.FETCH_MAIN_FAILED,
    payload: errMess
});

export const addMainData = (mainData) => ({
    type: ActionTypes.FETCH_MAIN_DATA,
    payload: mainData
});

//Fetch select category Id from menu
export const fetchCategoryData = (link) => async dispatch => {
    dispatch(categoryDataLoading());

    try {
        const response = await axios.get(baseUrl + 'main/' + link);
        dispatch(addCategoryData(response));
    }
    catch (error) {
        dispatch(categoryFailed(error));
    }
}

export const categoryFailed = errMess => ({
    type: ActionTypes.FETCH_CATEGORY_FAILED,
    payload: errMess
});

export const addCategoryData = (categoryData) => ({
    type: ActionTypes.FETCH_CATEGORY_DATA,
    payload: categoryData
});

export const categoryDataLoading = () => ({
    type: ActionTypes.FETCH_CATEGORY_LOADING,
});


//Fetch Items by the "link" from Category Component
export const fetchItemsData = (link, categoryId) => async dispatch => {
    dispatch(ItemsDataLoading());

    try {
        const response = await axios.get(baseUrl + 'main/' + categoryId + '/' + link);
        dispatch(addItemsData(response));
    }
    catch (error) {
        dispatch(ItemsFailed(error));
    }
}

export const ItemsFailed = errMess => ({
    type: ActionTypes.FETCH_ITEMS_FAILED,
    payload: errMess
});

export const addItemsData = (response) => ({
    type: ActionTypes.FETCH_ITEMS_DATA,
    payload: response
});

export const ItemsDataLoading = () => ({
    type: ActionTypes.FETCH_ITEMS_LOADING,
});


//Post to Server
export const postCartItems = (cartItem) => async dispatch => {
    dispatch(cartDataLoading());
    
    try {
        await axios.post(baseUrl + 'carts', cartItem)
        dispatch(fetchCartData());
    }
    catch (error) {
        dispatch(cartFailed(error));
    }
}

//Update request
export const updateCartItems = (cartItem, id) => async dispatch => {
    dispatch(cartDataLoading());
    try {
        await axios.put(baseUrl + 'carts/' + id, cartItem)
        dispatch(fetchCartData());
    }
    catch (error) {
        dispatch(cartFailed(error));
    }
}

//delete request
export const removeCartItems = (id) => async dispatch => {
    try {
        await axios.delete(baseUrl + 'carts/' + id)
        dispatch(fetchCartData());
    }
    catch (error) {
        dispatch(cartFailed(error));
    }
}

//get cart Data from server
export const fetchCartData = () => async dispatch => {
    try {
        const response = await axios.get(baseUrl + 'carts');
        console.log(response)
        dispatch(addCartData(response));
    }
    catch (error) {
        dispatch(ItemsFailed(error));
    }
};

export const cartFailed = errMess => ({
    type: ActionTypes.FETCH_CART_FAILED,
    payload: errMess
});

export const addCartData = (response) => ({
    type: ActionTypes.FETCH_CART_DATA,
    payload: response
});

export const cartDataLoading = () => ({
    type: ActionTypes.FETCH_CART_LOADING,
});


