import Icon from './Icon'

const sizes = {
  lg: {
    button: 'w-7 h-7 text-[16px]',
    value: 'w-8 text-title-lg',
    icon: 'text-[16px]',
    padding: 'p-1',
  },
  md: {
    button: 'w-6 h-6 text-[14px]',
    value: 'w-6 text-title-lg',
    icon: 'text-[14px]',
    padding: 'p-0.5',
  },
  sm: {
    button: 'w-5 h-5 text-[12px]',
    value: 'w-6 text-label-md',
    icon: 'text-[12px]',
    padding: 'p-0.5',
  },
}

export default function QuantityStepper({ qty, onChange, size = 'lg' }) {
  const s = sizes[size]
  return (
    <div className={`inline-flex items-center bg-surface-container-lowest rounded-full ${s.padding} shadow-sm`}>
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(qty - 1)}
        className={`${s.button} rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface flex items-center justify-center font-bold transition-transform active:scale-95`}
      >
        <Icon name="remove" className={s.icon} />
      </button>
      <span className={`${s.value} text-center font-bold text-on-surface tabular-nums`}>{qty}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(qty + 1)}
        className={`${s.button} rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface flex items-center justify-center font-bold transition-transform active:scale-95`}
      >
        <Icon name="add" className={s.icon} />
      </button>
    </div>
  )
}
