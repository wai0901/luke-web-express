import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux';
import Header from "./header_components/Header";
import Footer from "./footer components/Footer";
import BodySection from './bodyComponets/BodySection';
import SelectedCat from './bodyComponets/SelectedCat/SelectedCat';
import Items from './bodyComponets/SelectedCat/product_Items/Items';
import ItemDetail from './bodyComponets/SelectedCat/product_Items/ItemDetail';
import ShoppingCart from './bodyComponets/shopping_cart/ShoppingCart';
import Checkout from './bodyComponets/shopping_cart/checkout/Checkout';
import AddressForm from './bodyComponets/shopping_cart/checkout/address-form/AddressForm';
import Help from './bodyComponets/help/Help';
import Contact from './bodyComponets/contact/Contact';
import Signup from './bodyComponets/login/Signup';
import ThankYou from './bodyComponets/thank-you/ThankYou';
import Loading from './loading/Loading';
import Admin from './admin/Admin';
import { 
    postCartItems, 
    updateCartItems, 
    fetchCartData,
   } from '../redux/ActionCreater';
import { CSSTransition } from 'react-transition-group';
import './css/Main.css';
import {WEBSITEDATA} from '../shared/websiteData'



const mapStateToProps = state => {
    // console.log(state.cartItem)
    return {
        inCartItems: state.cartItem.cart,
        authStatus: state.auth,
        inCartItemsLoading: state.cartItem.isLoading,
        authLoading: state.auth.isLoading
    }
}

const mapDispatchToProps = {
    postCartItems: (cartItem) => (postCartItems(cartItem)),
    updateCartItems: (cartItem, id) => (updateCartItems(cartItem, id)),
    fetchCartData,
};

