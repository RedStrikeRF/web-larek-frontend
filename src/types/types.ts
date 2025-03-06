/**
 * Тип для товара
 * @property {string} id - Уникальный ID товара
 * @property {string} title - Название товара
 * @property {string} description - Описание товара
 * @property {string} category - Категория товара
 * @property {number | null} price - Цена товара (может быть null, если цена отсутствует)
 * @property {string} img - URL изображения товара
 */
export type Item = {
  id: string,
  title: string,
  description: string,
  category: string,
  price: number | null,
  img: string,
};

/**
 * Тип для списка товаров
 * @property {Item[]} items - Список товаров, поступающих с сервера
 * @property {number} count - Кол-во товаров поступившее с сервера
 */
export type ItemsList = {
  count: number,
  items: Item[]
};

/**
 * Тип для формы заказа
 * @property {string} phone - Номер телефона покупателя
 * @property {string} email - Электронная почта покупателя
 * @property {string} payment - Способ оплаты
 * @property {string} address - Адрес доставки
 * @property {string | number} total - Итоговая сумма заказа
 * @property {string[]} items - Список ID товаров в заказе
 */
export type OrderForm = {
  phone: string,
  email: string,
  payment: string,
  address: string,
  total: string | number,
  items: string[],
};

/**
 * Тип для элемента корзины
 * @property {string} id - Уникальный ID товара в корзине
 * @property {string} title - Название товара
 * @property {number} count - Количество товара в корзине
 * @property {number | null} price - Цена товара (может быть null, если цена отсутствует)
 */
export type BasketItem = {
  id: string,
  title: string,
  count: number,
  price: number | null,
};
