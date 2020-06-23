import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import { checkoutOrder } from '../../../../redux/ActionCreater';
import CC from './credit-card/CreditCard';


import './css/checkout.css';

const mapDispatchToProps = {
    checkoutOrder: (order) => (checkoutOrder(order)),
}

const Checkout= ({inCartItems, cartTotal, checkoutOrder}) => {

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
    
    //temp
    const customer = {
        customerInfo: {
            userId: "test123",
            lastName: "Tommy",
            firstName: "Ku",
            street: "999 Test Street",
            city: "Test City",
            state: "CA",
            zip: "91711",
            tel: formatPhoneNumber(Number("9999999999")),
        },
        accountInfo: {
            userName: "Test123",
            email: "test@test.com",
            password: "testtest",
        },
        promotion: true,
        admin: false
    }
    const customerInfo = customer.customerInfo;

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
                <div class="card-items">
                    <div class="checkout-items-list  borderLine-share">
                        {
                            inCartItems &&
                            inCartItems.map(item => 
                                <div class="checkout-item">
                                    <p>{item.title}</p>
                                    <p>Qty: {item.quantity}</p>
                                    <p>{(Number(item.price) * Number(item.quantity)).toFixed(2)}</p>
                                </div>
                            )
                        } 
                    </div>
                    <div class="checkout-items-list fontBold-share">
                        <div class="checkout-item">
                            <div></div>
                            <div></div>
                            <div>
                                <p>$ {cartTotal}</p>
                            </div>
                        </div>
                    </div>
                    <div class="checkout-items-list">
                        <div class="checkout-item">
                            <div>
                                <p>Estimated Sales Tax</p>
                            </div>
                            <div></div>
                            <div>
                                <p>$ {tax}</p>
                            </div>
                        </div>
                    </div>
                    <div class="checkout-items-list borderLine-share">
                        <div class="checkout-item">
                            <div>
                                <p>Delivery Fee</p>
                            </div>
                            <div></div>
                            <div>
                                <p>$ {deliveryFee}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col checkout-items-list fontBold-share">
                        <div class="row checkout-item largeFont-share">
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
                <div class="card-info">
                    <div class="checkout-customer checkout-css-share borderLine-share">
                        <div class="contact-info">
                            <div>
                                <h6>Billing Info</h6>
                            </div>
                            <div>
                                <p>{customerInfo.firstName} {customerInfo.lastName}</p>
                                <p>{customerInfo.email}</p>
                                <p>{customerInfo.tel}</p>
                                <p>{customerInfo.street},</p>
                                <p>{customerInfo.city}, {customerInfo.zip}</p>
                            </div>
                            <div className="edit-info-share">
                                <a href="editBillingInfo">Edit</a>
                            </div>
                        </div>
                        <div class="contact-info">
                            <div>
                                <h6>Delivery Info</h6>
                            </div>
                            <div>
                                <p>{customerInfo.firstName} {customerInfo.lastName}</p>
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
                    <div class="checkout-card-info checkout-css-share">
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