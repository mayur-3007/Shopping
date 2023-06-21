import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingIndex = state.cartItems.findIndex(
        (item) => item.handle === action.payload.handle
      )

      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
        }
      } else {
        let tempProductItem = { ...action.payload, cartQuantity: 1 }
        state.cartItems.push(tempProductItem)
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.handle === action.payload.handle
      )

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (item) => item.handle !== action.payload.handle
        )

        state.cartItems = nextCartItems
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    removeFromCart(state, action) {
      state.cartItems.map((cartItem) => {
        if (cartItem.handle === action.payload.handle) {
          const nextCartItems = state.cartItems.filter(
            (item) => item.handle !== cartItem.handle
          )

          state.cartItems = nextCartItems
        }
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        return state
      })
    },
    getTotals(state, action) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { variant_price, cartQuantity } = cartItem
          const itemTotal = variant_price * cartQuantity

          cartTotal.total += itemTotal
          cartTotal.quantity += cartQuantity

          return cartTotal
        },
        {
          total: 0,
          quantity: 0,
        }
      )
      total = parseFloat(total.toFixed(2))
      state.cartTotalQuantity = quantity
      state.cartTotalAmount = total
    },
    clearCart(state, action) {
      state.cartItems = []
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
  },
})

export const { addToCart, decreaseCart, removeFromCart, getTotals, clearCart } =
  cartSlice.actions

export default cartSlice.reducer
