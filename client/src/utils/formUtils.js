export const dispatchForm = (dispatch, actionCreator, payload) => {
  return new Promise((resolve, reject) => {
    const action = actionCreator(payload, {resolve, reject})
    dispatch(action)
  })
}
