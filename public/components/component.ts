/**
 * Класс родитель всех компонентов
 * @class Component
 * @typedef {Component}
 */
export class Component {
  private readonly rootNode;
  /**
   * Конструктор для формирования родительского элемента
   * @param ROOT
   * @class
   */
  constructor (ROOT) {
    this.rootNode = ROOT
  }
}
