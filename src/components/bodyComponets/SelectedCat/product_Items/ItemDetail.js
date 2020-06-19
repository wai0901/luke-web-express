import React, {useState} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { MobileStepper, Button } from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight} from '@material-ui/icons';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import EmptyFieldMessage from './empty_field_message/EmptyFieldMessage';
import ItemForm from './item_form/ItemForm';
import "./css/ItemDetail.css";


//for swipe function
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


//style section
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  img: {
    height: 657,
    display: 'block',
    maxWidth: "100%",
    overflow: 'hidden',
    width: '100%',
    outline: 'none',
  },
}));

const ItemDetail =(props) => {

    const [pickedItem] = useState(props.pickedItem)
    
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = pickedItem ? pickedItem.images.length : 1 ;

    // add to cart warning message
    const [modalOpen, setModalOpen] = useState(false);


    //modal image section
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
      setActiveStep(step);
    };
    
    
    // add to cart
    const [size, setSize] = useState("");
    const [qty, setQty] = useState("");

    const handleSizeChange = (event) => {
      setSize(event.target.value)
    }

    const handleQtyChange = (event) => {
      setQty(event.target.value)
    }

    //add item to cart
    //warning message
    const handleSubmit = e => {

      let fetchData = { pickedItem, size, qty }
      
      if (size && qty) {
        return props.addCartHandler(fetchData);

      } else {
        setModalOpen(true);
      } 
      e.preventDefault();
    }

    // set empty field warming modal close
    const handleModalClose = () => {
      setModalOpen(false);
    };
  
  return (
    <div class="item-detail-container">
        <div className={classes.root}>
          <AutoPlaySwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
            interval={10000}
          >
          { pickedItem ?
            pickedItem.images.map((step, index) => (
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? (
                <img className={classes.img} style={{background: `url('${step}') no-repeat center 50% / cover`}} alt=""/>
              ) : null}
            </div>
          )) :
            <img className={classes.img} 
            style={{background: `url('${"https://images.pexels.com/photos/789812/pexels-photo-789812.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"}') no-repeat center 50% / cover`}} 
            alt=""/>
          }
          </AutoPlaySwipeableViews>
          <MobileStepper
            variant="dots"
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            className={classes.root}
            nextButton={
                <Button size="small" onClick={handleNext} disabled={activeStep === (maxSteps - 1)}>
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </Button>
            }
            backButton={
                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                </Button>
            }
          />
        </div>
        <div className="add-item-container">
          <section>
            <div className="item-info">
              <h1>{pickedItem.name}</h1>
              <p className="item-number">items#: {pickedItem.productId}</p>
              <p className="item-price">${pickedItem ? (pickedItem.price).toFixed(2) : "0.00"} USD</p>
              <p className="item-description">{pickedItem.description}</p>
            </div>
          <ItemForm 
            handleSizeChange={handleSizeChange}
            handleQtyChange={handleQtyChange}
            handleSubmit={handleSubmit}
            size={size}
            qty={qty}
          />
          </section>
          <EmptyFieldMessage 
              modalOpen={modalOpen}
              handleModalClose={handleModalClose}
            />
        </div>
    </div>  //<-- item-detail-container
  );
}

export default ItemDetail;