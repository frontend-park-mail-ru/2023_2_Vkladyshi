/**
 * Класс родитель всех компонентов
 * @class Component
 * @typedef {Component}
 */
export class Component {
  private rootNode: Element;
  /**
   * Конструктор для формирования родительского элемента
   * @class
   */
  constructor(ROOT) {
    this.rootNode = ROOT;
  }
}
