export const setUser = (user: user) => ({
  type: 'setUser',
  value: user
})

export const actionAuth = (isAuth = false) => ({
  type: 'auth'
})

export const actionLogout = () => ({
  type: 'logout'
})

export const actionSignin = (user: user) => ({
  type: 'signin',
  value: user
})

export const actionSignup = (user: user) => ({
  type: 'signup',
  value: user
})

export const actionCollectionMain = (params: collectionParams) => ({
  type: 'collectionMain',
  value: params
})

export const actionCollectionMenu = (params: collectionParams) => ({
  type: 'collectionMenu',
  value: params
})
