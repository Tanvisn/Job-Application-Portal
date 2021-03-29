import { RECPRO_REGISTER_SUCCESS, RECPRO_REGISTER_FAIL, GET_REC_PROFILE } from '../actions/types';
const initialState = {
    recproRegister: false,
    recpro: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case RECPRO_REGISTER_SUCCESS:
            return {
                ...state,
                recpro: action.payload,
                recproRegister: true
            }
        case RECPRO_REGISTER_FAIL:
            return {
                ...state,
                recproRegister: false
            }
        case GET_REC_PROFILE:
            return {
                ...state,
                recpro: action.payload,
            }
        default:
            return state;

    }
}