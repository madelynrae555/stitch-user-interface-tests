import { Outlet, useLocation } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

export default function Layout() {
  const { pathname } = useLocation()
  const step = pathname === '/checkout' ? 'checkout' : 'menu'

  return (
    <>
      <Header step={step} />
      <main className="w-full pt-[6.5rem] flex-grow bg-background">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
