import React, { useState } from 'react';
import { Button, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import ConfirmModal from './ConfirmModal';

//style section
const useStyles = makeStyles((theme) => ({
    formControl: {
      minWidth: 200,
      margin: theme.spacing(0.5),
    },
    buttonStyle: {
      minWidth: '140px',
      maxWidth: '140px',
      margin: theme.spacing(0.5),
    },
  }));


const ItemForm = (props) => {

    const classes = useStyles();

    
    // for back button
    const history = useHistory();

    // for Modal
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    return <React.Fragment>
            <form className="buy-item-info">
                <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="size">Size:</InputLabel>
                        <Select
                            name="size"
                            id="size"
                            size="small"
                            value={props.size}
                            onChange={props.handleSizeChange}
                        >
                            <MenuItem value={"s"}>S</MenuItem>
                            <MenuItem value={"m"}>M</MenuItem>
                            <MenuItem value={"l"}>L</MenuItem>
                            <MenuItem value={"xl"}>XL</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="quantity">Qty:</InputLabel>
                      <Select
                          name="quantity"
                          id="quantity"
                          value={props.qty}
                          onChange={props.handleQtyChange}
                      >
                          <MenuItem value={1}>1</MenuItem>
                          <MenuItem value={2}>2</MenuItem>
                          <MenuItem value={3}>3</MenuItem>
                          <MenuItem value={4}>4</MenuItem>
                      </Select>
                    </FormControl>
                </div>
                <div className="add-button">
                    <span>
                      <Button type="button" onClick={() => handleOpen()} variant="outlined" size="small" className={classes.buttonStyle}>Add to cart</Button>
                    </span>
                    <span>
                      <Button onClick={() => history.goBack()} variant="outlined" size="small" className={classes.buttonStyle}>Back</Button>
                    </span>
                </div>  
            </form>
            <ConfirmModal 
              handleClose={handleClose}
              open={open}
              handleSubmit={props.handleSubmit}
              size={props.size}
              qty={props.qty}
            />
          </React.Fragment>
}

export default ItemForm;