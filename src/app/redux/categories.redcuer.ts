import * as fromUser from './categories.actions';
import { Categorie } from '../models/categorie.model';

export interface CategorieState  {
    data: Categorie[];
}

const initState: CategorieState = {
    data: []
}

export function categoriesReducer( state = initState, action: fromUser.actions ): CategorieState{
    switch(action.type){
        case fromUser.ACTIVATED_CATEGORIE:
            return {data: [ ...action.categorie ] };
        case fromUser.DEACTIVATED_CATEGORIE:
            return initState;
        default:
            return state;
    }
}