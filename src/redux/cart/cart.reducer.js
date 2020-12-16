import actionTypes from './cart.actionTypes'


const INITIAL_STATE = {
  cartItems: [],
};
const increment = (cartItems, _ids) => {
  const restaurant = cartItems.filter(item => item.id === _ids.restaurantID)[0];
  const order = restaurant.order.filter(_order => _order.id === _ids.id)[0];
  const _restaurant = {
    ...restaurant,
    order: [...restaurant.order.map((_order) => _order.id !== _ids.id ? _order : { ...order, qty: order.qty + 1 })]
  };
  return [_restaurant, ...cartItems.filter(item => item.id !== _ids.restaurantID)];
};

const decrement = (cartItems, _ids) => {
  const restaurant = cartItems.filter(item => item.id === _ids.restaurantID)[0];
  const order = restaurant.order.filter(_order => _order.id === _ids.id)[0];
  const orders = order.qty - 1 === 0 ?
    [...restaurant.order.filter((_order) => _order.id !== _ids.id)] :
    [...restaurant.order.map((_order) => _order.id !== _ids.id ? _order : { ...order, qty: order.qty - 1 })]
  const _restaurant = {
    ...restaurant,
    order: orders
  };
  const restaurants = _restaurant.order.length ? [_restaurant, ...cartItems.filter(item => item.id !== _ids.restaurantID)] : [...cartItems.filter(item => item.id !== _ids.restaurantID)];
  return restaurants;
}
const deleteFromCart = (cartItems, _ids) => {
  const restaurant = cartItems.filter(item => item.id === _ids.restaurantID)[0];
  const orders = restaurant.order.filter(_order => _order.id !== _ids.id);
  const _restaurant = {
    ...restaurant,
    order: orders
  };
  const restaurants = _restaurant.order.length ? [_restaurant, ...cartItems.filter(item => item.id !== _ids.restaurantID)] : [...cartItems.filter(item => item.id !== _ids.restaurantID)];
  return restaurants;

};
const cartReducer = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
    case actionTypes.ADD_TO_CART:
      return {
        cartItems: add(state.cartItems, actions.payload),
      };
    case actionTypes.INCREMENT_QTY:
      return {
        cartItems: increment(state.cartItems, actions.payload),
      };
    case actionTypes.DECREMENT_QTY:
      return {
        cartItems: decrement(state.cartItems, actions.payload),
      };
    case actionTypes.DELETE_FROM_CART:
      return {
        cartItems: deleteFromCart(state.cartItems, actions.payload),
      };
    default:
      return state;
  }
};

const isEqual = (value, other) => {
  if (value.length === 0 || other.length === 0) return false
  // Get the value type
  var type = Object.prototype.toString.call(value);

  // If the two objects are not the same type, return false
  if (type !== Object.prototype.toString.call(other)) return false;

  // If items are not an object or array, return false
  if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;

  // Compare the length of the length of the two items
  var valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
  var otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
  if (valueLen !== otherLen) return false;

  // Compare two items
  var compare = function (item1, item2) {

    // Get the object type
    var itemType = Object.prototype.toString.call(item1);

    // If an object or array, compare recursively
    if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
      if (!isEqual(item1, item2)) return false;
    }


    else {


      if (itemType !== Object.prototype.toString.call(item2)) return false;

      // Else if it's a function, convert to a string and compare
      // Otherwise, just compare
      if (itemType === '[object Function]') {
        if (item1.toString() !== item2.toString()) return false;
      } else {
        if (item1 !== item2) return false;
      }

    }
  };

  // Compare properties
  if (type === '[object Array]') {
    for (var i = 0; i < valueLen; i++) {
      if (compare(value[i], other[i]) === false) return false;
    }
  } else {
    for (var key in value) {
      if (value.hasOwnProperty(key)) {
        if (compare(value[key], other[key]) === false) return false;
      }
    }
  }


  return true;

};

const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}


const add = (cartItems, item) => {
  const tempId = uuidv4();
  const restaurant = cartItems.filter(cartItem => cartItem.id === item.id)[0];
  if (!restaurant) {
    const _restaurant = {
      ...item,
      order: [{
        ...item.order,
        id: tempId,

      }]
    };
    return [...cartItems, _restaurant];
  } else {

    const order = restaurant.order.filter(_order => {
      // console.log(_order);
      return (_order.orderId === item.order.orderId

        // && isEqual(_order.variants, item.order.variants)
        // && _order.inforamtion === item.order.inforamtion
      )
    }
    )
    console.log(order);
    const tempOrder = order.filter(_order => {

      return (
        //_order.id === item.order.id

        isEqual(_order.variants, item.order.variants)
        && _order.inforamtion === item.order.inforamtion
      )
    }
    )[0];
    console.log('temp', tempOrder);
    if (tempOrder) {
      console.log(' i am here');
      const _ids = {
        restaurantID: item.id,
        id: tempOrder.id
      };
      return increment(cartItems, _ids);
    } else {

      const _restaurant = {
        ...restaurant,
        order: [...restaurant.order, {
          ...item.order,

          id: tempId,

        }]
      }
      return [...cartItems.filter(cartItem => cartItem.id !== item.id), _restaurant];
    }
  }

};



export default cartReducer;

