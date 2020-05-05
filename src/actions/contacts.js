export const changeCurrentUser = (user) => {
    return dispatch => dispatch( {
        type: 'CHANGE_CURRENT_USER',
        payload: user
    })
}