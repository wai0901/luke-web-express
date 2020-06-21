import * as ActionTypes from './ActionTypes';
import axios from 'axios';
import { baseUrl } from '../shared/baseUrl';


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
    dispatch(cartDataLoading());

    try {
        const response = await axios.get(baseUrl + 'carts');
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


//checkout Route
export const checkoutOrder = (order) => dispatch => {
    dispatch(fetchOrdersDataLoading());

    const bearer = 'Bearer ' + localStorage.getItem('token');
    console.log(order)
    return fetch(baseUrl + 'orders', {
        method: 'POST',
        body: JSON.stringify(order),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
        error => { throw error }
    )
    .then(response => response.json())
    .then(response => dispatch(fetchOrdersData(response)))
    .catch(error => fetchOrdersDataFailed(error)
    );
};

// Admin Route

// export const ordersData = () => async dispatch => {
//     dispatch(fetchOrdersDataLoading());
//     try {
//         const response = await axios.get(baseUrl + 'orders');
//         console.log(response)
//         dispatch(fetchOrdersData(response));
//     }
//     catch (error) {
//         dispatch(fetchOrdersDataFailed(error));
//     }
// };

export const ordersData = () => dispatch => {
    dispatch(fetchOrdersDataLoading());

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'orders', {
        headers: {
            'Authorization': bearer
        },
    })
    .then(response => {
            console.log(response)
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
        error => { throw error; }
    )
    .then(response => response.json())
    .then(orders => dispatch(fetchOrdersData(orders)))
    .catch(error => dispatch(fetchOrdersDataLoading(error.message)));
}

export const fetchOrdersDataFailed = errMess => ({
    type: ActionTypes.FETCH_ORDERS_DATA_FAILED,
    payload: errMess
});

export const fetchOrdersData = (response) => ({
    type: ActionTypes.FETCH_ORDERS_DATA,
    payload: response
});

export const fetchOrdersDataLoading = () => ({
    type: ActionTypes.FETCH_ORDERS_DATA_LOADING,
});


//User Route
// export const userLogin = (data) => async dispatch => {
//     dispatch(userLoginLoading());

//     await axios.post(baseUrl + 'users/login', data)
//     .then(response => {
//         dispatch(userLoginData(response));
//         })
//     .catch(error => userLoginFailed(error));

// };

// export const userLoginFailed = errMess => ({
//     type: ActionTypes.USER_LOGIN_FAILED,
//     payload: errMess
// });

// export const userLoginData = (response) => ({
//     type: ActionTypes.USER_LOGIN_DATA,
//     payload: response
// });

// export const userLoginLoading = () => ({
//     type: ActionTypes.USER_LGOIN_LOADING,
// });


//Login Route

export const userLogin = creds => dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    return fetch(baseUrl + 'users/login', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json' 
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
        console.log(response)
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
        error => { throw error; }
    )
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            // If login was successful, set the token in local storage
            localStorage.setItem('token', response.token);
            localStorage.setItem('creds', JSON.stringify(creds));
            // Dispatch the success action
            // dispatch(fetchFavorites());
            dispatch(receiveLogin(response));
        } else {
            const error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(loginError(error.message)))
};

export const requestLogin = creds => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}
  
export const receiveLogin = response => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token
    }
}
  
export const loginError = message => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}

export const requestLogout = () => {
    return {
      type: ActionTypes.LOGOUT_REQUEST
    }
}
  
export const receiveLogout = () => {
    return {
      type: ActionTypes.LOGOUT_SUCCESS
    }
}

// Logs the user out
export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    // dispatch(favoritesFailed("Error 401: Unauthorized"));
    dispatch(receiveLogout())
}