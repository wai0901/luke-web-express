import React from 'react';
import { Modal, Backdrop, Fade } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

//style section
const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      outline: 'none',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

const EmptyFieldMessage = (props) => {
    
    const classes = useStyles();

    return  <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={props.modalOpen}
            onClose={props.handleModalClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
            >
        <Fade in={props.modalOpen}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Oops!</h2>
            <p id="transition-modal-description">Please select the size and quantity.</p>
          </div>
        </Fade>
  </Modal>
}

export default EmptyFieldMessage;