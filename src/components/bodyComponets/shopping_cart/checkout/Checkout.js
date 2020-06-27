import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import { checkoutOrder } from '../../../../redux/ActionCreater';
import { v4 as uuidv4 } from 'uuid';
import CC from './credit-card/CreditCard';
import './css/checkout.css';


const mapStateToProps = state => {
    
    return {
        clientInfo: state.auth.user
    }
}

const mapDispatchToProps = {
    checkoutOrder: (order) => (checkoutOrder(order)),
}

const Checkout= ({inCartItems, cartTotal, checkoutOrder, clientInfo}) => {

    let tax = (cartTotal * 0.09).toFixed(2);
    let deliveryFee = cartTotal? 4.99: 0;
    let grandTotal = cartTotal > 0? (Number(cartTotal) + Number(tax) + Number(deliveryFee)).toFixed(2): "0.00";

    const history = useHistory();

    const handleOrderSubmit = (e) => {
        e.preventDefault();

        let orders = inCartItems.map(item => {
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
            orders: orders,
            orderTotal: cartTotal
        }

        checkoutOrder(finalOrder);
        history.push('thankyou');
        setTimeout(() => {
            history.push('/');
                }, 5000);
    }
    
    //customer info
    // const [ customerInfo, setCustomerInfo ] = useState({
    //     _id: clientInfo._id,
    //     lastname: clientInfo.lastname,
    //     firstname: clientInfo.firstname,
    //     street: clientInfo.street,
    //     city: clientInfo.city,
    //     state: clientInfo.state,
    //     zip: clientInfo.zip,
    //     tel: formatPhoneNumber(Number(clientInfo.tel)),
    //     username: clientInfo.username
    // })
    // console.log(customerInfo)
    const [ customerInfo, setCustomerInfo ] = useState(
        JSON.parse(localStorage.getItem('user')) || []
    )
    console.log(customerInfo)

    //temp
    
    const handleCustomerInfoChange = (info) => {
        setCustomerInfo(prevInfo => ({
            ...prevInfo,
            firstname: info
        }))
        return localStorage.setItem('user', JSON.stringify({
            _id: clientInfo._id,
            lastname: clientInfo.lastname,
            firstname: info,
            street: clientInfo.street,
            city: clientInfo.city,
            state: clientInfo.state,
            zip: clientInfo.zip,
            tel: formatPhoneNumber(Number(clientInfo.tel)),
            username: clientInfo.username
        }));
    }
    

    //formate the phonenumber
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
                            inCartItems &&
                            inCartItems.map(item => 
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
                                <p>{customerInfo.street},</p>
                                <p>{customerInfo.city}, {customerInfo.zip}</p>
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
                                <p>{customerInfo.street},</p>
                                <p>{customerInfo.city}, {customerInfo.zip}</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);