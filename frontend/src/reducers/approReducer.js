import { APPRO_REGISTER_SUCCESS, APPRO_REGISTER_FAIL, GET_APP_PROFILE } from '../actions/types';
const initialState = {
    approRegister: false,
    appro: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case APPRO_REGISTER_SUCCESS:
            return {
                ...state,
                appro: action.payload,
                approRegister: true
            }
        case APPRO_REGISTER_FAIL:
            return {
                ...state,
                approRegister: false
            }
        case GET_APP_PROFILE:
            return {
                ...state,
                appro: action.payload,
            }
        default:
            return state;

    }
}