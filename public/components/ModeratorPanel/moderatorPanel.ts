import { Component } from '@components/component';
import * as templateModeratorPanel from '@components/ModeratorPanel/moderatorPanel.hbs';

/**
 * Класс создания modal
 * @class ModeratorPanel
 * @typedef {ModeratorPanel}
 */
export class ModeratorPanel extends Component {
  /**
   * Метод для рендеринга HTML кода
   * @return {string} html нижней панели
   */
  render () {
    return templateModeratorPanel();
  }
}
