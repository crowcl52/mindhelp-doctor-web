import * as fromChatHistory from './chat-history.actions';
import { ChatHistory } from '../models/chat-history.model';

export interface ChatHistoryState  {
    data: ChatHistory[];
}

const initState: ChatHistoryState = {
    data: []
}

export function categoriesDoctorsReducer( state = initState, action: fromChatHistory.actions ): ChatHistoryState{
    switch(action.type){
        case fromChatHistory.GET_CHAT_HISTORY:
            return {data: [ ...action.chats ] };
        case fromChatHistory.CLEAR_CHAT_HISTORY:
            return initState;
        default:
            return state;
    }
}