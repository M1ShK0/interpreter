import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL } from '../actions/UserAction'
import { GET_FRIENDS_REQUEST, GET_FRIENDS_SUCCESS, GET_FRIENDS_FAIL } from '../actions/UserAction'
import {LOGOUT} from "../actions/LogOut";

const initialState = {
    name: '',
    error: '',
    friends:[],
    isFetching: false,
    isFetchingFriends: false
}

export function userReducer(state = initialState, action) {

    switch (action.type) {

        case LOGIN_REQUEST:
            return { ...state, isFetching: true, error: '' }

        case LOGIN_SUCCESS:
            return { ...state, isFetching: false, name: action.payload }

        case LOGIN_FAIL:
            return { ...state, isFetching: false, error: action.payload.message }

        case GET_FRIENDS_REQUEST:
            return { ...state, isFetchingFriends: true, error: '' }

        case GET_FRIENDS_SUCCESS:
            return { ...state, isFetchingFriends: false, friends: action.payload }

        case GET_FRIENDS_FAIL:
            return { ...state, isFetchingFriends: false, error: action.payload.message }
        case LOGOUT:
            return {...initialState}

        default:
            return state
    }
}