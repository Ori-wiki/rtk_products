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
} from 'antd';
const { Meta } = Card;

interface Product {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
}

const { Header, Sider, Content } = Layout;

const Products: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [products, setProducts] = useState<Product[]>([]);

  console.log(products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://dummyjson.com/products');
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Ошибка при загрузке продуктов:', error);
      }
    };

    fetchProducts();
  }, []);

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
          <Row gutter={[16, 16]}>
            {products.map((product) => (
              <Col span={4} key={product.id}>
                <Card
                  hoverable
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  cover={
                    <img
                      draggable={false}
                      alt={product.title}
                      src={product.thumbnail}
                    />
                  }
                >
                  <Meta
                    title={product.title}
                    description={
                      <Flex
                        vertical
                        gap={8}
                        justify='space-between'
                        style={{ minHeight: '120px' }}
                      >
                        <Typography.Text>
                          {product.description.length > 100
                            ? product.description.slice(0, 100) + '...'
                            : product.description}
                        </Typography.Text>
                        <Typography.Text
                          style={{ fontWeight: 'bold' }}
                        >{`$${product.price}`}</Typography.Text>
                      </Flex>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Products;
