import React from "react";
import { Link } from "react-router-dom";

import './css/BodySection.css';

const featureSales = {
    background: 'url("https://images.pexels.com/photos/2065195/pexels-photo-2065195.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260") no-repeat center',
    backgroundSize: "cover"
} 


const BodySection = ({ mainData, handleCatChange }) => {

    return (
        <div className="body-container">
            <div className="page sales" style={featureSales}>
                <div className="sales-container">
                    <div className="sales-info">
                        <h1>"30% off"</h1>
                        <p>"entire site"</p>
                    </div>
                </div>
            </div>
            {
                mainData &&
                mainData.map(select => {
                    
                    const selection = {
                        background: `url('${select.image}') no-repeat center center`,
                        backgroundSize: "cover"
                    }  
                        return <div key={select.id} 
                                    style={selection} 
                                    className={select.style}
                                    onClick={() => handleCatChange(select.link)}
                                    >
                            <Link to={"/" + select.link}>
                                <div className="selection-container">
                                    <div className="menu-info">
                                        <h1>{select.title}</h1>
                                        <p>{select.description}</p>
                                    </div>
                                    <div className="menu-title">
                                        <h1>{select.title}</h1>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    }
                )
            }  
            <div className="iPad-prop-only">
                <div>
                    <h1>30% off</h1>
                    <p>entire site</p>
                </div>
            </div>
        </div> 
    )
}
export default BodySection;