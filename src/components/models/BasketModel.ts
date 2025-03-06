import { BasketItem } from "../../types/types";
import { EventEmitter } from "../base/events";


/**
 * Интерфейс для модели корзины
 * @interface IBasketModel
 * @property {Map<string, BasketItem>} items - Коллекция товаров в корзине, где ключ - ID товара, а значение - объект товара
 * @method push - Добавляет товар в корзину
 * @param {BasketItem} item - Товар для добавления
 * @method remove - Удаляет товар из корзины по ID
 * @param {string} id - ID товара
 * @method clear - Очищает корзину
 * @method getItems - Возвращает текущий список товаров в корзине
 * @returns {BasketItem[]} Массив товаров
 */
interface IBasketModel {
  items: Map<string, BasketItem>,
  push(item: BasketItem): void,
  remove(id: string): void,
  clear(): void,
  getItems(): BasketItem[]
}

/**
 * Класс для управления корзиной товаров
 * @class BasketModel
 * @implements {IBasketModel}
 */
export class BasketModel implements IBasketModel {
  items: Map<string, BasketItem> = new Map();
  private _emitter: EventEmitter | null = null;

  /**
   * Создаёт экземпляр модели корзины.
   * @param {EventEmitter} [emitter] - Эмиттер событий для уведомлений об изменениях в корзине.
   */
  constructor(emitter?: EventEmitter) {
    if (emitter) {
      this._emitter = emitter;
    }
  }

  /**
   * Добавляет товар в корзину
   * @param {BasketItem} item - Товар для добавления
   */
  push(item: BasketItem): void {
    const key = item.id.toString();

    if (this.items.has(key)) {
      const existingItem = this.items.get(key)!;
      existingItem.count += item.count;
      this.items.set(key, existingItem);
    } else {
      this.items.set(key, { ...item });
    }

    this._emitter.emit("basket:change", { items: this.getItems() });
  }

  /**
   * Удаляет товар из корзины по ID
   * @param {string} id - ID товара
   */
  remove(id: string): void {
    this.items.delete(id);
    this._emitter.emit("basket:change", { items: this.getItems() });
  }

  /**
   * Очищает корзину
   */
  clear(): void {
    this.items.clear();
    this._emitter.emit("basket:clear");
  }

  /**
   * Возвращает текущий список товаров в корзине
   * @returns {BasketItem[]} Массив товаров
   */
  getItems(): BasketItem[] {
    return Array.from(this.items.values());
  }
}