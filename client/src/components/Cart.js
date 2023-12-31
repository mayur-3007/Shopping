import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from '../slices/cartSlice'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'

import { Link } from 'react-router-dom'

const Cart = () => {
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTotals())
  }, [cart, dispatch])

  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
  }
  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product))
  }
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product))
  }
  const handleClearCart = () => {
    dispatch(clearCart())
  }
  return (
    <div className='cart-container'>
      <h2>Shopping Cart</h2>
      {cart.cartItems.length === 0 ? (
        <div className='cart-empty'>
          <p>Your cart is currently empty</p>
          <div className='start-shopping'>
            <Link to='/'>
              <KeyboardBackspaceIcon />
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className='titles'>
            <h3 className='product-title'>Product</h3>
            <h3 className='price'>Price</h3>
            <h3 className='quantity'>Quantity</h3>
            <h3 className='total'>Total</h3>
          </div>
          <div className='cart-items'>
            {cart.cartItems &&
              cart.cartItems.map((cartItem) => (
                <div className='cart-item' key={cartItem.handle}>
                  <div className='cart-product'>
                    <img src={cartItem.image_src} alt={cartItem.title} />
                    <div>
                      <h3>{cartItem.title}</h3>
                      <p>{cartItem.body}</p>
                      <button onClick={() => handleRemoveFromCart(cartItem)}>
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className='cart-product-price'>
                    ${cartItem.variant_price}
                  </div>
                  <div className='cart-product-quantity'>
                    <button onClick={() => handleDecreaseCart(cartItem)}>
                      -
                    </button>
                    <div className='count'>{cartItem.cartQuantity}</div>
                    <button onClick={() => handleAddToCart(cartItem)}>+</button>
                  </div>
                  <div className='cart-product-total-price'>
                    ${cartItem.variant_price * cartItem.cartQuantity}
                  </div>
                </div>
              ))}
          </div>
          <div className='cart-summary'>
            <button className='clear-btn' onClick={() => handleClearCart()}>
              Clear Cart
            </button>
            <div className='cart-checkout'>
              <div className='subtotal'>
                <span>Subtotal</span>
                <span className='amount'>${cart.cartTotalAmount}</span>
              </div>
              <p>Taxes and shipping calculated at checkout</p>
              <button>Check out</button>
              <div className='continue-shopping'>
                <Link to='/'>
                  <KeyboardBackspaceIcon />
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
