import { createContext, useContext, useMemo, useState } from 'react'
import { initialCart, specialInstructionsInitial, TAX_RATE } from '../data/menu'

const CartContext = createContext(null)

export const money = (value) => `$${value.toFixed(2)}`

export function CartProvider({ children }) {
  const [lines, setLines] = useState(initialCart)
  const [fulfillment, setFulfillment] = useState('pickup')
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [specialInstructions, setSpecialInstructions] = useState(
    specialInstructionsInitial,
  )
  const [orderPlaced, setOrderPlaced] = useState(false)

  const addToCart = (item, size, qty) => {
    if (qty < 1) return
    setOrderPlaced(false)
    setLines((current) => {
      const withoutItem = current.filter((line) => line.itemId !== item.id)
      return [
        ...withoutItem,
        {
          key: `${item.id}-${size.name}`,
          itemId: item.id,
          name: item.name,
          size: size.name,
          sizeLabel: item.detailSize || size.name,
          price: size.price,
          qty,
          note: item.cartNote || '',
          detail: item.detail,
          image: item.detailImage || item.image,
        },
      ]
    })
  }

  const removeLine = (key) => {
    setOrderPlaced(false)
    setLines((current) => current.filter((line) => line.key !== key))
  }

  const changeQty = (key, delta) => {
    setOrderPlaced(false)
    setLines((current) =>
      current
        .map((line) =>
          line.key === key ? { ...line, qty: line.qty + delta } : line,
        )
        .filter((line) => line.qty > 0),
    )
  }

  const itemQuantity = (itemId) =>
    lines
      .filter((line) => line.itemId === itemId)
      .reduce((sum, line) => sum + line.qty, 0)

  const totals = useMemo(() => {
    const subtotal = lines.reduce((sum, line) => sum + line.price * line.qty, 0)
    const tax = Math.round(subtotal * TAX_RATE * 100) / 100
    const deliveryFee = fulfillment === 'delivery' ? 4.99 : 0
    return {
      subtotal,
      tax,
      deliveryFee,
      total: subtotal + tax + deliveryFee,
      itemCount: lines.reduce((sum, line) => sum + line.qty, 0),
      distinctItems: lines.length,
    }
  }, [lines, fulfillment])

  const value = {
    lines,
    totals,
    fulfillment,
    setFulfillment,
    paymentMethod,
    setPaymentMethod,
    specialInstructions,
    setSpecialInstructions,
    orderPlaced,
    setOrderPlaced,
    addToCart,
    removeLine,
    changeQty,
    itemQuantity,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside CartProvider')
  return context
}
