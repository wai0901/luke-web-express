import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { ShoppingCartOutlined, ExitToApp, Person } from '@material-ui/icons';
import { Badge, IconButton, Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { logoutUser } from '../../../redux/ActionCreater';
import SignInModal from './login-modal/SignInModal';
import './css/ShopModule.css';

const mapDispatchToProps = {
    logoutUser
}

const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }))(Badge);



const ShopModule = ({cartQty, 
                authStatus, 
                logoutUser, 
                signinRoute, 
                setSigninRoute,
                handleModalOpen,
                handleModalClose,
                modalOpen
              }) => {


    return(
        <React.Fragment>
            <ul className="shop-container">
                <li>
                  {
                      !authStatus.isAuthenticated ?

                      <Tooltip title="Sign in" onClick={() => handleModalOpen()}>
                          <IconButton aria-label="logIn">
                              <Person style={{ fontSize: 25 }}>Filled</Person>
                          </IconButton>
                      </Tooltip> :

                      <Tooltip title="Sign out" onClick={() => logoutUser()}>
                          <IconButton aria-label="logIn">
                              <ExitToApp style={{ fontSize: 25 }}>Filled</ExitToApp>
                          </IconButton> 
                      </Tooltip>            
                    }
                </li>
                <li>
                    <Link to={"/shopping-cart"}>
                        <Tooltip title="Shopping Cart">
                            <IconButton aria-label="cart">
                              <StyledBadge badgeContent={cartQty} color="secondary">
                                <ShoppingCartOutlined />
                              </StyledBadge>
                            </IconButton>
                        </Tooltip>
                    </Link>
                </li>
            </ul>
            <div className="modal">
              <SignInModal 
                handleModalClose={handleModalClose}
                authStatus={authStatus}
                open={modalOpen}
                signinRoute={signinRoute}
                setSigninRoute={setSigninRoute}
                handleModalClose={handleModalClose}
              />
            </div>
        </React.Fragment>
    )
}

export default connect(null, mapDispatchToProps)(ShopModule);