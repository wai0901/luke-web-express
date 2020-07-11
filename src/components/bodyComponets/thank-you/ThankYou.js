import React from 'react';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';

import './css/thankYou.css';

const ThankYou = () => {


    return (
        <div className="thank-you-container">
            <div className="cards-container">
                <h2>thank you for shopping</h2>
                <div className="element">
                    <div>
                    <p>....</p>
                    <LocalShippingIcon style={{ fontSize: 100 }}>Filled</LocalShippingIcon>
                    </div>
                    
                </div>         
            </div>
        </div>
    )
}

export default ThankYou;