import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import { checkoutOrder, removeCartItems } from '../../../../redux/ActionCreater';
import { v4 as uuidv4 } from 'uuid';
import CC from './credit-card/CreditCard';
import './css/checkout.css';


const mapDispatchToProps = {
    checkoutOrder: (order) => (checkoutOrder(order)),
    removeCartItems: (id) => (removeCartItems(id))
}

const Checkout= ({inCartItems, cartTotal, checkoutOrder, authStatus, removeCartItems}) => {

    let tax = (cartTotal * 0.09).toFixed(2);
    let deliveryFee = cartTotal? 4.99: 0;
    let grandTotal = cartTotal > 0? (Number(cartTotal) + Number(tax) + Number(deliveryFee)).toFixed(2): "0.00";

    const history = useHistory();
    const checkoutItems = inCartItems ? inCartItems.cartItems : [];

    const handleOrderSubmit = (e) => {
        e.preventDefault();
        let userId = authStatus.isAuthenticated ?
                (JSON.parse(localStorage.getItem('user')) || [])._id :
                "Not Register User";

        let orders = checkoutItems.map(item => {
            return {
                id: item.id,
                name: item.name,
                price: item.price,
                productId: item.productId,
                quantity: item.quantity,
                _id: item._id
            }
        })
        let finalOrder = {
            userId: userId,
            orders: orders,
            orderTotal: cartTotal
        }

        checkoutOrder(finalOrder);
        history.push('thankyou');
        removeCartItems(inCartItems._id);
        setTimeout(() => {
            history.push('/');
                }, 5000);
    }
    
    
    // console.log(customerInfo)
    const [ customerInfo, setCustomerInfo ] = useState(
        JSON.parse(localStorage.getItem('user')) || []
    )


    //temp
    const handleCustomerInfoChange = (info) => {
        setCustomerInfo(prevInfo => ({
            ...prevInfo,
            firstname: info
        }))
        return localStorage.setItem('user', JSON.stringify({
            _id: customerInfo._id,
            lastname: customerInfo.lastname,
            firstname: info,
            address: {
                street: customerInfo.address.street,
                city: customerInfo.address.city,
                state: customerInfo.address.state,
                zip: customerInfo.address.zip
            },
            tel: formatPhoneNumber(Number(customerInfo.tel)),
            username: customerInfo.username,
            email: customerInfo.email
        }));
    }
    

    //format the phonenumber
    function formatPhoneNumber(phoneNumberString) {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
        if (match) {
          return '(' + match[1] + ') ' + match[2] + '-' + match[3]
        }
        return null
      }

    return (
        <div className="checkout-container">
            <div className="cards-container">
                <div className="card-items">
                    <div className="checkout-items-list  borderLine-share">
                        {
                            checkoutItems &&
                            checkoutItems.map(item => 
                                <div className="checkout-item" key={uuidv4()}> 
                                    <p>{item.title}</p>
                                    <p>Qty: {item.quantity}</p>
                                    <p>{(Number(item.price) * Number(item.quantity)).toFixed(2)}</p>
                                </div>
                            )
                        } 
                    </div>
                    <div className="checkout-items-list fontBold-share">
                        <div className="checkout-item">
                            <div></div>
                            <div></div>
                            <div>
                                <p>$ {cartTotal}</p>
                            </div>
                        </div>
                    </div>
                    <div className="checkout-items-list">
                        <div className="checkout-item">
                            <div>
                                <p>Estimated Sales Tax</p>
                            </div>
                            <div></div>
                            <div>
                                <p>$ {tax}</p>
                            </div>
                        </div>
                    </div>
                    <div className="checkout-items-list borderLine-share">
                        <div className="checkout-item">
                            <div>
                                <p>Delivery Fee</p>
                            </div>
                            <div></div>
                            <div>
                                <p>$ {deliveryFee}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col checkout-items-list fontBold-share">
                        <div className="row checkout-item largeFont-share">
                            <div></div>
                            <div>
                                <p>Total</p>
                            </div>
                            <div>
                                <p>$ {grandTotal}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-info">
                    <div className="checkout-customer checkout-css-share borderLine-share">
                        <div className="contact-info">
                            <div>
                                <h6>Billing Info</h6>
                            </div>
                            <div>
                                <p>{customerInfo.firstname} {customerInfo.lastname}</p>
                                <p>{customerInfo.email}</p>
                                <p>{customerInfo.tel}</p>
                                <p>{customerInfo.address.street},</p>
                                <p>{customerInfo.address.city}, {customerInfo.address.state} {customerInfo.address.zip}</p>
                            </div>
                            <div className="edit-info-share">
                                <button href="" onClick={() => handleCustomerInfoChange("May")}>Edit</button>
                            </div>
                        </div>
                        <div className="contact-info">
                            <div>
                                <h6>Delivery Info</h6>
                            </div>
                            <div>
                                <p>{customerInfo.firstname} {customerInfo.lastname}</p>
                                <p>{customerInfo.email}</p>
                                <p>{customerInfo.tel}</p>
                                <p>{customerInfo.address.street},</p>
                                <p>{customerInfo.address.city}, {customerInfo.address.state} {customerInfo.address.zip}</p>
                            </div>
                            <div className="edit-info-share">
                                <a href="editDeliveryInfo">Edit</a>
                            </div>
                        </div>                                
                    </div>
                    <div className="checkout-card-info checkout-css-share">
                        <CC 
                            handleOrderSubmit={handleOrderSubmit}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect(null, mapDispatchToProps)(Checkout);