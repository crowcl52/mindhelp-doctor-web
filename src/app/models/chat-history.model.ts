export interface ChatHistory {
    id: number,
    user_id: number,
    doc_id: number,
    app_id: number,
    msgtype: string,
    message: string,
    send_from: string,
    thumbnail: any,
    is_read: string,
    message_visible_to: any
    chat_visible_to: any,
    deleted_at: any,
    status: string,
    created_at: string,
    updated_at: any,
    created_atz: string,
    user: any,
    doctor: any
}