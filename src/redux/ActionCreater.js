import * as ActionTypes from './ActionTypes';

const tempCart = []

//Post to Server
export const postCartItems = (cartItem) => async dispatch => {
    
    dispatch(cartDataLoading());

    try {
        await tempCart.push(cartItem)
            // .then(() => fetchCartData());
    } catch(err) {
        dispatch(cartFailed(err));
    }
    console.log(tempCart)
    // dispatch(cartDataLoading());

    // try {
    //     await databaseRef.ref('cartItems').push(cartItem)
    //         // .then(() => fetchCartData());
    // } catch(err) {
    //     dispatch(cartFailed(err));
    // }
}

//Update request
export const updateCartItems = (cartItem, id) => async dispatch => {
    console.log(cartItem)
    // dispatch(cartDataLoading());
   
    // try {
    //     await databaseRef.ref('cartItems/' + id).set(cartItem)

    // } catch(err) {
    //     dispatch(cartFailed(err));
    // }
}

//delete request
export const removeCartItems = (id) => async dispatch => {
    console.log(id)
    // dispatch(cartDataLoading());

    // try {
    //     await databaseRef.ref('cartItems/' + id).remove()
       
    // } catch(err) {
    //     dispatch(cartFailed(err));
    // }
}

//get cart Data from server
export const fetchCartData = () => async dispatch => {
    // dispatch(cartDataLoading());
    // try {
    //     await databaseRef.ref('cartItems').on('value', snapshot => {
    //         let items = []
    //         snapshot.forEach(child => {
    //             items.push({
    //                 _key: child.key,
    //                 ...child.val()
    //             });
    //         })

    //     dispatch(addCartData(items))
    //     items = [];
    //     })

    // } catch(err) {
    //     dispatch(cartFailed(err));
    // } 
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


