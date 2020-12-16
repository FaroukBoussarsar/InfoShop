import actionTypes from './cart.actionTypes'

export const incrementQte = (id) => {
    return {
        type: actionTypes.INCREMENT_QTY,
        payload :id

    }
}
export const decrementQte = (id) => {
    return {
        type: actionTypes.DECREMENT_QTY,
        payload :id


    }
}
export const deleteFromCart = (id) => {
    return {
        type: actionTypes.DELETE_FROM_CART,
        payload :id


    }
}

export const addToCart = (item) =>{
    return {
        type: actionTypes.ADD_TO_CART,
        payload: item
    }
}

