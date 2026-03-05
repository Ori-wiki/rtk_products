import { expect, test } from '@playwright/test';

test('user can add product and go to checkout', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
  });

  await page.route('**/products?limit=100', async (route) => {
    await route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({
        products: [
          {
            id: 1,
            title: 'Test Phone',
            price: 100,
            discountPercentage: 10,
            rating: 4.8,
            stock: 12,
            category: 'smartphones',
            thumbnail: 'https://cdn.dummyjson.com/product-images/1/thumbnail.jpg',
            images: ['https://cdn.dummyjson.com/product-images/1/1.jpg'],
            description: 'Test description',
          },
        ],
      }),
    });
  });

  await page.goto('/products');

  await expect(page.getByPlaceholder('Поиск по названию и описанию')).toBeVisible();
  await page.getByRole('button', { name: 'В корзину' }).first().click();
  await page.getByRole('button', { name: 'Открыть корзину' }).click();
  await expect(page.getByText('Итого:')).toBeVisible();
  await page.getByRole('button', { name: 'Перейти к checkout' }).click();
  await expect(page).toHaveURL(/\/checkout/);
  await expect(page.getByRole('heading', { name: 'Checkout' })).toBeVisible();
});
