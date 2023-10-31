declare module '*.hbs' {
  const _: Function
  export default _
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
