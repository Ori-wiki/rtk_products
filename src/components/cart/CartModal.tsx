import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Divider, Empty, Flex, Modal, Space, Tag, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { useAppDispatch } from '../../hooks/reduxhook';
import {
  clearCart,
  decrementCartItem,
  incrementCartItem,
  removeFromCart,
  type ICart,
} from '../../store/cart';

const { Text, Title } = Typography;

interface CartModalProps {
  open: boolean;
  cart: ICart;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ open, cart, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <Modal
      title={<Title level={4}>Корзина</Title>}
      open={open}
      onCancel={onClose}
      footer={[
        <Button key='close' onClick={onClose}>
          Закрыть
        </Button>,
        <Button
          key='checkout'
          type='primary'
          onClick={() => {
            onClose();
            navigate(ROUTES.checkout);
          }}
          disabled={!cart.totalProducts}
        >
          Перейти к оформлению
        </Button>,
      ]}
      width={680}
    >
      {cart.products.length > 0 ? (
        <Flex vertical gap={12}>
          {cart.products.map((product) => (
            <Flex
              key={product.id}
              justify='space-between'
              align='center'
              style={{ padding: 12, border: '1px solid #f0f0f0', borderRadius: 8 }}
            >
              <Flex vertical style={{ flex: 1 }}>
                <Text strong>{product.title}</Text>
                <Text type='secondary'>{`$${product.price} x ${product.quantity}`}</Text>
              </Flex>
              <Space>
                <Button onClick={() => dispatch(decrementCartItem(product.id))}>-</Button>
                <Tag color='processing'>{product.quantity}</Tag>
                <Button onClick={() => dispatch(incrementCartItem(product.id))}>+</Button>
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => dispatch(removeFromCart(product.id))}
                />
              </Space>
            </Flex>
          ))}
          <Divider />
          <Flex justify='space-between' align='center'>
            <Text strong>Итого:</Text>
            <Text strong style={{ fontSize: 18 }}>
              ${cart.total.toFixed(2)}
            </Text>
          </Flex>
          <Button danger type='link' onClick={() => dispatch(clearCart())} style={{ padding: 0 }}>
            Очистить корзину
          </Button>
        </Flex>
      ) : (
        <Empty description='Ваша корзина пуста' />
      )}
    </Modal>
  );
};

export default CartModal;
