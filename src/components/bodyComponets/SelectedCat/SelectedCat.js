import React from "react";
import { Link } from "react-router-dom";


const SelectedCat = ({ categoryData, handleItemsChange }) => {

    return ( <div className="body-container">
    {
        categoryData &&
        categoryData.map(select => {
            
            const selection = {
            background: `url('${select.image}') no-repeat center ${select.position} / cover`   
            }  
                return <div key={select.id} 
                            style={selection} 
                            className={select.style}
                            onClick={() => handleItemsChange(select.link, select.category)}
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
