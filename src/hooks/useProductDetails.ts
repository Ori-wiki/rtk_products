import { useEffect, useState } from 'react';
import type { IProduct, IReview } from '../store/products';

export interface ProductDetailsResponse extends IProduct {
  reviews?: IReview[];
}

export const useProductDetails = (
  productId: number,
  fallbackProduct: IProduct | undefined,
) => {
  const [product, setProduct] = useState<ProductDetailsResponse | null>(
    fallbackProduct ? { ...fallbackProduct, reviews: [] } : null,
  );
  const [loading, setLoading] = useState(!fallbackProduct);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (!Number.isFinite(productId)) return;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://dummyjson.com/products/${productId}`);
        if (!res.ok) throw new Error('Не удалось загрузить карточку товара');
        const data = (await res.json()) as ProductDetailsResponse;
        if (!cancelled) setProduct(data);
      } catch (e) {
        if (!cancelled) setError((e as Error).message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [productId]);

  return { product, loading, error };
};
