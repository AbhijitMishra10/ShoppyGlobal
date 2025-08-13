// Import strict mode to catch common bugs in React
import { StrictMode } from 'react'
// Import root rendering method from React DOM
import { createRoot } from 'react-dom/client'
// Import global styles
import './App.css'
// Import main layout component
import App from './App.jsx'
// Import routing tools
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// Lazy loading and fallback
import { lazy, Suspense } from 'react'
// Redux store setup
import store from './Utils/store.js'
import { Provider } from 'react-redux'
// Lazy-loaded route components
const CheckoutPage = lazy(() => import('./pages/CheckoutPage.jsx'))
const IntroPage = lazy(() => import('./pages/IntroPage.jsx'))
const NotFound = lazy(() => import('./Components/NotFound.jsx'))
const Home = lazy(() => import('./pages/Home.jsx'))
const ProductPage = lazy(() => import('./pages/ProductPage.jsx'))
const CartPage = lazy(() => import('./pages/CartPage.jsx'))
// Define the routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <IntroPage/>
      </Suspense>
    ),
    errorElement: <NotFound/>
  },
  {
    path: '/home',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <App/>
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading Home...</div>}>
            <Home/>
          </Suspense>
        )
      },
      {
        path: 'product/:id',
        element: (
          <Suspense fallback={<div>Loading Product...</div>}>
            <ProductPage/>
          </Suspense>
        )
      },
      {
        path: 'cart',
        element: (
          <Suspense fallback={<div>Loading Cart...</div>}>
            <CartPage/>
          </Suspense>
        )
      },
      {
        path: 'checkout',
        element: (
          <Suspense fallback={<div>Loading Checkout...</div>}>
            <CheckoutPage/>
          </Suspense>
        )
      },
      {
        path: 'Intro',
        element: (
          <Suspense fallback={<div>Loading Intro...</div>}>
            <IntroPage/>
          </Suspense>
        )
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<div>Loading Not Found...</div>}>
            <NotFound/>
          </Suspense>
        )
      }
    ]
  },
])
// Mounting the root app inside #root element
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Provider store={store}>
      <RouterProvider router={router} />
  </Provider>
  </StrictMode>
)
