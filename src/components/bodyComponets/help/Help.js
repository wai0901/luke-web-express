import React from 'react';
import './css/help.css'


const helps = [
    {
        title: 'YOUR LUKE ACCOUNT',
        content: [
                    "At Luke.com, you can shop as a GUEST or as a REGISTERED customer.", 
                    "Registering is easy. We'll only request the essential information required to manage your purchase.", 
                    "In the registration form you will find format examples that will help you when entering certain information, such as your telephone number.", 
                    "Your registration data and order information will always be available. Just log in to your account if you are a registered customer, or click on the link we sent you in your confirmation email if you are a guest customer."
                ],
    },
    {
        title: 'ORDER CHANGES',
        content: [
                    "Once you’ve completed your purchase, we’ll send you an email confirmation with the purchase information.", 
                    "Remember, you can’t cancel or modify you order if it has progressed to an advanced preparation status."
                ],
    },
    {
        title: 'SHOPPING CART',
        content: [
                    "You can view items you have selected for purchase, order a gift card, and change or delete the number of items on your order all from your shopping cart.", 
                    "Keep in mind we cannot guarantee we have the items in your shopping cart in stock. For this reason, if an item sells out, we will notify you in this section."
                ],
    },
    {
        title: 'PRICE CHANGES',
        content: [
                    "All our items display the same prices, whether in our physical stores or on the website.", 
                    "If there is a price difference between those found online and those marked on garment tickets, the correct price will be shown at the time of purchase.", 
                    "Please keep in mind we do not adjust prices for items whose original prices may have been reduced."
                ],
    },
    {
        title: 'NEWSLETTER',
        content: ["Subscribe to keep up to date on all the latest trends! You can find more information in the Newsletter section."]
    },
]


const Help = () => {

    return (
        <div className="help-container">
            <div className="cards-container">
                {
                    helps.map((info, index) => 
                        <div key={index} className="card">
                            <h3>{info.title}</h3>
                            <p>
                            {
                                info.content.map((sentence, i) => <span key={i} className="sentence">{sentence}<br /></span>)
                            }
                            </p>
                        </div>
                    )
                }
            </div>

        </div>
    )
}

export default Help;