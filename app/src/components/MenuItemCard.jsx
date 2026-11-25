import { useEffect, useState } from 'react'
import { useCart, money } from '../context/CartContext'
import { assetUrl } from '../utils/assets'
import Icon from './Icon'
import QuantityStepper from './QuantityStepper'
import SizeSelector from './SizeSelector'

const badgeStyles = {
  primary: 'bg-primary text-on-primary',
  tertiary: 'text-tertiary',
  dark: 'text-tertiary-container',
  light: 'bg-surface-container-lowest/90 text-on-surface',
  green: 'bg-tertiary-fixed text-on-tertiary-fixed',
  'green-solid': 'bg-tertiary text-on-tertiary',
}

function Badge({ item, position = 'top-right' }) {
  if (!item.badge) return null
  return (
    <span
      className={`absolute ${position} z-10 font-label-sm text-label-sm font-bold px-2.5 py-0.5 rounded shadow-sm ${badgeStyles[item.badgeStyle]}`}
    >
      {item.badge}
    </span>
  )
}

export default function MenuItemCard({ item, variant }) {
  const { addToCart, itemQuantity } = useCart()
  const [sizeName, setSizeName] = useState(item.defaultSize)
  const [qty, setQty] = useState(item.initialQty)
  const cartQty = itemQuantity(item.id)
  const size = item.sizes.find((option) => option.name === sizeName) || item.sizes[0]

  useEffect(() => {
    if (cartQty > 0) setQty(cartQty)
  }, [cartQty])

  const add = () => addToCart(item, size, qty)
  const stepperSize = variant === 'drink' ? 'sm' : variant === 'side' ? 'md' : 'lg'
  const showSizeSelector = item.sizes.length > 1 || item.id === 'water'

  const sizeSelector = showSizeSelector && (
    <SizeSelector
      sizes={item.sizes}
      selected={sizeName}
      onChange={setSizeName}
      variant={variant === 'pizza' ? 'pizza' : variant === 'side' ? 'side' : 'drink'}
      label={variant === 'pizza' ? 'Select Crust Size:' : variant === 'side' ? 'Portion Size:' : undefined}
    />
  )

  if (variant === 'pizza') {
    return (
      <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col md:flex-row gap-space-lg">
        <Badge item={item} />
        <div className="w-full md:w-48 h-44 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container relative">
          <img className="w-full h-full object-cover" src={assetUrl(item.image)} alt={item.name} />
          {item.imageLabel && (
            <div className="absolute bottom-2 left-2 bg-surface-container-lowest/90 backdrop-blur-xs px-2 py-0.5 rounded text-[11px] font-bold text-primary font-label-sm">
              {item.imageLabel}
            </div>
          )}
        </div>
        <div className="flex-1 flex flex-col justify-between space-y-space-md">
          <div>
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="font-title-lg text-title-lg text-on-surface font-bold">{item.name}</h3>
              <div className="text-right flex-shrink-0">
                <span className="font-price-display text-price-display text-primary font-extrabold">{money(size.price)}</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant block">
                  {cartQty > 0 ? `Current Selection: ${sizeName}` : `Default: ${sizeName}`}
                </span>
              </div>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">{item.description}</p>
          </div>
          {sizeSelector}
          <div className="pt-space-xs flex items-center justify-between flex-wrap gap-space-sm bg-surface-container-low p-space-sm rounded-lg">
            <div className="flex items-center gap-2">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Quantity:</span>
              <QuantityStepper qty={qty} onChange={(value) => setQty(Math.max(1, value))} size="lg" />
              {cartQty > 0 && (
                <span className="font-label-sm text-label-sm text-tertiary font-semibold flex items-center gap-1 ml-1">
                  <Icon name="check_circle" className="text-[16px]" /> In Cart ({cartQty})
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={add}
              className="px-5 py-2 rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-bold shadow-sm transition-all flex items-center gap-1.5"
            >
              <Icon name={cartQty > 0 ? 'shopping_bag' : 'add_shopping_cart'} className="text-[18px]" />
              {cartQty > 0 ? 'Update Order' : 'Add to Order'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'side') {
    return (
      <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-space-md">
        <div className="space-y-space-sm">
          <div className="w-full h-36 rounded-lg overflow-hidden bg-surface-container relative">
            <img className="w-full h-full object-cover" src={assetUrl(item.image)} alt={item.name} />
            {item.badge && (
              <span className={`absolute top-2 left-2 font-label-sm text-label-sm px-2 py-0.5 rounded font-bold ${badgeStyles[item.badgeStyle]}`}>
                {item.badge}
              </span>
            )}
          </div>
          <div className="flex items-baseline justify-between pt-1">
            <div>
              <h3 className="font-title-lg text-title-lg text-on-surface font-bold">{item.name}</h3>
              {item.sublabel && <span className="font-label-sm text-label-sm text-on-surface-variant">{item.sublabel}</span>}
            </div>
            <span className="font-price-display text-price-display text-primary font-extrabold">{money(size.price)}</span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant">{item.description}</p>
          {item.id === 'salad' ? (
            <div className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
              <Icon name="check" className="text-[16px] text-tertiary" /> Standard Entrée Portion • Single Size
            </div>
          ) : (
            sizeSelector
          )}
        </div>
        <div className="bg-surface-container-low p-space-sm rounded-lg flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <QuantityStepper qty={qty} onChange={(value) => setQty(Math.max(1, value))} size="md" />
            {cartQty > 0 && <span className="font-label-sm text-label-sm text-tertiary font-bold ml-1">In Cart ({cartQty})</span>}
          </div>
          <button
            type="button"
            onClick={add}
            className="px-4 py-1.5 rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-sm text-label-sm font-bold shadow-sm transition-colors flex items-center gap-1"
          >
            <Icon name="add" className="text-[16px]" />
            {cartQty > 0 ? 'Update' : 'Add to Order'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-space-sm">
      <div className="space-y-space-xs">
        <div className="w-full h-28 rounded-lg overflow-hidden bg-surface-container relative">
          <img className="w-full h-full object-cover" src={assetUrl(item.image)} alt={item.name} />
          {item.badge && (
            <span className={`absolute top-2 right-2 text-[10px] font-bold px-1.5 py-0.5 rounded ${badgeStyles[item.badgeStyle]}`}>
              {item.badge}
            </span>
          )}
        </div>
        <div className="flex items-baseline justify-between pt-1">
          <div>
            <h3 className="font-title-lg text-title-lg text-on-surface font-bold">{item.name}</h3>
            {item.sublabel && <span className="font-label-sm text-label-sm text-on-surface-variant">{item.sublabel}</span>}
          </div>
          <span className="font-price-display text-price-display text-primary font-extrabold">{money(size.price)}</span>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant">{item.description}</p>
        {item.id === 'water' ? (
          <div className="py-1 px-2 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm text-center">
            Glass Bottle • Single Size {money(size.price)}
          </div>
        ) : (
          sizeSelector
        )}
      </div>
      <div className="bg-surface-container-low p-2 rounded-lg flex items-center justify-between gap-1 mt-2">
        <QuantityStepper qty={qty} onChange={(value) => setQty(Math.max(1, value))} size="sm" />
        <button
          type="button"
          onClick={add}
          className="px-2.5 py-1 rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-sm text-label-sm font-bold shadow-sm"
        >
          {cartQty > 0 ? `Update (${cartQty})` : 'Add'}
        </button>
      </div>
    </div>
  )
}
