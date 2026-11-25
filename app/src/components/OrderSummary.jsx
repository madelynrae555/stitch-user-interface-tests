import { Link } from 'react-router-dom'
import { money, useCart } from '../context/CartContext'
import Icon from './Icon'

export default function OrderSummary() {
  const { lines, totals, fulfillment, setFulfillment, removeLine } = useCart()

  return (
    <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-space-md">
      <div className="bg-surface-container-lowest rounded-xl shadow-xl overflow-hidden relative">
        <div className="bg-primary text-on-primary px-space-lg py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="receipt_long" className="text-[20px]" />
            <span className="font-headline-sm text-headline-sm font-bold tracking-tight">Your Order</span>
          </div>
          <span className="font-label-sm text-label-sm bg-surface-container-lowest text-primary font-extrabold px-2.5 py-0.5 rounded-full shadow-sm">
            {totals.itemCount} items
          </span>
        </div>

        <div className="p-space-md bg-surface-container-low flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFulfillment('pickup')}
            className={`flex-1 py-1.5 px-3 rounded-md font-label-md text-label-md font-bold text-center shadow-sm transition-colors ${
              fulfillment === 'pickup'
                ? 'bg-surface-container-lowest text-primary'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Counter Pickup (20m)
          </button>
          <button
            type="button"
            onClick={() => setFulfillment('delivery')}
            className={`flex-1 py-1.5 px-3 rounded-md font-label-md text-label-md font-semibold text-center transition-colors ${
              fulfillment === 'delivery'
                ? 'bg-surface-container-lowest text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Delivery (35m)
          </button>
        </div>

        <div className="p-space-lg space-y-space-md">
          <div className="text-[11px] font-label-sm uppercase tracking-widest text-on-surface-variant font-bold pb-1 flex justify-between">
            <span>Item Description</span>
            <span>Amount</span>
          </div>

          {lines.length === 0 && (
            <p className="font-body-md text-body-md text-on-surface-variant py-space-lg text-center">
              Your order is empty. Add something tasty from the menu.
            </p>
          )}

          {lines.map((line) => (
            <div key={line.key} className="flex items-start justify-between gap-space-sm bg-surface-container-low/60 p-space-sm rounded-lg">
              <div className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded bg-primary text-on-primary font-label-sm text-label-sm font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {line.qty}×
                </span>
                <div>
                  <h4 className="font-title-lg text-title-lg text-on-surface font-bold leading-tight">{line.name}</h4>
                  <div className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1 mt-0.5">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary" />
                    Size: <strong>{line.sizeLabel}</strong> ({money(line.price)} each)
                  </div>
                  {line.note && (
                    <span className="font-label-sm text-label-sm text-tertiary">{line.note}</span>
                  )}
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="font-price-display text-price-display text-on-surface font-extrabold">
                  {money(line.price * line.qty)}
                </span>
                <button
                  type="button"
                  onClick={() => removeLine(line.key)}
                  className="text-on-surface-variant hover:text-error block text-[11px] font-label-sm mt-1"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="bg-surface-container-low rounded-xl p-space-md space-y-2 mt-space-md">
            <div className="flex items-center justify-between font-body-md text-body-md text-on-surface-variant">
              <span>Items Subtotal</span>
              <span className="font-bold text-on-surface">{money(totals.subtotal)}</span>
            </div>
            <div className="flex items-center justify-between font-body-md text-body-md text-on-surface-variant">
              <span className="flex items-center gap-1">
                Estimated Tax (8.25%)
                <Icon name="info" className="text-[14px] text-on-surface-variant" />
              </span>
              <span className="font-bold text-on-surface">{money(totals.tax)}</span>
            </div>
            <div className="flex items-center justify-between font-body-md text-body-md text-on-surface-variant">
              <span>{fulfillment === 'pickup' ? 'Store Pickup' : 'Delivery'}</span>
              <span className="font-bold text-tertiary uppercase text-label-sm">
                {fulfillment === 'pickup' ? 'Free' : money(totals.deliveryFee)}
              </span>
            </div>
            <div className="pt-3 mt-2 flex items-baseline justify-between bg-surface-container p-2.5 rounded-lg">
              <div>
                <span className="font-headline-sm text-headline-sm font-extrabold text-on-surface block">Order Total</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">All taxes included</span>
              </div>
              <span className="font-headline-md text-headline-md font-extrabold text-primary tracking-tight">
                {money(totals.total)}
              </span>
            </div>
          </div>

          <div className="space-y-space-xs pt-space-xs">
            <Link
              to="/checkout"
              className="w-full py-4 px-6 rounded-xl bg-primary hover:bg-primary-container active:scale-[0.99] text-on-primary font-headline-sm text-headline-sm font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
            >
              <span>Ready to Pay</span>
              <Icon name="arrow_forward" className="text-[24px] group-hover:translate-x-1.5 transition-transform" />
            </Link>
            <p className="font-body-sm text-body-sm text-center text-on-surface-variant">
              Proceed to payment and review • Fast &amp; secure checkout
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-on-surface-variant font-label-sm text-label-sm pt-2">
            <Icon name="verified_user" className="text-[16px] text-tertiary" />
            Baked fresh at 412 Carmine St • Never frozen dough
          </div>
        </div>
        <div className="h-2 w-full bg-[radial-gradient(ellipse_at_bottom,#fff8f5_40%,transparent_50%)] bg-[length:12px_12px] bg-repeat-x" />
      </div>

      <div className="bg-surface-container rounded-xl p-space-md flex items-center gap-space-md shadow-sm">
        <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary font-bold flex-shrink-0">
          <Icon name="call" className="text-[20px]" />
        </div>
        <div>
          <span className="font-label-md text-label-md font-bold text-on-surface block">Dietary question or rush?</span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            Call our pie master directly:{' '}
            <a href="tel:+15557237499" className="font-bold hover:text-primary">(555) 723-7499</a>
          </span>
        </div>
      </div>
    </aside>
  )
}
