import React, { useMemo, useState } from 'react';
import {
  Badge,
  Button,
  Drawer,
  Flex,
  Grid,
  Layout,
  Menu,
  Space,
  Switch,
  Typography,
} from 'antd';
import {
  HeartOutlined,
  MenuOutlined,
  MoonOutlined,
  ShoppingCartOutlined,
  SunOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

const { Header } = Layout;
const { Title } = Typography;
const { useBreakpoint } = Grid;

interface SiteHeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  darkMode: boolean;
  onThemeToggle: () => void;
}

const SiteHeader: React.FC<SiteHeaderProps> = ({
  cartCount,
  onOpenCart,
  darkMode,
  onThemeToggle,
}) => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const selectedKey = useMemo(() => {
    if (location.pathname.startsWith(ROUTES.favorites)) return 'favorites';
    if (location.pathname.startsWith(ROUTES.checkout)) return 'checkout';
    return 'products';
  }, [location.pathname]);

  const items = [
    { key: 'products', label: <Link to={ROUTES.products}>Товары</Link> },
    {
      key: 'favorites',
      label: <Link to={ROUTES.favorites}>Избранное</Link>,
      icon: <HeartOutlined />,
    },
    { key: 'checkout', label: <Link to={ROUTES.checkout}>Checkout</Link> },
  ];

  return (
    <Header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingInline: 16,
      }}
    >
      <Flex align='center' gap={16}>
        {isMobile && (
          <Button type='text' icon={<MenuOutlined />} onClick={() => setOpen(true)} />
        )}
        <Title level={4} style={{ margin: 0 }}>
          <Link to={ROUTES.products}>Store</Link>
        </Title>
        {!isMobile && (
          <Menu
            mode='horizontal'
            selectedKeys={[selectedKey]}
            items={items}
            style={{ minWidth: 360, borderBottom: 'none' }}
          />
        )}
      </Flex>

      <Space>
        <Switch
          checked={darkMode}
          onChange={onThemeToggle}
          checkedChildren={<MoonOutlined />}
          unCheckedChildren={<SunOutlined />}
        />
        <Badge count={cartCount} size='small'>
          <Button
            type='text'
            icon={<ShoppingCartOutlined />}
            onClick={onOpenCart}
            aria-label='Открыть корзину'
          >
            {!isMobile && 'Корзина'}
          </Button>
        </Badge>
      </Space>

      <Drawer
        title='Меню'
        placement='left'
        open={open}
        onClose={() => setOpen(false)}
        size='default'
      >
        <Menu
          mode='inline'
          selectedKeys={[selectedKey]}
          items={items}
          onClick={() => setOpen(false)}
        />
      </Drawer>
    </Header>
  );
};

export default SiteHeader;
