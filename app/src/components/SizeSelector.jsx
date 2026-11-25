import { money } from '../context/CartContext'

const styles = {
  pizza: {
    wrapper: 'flex items-center gap-2 flex-wrap',
    inactive: 'px-3 py-1.5 rounded-full font-label-md text-label-md bg-surface-container text-on-surface hover:bg-surface-container-high transition-all',
    active: 'px-4 py-1.5 rounded-full font-label-md text-label-md bg-inverse-surface text-inverse-on-surface shadow-sm font-bold transition-all scale-[1.02]',
  },
  side: {
    wrapper: 'flex items-center gap-2',
    inactive: 'px-3 py-1 rounded-full font-label-md text-label-md bg-surface-container text-on-surface hover:bg-surface-container-high transition-all',
    active: 'px-3.5 py-1 rounded-full font-label-md text-label-md bg-inverse-surface text-inverse-on-surface shadow-sm font-bold transition-all scale-[1.02]',
  },
  drink: {
    wrapper: 'grid grid-cols-3 gap-1',
    inactive: 'py-1 px-1 text-center rounded font-label-sm text-label-sm bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors',
    active: 'py-1 px-1 text-center rounded font-label-sm text-label-sm bg-inverse-surface text-inverse-on-surface font-bold shadow-sm',
  },
}

export default function SizeSelector({ sizes, selected, onChange, variant = 'pizza', label }) {
  const s = styles[variant]
  return (
    <div className="space-y-1.5">
      {label && (
        <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
          {label}
        </span>
      )}
      <div className={s.wrapper}>
        {sizes.map((size) => {
          const isActive = size.name === selected
          return (
            <button
              key={size.name}
              type="button"
              onClick={() => onChange(size.name)}
              className={isActive ? s.active : s.inactive}
              aria-pressed={isActive}
            >
              {variant === 'drink' ? (
                `${size.name} $${size.price.toFixed(0)}`
              ) : (
                <>
                  {size.name}
                  <span className={`font-bold ml-1 ${isActive ? 'text-secondary-fixed' : ''}`}>
                    {money(size.price)}
                  </span>
                </>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
