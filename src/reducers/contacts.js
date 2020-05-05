const initialState = {
    currentUser: {
        user_id: 4,
        first_name: "Ambrose",
        last_name: "Byamugisha",
        bio: "Ball breaker",
        isChating: false
    },
    users:[
        {
            user_id: 1,
            first_name: 'Masiko',
            last_name: 'Innocent',
            bio: 'Busy!',
            isChating: false
        },
        {
            user_id:2,
            first_name: 'Dee',
            last_name: 'Aine',
            bio: 'Singin in the Rain',
            isChating: false
        },
        {
            user_id: 3,
            first_name: 'Chris',
            last_name: 'Tusiime',
            bio: 'Treading lightly while we chill',
            isChating: false
        }
    ],
    loggedIn: false
};

export default (state=initialState, action) => {
    switch(action.type){
        case 'CHANGE_CURRENT_USER':
            return {
                ...state,
                currentUser: action.payload,
                loggedIn: !state.loggedIn
            }
        default:
            return state;
    }
}