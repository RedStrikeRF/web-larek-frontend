import { Item } from "../../types/types";
import { EventEmitter } from "../base/events";

/**
 * Интерфейс для модели каталога товаров.
 * @interface IItemsModel
 * @property {Item[] | null} items - Список товаров в каталоге.
 * @method updateItems - Обновляет список товаров в каталоге.
 * @param {Item[]} items - Новый список товаров для обновления.
 * @method findItemById - Ищет товар по его ID в каталоге.
 * @param {string} id - ID товара, который нужно найти.
 * @returns {Item | undefined} - Найденный товар или undefined, если товар не найден.
 */
interface IItemsModel {
  items: Item[] | null,
  updateItems(items: Item[]): void,
  findItemById(id: string): Item | undefined
}

/**
 * Класс для управления каталогом товаров.
 * @class CatalogModel
 * @implements {IItemsModel}
 */
export class CatalogModel implements IItemsModel {
  items: Item[] | null = null;
  private _emitter: EventEmitter | null = null;

  /**
   * Создаёт экземпляр модели каталога товаров.
   * @param {EventEmitter} events - Эмиттер событий для уведомлений об изменениях в каталоге.
   */
  constructor(events: EventEmitter) {
    this._emitter = events;
  }

  /**
   * Обновляет список товаров в каталоге и эмитирует событие изменения.
   * @param {Item[]} items - Новый список товаров для обновления.
   */
  updateItems(items: Item[]): void {
    this.items = items;
    this._emitter?.emit("catalog:change", items);
  }

  /**
   * Ищет товар по его ID в каталоге.
   * @param {string} id - ID товара, который нужно найти.
   * @returns {Item | undefined} - Найденный товар или undefined, если товар не найден.
   */
  findItemById(id: string): Item | undefined {
    return this.items?.find((item: Item) => item.id === id);
  }
}
