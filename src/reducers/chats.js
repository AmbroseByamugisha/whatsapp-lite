const initialState = {
    chats:[
        {
            id: 1,
            senderId: 4,
            receiverId: 2,
            senderFirstName: "Ambrose",
            senderLastName: "Byamugisha",
            receiverFirstName: "Dee",
            receiverLastName: "Aine",
            senderBio: "Ball breaker",
            receiverBio: 'Singin in the Rain',
            msgs:[
                {
                    id:1,
                    body: "Hey Dee",
                    user_id: 4,
                    first_name: "Ambrose",
                    last_name: "Byamugisha"
                },
                {
                    id: 2,
                    body: "Hey Ambrose",
                    user_id: 2,
                    first_name: "Dee",
                    last_name: "Aine"
                }
            ]
        }
    ],
    isChating: false
};

export default (state=initialState, action) => {
    switch(action.type){
        case 'CREATE_CHAT':
            return {
                ...state,
                chats:state.chats.concat([action.payload])
            };
        case 'SEND_CHAT':
            return {
                ...state,
                chats:state.chats.map(chat => {
                    if(chat.id === action.chatId){
                        return {
                            ...chat,
                            msgs: chat.msgs.concat([action.payload])
                        }
                    } else return chat
                })
            }
        default:
            return state;
    }
}