export const create_chat = (data) => {
    return {
        type: 'CREATE_CHAT',
        payload: data
    }
}

export const send_chat = (chat_id, msg) => {
    return {
        type: 'SEND_CHAT',
        chatId: chat_id,
        payload: msg
    }
}
