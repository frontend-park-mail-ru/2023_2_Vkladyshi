import { View } from '@views/view';
import { store } from '@store/store';
import { Statistics } from '@components/Statistics/statistics';
import { actionStatistics } from '@store/action/actionTemplates';

export interface AdminPage {
  state: {};
}

/**
 * Класс формирование страницы админки
 * @class AdminPage
 * @typedef {AdminPage}
 */
export class AdminPage extends View {
  private popupEvent: (event) => void;

  /**
   * Конструктор класса
   * @param ROOT
   */
  constructor(ROOT) {
    super(ROOT);
    this.state = {};
  }

  /**
   * Метод создания страницы
   */
  render() {
    this.renderDefaultPage();
    const contentBlock = document.querySelector('.content-block');
    const stat = new Statistics();
    contentBlock?.insertAdjacentHTML('afterbegin', stat.render());
    store.dispatch(actionStatistics()).then(() => {
      this.componentDidMount();
    });
  }

  componentDidMount() {
    // const itemElement = document.querySelector('.item') as HTMLElement;
    // itemElement.style.setProperty('--val', 'новое значение');
    const result = store.getState('getStatistics');
    if (result?.status !== 200) {
      return;
    }

    const div1 = document.querySelector('div[data-section="1"]') as HTMLElement;
    const div2 = document.querySelector('div[data-section="2"]') as HTMLElement;
    const div3 = document.querySelector('div[data-section="3"]') as HTMLElement;
    const div4 = document.querySelector('div[data-section="4"]') as HTMLElement;
    const div5 = document.querySelector('div[data-section="5"]') as HTMLElement;
    const div6 = document.querySelector('div[data-section="6"]') as HTMLElement;
    const div7 = document.querySelector('div[data-section="7"]') as HTMLElement;
    const div8 = document.querySelector('div[data-section="8"]') as HTMLElement;
    const div9 = document.querySelector('div[data-section="9"]') as HTMLElement;
    const div10 = document.querySelector(
      'div[data-section="10"]'
    ) as HTMLElement;

    // Заданное значение number
    // Get an array of all the div elements
    const divElements = [
      div1,
      div2,
      div3,
      div4,
      div5,
      div6,
      div7,
      div8,
      div9,
      div10,
    ];

    // Iterate through the div elements and assign the count values
    divElements.forEach((div, index) => {
      const count = index + 1; // Calculate the count value based on the index
      const targetObject = result.body.statistics.find(
        (obj) => obj.number === count
      );
      const targetCount = targetObject ? targetObject.count : null;
      div.style.setProperty('--val', `${targetCount}`);
      div.querySelector('.value')!.textContent = `${targetCount}`;
    });
  }

  componentWillUnmount() {}
}
