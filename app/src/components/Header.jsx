import { useState } from 'react'
import { Link } from 'react-router-dom'
import { customer, restaurant } from '../data/menu'
import { assetUrl } from '../utils/assets'
import Icon from './Icon'

const navLinks = [
  { label: 'Pies & Slices', to: '/#pizzas-section', path: 'menu' },
  { label: 'Appetizers & Sides', to: '/#sides-section', path: 'appetizers-and-sides' },
  { label: 'Drinks & Sweets', to: '/#drinks-section', path: 'drinks-and-desserts' },
  { label: 'Catering', to: '/#site-footer', path: 'catering-and-events' },
  { label: 'Our Story', to: '/#site-footer', path: 'our-story' },
]

export default function Header({ step = 'menu' }) {
  const [accountOpen, setAccountOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-md shadow-[0_2px_12px_rgba(43,38,35,0.06)]">
      <div className="bg-surface-container-low px-gutter-desktop py-1 flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
        <div className="flex items-center gap-space-lg">
          <span className="flex items-center gap-space-xs font-label-sm text-label-sm text-tertiary font-bold">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
            Open Now • 11:00 AM – 10:00 PM
          </span>
          <span className="hidden sm:inline font-body-sm text-body-sm text-on-surface-variant">
            412 Carmine St, West Village, NY
          </span>
        </div>
        <div className="flex items-center gap-space-md">
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            Direct Order Phone:
          </span>
          <a
            href={`tel:${restaurant.phone}`}
            className="font-label-md text-label-md text-primary font-bold hover:underline"
          >
            {restaurant.phone}
          </a>
        </div>
      </div>

      <div className="h-20 w-full px-gutter-desktop flex items-center justify-between gap-space-lg">
        <Link to="/" className="flex items-center gap-space-md flex-shrink-0">
          <img alt="Rae's Pizza Logo" className="h-8 w-auto object-contain" src={assetUrl('/images/raes-logo.svg')} />
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-primary tracking-tight font-bold leading-none">
              Rae's Pizza
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant tracking-wider uppercase mt-1">
              Classic Pizzeria • Handmade Daily
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-space-md">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.to}
              className={`font-label-md text-label-md px-space-sm py-space-xs transition-colors ${
                step === 'menu' && link.path === 'menu'
                  ? 'bg-primary-container text-on-primary-container font-bold rounded-full px-space-md'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-space-md flex-shrink-0">
          <div className="hidden md:flex items-center bg-surface-container rounded-full p-1 gap-space-xs">
            <Link
              to="/"
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-label-sm text-label-sm ${
                step === 'menu'
                  ? 'bg-primary text-on-primary'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full flex items-center justify-center font-bold text-[10px] ${
                  step === 'menu' ? 'bg-on-primary text-primary' : 'bg-surface-container-high text-on-surface-variant'
                }`}
              >
                1
              </span>
              Menu &amp; Order
            </Link>
            <Link
              to="/checkout"
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-label-sm text-label-sm ${
                step === 'checkout'
                  ? 'bg-primary text-on-primary'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full flex items-center justify-center font-bold text-[10px] ${
                  step === 'checkout' ? 'bg-on-primary text-primary' : 'bg-surface-container-high text-on-surface-variant'
                }`}
              >
                2
              </span>
              Ready to Pay
            </Link>
          </div>
          <div className="relative">
            <button
              type="button"
              aria-label="Account details"
              onClick={() => setAccountOpen((open) => !open)}
              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-primary-container transition-colors"
            >
              <Icon name="person" className="text-on-primary text-[18px]" />
            </button>
            {accountOpen && (
              <div className="absolute right-0 top-10 w-64 bg-surface-container-lowest rounded-xl p-space-md shadow-xl border border-outline-variant z-50">
                <p className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                  Your details
                </p>
                <p className="font-title-lg text-title-lg font-bold text-on-surface mt-1">{customer.name}</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">{customer.email}</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">{customer.phone}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
