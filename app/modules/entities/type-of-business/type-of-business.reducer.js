import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  typeOfBusinessRequest: ['typeOfBusinessId'],
  typeOfBusinessAllRequest: ['options'],
  typeOfBusinessUpdateRequest: ['typeOfBusiness'],
  typeOfBusinessDeleteRequest: ['typeOfBusinessId'],

  typeOfBusinessSuccess: ['typeOfBusiness'],
  typeOfBusinessAllSuccess: ['typeOfBusinesses', 'headers'],
  typeOfBusinessUpdateSuccess: ['typeOfBusiness'],
  typeOfBusinessDeleteSuccess: [],

  typeOfBusinessFailure: ['error'],
  typeOfBusinessAllFailure: ['error'],
  typeOfBusinessUpdateFailure: ['error'],
  typeOfBusinessDeleteFailure: ['error'],

  typeOfBusinessReset: [],
})

export const TypeOfBusinessTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  deleting: null,
  typeOfBusiness: null,
  typeOfBusinesses: [],
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
    typeOfBusiness: null,
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
  const { typeOfBusiness } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    typeOfBusiness,
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { typeOfBusinesses } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    typeOfBusinesses,
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { typeOfBusiness } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    typeOfBusiness,
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    typeOfBusiness: null,
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    typeOfBusiness: null,
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    typeOfBusinesses: [],
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    typeOfBusiness: state.typeOfBusiness,
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    typeOfBusiness: state.typeOfBusiness,
  })
}

export const reset = (state) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TYPE_OF_BUSINESS_REQUEST]: request,
  [Types.TYPE_OF_BUSINESS_ALL_REQUEST]: allRequest,
  [Types.TYPE_OF_BUSINESS_UPDATE_REQUEST]: updateRequest,
  [Types.TYPE_OF_BUSINESS_DELETE_REQUEST]: deleteRequest,

  [Types.TYPE_OF_BUSINESS_SUCCESS]: success,
  [Types.TYPE_OF_BUSINESS_ALL_SUCCESS]: allSuccess,
  [Types.TYPE_OF_BUSINESS_UPDATE_SUCCESS]: updateSuccess,
  [Types.TYPE_OF_BUSINESS_DELETE_SUCCESS]: deleteSuccess,

  [Types.TYPE_OF_BUSINESS_FAILURE]: failure,
  [Types.TYPE_OF_BUSINESS_ALL_FAILURE]: allFailure,
  [Types.TYPE_OF_BUSINESS_UPDATE_FAILURE]: updateFailure,
  [Types.TYPE_OF_BUSINESS_DELETE_FAILURE]: deleteFailure,
  [Types.TYPE_OF_BUSINESS_RESET]: reset,
})
