import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ordersData, fetchUsersData } from '../../redux/ActionCreater';

import './css/admin.css';


const mapStateToProps = state => {
    return {
        orderHistory: state.orders.orders,
        usersData: state.users.users
    }
}

const mapDispatchToProps = {
    ordersData,
    fetchUsersData
};


const useStyles = makeStyles((theme) => ({
    buttonStyle: {
      width: '150px',
      margin: theme.spacing(0.5),
      fontSize: '12px',
      fontWeight: 'bold'
    },
  }));


const Contact = ({orderHistory, ordersData, fetchUsersData, usersData}) => {

    const classes = useStyles();

    const handleOrdersHistorySubmit = () => {
        ordersData()
    }

    const handleUsersSubmit = () => {
        fetchUsersData()
    }

    return (
        <div className="contact-container">
            <div className="cards-container">
                <div>
                    {
                        orderHistory ?
                        <div className="card">
                            <ul>
                                {
                                    orderHistory.map(order => 
                                        <li className="purchasedOrder">
                                            <p className="main-order-info">Purchased date: {order.createdAt}</p>
                                            <p className="main-order-info">Customer ID: {order._id}</p>
                                            <p className="main-order-info">Total Amount: ${order.orderTotal*0.01} USD</p>
                                            {
                                                order.orders.map(order => 
                                                    <div className="indiviual-item">
                                                        <p>Product ID: {order.productId}</p>
                                                        <p>Product Name: {order.name}</p>
                                                        <p>Price: ${order.price} USD</p>
                                                        <p>Purchased Quantity: {order.quantity}</p>
                                                    </div>
                                                )
                                            }
                                        </li>
                                    )
                                }
                            </ul>
                        </div> :
                        <div></div>
                    }
                    {
                        usersData ?
                        <div className="card">
                            <ul>
                                {
                                    usersData.map(user => 
                                        <li className="purchasedOrder">
                                            <p className="main-order-info">User ID: {user._id}</p>
                                            <p className="main-order-info">First Name: {user.firstname}</p>
                                            <p className="main-order-info">Last Name: {user.lastname}</p>
                                            <p className="main-order-info">Email: {user.email}</p>
                                            <p className="main-order-info">Tel: {user.tel}</p>
                                            <p className="main-order-info">Admin: {user.admin}</p>
                                            <p className="main-order-info">Username: {user.username}</p>
                                            <p className="main-order-info">Address: {user.street}, {user.city}, {user.state} {user.zip}</p>
                                            <p className="main-order-info">Receive Promotion: {user.promotion ? "Yes" : "No"}</p>
                                        </li>
                                    )
                                }
                            </ul>
                        </div> :
                        <div></div>
                    }
                </div>
                <div className="button-card">
                    <Button onClick={() => handleOrdersHistorySubmit()} variant="outlined" size="middle" className={classes.buttonStyle}>Show All Orders</Button>
                    <Button onClick={() => handleUsersSubmit()} variant="outlined" size="middle" className={classes.buttonStyle}>All Customer</Button>
                </div>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);