import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  orderDetailPoRequest: ['orderDetailPoId'],
  orderDetailPoAllRequest: ['options'],
  orderDetailPoUpdateRequest: ['orderDetailPo'],
  orderDetailPoDeleteRequest: ['orderDetailPoId'],

  orderDetailPoSuccess: ['orderDetailPo'],
  orderDetailPoAllSuccess: ['orderDetailPos', 'headers'],
  orderDetailPoUpdateSuccess: ['orderDetailPo'],
  orderDetailPoDeleteSuccess: [],

  orderDetailPoFailure: ['error'],
  orderDetailPoAllFailure: ['error'],
  orderDetailPoUpdateFailure: ['error'],
  orderDetailPoDeleteFailure: ['error'],

  orderDetailPoReset: [],
})

export const OrderDetailPoTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  deleting: null,
  orderDetailPo: null,
  orderDetailPos: [],
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
    orderDetailPo: null,
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
  const { orderDetailPo } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    orderDetailPo,
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { orderDetailPos } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    orderDetailPos,
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { orderDetailPo } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    orderDetailPo,
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    orderDetailPo: null,
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    orderDetailPo: null,
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    orderDetailPos: [],
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    orderDetailPo: state.orderDetailPo,
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    orderDetailPo: state.orderDetailPo,
  })
}

export const reset = (state) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ORDER_DETAIL_PO_REQUEST]: request,
  [Types.ORDER_DETAIL_PO_ALL_REQUEST]: allRequest,
  [Types.ORDER_DETAIL_PO_UPDATE_REQUEST]: updateRequest,
  [Types.ORDER_DETAIL_PO_DELETE_REQUEST]: deleteRequest,

  [Types.ORDER_DETAIL_PO_SUCCESS]: success,
  [Types.ORDER_DETAIL_PO_ALL_SUCCESS]: allSuccess,
  [Types.ORDER_DETAIL_PO_UPDATE_SUCCESS]: updateSuccess,
  [Types.ORDER_DETAIL_PO_DELETE_SUCCESS]: deleteSuccess,

  [Types.ORDER_DETAIL_PO_FAILURE]: failure,
  [Types.ORDER_DETAIL_PO_ALL_FAILURE]: allFailure,
  [Types.ORDER_DETAIL_PO_UPDATE_FAILURE]: updateFailure,
  [Types.ORDER_DETAIL_PO_DELETE_FAILURE]: deleteFailure,
  [Types.ORDER_DETAIL_PO_RESET]: reset,
})
