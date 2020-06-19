import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined, LockOpen, Search } from '@material-ui/icons';
import { Badge, IconButton, Modal, Backdrop, Fade } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import './css/ShopModule.css';


const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }))(Badge);

  const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '0',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

const ShopModule = ({cartQty}) => {
    //Login
    const [user, setUser] = useState({
      userName: "",
      password: "",
    });


    //Modal
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    //Login
    function handleChange(event) {
        const { name, value } = event.target;
    
        setUser(prevValue => {
          return {
            ...prevValue,
            [name]: value
          };
        });
      }

    return(
        <React.Fragment>
            <ul className="shop-container">
                {/* <li>
                    <IconButton aria-label="search">
                        <Search style={{ fontSize: 22 }}>Filled</Search>
                    </IconButton>
                </li> */}
                <li>
                    <IconButton aria-label="logIn">
                        <LockOpen style={{ fontSize: 22 }} onClick={handleOpen} >Filled</LockOpen>
                    </IconButton>
                </li>
                <li>
                    <Link to={"/shopping-cart"}>
                        <IconButton aria-label="cart">
                          <StyledBadge badgeContent={cartQty} color="secondary">
                            <ShoppingCartOutlined />
                          </StyledBadge>
                        </IconButton>
                    </Link>
                </li>
            </ul>
            
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
                <div className="modal-container">
                    <div className="container">
                        <h1>Welcome Back</h1>
                        <form>
                            <input
                                onChange={handleChange}
                                name="userName"
                                value={user.userName}
                                placeholder="User Name"
                            />
                            <input
                                onChange={handleChange}
                                name="password"
                                value={user.password}
                                placeholder="Password"
                            />
                            <button>Sign-in</button>
                        </form>
                        <div className="signup-container">
                          <Link className="signup" to={'signup'} onClick={handleClose}>Signup for new account</Link>
                        </div>
                    </div>
                </div>
                </Fade>
            </Modal>
        </React.Fragment>
    )
}

export default ShopModule;