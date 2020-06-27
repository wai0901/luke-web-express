import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import Header from "./header_components/Header";
import Footer from "./footer components/Footer";
import BodySection from './bodyComponets/BodySection';
import SelectedCat from './bodyComponets/SelectedCat/SelectedCat';
import Items from './bodyComponets/SelectedCat/product_Items/Items';
import ItemDetail from './bodyComponets/SelectedCat/product_Items/ItemDetail';
import ShoppingCart from './bodyComponets/shopping_cart/ShoppingCart';
import Checkout from './bodyComponets/shopping_cart/checkout/Checkout';
import Help from './bodyComponets/help/Help';
import Contact from './bodyComponets/contact/Contact';
import Signup from './bodyComponets/login/Signup';
import ThankYou from './bodyComponets/thank-you/ThankYou';
import Loading from './loading/Loading';
import Admin from './admin/Admin';
import { fetchMainData, 
    // fetchCategoryData, 
    // fetchItemsData, 
    postCartItems, 
    updateCartItems, 
    fetchCartData,
   } from '../redux/ActionCreater';
import { CSSTransition } from 'react-transition-group';
import './css/Main.css';
import {WEBSITEDATA} from '../shared/websiteData'



const mapStateToProps = state => {
    console.log(state.auth)
    return {
        mainData: state.mainPage.homeMenu.data,
        // categoryData: state.category.category.data,
        // itemsData: state.items.items.data,
        itemsData: state.items.items.data,
        inCartItems: state.cartItem.cart.data,
        authStatus: state.auth,
        mainLoading: state.mainPage.isLoading,
        catIsLoading: state.category.isLoading,
        itemsDataLoading: state.items.isLoading,
        inCartItemsLoading: state.cartItem.isLoading,
        authLoading: state.auth.isLoading
    }
}

const mapDispatchToProps = {
    // fetchCategoryData: (link) => (fetchCategoryData(link)),
    // fetchItemsData: (link, categoryId) => (fetchItemsData(link, categoryId)),
    postCartItems: (cartItem) => (postCartItems(cartItem)),
    updateCartItems: (cartItem, id) => (updateCartItems(cartItem, id)),
    fetchMainData,
    fetchCartData,
};

