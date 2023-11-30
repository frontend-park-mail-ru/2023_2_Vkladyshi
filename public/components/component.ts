/**
 * Класс родитель всех компонентов
 * @class Component
 * @typedef {Component}
 */
export class Component {
  protected readonly rootNode;
  /**
   * Конструктор для формирования родительского элемента
   * @param ROOT
   * @class
   */
  constructor (ROOT) {
    this.rootNode = ROOT;
  }
}
