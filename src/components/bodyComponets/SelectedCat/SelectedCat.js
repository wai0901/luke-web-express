import React from "react";
import { Link } from "react-router-dom";
import './css/selectedCat.css';


const SelectedCat = ({ catData, handleItemsChange }) => {


    return ( <div className="cat-body-container">
    {
        catData &&
        catData.map(select => {
            
            const selection = {
            background: `url('${select.image}') no-repeat center ${select.position} / cover`   
            }  
                return <div key={select.id} 
                            style={selection} 
                            className={select.style}
                            onClick={() => handleItemsChange(select.link)}
                            >
                    <Link to={`${'/' + select.category + '/' + select.link}`}>
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
    </div> 
    )
    
}

export default SelectedCat;
