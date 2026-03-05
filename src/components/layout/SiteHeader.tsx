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
  theme,
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
  const {
    token: { colorBgContainer, colorBorderSecondary },
  } = theme.useToken();
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const isSmallMobile = !screens.sm;
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
    { key: 'checkout', label: <Link to={ROUTES.checkout}>Оформление</Link> },
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
        paddingInline: isSmallMobile ? 8 : 16,
        background: colorBgContainer,
        borderBottom: `1px solid ${colorBorderSecondary}`,
        overflow: 'visible',
      }}
    >
      <Flex align='center' gap={isSmallMobile ? 8 : 16} style={{ minWidth: 0 }}>
        {isMobile && (
          <Button type='text' icon={<MenuOutlined />} onClick={() => setOpen(true)} />
        )}
        <Title level={isSmallMobile ? 5 : 4} style={{ margin: 0, whiteSpace: 'nowrap' }}>
          <Link to={ROUTES.products}>Магазин</Link>
        </Title>
        {!isMobile && (
          <Menu
            className='site-header-menu'
            theme={darkMode ? 'dark' : 'light'}
            mode='horizontal'
            selectedKeys={[selectedKey]}
            items={items}
            style={{ minWidth: 360, borderBottom: 'none', background: 'transparent' }}
          />
        )}
      </Flex>

      <Space size={isSmallMobile ? 4 : 8} style={{ flexShrink: 0 }}>
        <Switch
          size={isSmallMobile ? 'small' : 'default'}
          checked={darkMode}
          onChange={onThemeToggle}
          checkedChildren={<MoonOutlined />}
          unCheckedChildren={<SunOutlined />}
        />
        <Badge
          count={cartCount}
          size='small'
          overflowCount={99}
          offset={isSmallMobile ? [-1, 5] : [-2, 8]}
        >
          <Button
            size={isSmallMobile ? 'small' : 'middle'}
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
          className='site-header-menu'
          theme={darkMode ? 'dark' : 'light'}
          mode='inline'
          selectedKeys={[selectedKey]}
          items={items}
          style={{ background: 'transparent' }}
          onClick={() => setOpen(false)}
        />
      </Drawer>
    </Header>
  );
};

export default SiteHeader;