const Main = (props) => {

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

    // add item to local storage for shopping cart if user is not authenticated
    const [ localCart, setLocalCart ] = useState([]);

    useEffect(() => {

        //fetch the cart item from server
        authStatus.isAuthenticated && props.fetchCartData();

        //get the cart item data from local storage if user is not logged in
        const loaclcartItem = JSON.parse(localStorage.getItem('cart')) || [];
        loaclcartItem && setLocalCart(() => loaclcartItem);

    }, [])

    const history = useHistory();
    const mainData = WEBSITEDATA.homeMenu;
    const authStatus =  props.authStatus;
    const catIsLoading = props.catIsLoading;
    const itemsDataLoading = props.itemsDataLoading;
    const inCartItemsLoading = props.inCartItemsLoading;
    const authLoading = props.authLoading;
    const inCartItems = authStatus.isAuthenticated ?
                        props.inCartItems === [] ? [] : props.inCartItems[0] :
                        localCart;
                    
    
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

        //to check if the user is logged in
        if (authStatus.isAuthenticated) {

            // logged in user, items storge in server
            if (inCartItems === undefined || inCartItems.length === 0 || inCartItems === []) {

                // Cart is empty
                props.postCartItems(addCartItem(inCartItems, pickedItem, size, qty, authStatus));
            } else {

                // Cart is not empty
                if(findCartItem(inCartItems.cartItems, pickedItem, size)){

                    //find and update the item which already in cart
                    let updatedItem = sameItemInCart(inCartItems.cartItems, pickedItem, size, qty);
                    let updatedItemId = inCartItems._id;
                    return props.updateCartItems(updateItemInCart(inCartItems, updatedItem), updatedItemId);
                } else {

                    //cart has item, but not the same item, push to existing cart items
                    let updatedItemId = inCartItems._id;
                    props.updateCartItems(addCartItem(inCartItems, pickedItem, size, qty, authStatus), updatedItemId);
                }
            }  
        } else {
            //user is not logged in, will save item to local storage
            if (localCart.length === 0) {
                
                //Cart is empty
                let newItem = addCartItem(localCart, pickedItem, size, qty, authStatus)
                localStorage.setItem('cart', JSON.stringify(newItem));
            } else {

                //cart is not empty
                if(findCartItem(localCart.cartItems, pickedItem, size)) {

                    //find and update the item which already in cart
                    let updatedItem = sameItemInCart(localCart.cartItems, pickedItem, size, qty);
                    let updatedItems = updateItemInCart(localCart, updatedItem, authStatus)
                    localStorage.setItem('cart', JSON.stringify(updatedItems));;
                } else {

                    //cart has item, but not the same item, push to existing cart items
                    let newItem = addCartItem(localCart, pickedItem, size, qty, authStatus)
                    localStorage.setItem('cart', JSON.stringify(newItem));
                }
            }
            //set State
            let updateCart = JSON.parse(localStorage.getItem('cart')) || [];
            return setLocalCart(() => updateCart);
        }    
    }

    /*After login, check if the server has exsiting items in cart,
      if yes, then merge the items in the local storage and update to the server*/
    const fetchAndUpdateCartItem = async () => {
        let localItems = await JSON.parse(localStorage.getItem('cart')) || [];
        let server = await (JSON.parse(localStorage.getItem('serverItems'))) || [];
        let serverItems = server.length !== 0 && server ? (JSON.parse(localStorage.getItem('serverItems')))[0] : [];
        let user = await JSON.parse(localStorage.getItem('user')) || [];
        
        // check if the user has successfully loggin in
        if (user !== []) {
            console.log("logged in")
            //check if the cart in server is empty
            if (serverItems.length === 0 ) {
                console.log("server has no item")
                //check if the cart in local storage is empty, if not push it to server
                localItems !== [] && props.postCartItems(localItems);
                
            } else {
                console.log("server has items")
                //check if the cart in local storage is empty, if not merge with existing items
                if (localItems.length !== 0) {
                    console.log("local has item")
                    //find the same cart items in serverside and localside and update the qty
                    let mergedCartItems = await findSameObjects(serverItems.cartItems, localItems.cartItems)
                                    .map(serverItem => {
                                        let item;
                                            localItems.cartItems.forEach(localItem => {
                                            if (serverItem.productId === localItem.productId) {
                                                
                                                return item = {
                                                    ...serverItem,
                                                    quantity: +serverItem.quantity + +localItem.quantity
                                                }
                                            }
                                        })
                                        return item;
                                    })
                    //find the difference of cart items in serverside and localside
                    let remainCartItems = await findDifferetObjects(serverItems.cartItems, localItems.cartItems)
                    //update the obj
                    let updatedItems = {
                        ...serverItems,
                        cartItems: [
                            ...remainCartItems,
                            ...mergedCartItems
                        ]
                    }
                    let updatedItemId = serverItems._id;
                    //upload to server
                    props.updateCartItems(updatedItems, updatedItemId);
                    localStorage.removeItem('serverItems');
                }
            }
        }
    }

    //for billing info and delivery info in checkout
    const handleCheckoutInfoChange = (info, form) => {
        const user = JSON.parse(localStorage.getItem('user')) || []

        const userInformation = {
            firstname: info.firstname,
            lastname: info.lastname,
            email: info.email,
            tel: info.tel,
            street: info.street,
            city: info.city,
            state: info.state,
            zip: info.zip
        }

        //check if the form is billing, else is delivery
        if (form === "billing") {
            let billing = {
                ...user,
                billingAddress: userInformation
            }
            localStorage.setItem('user', JSON.stringify(billing));
        } else {
            let delivery = {
                ...user,
                deliveryAddress: userInformation
            }
            localStorage.setItem('user', JSON.stringify(delivery));
        }
        history.goBack()
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

    // AddressForm page 
    const RenderAddressForm = ({match}) => {

        return (
            <AddressForm 
                formInfo={match.params.formId}
                handleCheckoutInfoChange={handleCheckoutInfoChange}
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
    
    // Total qty of items in cart
    const cartQty = inCartItems === undefined || inCartItems.length === 0 || inCartItems === [] ?
        0 :
        inCartItems.cartItems.map(item => Number(item.quantity)).reduce((t, c) => t + c, 0) ;

    const cartTotal = inCartItems === undefined || inCartItems.length === 0 || inCartItems === [] ?
         0.00 :
        inCartItems.cartItems.map(item => Number(item.quantity * item.price)).reduce((t, c) => t + c, 0).toFixed(2);
     
    return (
        <div className="bg">
            <div className="bg-shader"></div>
            <Router>
                <div className="container">
                    <Header 
                        authStatus={authStatus}
                        cartQty={cartQty}
                        handleHeaderCatChange={handleHeaderCatChange}
                        signinRoute={signinRoute}
                        setSigninRoute={setSigninRoute}
                        handleModalOpen={handleModalOpen}
                        handleModalClose={handleModalClose}
                        modalOpen={modalOpen}
                        fetchAndUpdateCartItem={fetchAndUpdateCartItem}
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
                                authStatus={authStatus}
                                handleCheckoutInfoChange={handleCheckoutInfoChange}
                            />
                        } />
                        <Route path="/checkout/:formId" exact component={RenderAddressForm} /> 
                        <Route path="/shopping-cart" exact render={() => 
                            <ShoppingCart 
                                inCartItems={inCartItems}
                                cartTotal={cartTotal}
                                authStatus={authStatus}
                                handleModalOpen={handleModalOpen}
                                localCart={localCart}
                                setLocalCart={setLocalCart}
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
            {
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

// update the item in cart
const updateItemInCart = (cartItems, updatedNewItem, auth) => {
    let remainCartItems = cartItems.cartItems.filter(item => item.productId !== updatedNewItem.productId);
    let userId = JSON.parse(localStorage.getItem('user')) ?
                (JSON.parse(localStorage.getItem('user')) || [])._id :
                "Not Register User";
    return {
        ...cartItems,
        userId: userId,
        cartItems: [
            ...remainCartItems,
            {...updatedNewItem}
        ]
    }
}

//add new item to cart
const addCartItem = (inCartItems, newItem, size, qty, auth) => {

    let productId = newItem.productId.concat(size);
    let id = newItem.id.concat(size);
    let userId = auth.isAuthenticated ?
                (JSON.parse(localStorage.getItem('user')) || [])._id :
                "Not Register User";
    //to check it the cart data is come from server or localstorage
    let checkInCartItems = auth.isAuthenticated ? inCartItems : inCartItems;

    //check if the cart is empty
    if (checkInCartItems === undefined || checkInCartItems.length === 0 || checkInCartItems === null) {
        return {
            userId: userId,
            purchased: false,
            cartItems: [{
                ...newItem,
                productId: productId,
                id: id,
                size: size,
                quantity: qty,
                date: new Date().toISOString()
            }]
        };
    //cart is not empty, but items in cart are not the same
    } else {
        return {
            userId: userId,
            purchased: false,
            cartItems: [
                ...checkInCartItems.cartItems,
                {
                ...newItem,
                productId: productId,
                id: id,
                size: size,
                quantity: qty,
                date: new Date().toISOString()
            }
        ]
        };
    }
}

//format the phonenumber
function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    }
    return null
}

//find the same objects in two arrays of objests
const findSameObjects = (firstObjs, secondObjs) => firstObjs.filter(firstObj => secondObjs.some(secondObj =>
    secondObj.productId === firstObj.productId));

//find the different object in two arrays of objects
const findDifferetObjects = (firstObjs, secondObjs) => firstObjs.filter(firstObj => 
    !secondObjs.some(secondObj => secondObj.productId === firstObj.productId))
    .concat(secondObjs.filter(secondObjTwo => 
    !firstObjs.some(firstObjTwo => secondObjTwo.productId === firstObjTwo.productId)))

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

