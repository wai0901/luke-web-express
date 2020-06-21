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
import Help from './bodyComponets/help/Help';
import Contact from './bodyComponets/contact/Contact';
import Login from './bodyComponets/login/Login';
import Signup from './bodyComponets/login/Signup';
import Loading from './loading/Loading';
import OrdersData from './orders-data/OrderData';
import { fetchMainData, 
    fetchCategoryData, 
    fetchItemsData, 
    postCartItems, 
    updateCartItems, 
    fetchCartData,
   } from '../redux/ActionCreater';
import { CSSTransition } from 'react-transition-group';
import './css/Main.css';



const mapStateToProps = state => {
    console.log(state)
    return {
        mainData: state.mainPage.homeMenu.data,
        categoryData: state.category.category.data,
        itemsData: state.items.items.data,
        inCartItems: state.cartItem.cart.data,
        loginStatus: state.login.login,
        catIsLoading: state.category.isLoading,
        inCartItemsLoading: state.cartItem.isLoading,
        loginIsLoading: state.login.isLoading
    }
}

const mapDispatchToProps = {
    fetchCategoryData: (link) => (fetchCategoryData(link)),
    fetchItemsData: (link, categoryId) => (fetchItemsData(link, categoryId)),
    postCartItems: (cartItem) => (postCartItems(cartItem)),
    updateCartItems: (cartItem, id) => (updateCartItems(cartItem, id)),
    fetchMainData,
    fetchCartData,
};

const Main = (props) => {


    const categoryData = props.categoryData;
    const itemsData = props.itemsData;
    const inCartItems = props.inCartItems;
    const catIsLoading = props.catIsLoading;

    const [ pickedItem, setPickedItem ] = useState("")
    const [ loginStatus, setLoginStatus ] = useState("")
    

    useEffect(() => {
        props.fetchMainData();
        props.fetchCartData();
    }, [])
    

    const handleCatChange = (link) => 
        props.fetchCategoryData(link);
    
    const handleHeaderCatChange = (link) => 
        props.fetchCategoryData(link);
    
    const handleItemsChange = (link, categoryId) => 
        props.fetchItemsData(link, categoryId);

    const handlePickedItem = (item) => 
        setPickedItem(item);


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
                        categoryData={categoryData}
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
            <CSSTransition
                in={match != null}
                timeout={1000}
                classNames="fade"
                appear
                >
                    <ItemDetail 
                        pickedItem={pickedItem}
                        addCartHandler={addCartHandler}
                    />
                </CSSTransition>
        )
    }

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
                        loginStatus={loginStatus}
                        cartQty={cartQty}
                        handleHeaderCatChange={handleHeaderCatChange}
                    />
                    <div className="holder"> 
                        <Switch>                
                        <Route path="/" exact render={()=> 
                             <BodySection 
                                mainData={props.mainData}
                                handleCatChange={handleCatChange}
                             />
                        } />
                        <Route path="/help" exact component={Help}/>
                        <Route path="/contact" exact component={Contact}/>
                        <Route path="/signup" exact component={Signup}/>
                        <Route path="/login" exact component={Login}/>
                        <Route path="/orders" exact component={OrdersData}/>
                        <Route path="/shopping-cart" exact render={() => 
                            <ShoppingCart 
                                inCartItems={props.inCartItems}
                                cartTotal={cartTotal}
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
            { props.mainLoading ||
              props.catIsLoading ||
              props.loginIsLoading ||
              props.itemsDataLoading ? 
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

//filter object
// const filteredObj = (objs, objName) => {
//     let targetObj = [objName];
//     return Object.keys(objs).filter(key => targetObj.includes(key)).reduce((obj, key) => {
//     obj[key] = objs[key];
//     return obj;
//     }, {})};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

