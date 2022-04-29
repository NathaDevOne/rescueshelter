import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,

    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,

    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,

    LOGOUT_SUCCESS,
    LOGOUT_FAIL,

    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_RESET,
    UPDATE_PROFILE_FAIL,

    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_RESET,
    UPDATE_PASSWORD_FAIL,

    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,

    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_FAIL,

    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,

    ALL_ADOPTERS_REQUEST,
    ALL_ADOPTERS_SUCCESS,
    ALL_ADOPTERS_FAIL,

    NEW_USER_REQUEST,
    NEW_USER_SUCCESS,
    NEW_USER_RESET,
    NEW_USER_FAIL,

    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_RESET,
    UPDATE_USER_FAIL,

    UPDATE_ADOPTER_REQUEST,
    UPDATE_ADOPTER_SUCCESS,
    UPDATE_ADOPTER_RESET,
    UPDATE_ADOPTER_FAIL,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,

    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_RESET,
    DELETE_USER_FAIL,

    DELETE_ADOPTER_REQUEST,
    DELETE_ADOPTER_SUCCESS,
    DELETE_ADOPTER_RESET,
    DELETE_ADOPTER_FAIL,

    CLEAR_ERRORS
    } from '../constants/userConstants'

export const authReducer = (state = { user: {} }, action) => {
    switch (action.type) {

        case REGISTER_USER_REQUEST:
        case LOGIN_REQUEST:
        case LOAD_USER_REQUEST:
        	return {
                loading: true,
                isAuthenticated: false,
            }
        case REGISTER_USER_SUCCESS:
        case LOGIN_SUCCESS:
        case LOAD_USER_SUCCESS:
         	return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }
        case REGISTER_USER_FAIL:
        case LOGIN_FAIL:
         	return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
        case LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
        case LOGOUT_SUCCESS:
            return {
                loading: false,
                isAuthenticated: false,
                user: null
            }
        case LOGOUT_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export const newUserReducer = (state = { user: {} }, action) => {
    switch (action.type) {

        case NEW_USER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_USER_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                user: action.payload.user
            }

        case NEW_USER_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_USER_RESET:
            return {
                ...state,
                success: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const userReducer = (state = {}, action) => {
    switch (action.type) {

        case UPDATE_PASSWORD_REQUEST:
        case UPDATE_PROFILE_REQUEST:
        case UPDATE_USER_REQUEST:
        case UPDATE_ADOPTER_REQUEST:
        case DELETE_USER_REQUEST:
        case DELETE_ADOPTER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UPDATE_PASSWORD_SUCCESS:
        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_USER_SUCCESS:
        case UPDATE_ADOPTER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case UPDATE_PASSWORD_RESET:
        case UPDATE_PROFILE_RESET:
        case UPDATE_USER_RESET:
        case UPDATE_ADOPTER_RESET:
            return {
                ...state,
                isUpdated: false
            }
        case UPDATE_PASSWORD_FAIL:
        case UPDATE_PROFILE_FAIL:
        case UPDATE_USER_FAIL:
        case UPDATE_ADOPTER_FAIL:
        case DELETE_USER_FAIL:
        case DELETE_ADOPTER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case DELETE_USER_SUCCESS:
        case DELETE_ADOPTER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case DELETE_USER_RESET:
        case DELETE_ADOPTER_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const forgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {

        case FORGOT_PASSWORD_REQUEST:
        case NEW_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload
            }
        case NEW_PASSWORD_SUCCESS:
            return {
                ...state,
                success: action.payload
            }
        case FORGOT_PASSWORD_FAIL:
        case NEW_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const allUsersReducer = (state = { users: [] }, action) => {
    switch (action.type) {

        case ALL_USERS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case ALL_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload
            }

        case ALL_USERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const allAdoptersReducer = (state = { users: [] }, action) => {
    switch (action.type) {

        case ALL_ADOPTERS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case ALL_ADOPTERS_SUCCESS:
            return {
                ...state,
                loading: false,
                adopters: action.payload
            }

        case ALL_ADOPTERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {

        case USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case USER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload
            }

        case USER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}