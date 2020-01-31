import * as fromUser from './categories-doctors.actions';
import { CategoriesDoctors } from '../models/categorie-doctor.model';

export interface DoctorsState  {
    data: CategoriesDoctors[];
}

const initState: DoctorsState = {
    data: []
}

export function categoriesDoctorsReducer( state = initState, action: fromUser.actions ): DoctorsState{
    switch(action.type){
        case fromUser.ACTIVATED_CATEGORIE_DOCTORS:
            return {data: [ ...action.doctors ] };
        case fromUser.DEACTIVATED_CATEGORIE_DOCTORS:
            return initState;
        default:
            return state;
    }
}