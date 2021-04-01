import { destroyComment } from '../../services/api'

export const setComments = comments => {
  return dispatch => {
    dispatch({ type: "SET_COMMENTS", payload: comments})
  }
}

export const addComment = comment => {
  return dispatch => {
    dispatch({ type: "ADD_COMMENT", payload: comment })
  } 
}

export const removeComment = id => {
  return dispatch => {
    dispatch({ type: "FETCHING" })
    destroyComment(id)
    .then(response => {
      dispatch({ type: "REMOVE_COMMENT", payload: id})
    })
  }
}