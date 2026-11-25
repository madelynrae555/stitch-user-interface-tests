import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { CartProvider } from './context/CartContext'
import CheckoutPage from './pages/CheckoutPage'
import MenuPage from './pages/MenuPage'

export default function App() {
  // GitHub Pages serves this project from a subfolder, so the router needs to
  // know that folder when it builds the web address for each page.
  const basename =
    import.meta.env.BASE_URL === '/'
      ? undefined
      : import.meta.env.BASE_URL.replace(/\/$/, '')

  return (
    <BrowserRouter basename={basename}>
      <CartProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<MenuPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}
