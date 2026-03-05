import React from 'react';
import {
  Button,
  Card,
  Form,
  Input,
  Radio,
  Select,
  Typography,
  message,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import PageContent from '../components/layout/PageContent';
import { ROUTES } from '../constants/routes';
import { useAppDispatch, useAppSelector } from '../hooks/reduxhook';
import { clearCart, getCart } from '../store/cart';

const { Title, Text } = Typography;

type CheckoutValues = {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  payment: 'card' | 'cash' | 'sbp';
  delivery: 'courier' | 'pickup';
};

const Checkout: React.FC = () => {
  const [form] = Form.useForm<CheckoutValues>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cart = useAppSelector(getCart);

  return (
    <PageContent>
      <Title level={3}>Checkout</Title>
      <Card style={{ maxWidth: 720 }}>
        <Text style={{ display: 'block', marginBottom: 16 }}>
          {`Товаров: ${cart.totalQuantity}, сумма: $${cart.total.toFixed(2)}`}
        </Text>
        <Form
          layout='vertical'
          form={form}
          onFinish={() => {
            message.success('Заказ оформлен');
            dispatch(clearCart());
            navigate(ROUTES.products);
          }}
        >
          <Form.Item
            label='ФИО'
            name='fullName'
            rules={[{ required: true, message: 'Введите ФИО' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Email'
            name='email'
            rules={[{ required: true, type: 'email', message: 'Введите корректный email' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Телефон'
            name='phone'
            rules={[{ required: true, message: 'Введите телефон' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Город'
            name='city'
            rules={[{ required: true, message: 'Введите город' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Адрес'
            name='address'
            rules={[{ required: true, message: 'Введите адрес' }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item
            label='Способ доставки'
            name='delivery'
            rules={[{ required: true, message: 'Выберите способ доставки' }]}
          >
            <Select
              options={[
                { value: 'courier', label: 'Курьер' },
                { value: 'pickup', label: 'Самовывоз' },
              ]}
            />
          </Form.Item>
          <Form.Item
            label='Оплата'
            name='payment'
            rules={[{ required: true, message: 'Выберите способ оплаты' }]}
          >
            <Radio.Group>
              <Radio value='card'>Карта</Radio>
              <Radio value='cash'>Наличными</Radio>
              <Radio value='sbp'>СБП</Radio>
            </Radio.Group>
          </Form.Item>
          <Button type='primary' htmlType='submit' disabled={!cart.totalQuantity}>
            Подтвердить заказ
          </Button>
        </Form>
      </Card>
    </PageContent>
  );
};

export default Checkout;
