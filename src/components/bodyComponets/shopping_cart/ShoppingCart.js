import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom'
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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
                        handleModalOpen
                    }) => {

    useEffect(() => {
        fetchCartData();
    }, [])

    // sort the cart items
    const sortedItems = 
        //check if any item in cart
        inCartItems &&
        //start sorting
        inCartItems.sort((a, b) => {
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

    const changeQtyHandler = (item, id, action) => {
        let qty = Number(item.quantity);

        if (action === "plus") {
            updateCartItems({...item, quantity: qty + 1}, id);
        } else if (action === "minus") {
            qty === 1 || qty === "1"?
            removeCartItems(id):
            updateCartItems({...item, quantity: qty - 1}, id);
        } else if (action === "remove") {
            removeCartItems(id);
        }
    }

    const classes = useStyles();

    const history = useHistory();

    return (
        <div className="cart-container">
            <div className="top-section">
                <div className="top-container">
                    <div className="button">
                        <Button onClick={() => history.goBack()} variant="outlined" size="middle" className={classes.buttonStyle}>Back</Button>
                    </div>
                    <div className="button total">
                        <h1><span>$</span> {inCartItems ? cartTotal : "0.00"} <span>USD</span></h1>
                    </div>
                    <div className="button">
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

export default connect(null, mapDispatchToProps)(ShoppingCart);