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

// interface favoriteActors {
//   page: number;
//   per_page: number;
// }

interface favoriteFilm {
  film_id: number;
}

interface favoriteActor {
  actor_id: number;
}

// interface auth {
//   status: number,
//   login: string
// }

// interface userComments {
//   file: any;
// }
