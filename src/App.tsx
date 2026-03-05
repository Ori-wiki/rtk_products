import { useMemo, useState } from 'react';
import { App as AntdApp, ConfigProvider, theme } from 'antd';
import { Navigate, Route, Routes } from 'react-router-dom';
import CartModal from './components/cart/CartModal';
import SiteHeader from './components/layout/SiteHeader';
import { ROUTES } from './constants/routes';
import { useAppDispatch, useAppSelector } from './hooks/reduxhook';
import Checkout from './pages/Checkout';
import Favorites from './pages/Favorites';
import ProductDetails from './pages/ProductDetails';
import Products from './pages/Products';
import { getCart } from './store/cart';
import { getThemeMode, toggleTheme } from './store/theme';
import './reset.css';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dispatch = useAppDispatch();
  const cart = useAppSelector(getCart);
  const themeMode = useAppSelector(getThemeMode);
  const isDark = themeMode === 'dark';

  const antdTheme = useMemo(
    () => ({
      algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      token: { colorPrimary: '#1677ff', borderRadius: 10 },
    }),
    [isDark],
  );

  return (
    <ConfigProvider theme={antdTheme}>
      <AntdApp>
        <SiteHeader
          cartCount={cart.totalProducts}
          onOpenCart={() => setIsCartOpen(true)}
          darkMode={isDark}
          onThemeToggle={() => dispatch(toggleTheme())}
        />

        <CartModal open={isCartOpen} cart={cart} onClose={() => setIsCartOpen(false)} />

        <Routes>
          <Route path={ROUTES.root} element={<Navigate to={ROUTES.products} replace />} />
          <Route path={ROUTES.products} element={<Products />} />
          <Route path={ROUTES.productDetails} element={<ProductDetails />} />
          <Route path={ROUTES.favorites} element={<Favorites />} />
          <Route path={ROUTES.checkout} element={<Checkout />} />
        </Routes>
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
