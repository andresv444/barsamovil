import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  listOfPriceRequest: ['listOfPriceId'],
  listOfPriceAllRequest: ['options'],
  listOfPriceUpdateRequest: ['listOfPrice'],
  listOfPriceDeleteRequest: ['listOfPriceId'],

  listOfPriceSuccess: ['listOfPrice'],
  listOfPriceAllSuccess: ['listOfPrices', 'headers'],
  listOfPriceUpdateSuccess: ['listOfPrice'],
  listOfPriceDeleteSuccess: [],

  listOfPriceFailure: ['error'],
  listOfPriceAllFailure: ['error'],
  listOfPriceUpdateFailure: ['error'],
  listOfPriceDeleteFailure: ['error'],

  listOfPriceReset: [],
})

export const ListOfPriceTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  deleting: null,
  listOfPrice: null,
  listOfPrices: [],
  errorOne: null,
  errorAll: null,
  errorUpdating: null,
  errorDeleting: null,
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({
    fetchingOne: true,
    errorOne: false,
    listOfPrice: null,
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    errorAll: false,
  })

// request to update from an api
export const updateRequest = (state) =>
  state.merge({
    updating: true,
  })
// request to delete from an api
export const deleteRequest = (state) =>
  state.merge({
    deleting: true,
  })

// successful api lookup for single entity
export const success = (state, action) => {
  const { listOfPrice } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    listOfPrice,
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { listOfPrices } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    listOfPrices,
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { listOfPrice } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    listOfPrice,
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    listOfPrice: null,
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    listOfPrice: null,
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    listOfPrices: [],
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    listOfPrice: state.listOfPrice,
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    listOfPrice: state.listOfPrice,
  })
}

export const reset = (state) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LIST_OF_PRICE_REQUEST]: request,
  [Types.LIST_OF_PRICE_ALL_REQUEST]: allRequest,
  [Types.LIST_OF_PRICE_UPDATE_REQUEST]: updateRequest,
  [Types.LIST_OF_PRICE_DELETE_REQUEST]: deleteRequest,

  [Types.LIST_OF_PRICE_SUCCESS]: success,
  [Types.LIST_OF_PRICE_ALL_SUCCESS]: allSuccess,
  [Types.LIST_OF_PRICE_UPDATE_SUCCESS]: updateSuccess,
  [Types.LIST_OF_PRICE_DELETE_SUCCESS]: deleteSuccess,

  [Types.LIST_OF_PRICE_FAILURE]: failure,
  [Types.LIST_OF_PRICE_ALL_FAILURE]: allFailure,
  [Types.LIST_OF_PRICE_UPDATE_FAILURE]: updateFailure,
  [Types.LIST_OF_PRICE_DELETE_FAILURE]: deleteFailure,
  [Types.LIST_OF_PRICE_RESET]: reset,
})
