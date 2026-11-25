import { restaurant } from '../data/menu'
import Icon from './Icon'

export default function Footer() {
  return (
    <footer
      id="site-footer"
      className="w-full bg-surface-container-low shadow-[0_-2px_12px_rgba(43,38,35,0.04)] mt-space-xl"
    >
      <div className="w-full max-w-[1400px] mx-auto px-gutter-desktop py-space-xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-space-xl">
          <div className="space-y-space-sm">
            <span className="font-headline-sm text-headline-sm text-primary font-bold block">
              Rae's Pizza
            </span>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Old-school hearth-baked pizza crafted with stone-ground flour, sweet San Marzano sauce, and whole-milk mozzarella.
            </p>
            <p className="font-label-sm text-label-sm text-tertiary font-bold pt-space-xs">
              EST. 1974 • NEIGHBORHOOD PRIDE
            </p>
          </div>
          <div className="space-y-space-sm">
            <span className="font-title-lg text-title-lg text-on-surface font-semibold block">
              Pizzeria &amp; Pickup
            </span>
            <p className="font-body-md text-body-md text-on-surface-variant">
              412 Carmine Street
              <br />
              West Village, New York, NY 10014
            </p>
            <p className="font-body-sm text-body-sm text-on-surface-variant pt-space-xs">
              Pick-up station at counter window.
              <br />
              Curb-side dispatch available.
            </p>
          </div>
          <div className="space-y-space-sm">
            <span className="font-title-lg text-title-lg text-on-surface font-semibold block">
              Kitchen Hours
            </span>
            <ul className="font-body-md text-body-md text-on-surface-variant space-y-1">
              <li><span className="font-bold text-on-surface">Mon – Thu:</span> 11:00 AM – 10:00 PM</li>
              <li><span className="font-bold text-on-surface">Fri – Sat:</span> 11:00 AM – 11:30 PM</li>
              <li><span className="font-bold text-on-surface">Sunday:</span> 12:00 PM – 9:30 PM</li>
            </ul>
          </div>
          <div className="space-y-space-sm">
            <span className="font-title-lg text-title-lg text-on-surface font-semibold block">
              Quick Help
            </span>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Order Status &amp; Inquiries:
            </p>
            <a
              href={`tel:${restaurant.phone}`}
              className="font-headline-sm text-headline-sm text-primary font-bold hover:underline block"
            >
              {restaurant.phone}
            </a>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Delivery via in-house messengers within 2.5 miles.
            </p>
          </div>
        </div>
        <div className="pt-space-lg mt-space-lg flex flex-col sm:flex-row items-center justify-between text-on-surface-variant font-label-sm text-label-sm gap-space-sm">
          <p>© 2024 Rae's Pizza LLC. All traditional rights reserved.</p>
          <div className="flex items-center gap-space-lg">
            <Icon name="verified_user" className="text-tertiary text-[16px]" />
            <a href="#site-footer" className="hover:text-primary transition-colors">Privacy Notice</a>
            <a href="#site-footer" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#site-footer" className="hover:text-primary transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
