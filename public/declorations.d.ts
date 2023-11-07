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
  collection_id?: string;
}

interface actor {
  actorName?: string;
}

interface film {
  filmId?: number;
}

interface settings {
  file: any;
}
interface putSettings {
  file: any;
}

interface paginator {
  page: number;
  per_page: number;
}

// interface userComments {
//   file: any;
// }
