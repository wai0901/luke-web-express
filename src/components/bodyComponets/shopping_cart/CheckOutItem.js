import React from 'react';
import { makeStyles, Button, ButtonGroup, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import './css/CheckOutItem.css';


    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& > *': {
            margin: theme.spacing(1),
          },
        },
    }));

function CheckOutItem({item, changeQtyHandler}) {
    
    const classes = useStyles();
    const itemImage = {
        background: `url('${item.images[0]}') no-repeat center ${item.position} / cover`
    }  

    return <li className="item-container" key={item.productId}>
            <div key={item.id} className="item-image" style={itemImage}></div>
            <div className="item-info">
                <div className="info-group">
                    <h1>{item.title}</h1>
                    <p className="item-number">item#: {item.productId}</p>
                    <p className="item-price"><span>$</span> {(item.price).toFixed(2)} <span>USD</span></p>
                    <p className="item-description">Size: {item.size}</p>
                </div>
                <div className="buttons-group">
                    <div className="buttons">
                        <div>
                            <p>qty: {item.quantity}</p>
                            <ButtonGroup size="small" aria-label="small outlined button group">
                                <Button onClick={() => changeQtyHandler(item, item.productId, "plus")}>+</Button>
                                <Button onClick={() => changeQtyHandler(item, item.productId, "minus")}>-</Button>
                            </ButtonGroup>
                        </div>
                        <div>
                            <IconButton onClick={() => changeQtyHandler(item, item.productId, "remove")} aria-label="delete" className={classes.margin}>
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>
        </li>
}

export default CheckOutItem;