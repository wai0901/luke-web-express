import * as ActionTypes from './ActionTypes';
import axios from 'axios';
import { baseUrl } from '../shared/baseUrl';


// Fetch Data from server
// export const fetchMainData = () => dispatch => {
//     dispatch(mainDataLoading());

//     const bearer = 'Bearer ' + localStorage.getItem('token');

//     return fetch(baseUrl + 'main', {
//         headers: {
//             'Authorization': bearer
//         },
//     })
//     .then(response => {
//             if (response.ok) {
//                 console.log(response)
//                 return response;
//             } else {
//                 const error = new Error(`Error ${response.status}: ${response.statusText}`);
//                 error.response = response;
//                 throw error;
//             }
//         },
//         error => { throw error; }
//     )
//     .then(response => response.json())
//     .then(response => dispatch(addMainData(response)))
//     .catch(error => dispatch(mainFailed(error.message)));
// }


// Fetch Data from server
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
export const postCartItems = (cartItem) => dispatch => {
    dispatch(cartDataLoading());

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'carts', {
        method: 'POST',
        body: JSON.stringify(cartItem),
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
    .then(() => dispatch(fetchCartData()))
    .catch(error => { 
        dispatch(cartFailed(error));
    });
};

//Update request
export const updateCartItems = (cartItem, id) => dispatch => {
    dispatch(cartDataLoading());

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'carts/' + id, {
        method: 'PUT',
        body: JSON.stringify(cartItem),
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
    .then(() => dispatch(fetchCartData()))
    .catch(error => { 
        dispatch(cartFailed(error));
    });
};

//remove Cart item
export const removeCartItems = id => dispatch => {
    dispatch(cartDataLoading());
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'carts/' + id, {
        method: "DELETE",
        headers: {
            'Authorization': bearer
        },
        credentials: "same-origin"
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
        error => { throw error; }
    )
    .then(response => response.json())
    .then(item => {
        console.log('Favorite Deleted', item);
        dispatch(fetchCartData());
    })
    .catch(error => dispatch(cartFailed(error)));
};

//get cart Data from server
export const fetchCartData = () => dispatch => {
    dispatch(cartDataLoading());

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'carts', {
        headers: {
            'Authorization': bearer
        },
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
        error => { throw error; }
    )
    .then(response => response.json())
    .then(response => {
        dispatch(addCartData(response));
    })
    .catch(error => dispatch(ItemsFailed(error.message)));
}

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

//check order
export const ordersData = () => dispatch => {
    dispatch(fetchOrdersDataLoading());

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'orders', {
        headers: {
            'Authorization': bearer
        },
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
        error => { throw error; }
    )
    .then(response => response.json())
    .then(orders => dispatch(fetchOrdersData(orders)))
    .catch(error => dispatch(fetchOrdersDataFailed(error.message)));
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



//Login Route

export const userLogin = creds => async dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    return await fetch(baseUrl + 'users/login', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json' 
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
            if (response.ok) {
                return response;
            } else {
                console.log(response)
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
            localStorage.setItem('user', JSON.stringify(response.user));
            localStorage.setItem('serverItems', JSON.stringify(response.serverItems ? response.serverItems : []));
            // Dispatch the success action
            dispatch(receiveLogin(response));
            // alert('You are successfully signed in');
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
        token: response
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
    localStorage.removeItem('user');
    localStorage.removeItem('serverItems');
    alert('Your are logged out, come again!!');
    // dispatch(favoritesFailed("Error 401: Unauthorized"));
    dispatch(receiveLogout())
}

//Sign up route
export const signupUser = (info) => (dispatch) => {
    dispatch(signupLoading())

    return fetch(baseUrl + 'users/signup', {
        method: "POST",
        body: JSON.stringify(info),
        headers: {
            'Content-Type': 'application/json'
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
        error => { throw error; }             
    )
    .then(response => response.json())
    .then(response => {
        dispatch(signupSuccess(response));
        alert('You are successfully signed up, thank you!');
    })
    .catch(error => {
        dispatch(signupFailed(error))
        alert('Your sign up could not be process\nError: '+error.message);
    });
};

export const signupFailed = errMess => ({
    type: ActionTypes.SIGNUP_FAILURE,
    payload: errMess
});

export const signupSuccess = (response) => ({
    type: ActionTypes.SIGNUP_SUCCESS,
    payload: response
});

export const signupLoading = () => ({
    type: ActionTypes.SIGNUP_LOADING,
});


//Fetch User information
export const fetchUsersData = () => dispatch => {
    dispatch(fetchUsersDataLoading());

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'users', {
        headers: {
            'Authorization': bearer
        },
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
        error => { throw error; }
    )
    .then(response => response.json())
    .then(users => dispatch(fetchData(users)))
    .catch(error => dispatch(fetchUsersDataFailed(error.message)));
}

export const fetchUsersDataFailed = errMess => ({
    type: ActionTypes.FETCH_USERS_DATA_FAILED,
    payload: errMess
});

export const fetchData = (response) => ({
    type: ActionTypes.FETCH_USERS_DATA,
    payload: response
});

export const fetchUsersDataLoading = () => ({
    type: ActionTypes.FETCH_USERS_DATA_LOADING,
});


