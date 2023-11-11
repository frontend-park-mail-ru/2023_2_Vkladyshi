import { Component } from '@components/component';
import * as templateFilmSelection from '@components/FilmSelection/filmSelection.hbs';

/**
 * Класс рендеринга формирования подборки фильмов
 * @class FilmCard
 * @typedef {FilmCard}
 */
export class FilmCard extends Component {
    /**
     * Метод рендеринга элемента
     * @param response
     * @return {string}
     */
    render (response) {
        return templateFilmSelection(response);
    }
}
