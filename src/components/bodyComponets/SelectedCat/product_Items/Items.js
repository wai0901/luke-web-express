import React from "react";
import { Link } from "react-router-dom";
import "./css/Items.css";


const Items = (props) => {

  return ( <div className="body-container">
    {
      props.itemsData.map(selectedItem => {
            const selection = {
            background: `url('${selectedItem.images[0]}') no-repeat center ${selectedItem.position} / cover`   
        }  
        return <div 
                  key={selectedItem.id} 
                  style={selection} 
                  className={selectedItem.style}  
                  onClick={() => props.handlePickedItem(selectedItem)}
                >
            <Link to={`${'/' + selectedItem.main + '/' + selectedItem.category + '/' + selectedItem.id}`}>
              <div className="items-container">
                  <div className="items-info">
                      <h1>{selectedItem.title}</h1>
                      <p><span>$</span> {(selectedItem.price.toFixed(2))} <span>USD</span></p>
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

export default Items;

