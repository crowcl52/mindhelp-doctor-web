
import { Action } from '@ngrx/store';
import { ChatHistory } from '../models/chat-history.model';

export const GET_CHAT_HISTORY = '[GET_CHAT_HISTORY] Set';
export const CLEAR_CHAT_HISTORY = '[GET_CHAT_HISTORY] UnSet';

export class GetChatHistory implements Action {
    readonly type = GET_CHAT_HISTORY;
    constructor( public chats: ChatHistory[]){}
}

export class CleartChatHistory implements Action {
    readonly type = CLEAR_CHAT_HISTORY;
}

export type actions =  GetChatHistory | CleartChatHistory ;
