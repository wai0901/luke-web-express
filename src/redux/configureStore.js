import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { mainPageReducer } from './mainPageReducer';
import { categoryReducer } from './categoryReducer';
import { itemsReducer } from './itemsReducer';
import { cartReducer } from './cartReducer';
import { signupReducer } from './signupReducer';
import { ordersReducer } from './ordersReducer';
import { usersReducer } from './usersReducer';
import { Auth } from './auth';


export const configureStore = () => {
    const store = createStore(
        combineReducers({
            mainPage: mainPageReducer,
            category: categoryReducer,
            items: itemsReducer,
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