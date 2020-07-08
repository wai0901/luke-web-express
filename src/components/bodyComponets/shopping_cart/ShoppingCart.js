import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom'
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuidv4 } from 'uuid';
import CheckOutItem from './CheckOutItem';
import { fetchCartData, updateCartItems, removeCartItems, checkoutOrder } from '../../../redux/ActionCreater';
import './css/ShoppingCart.css';

const mapDispatchToProps = {
    updateCartItems: (cartItem, id) => (updateCartItems(cartItem, id)),
    removeCartItems: (id) => (removeCartItems(id)),
    checkoutOrder: (order) => (checkoutOrder(order)),
    fetchCartData
}


//Material Ui Style
const useStyles = makeStyles((theme) => ({
    buttonStyle: {
      width: '150px',
      margin: theme.spacing(0.5),
      fontSize: '15px',
      fontWeight: 'bold'
    },
  }));

const ShoppingCart = ({inCartItems, 
                        cartTotal, 
                        updateCartItems, 
                        removeCartItems, 
                        fetchCartData,
                        authStatus,
                        handleModalOpen,
                        setLocalCart,
                        localCart
                    }) => {

    useEffect(() => {

        authStatus.isAuthenticated && fetchCartData();
        
    }, [])

    const cart = inCartItems ? inCartItems.cartItems : [];


    // sort the cart items
    const sortedItems = 
        //check if any item in cart
        cart &&
        //start sorting
        cart.sort((a, b) => {
        let itemA = a.productId.toUpperCase();
        let itemB = b.productId.toUpperCase();
        if (itemA < itemB) {
            return -1;
        }
        if (itemA > itemB) {
            return 1;
        }
        return 0;
    });

    //update qty items in cart
    const changeQtyHandler = (item, productId, action) => {
        let qty = Number(item.quantity);
        let cartId = inCartItems._id;
        let numOfItemsInCart = inCartItems.cartItems.length;
        let remainCartItems = inCartItems.cartItems.filter(item => item.productId !== productId);

        //to check if the user is logged in
        if (authStatus.isAuthenticated) {
            // logged in user, items storge in server
            if (action === "plus") {
                updateCartItems(updateQtyToItem(inCartItems, item, qty, action, remainCartItems, authStatus), cartId);
            } else if (action === "minus" && qty > 1) {
                updateCartItems(updateQtyToItem(inCartItems, item, qty, action, remainCartItems, authStatus), cartId);
            } else if (action === "minus" && qty === 1 && numOfItemsInCart === 1) {
                removeCartItems(cartId);
            } else if (action === "minus" && qty === 1 && numOfItemsInCart > 1) {
                updateCartItems(removeCartItem(inCartItems, remainCartItems, authStatus), cartId);
            } else if (action === "remove" && numOfItemsInCart > 1) {
                updateCartItems(removeCartItem(inCartItems, remainCartItems, authStatus), cartId);
            } else if (action === "remove" && numOfItemsInCart === 1) {
                removeCartItems(cartId);
            }
        } else {
            // No login, cart items in local storage;
            if (action === "plus") {
                let updatedItems = updateQtyToItem(localCart, item, qty, action, remainCartItems, authStatus);
                localStorage.setItem('cart', JSON.stringify(updatedItems));;
            } else if (action === "minus" && qty > 1) {
                let updatedItems = updateQtyToItem(localCart, item, qty, action, remainCartItems, authStatus);
                localStorage.setItem('cart', JSON.stringify(updatedItems));;
            } else if (action === "minus" && qty === 1 && numOfItemsInCart === 1) {
                localStorage.removeItem('cart');
            } else if (action === "minus" && qty === 1 && numOfItemsInCart > 1) {
                let updatedItems = removeCartItem(localCart, remainCartItems, authStatus);
                localStorage.setItem('cart', JSON.stringify(updatedItems));;
            } else if (action === "remove" && numOfItemsInCart > 1) {
                let updatedItems = removeCartItem(localCart, remainCartItems, authStatus);
                localStorage.setItem('cart', JSON.stringify(updatedItems));;
            } else if (action === "remove" && numOfItemsInCart === 1) {
                localStorage.removeItem('cart');
            }
            let updateCart = JSON.parse(localStorage.getItem('cart')) || [];
            return setLocalCart(() => updateCart);
        }
        
    }

    const classes = useStyles();

    const history = useHistory();

    return (
        <div className="cart-container">
            <div className="top-section">
                <div className="top-container">
                    <div className="buttons back-button-order">
                        <Button onClick={() => history.goBack()} variant="outlined" size="middle" className={classes.buttonStyle}>Back</Button>
                    </div>
                    <div className="buttons total">
                        <h1><span>$</span> {inCartItems ? cartTotal : "0.00"} <span>USD</span></h1>
                    </div>
                    <div className="buttons checkout-button-order">
                        {
                            !authStatus.isAuthenticated ?
                            <Link className="checkout-button"><Button onClick={() => handleModalOpen()} variant="outlined" size="middle" className={classes.buttonStyle}>Check Out</Button></Link> :
                            <Link to={"/checkout"} className="checkout-button"><Button variant="outlined" size="middle" className={classes.buttonStyle}>Check Out</Button></Link>
                        }
                    </div>
                </div>
            </div>
            <div className="items-container">
                <ul>
                    {
                        sortedItems &&
                        sortedItems.map(item => 
                            <CheckOutItem 
                                item={item}
                                changeQtyHandler={changeQtyHandler}
                                keyId={uuidv4()}
                            />)
                    }
                </ul>
                {
                    inCartItems &&
                    inCartItems.length === 0 && 
                    <div className="empty-cart-message">
                        <h2>Cart is empty</h2>
                    </div>
                }
            </div>
        </div>
    )
}

const updateQtyToItem = (cartItems, newItem, qty, action, remainCartItems, auth) => {
    let updatedItem;

    let userId = auth.isAuthenticated ?
                (JSON.parse(localStorage.getItem('user')) || [])._id :
                "Not Register User";

    action === "plus" ?
    updatedItem = {...newItem, quantity: qty + 1} :
    updatedItem = {...newItem, quantity: qty - 1} 

    return {
        ...cartItems,
        userId: userId,
        cartItems: [
            ...remainCartItems,
            {...updatedItem}
        ]
    }
}

const removeCartItem = (cartItems, remainCartItems, auth) => {

    let userId = auth.isAuthenticated ?
                (JSON.parse(localStorage.getItem('user')) || [])._id :
                "Not Register User";

    return {
        ...cartItems,
        userId: userId,
        cartItems: [
            ...remainCartItems,
        ]
    }
}

export default connect(null, mapDispatchToProps)(ShoppingCart);