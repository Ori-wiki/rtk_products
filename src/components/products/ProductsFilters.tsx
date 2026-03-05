import React from 'react';
import { Button, Input, Select, Slider, Space } from 'antd';
import type { ProductSort } from '../../features/products/catalog';

interface ProductsFiltersProps {
  search: string;
  category: string;
  sort: ProductSort;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  categories: string[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: ProductSort) => void;
  onPriceChange: (value: [number, number]) => void;
  onMinRatingChange: (value: number) => void;
  onReset: () => void;
}

const ProductsFilters: React.FC<ProductsFiltersProps> = ({
  search,
  category,
  sort,
  minPrice,
  maxPrice,
  minRating,
  categories,
  onSearchChange,
  onCategoryChange,
  onSortChange,
  onPriceChange,
  onMinRatingChange,
  onReset,
}) => {
  return (
    <Space orientation='vertical' size='middle' style={{ width: '100%', marginBottom: 16 }}>
      <Space wrap>
        <Input.Search
          allowClear
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder='Поиск по названию и описанию'
          style={{ width: 280 }}
        />
        <Select
          value={category}
          onChange={onCategoryChange}
          style={{ width: 200 }}
          options={[
            { label: 'Все категории', value: 'all' },
            ...categories.map((item) => ({ label: item, value: item })),
          ]}
        />
        <Select
          value={sort}
          onChange={onSortChange}
          style={{ width: 220 }}
          options={[
            { label: 'Сначала популярные', value: 'popularity_desc' },
            { label: 'Цена: сначала дешевле', value: 'price_asc' },
            { label: 'Цена: сначала дороже', value: 'price_desc' },
            { label: 'Новизна (по id)', value: 'newest' },
          ]}
        />
        <Select
          value={minRating}
          onChange={onMinRatingChange}
          style={{ width: 180 }}
          options={[
            { label: 'Рейтинг: любой', value: 0 },
            { label: 'От 1+', value: 1 },
            { label: 'От 2+', value: 2 },
            { label: 'От 3+', value: 3 },
            { label: 'От 4+', value: 4 },
          ]}
        />
        <Button onClick={onReset}>Сбросить</Button>
      </Space>

      <Space orientation='vertical' style={{ width: 320 }}>
        <span>{`Цена: $${minPrice} - $${maxPrice}`}</span>
        <Slider
          range
          min={0}
          max={2000}
          step={10}
          value={[minPrice, maxPrice]}
          onChange={(value) => onPriceChange(value as [number, number])}
        />
      </Space>
    </Space>
  );
};

export default ProductsFilters;
