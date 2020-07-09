import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './cartReducer';
import { signupReducer } from './signupReducer';
import { ordersReducer } from './ordersReducer';
import { usersReducer } from './usersReducer';
import { Auth } from './auth';


export const configureStore = () => {
    const store = createStore(
        combineReducers({
            cartItem: cartReducer,
            signup: signupReducer,
            orders: ordersReducer,
            users: usersReducer,
            auth: Auth,
        }),
        applyMiddleware(thunk)
    );

    return store;
};