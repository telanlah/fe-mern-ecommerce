import React from 'react'
import { useSelector } from 'react-redux'
import CartListItems from './CartListItems'

const CartList = () => {
    const cartItems = useSelector((state)=> state.cartState.CartItems)
    // console.log(cartItems);
    
  return (
    <>
    {cartItems.map((item)=> {
        return <CartListItems key={item.cartId} cartItem={item}/>
    })}
    </>
  )
}

export default CartList