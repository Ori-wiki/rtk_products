import React, { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import {
  Button,
  Layout,
  Menu,
  theme,
  Card,
  Col,
  Row,
  Flex,
  Typography,
  Spin,
} from 'antd';
import {
  getProducts,
  getProductsLoadingStatus,
  loadProductsList,
} from '../store/products';
import { useAppDispatch, useAppSelector } from '../hooks/reduxhook';
import { addToCart } from '../store/cart';
const { Meta } = Card;

const { Header, Sider, Content } = Layout;

const Products: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const dispatch = useAppDispatch();
  const products = useAppSelector(getProducts);
  const isLoading = useAppSelector(getProductsLoadingStatus);

  useEffect(() => {
    dispatch(loadProductsList());
  }, [dispatch]);

  return (
    <Layout style={{ width: '100%', minHeight: '100vh', height: '100%' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='demo-logo-vertical' />
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type='text'
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {isLoading ? (
            <Flex
              justify='center'
              align='center'
              style={{ height: '100%', width: '100%' }}
            >
              <Spin size='large' />
            </Flex>
          ) : (
            <Row gutter={[16, 16]} justify='center'>
              {products.map((product) => (
                <Col
                  key={product.id}
                  flex='0 0 280px'
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <Card
                    hoverable
                    style={{
                      width: 280,
                      minWidth: 280,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                    bodyStyle={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                    cover={
                      <img
                        draggable={false}
                        alt={product.title}
                        src={product.thumbnail}
                        style={{ height: '260px', objectFit: 'cover' }}
                      />
                    }
                  >
                    <Meta title={product.title} />
                    <Flex vertical gap={6} style={{ flex: 1, marginTop: 12 }}>
                      <Typography.Text>
                        {product.description.length > 100
                          ? product.description.slice(0, 100) + '...'
                          : product.description}
                      </Typography.Text>
                      <Typography.Text style={{ fontWeight: 'bold' }}>
                        {`$${product.price}`}
                      </Typography.Text>
                      <Button
                        style={{ marginTop: 'auto' }}
                        onClick={() => dispatch(addToCart(product))}
                      >
                        Добавить в корзину
                      </Button>
                    </Flex>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Products;
