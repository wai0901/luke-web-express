import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Backdrop, Button, Fade } from '@material-ui/core';





const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    paper: {
        backgroundColor: theme.palette.background.paper,
        width: 400,
        border: '0px',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        textAlign: 'center'
    },
    buttonContainer: {
        margin: 'auto'
    },
    buttonStyle: {
        minWidth: '120px',
        maxWidth: '120px',
        margin: theme.spacing(2),
    },
}));

const ConfirmModal = ({ handleClose, open, handleSubmit, size, qty }) => {
  const classes = useStyles();


  return (
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
    >
    <Fade in={open}>
        <div className={classes.paper}>
            <p id="simple-modal-description" className={classes.textStyle}>
                {`Added ${qty > 1 ? 'items' : 'item'} to cart. \nSize: ${(size).toUpperCase()} Qty: ${qty}`}
            </p>
            <div className={classes.buttonContainer}>
                <Button onClick={() => {handleSubmit(); return handleClose();}} variant="outlined" size="small" className={classes.buttonStyle}>Confirm</Button>
                <Button onClick={() => handleClose()} variant="outlined" size="small" className={classes.buttonStyle}>Cancel</Button>
            </div>
        </div>
    </Fade>
    </Modal>
  );
}

export default ConfirmModal;