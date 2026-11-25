import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Icon from '../components/Icon'
import MenuItemCard from '../components/MenuItemCard'
import OrderSummary from '../components/OrderSummary'
import { menuSections } from '../data/menu'

const tabs = [
  { id: 'pizzas-section', label: 'Pizzas (Stone Baked)', icon: 'local_pizza' },
  { id: 'sides-section', label: 'Appetizers & Sides', icon: 'restaurant' },
  { id: 'drinks-section', label: 'Cold Drinks', icon: 'local_drink' },
]

export default function MenuPage() {
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1))
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [hash])

  return (
    <div className="flex flex-col w-full">
      <div className="w-full bg-surface-container-low py-2.5 px-gutter-desktop">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-md">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm tracking-wide uppercase font-bold shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-surface-bright animate-ping" />
              Live Hearth Oven
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant hidden md:inline">
              Stone deck baking temperature: <span className="font-bold text-on-surface">575°F</span> • Fresh dough rolled every 90 mins
            </span>
          </div>
          <div className="flex items-center gap-space-lg text-on-surface-variant font-label-sm text-label-sm">
            <span className="hidden sm:flex items-center gap-1">
              <Icon name="timer" className="text-[16px] text-tertiary" /> Ready in ~20–25 mins
            </span>
            <span className="hidden lg:flex items-center gap-1">
              <Icon name="local_pizza" className="text-[16px] text-secondary" /> Counter Pickup or West Village Delivery
            </span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-gutter-desktop py-space-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
          <div className="lg:col-span-8 space-y-space-xl">
            <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-wrap items-center justify-between gap-space-md">
              <div className="flex items-center gap-space-xs overflow-x-auto pb-1 sm:pb-0">
                {tabs.map((tab, index) => (
                  <a
                    key={tab.id}
                    href={`#${tab.id}`}
                    className={`px-4 py-2 rounded-full font-label-md text-label-md flex items-center gap-1.5 flex-shrink-0 ${
                      index === 0
                        ? 'bg-primary text-on-primary shadow-sm'
                        : 'bg-surface-container-high text-on-surface hover:bg-surface-variant transition-colors'
                    }`}
                  >
                    <Icon name={tab.icon} className="text-[18px]" />
                    {tab.label}
                  </a>
                ))}
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
                <span className="w-2 h-2 rounded-full bg-tertiary" />
                All 8 Menu Items In Stock Today
              </div>
            </div>

            {menuSections.map((section) => (
              <section key={section.id} id={section.id} className="space-y-space-md scroll-mt-32">
                <div className="flex items-end justify-between gap-space-md">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-label-sm text-label-sm text-primary font-bold tracking-widest uppercase">
                        {section.eyebrow}
                      </span>
                      {section.id === 'pizzas-section' && (
                        <>
                          <span className="text-on-surface-variant">•</span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">Carmine Street Oven</span>
                        </>
                      )}
                    </div>
                    <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">{section.title}</h2>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant flex-shrink-0">{section.aside}</span>
                </div>

                <div
                  className={
                    section.cardStyle === 'pizza'
                      ? 'grid grid-cols-1 gap-space-lg'
                      : section.cardStyle === 'side'
                        ? 'grid grid-cols-1 md:grid-cols-2 gap-space-lg'
                        : 'grid grid-cols-1 md:grid-cols-3 gap-space-md'
                  }
                >
                  {section.items.map((item) => (
                    <MenuItemCard key={item.id} item={item} variant={section.cardStyle} />
                  ))}
                </div>
              </section>
            ))}
          </div>

          <OrderSummary />
        </div>
      </div>
    </div>
  )
}
