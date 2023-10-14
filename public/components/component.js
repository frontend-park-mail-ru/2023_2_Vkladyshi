import { ROOT } from '../utils/config.js';

/**
 * Класс родитель всех компонентов
 * @class Component
 * @typedef {Component}
 */
export class Component {
  /**
   * Конструктор для формирония родительского элемента
   * @class
   */
  constructor() {
    this.rootNode = ROOT;
  }
}
