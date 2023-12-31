declare module '*.hbs' {
  const _: Function;
  export default _;
}

interface anyObject {
  [key: string]: any;
}

interface user extends anyObject {
  login: string;
  password: string;
  email?: string;
}

interface collectionParams {
  // key: string,
  // countFilms: number,
  collection_id?: number;
}

interface actor {
  actorName?: string;
}

interface film {
  filmId?: number;
}

interface settings {
  file: FormData;
}
interface putSettings {
  file: any;
}

interface paginator {
  page: number;
  per_page: number;
}

interface paginatorFilm {
  film_id: number;
  page: number;
  per_page: number;
}

interface addComment {
  film_id: number;
  rating: number;
  text: string;
}

interface paginator {
  page: number;
  per_page: number;
}

interface favoriteFilm {
  film_id: number;
}

interface favoriteActor {
  actor_id: number;
}

interface searchFilm {
  title: string;
  genre: any;
  ratingFrom: number;
  ratingTo: number;
  mpaa: any;
  dateFrom: string;
  dateTo: string;
  actors: any;
  page: number;
  per_page: number;
}

interface searchActor {
  name: string;
  amplua: any;
  county: string;
  birthday: string;
  films: any;
  page: number;
  per_page: number;
}

interface newFilm {
  title: string;
  filmInfo: string;
  genre: any;
  actors: any;
  date: string;
}

interface filmNotifPayload {
  id: number;
  poster_ver: string;
  name: string;
  rating: number;
  ticket: string;
  prod_date: string;
}

interface SubscribeCalendar {
  login: string;
  subscribeFilmID: number;
}

interface updateRole {
  login: string;
  role: string;
}

interface removeComment {
  user_id: number;
  film_id: number;
  deleteFromServiceFilms: boolean;
}

interface searchModerUser {
  login: string;
  role: string;
  page: number;
  per_page: number;
}
