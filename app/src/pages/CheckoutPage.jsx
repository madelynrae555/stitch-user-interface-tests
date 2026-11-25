import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import { money, useCart } from '../context/CartContext'
import { customer, menuSections, restaurant } from '../data/menu'

const paymentMethods = [
  { id: 'card', label: 'Card', icon: 'credit_card' },
  { id: 'apple', label: 'Apple Pay', icon: 'wallet' },
  { id: 'cash', label: 'Counter Cash', icon: 'payments' },
]

const sectionForItem = (itemId) =>
  menuSections.find((section) => section.items.some((item) => item.id === itemId))?.id || 'pizzas-section'

export default function CheckoutPage() {
  const {
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
    removeLine,
  } = useCart()

  const [editingCustomer, setEditingCustomer] = useState(false)
  const [editingInstructions, setEditingInstructions] = useState(false)
  const [details, setDetails] = useState(customer)
  const [instructionsDraft, setInstructionsDraft] = useState(specialInstructions)
  const [sending, setSending] = useState(false)

  const submitOrder = () => {
    if (lines.length === 0) return
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setOrderPlaced(true)
    }, 900)
  }

  const submitLabel =
    paymentMethod === 'card'
      ? `Submit Order (${money(totals.total)})`
      : paymentMethod === 'apple'
        ? `Pay with Apple Pay (${money(totals.total)})`
        : `Place Pickup Order (${money(totals.total)} at Register)`

  return (
    <div className="w-full max-w-7xl mx-auto px-margin-tablet lg:px-margin-desktop py-space-lg">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md pb-space-lg mb-space-lg">
        <Link to="/" className="inline-flex items-center gap-space-xs text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md group">
          <Icon name="arrow_back" className="text-[18px] transition-transform group-hover:-translate-x-1" />
          Back to Menu / Edit Order
        </Link>
        <div className="flex items-center gap-space-sm bg-surface-container-low px-space-md py-1.5 rounded-full shadow-sm">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
            <Icon name="check_circle" className="text-[16px] text-tertiary font-bold" />
            1. Menu &amp; Order
          </div>
          <Icon name="chevron_right" className="text-outline-variant text-[16px]" />
          <div className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary text-on-primary font-label-sm text-label-sm font-bold shadow-sm">
            <span className="w-4 h-4 rounded-full bg-on-primary text-primary flex items-center justify-center font-bold text-[10px]">2</span>
            Ready to Pay
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-space-xl gap-space-xs">
        <div>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold block mb-1">
            Receipt &amp; Settlement
          </span>
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">Review &amp; Pay</h1>
        </div>
        <div className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-secondary-container animate-ping" />
          <span className="font-semibold text-on-surface">Oven ready in ~18 mins</span>
          <span>•</span>
          <span>Ticket {restaurant.ticket}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-space-xl">
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-space-sm pb-space-md mb-space-md">
              <div className="flex items-center gap-space-sm">
                <div className="w-10 h-10 rounded-full bg-primary-fixed text-primary flex items-center justify-center">
                  <Icon name="storefront" className="text-[22px]" />
                </div>
                <div>
                  <span className="font-title-lg text-title-lg text-on-surface font-bold block">Fulfillment Method</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    {fulfillment === 'pickup' ? 'Standard in-store counter pickup' : 'In-house messenger delivery'}
                  </span>
                </div>
              </div>
              <div className="inline-flex items-center gap-1 bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm px-3 py-1 rounded-full font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
                {fulfillment === 'pickup' ? 'Store Pickup (15-20 min)' : 'Delivery (35 min)'}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md bg-surface-container-low p-space-md rounded-lg">
              <div className="space-y-1">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold block">
                  Location Window
                </span>
                <p className="font-body-md text-body-md font-semibold text-on-surface">Rae's Pizza Counter</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">442 Mulberry Street, New York, NY</p>
                <p className="font-label-sm text-label-sm text-primary font-bold pt-1">Tel: {restaurant.phone}</p>
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setFulfillment('pickup')}
                    className={`px-3 py-1 rounded-full font-label-sm text-label-sm font-bold ${
                      fulfillment === 'pickup' ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant'
                    }`}
                  >
                    Pickup
                  </button>
                  <button
                    type="button"
                    onClick={() => setFulfillment('delivery')}
                    className={`px-3 py-1 rounded-full font-label-sm text-label-sm font-bold ${
                      fulfillment === 'delivery' ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant'
                    }`}
                  >
                    Delivery
                  </button>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold block">
                    Customer Details
                  </span>
                  <button
                    type="button"
                    onClick={() => setEditingCustomer((value) => !value)}
                    className="text-primary font-label-sm text-label-sm hover:underline font-semibold"
                  >
                    {editingCustomer ? 'Done' : 'Change'}
                  </button>
                </div>
                {editingCustomer ? (
                  <div className="space-y-2 pt-1">
                    {['name', 'email', 'phone'].map((field) => (
                      <input
                        key={field}
                        aria-label={field}
                        value={details[field]}
                        onChange={(event) => setDetails({ ...details, [field]: event.target.value })}
                        className="w-full bg-surface-container-lowest px-2 py-1.5 rounded text-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40"
                      />
                    ))}
                  </div>
                ) : (
                  <>
                    <p className="font-body-md text-body-md font-semibold text-on-surface">{details.name}</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">{details.email}</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">{details.phone}</p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
            <div className="flex items-center justify-between pb-space-md mb-space-md">
              <div>
                <h2 className="font-title-lg text-title-lg text-on-surface font-bold">Order Breakdown</h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  {totals.distinctItems} distinct selections prepared fresh to order
                </p>
              </div>
              <span className="font-label-sm text-label-sm bg-surface-container-high px-2.5 py-1 rounded-full font-bold text-on-surface-variant">
                {totals.distinctItems} Items
              </span>
            </div>
            <div className="flex flex-col gap-space-md">
              {lines.length === 0 && (
                <div className="text-center py-space-xl">
                  <p className="font-body-md text-body-md text-on-surface-variant">Your order is empty.</p>
                  <Link to="/" className="text-primary font-label-md text-label-md font-bold hover:underline">
                    Go back to the menu
                  </Link>
                </div>
              )}
              {lines.map((line) => (
                <div key={line.key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md p-space-md rounded-lg bg-surface-container-low/60 hover:bg-surface-container-low transition-colors">
                  <div className="flex items-start gap-space-md">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container flex items-center justify-center">
                      {line.image ? (
                        <img className="w-full h-full object-cover" src={line.image} alt={line.name} />
                      ) : (
                        <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
                          <Icon name="local_cafe" className="text-primary text-[36px]" />
                        </div>
                      )}
                      <span className="absolute bottom-1 right-1 bg-on-surface/85 text-surface font-label-sm text-label-sm px-1.5 py-0.5 rounded font-bold">
                        ×{line.qty}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-title-lg text-title-lg text-on-surface font-bold leading-tight">{line.name}</h3>
                        <span className="bg-primary text-on-primary font-label-sm text-label-sm px-2 py-0.5 rounded-full font-bold">
                          {line.sizeLabel}
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">{line.detail}</p>
                      <div className="flex items-center gap-space-md pt-1">
                        <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">{money(line.price)} ea.</span>
                        <span className="text-on-surface-variant">•</span>
                        <Link
                          to={`/#${sectionForItem(line.itemId)}`}
                          className="text-primary hover:underline font-label-sm text-label-sm font-semibold"
                        >
                          Modify
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeLine(line.key)}
                          className="text-on-surface-variant hover:text-error font-label-sm text-label-sm transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex sm:flex-col justify-between items-end flex-shrink-0">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-bold">{money(line.price * line.qty)}</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      {line.qty} × {money(line.price)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-space-lg pt-space-md">
              <div className="flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm bg-surface-container-low px-space-md py-space-sm rounded-lg gap-space-md">
                <span className="flex items-center gap-2">
                  <Icon name="edit_note" className="text-[18px] text-primary" />
                  <span>
                    Special Instructions:{' '}
                    <strong>{editingInstructions ? '' : `“${specialInstructions}”`}</strong>
                    {editingInstructions && (
                      <textarea
                        value={instructionsDraft}
                        onChange={(event) => setInstructionsDraft(event.target.value)}
                        rows={2}
                        className="mt-2 w-full bg-surface-container-lowest px-2 py-1.5 rounded text-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40"
                      />
                    )}
                  </span>
                </span>
                <button
                  type="button"
                  className="text-primary font-label-sm text-label-sm hover:underline font-bold flex-shrink-0"
                  onClick={() => {
                    if (editingInstructions) setSpecialInstructions(instructionsDraft)
                    setEditingInstructions(!editingInstructions)
                  }}
                >
                  {editingInstructions ? 'Save' : 'Edit'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-space-lg sticky top-24">
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-md">
            <div className="flex items-center justify-between pb-space-md mb-space-md">
              <h2 className="font-title-lg text-title-lg text-on-surface font-bold">Payment Summary</h2>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-tertiary font-bold flex items-center gap-1">
                <Icon name="receipt_long" className="text-[16px]" /> USD
              </span>
            </div>
            <div className="space-y-space-sm pb-space-md">
              <div className="flex items-center justify-between font-body-md text-body-md text-on-surface-variant">
                <span>Subtotal ({totals.distinctItems} items)</span>
                <span className="font-semibold text-on-surface">{money(totals.subtotal)}</span>
              </div>
              <div className="flex items-center justify-between font-body-md text-body-md text-on-surface-variant">
                <span className="flex items-center gap-1">
                  State &amp; Local Tax
                  <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded">8.25%</span>
                </span>
                <span className="font-semibold text-on-surface">{money(totals.tax)}</span>
              </div>
              <div className="flex items-center justify-between font-body-md text-body-md text-on-surface-variant">
                <span>{fulfillment === 'pickup' ? 'Pick-up Service Surcharge' : 'Delivery Fee'}</span>
                <span className="font-bold text-tertiary">
                  {fulfillment === 'pickup' ? 'FREE' : money(totals.deliveryFee)}
                </span>
              </div>
            </div>
            <div className="p-space-md bg-surface-container-low rounded-lg mb-space-lg flex items-center justify-between">
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant font-bold block">
                  Amount Due
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Taxes included</span>
              </div>
              <span className="font-headline-xl text-headline-xl text-primary font-bold tracking-tight leading-none">
                {money(totals.total)}
              </span>
            </div>

            <div className="space-y-space-sm mb-space-lg">
              <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold block">
                Select Payment Method
              </label>
              <div className="grid grid-cols-3 gap-space-xs">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id)}
                    className={`flex flex-col items-center justify-center p-space-sm rounded-lg font-label-md text-label-md font-semibold transition-all shadow-sm ${
                      paymentMethod === method.id
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                    }`}
                  >
                    <Icon name={method.icon} className="text-[20px] mb-1" />
                    {method.label}
                  </button>
                ))}
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-space-sm pt-space-xs">
                  <div className="space-y-1">
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">Cardholder Name</span>
                    <input
                      defaultValue={details.name}
                      placeholder="Name on card"
                      className="w-full bg-surface-container-low px-space-md py-2.5 rounded-lg text-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 font-semibold"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">Card Details</span>
                    <div className="relative">
                      <input
                        defaultValue="•••• •••• •••• 4242"
                        placeholder="Card number"
                        className="w-full bg-surface-container-low pl-space-md pr-10 py-2.5 rounded-lg text-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 font-semibold"
                      />
                      <Icon name="credit_card" className="absolute right-3 top-2.5 text-on-surface-variant text-[20px]" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-space-sm">
                    <div className="space-y-1">
                      <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">Expiry Date</span>
                      <input
                        defaultValue="08 / 28"
                        placeholder="MM/YY"
                        className="w-full bg-surface-container-low px-space-md py-2.5 rounded-lg text-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 font-semibold"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">Security CVC</span>
                      <input
                        type="password"
                        defaultValue="883"
                        placeholder="CVC"
                        className="w-full bg-surface-container-low px-space-md py-2.5 rounded-lg text-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 font-semibold"
                      />
                    </div>
                  </div>
                </div>
              )}
              {paymentMethod === 'apple' && (
                <p className="font-body-sm text-body-sm text-on-surface-variant bg-surface-container-low rounded-lg p-space-md">
                  You'll confirm the payment with Apple Pay when you submit.
                </p>
              )}
              {paymentMethod === 'cash' && (
                <p className="font-body-sm text-body-sm text-on-surface-variant bg-surface-container-low rounded-lg p-space-md">
                  Pay at the counter when you pick up your order.
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={submitOrder}
              disabled={sending || lines.length === 0}
              className={`w-full py-3.5 px-space-lg rounded-full font-label-lg text-label-lg font-bold shadow-md hover:shadow-lg flex items-center justify-center gap-space-sm transition-all disabled:opacity-60 ${
                orderPlaced ? 'bg-tertiary text-on-tertiary' : 'bg-primary text-on-primary hover:bg-primary/90 active:scale-[0.98]'
              }`}
            >
              <Icon name={sending ? 'sync' : orderPlaced ? 'check_circle' : 'arrow_forward'} className={sending ? 'animate-spin text-[20px]' : 'text-[20px]'} />
              {sending ? 'Sending to Kitchen...' : orderPlaced ? `Order Placed! Ticket ${restaurant.ticket}` : submitLabel}
            </button>

            {orderPlaced && (
              <p className="mt-space-md font-body-sm text-body-sm text-tertiary text-center font-semibold">
                Thanks! Your order is in the oven. <Link to="/" className="underline">Start another order</Link>
              </p>
            )}

            <div className="pt-space-md mt-space-md flex flex-col items-center text-center gap-1">
              <div className="flex items-center gap-1.5 text-tertiary font-label-sm text-label-sm font-bold">
                <Icon name="lock" className="text-[16px]" />
                256-Bit Encrypted &amp; Secure Checkout
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Your payment info is safely tokenized. Freshly made guaranteed.
              </p>
            </div>
          </div>

          <div className="bg-surface-container-low rounded-xl p-space-md flex items-center gap-space-md">
            <div className="w-10 h-10 rounded-full bg-secondary-fixed text-secondary flex items-center justify-center flex-shrink-0">
              <Icon name="local_fire_department" className="text-[22px]" />
            </div>
            <div>
              <h4 className="font-title-lg text-title-lg text-on-surface font-bold text-sm">Hearth-Side Guarantee</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Hot out of the oven within 5 minutes of your scheduled arrival window.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