const Main = (props) => {

    const mainData = props.mainData;
    // const categoryData = props.categoryData;
    // const itemsData = props.itemsData;
    const inCartItems = props.inCartItems;
    const authStatus =  props.authStatus;
    const mainLoading = props.mainLoading;
    const catIsLoading = props.catIsLoading;
    const itemsDataLoading = props.itemsDataLoading;
    const inCartItemsLoading = props.inCartItemsLoading;
    const authLoading = props.authLoading;
    
    // for the item detail page
    const [ pickedItem, setPickedItem ] = useState("");

    // To check if the preivous route is from sign up form, which avoid history.goBack go back to the same page.
    const [ signinRoute, setSigninRoute ] = useState(false);

    // for Signin modal
    const [ modalOpen, setModalOpen ] = useState(false);

    // for Category Data
    const [ catData, setCatData ] = useState('')

    // for Item Data
    const [ itemsData, setItemsData ] = useState('')


    useEffect(() => {
        props.fetchMainData();
        props.fetchCartData();
    }, [])
    
    //for Category 
    const handleCatChange = (link) =>{ 
        const data = WEBSITEDATA[link]
        setCatData(() => data);
    }
    
    //for header's menu bar to change category
    const handleHeaderCatChange = (link) => {
        const data = WEBSITEDATA[link]
        setCatData(() => data);
    }
    
    //for item page
    const handleItemsChange = (link) => {
        const item = WEBSITEDATA[link]
        setItemsData(() => item);
    }

    //for item detail page
    const handlePickedItem = (item) => 
        setPickedItem(() => item);


    //For adding new items to cart
    const addCartHandler = ({pickedItem, size, qty}) => {
        if (inCartItems) {
            if(findCartItem(inCartItems, pickedItem, size)){
                console.log(findCartItem(inCartItems, pickedItem, size))
                //find and update the item which already in cart
                let updatedItem = sameItemInCart(inCartItems, pickedItem, size, qty);
                let updatedItemId = updatedItem._id;
                return props.updateCartItems(updatedItem, updatedItemId);
            } else {
                props.postCartItems(addCartItem(pickedItem, size, qty));
                console.log(addCartItem(pickedItem, size, qty))
            }
        } else {
            props.postCartItems(addCartItem(pickedItem, size, qty));
        }          
    }

    //Menu 
    const RenderMenu = ({match}) => {
        return (
            <CSSTransition
                in={match != null}
                timeout={1000}
                classNames="fade"
                appear
                >
                    <SelectedCat 
                        // categoryData={categoryData}
                        catData={catData}
                        handleItemsChange={handleItemsChange}
                        catIsLoading={catIsLoading}
                    />
            </CSSTransition>
        )
    }

    // Items page
    const RenderItems = ({match}) => {
        return (
            <CSSTransition
                in={match != null}
                timeout={1000}
                classNames="fade"
                appear
                >
                    <Items 
                        itemsData={itemsData}
                        handlePickedItem={handlePickedItem}
                    />
            </CSSTransition>
        )
    }

    // ItemDetail page 
    const RenderItemDetail = ({match}) => {
        return (
            <ItemDetail 
                pickedItem={pickedItem}
                addCartHandler={addCartHandler}
            />
        )
    }

    //toggle the signin modal
    const handleModalOpen = () => {
      setModalOpen(true);
    };

    const handleModalClose = () => {
      setModalOpen(false);
    };


    //Total qty of items in cart
    const cartQty = props.inCartItems ?
        props.inCartItems.map(item => Number(item.quantity)).reduce((t, c) => t + c, 0) :
        0 ;

    const cartTotal = props.inCartItems ?
        props.inCartItems.map(item => Number(item.quantity * item.price)).reduce((t, c) => t + c, 0).toFixed(2) :
        0.00;
     
    return (
        <div className="bg">
            <div className="bg-shader"></div>
            <Router>
                <div className="container">
                    <Header 
                        authStatus={authStatus}
                        cartQty={cartQty}
                        handleHeaderCatChange={handleHeaderCatChange}
                        authStatus={authStatus}
                        signinRoute={signinRoute}
                        setSigninRoute={setSigninRoute}
                        handleModalOpen={handleModalOpen}
                        handleModalClose={handleModalClose}
                        modalOpen={modalOpen}
                    />
                    <div className="holder"> 
                        <Switch>                
                        <Route path="/" exact render={()=> 
                             <BodySection 
                                mainData={mainData}
                                handleCatChange={handleCatChange}
                             />
                        } />
                        <Route path="/help" exact component={Help}/>
                        {
                            authStatus.isAuthenticated ?
                            authStatus.user.username === "admin" ? 
                            <Route path="/admin" exact component={Admin}/> :
                            <Route path="/admin" exact component={Contact}/> :
                            <Route path="/admin" exact component={Contact}/>
                        }
                        <Route path="/contact" exact component={Contact}/>
                        <Route path='/thankyou' exact component={ThankYou}/>
                        <Route path="/signup" exact render={() =>
                            <Signup 
                                setSigninRoute={setSigninRoute}
                            />
                        } />
                        <Route path="/checkout" exact render={() => 
                            <Checkout 
                                inCartItems={inCartItems}
                                cartTotal={cartTotal}
                            />
                        } />
                        <Route path="/shopping-cart" exact render={() => 
                            <ShoppingCart 
                                inCartItems={inCartItems}
                                cartTotal={cartTotal}
                                authStatus={authStatus}
                                handleModalOpen={handleModalOpen}
                            />
                        } />
                        <Route path="/:menuId" exact component={RenderMenu} />
                        <Route path="/:menuId/:itemsId" exact component={RenderItems} /> 
                        <Route path="/:menuId/:itemsId/:itemId" exact component={RenderItemDetail} /> 
                        </Switch>                                  
                    </div>
                    <Footer />
                </div>
            </Router>
            { mainLoading ||
              catIsLoading ||
              inCartItemsLoading ||
              itemsDataLoading ||
              authLoading ? 
              <Loading /> : 
              null 
            }
        </div>
    )
}


// find cart items
const findCartItem = (items, inputItem, size) => {
    let newId = inputItem.productId.concat(size);
    return items.find(item => item.productId === newId && item);
}

// check if the item in the cart
const sameItemInCart = (cartItems, newItem, size, qty) => {
    let item = findCartItem(cartItems, newItem, size);
    return {
        ...item,
        quantity: Number(item.quantity) + Number(qty)
    }
}

//add new item to cart
const addCartItem = (item, size, qty) => {
    let productId = item.productId.concat(size)
    let id = item.id.concat(size)

    return {
        ...item,
        id: id,
        productId: productId,
        size: size,
        quantity: qty,
        date: new Date().toISOString()
    };
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

