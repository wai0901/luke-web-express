// find cart items
export const findCartItem = (items, inputItem, size) => {
    let newId = inputItem.productId.concat(size);
    return items.find(item => item.productId === newId && item);
}

// check if the item in the cart
export const sameItemInCart = (cartItems, newItem, size, qty) => {
    let item = findCartItem(cartItems, newItem, size);

    return {
        ...item,
        quantity: Number(item.quantity) + Number(qty)
    }
}

// update the item in cart
export const updateItemInCart = (cartItems, updatedNewItem, auth) => {
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
export const addCartItem = (inCartItems, newItem, size, qty, auth) => {

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
export function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    }
    return null
}

//find the same objects in two arrays of objests
export const findSameObjects = (firstObjs, secondObjs) => firstObjs.filter(firstObj => secondObjs.some(secondObj =>
    secondObj.productId === firstObj.productId));

//find the different object in two arrays of objects
export const findDifferetObjects = (firstObjs, secondObjs) => firstObjs.filter(firstObj => 
    !secondObjs.some(secondObj => secondObj.productId === firstObj.productId))
    .concat(secondObjs.filter(secondObjTwo => 
    !firstObjs.some(firstObjTwo => secondObjTwo.productId === firstObjTwo.productId)))