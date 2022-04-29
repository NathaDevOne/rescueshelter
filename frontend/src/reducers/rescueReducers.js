import	{	ALL_RESCUES_REQUEST,
			ALL_RESCUES_SUCCESS, 
			ALL_RESCUES_FAIL,

			NEW_COMMENT_REQUEST,
		    NEW_COMMENT_SUCCESS,
		    NEW_COMMENT_RESET,
		    NEW_COMMENT_FAIL,

            ADMIN_RESCUES_REQUEST,
            ADMIN_RESCUES_SUCCESS,
            ADMIN_RESCUES_FAIL,

            NEW_RESCUE_REQUEST,
            NEW_RESCUE_SUCCESS,
            NEW_RESCUE_RESET,
            NEW_RESCUE_FAIL,

            UPDATE_RESCUE_REQUEST,
            UPDATE_RESCUE_SUCCESS,
            UPDATE_RESCUE_RESET,
            UPDATE_RESCUE_FAIL,

            RESCUE_DETAIL_REQUEST,
            RESCUE_DETAIL_SUCCESS,
            RESCUE_DETAIL_FAIL,

            RESCUE_DETAILS_REQUEST,
            RESCUE_DETAILS_SUCCESS,
            RESCUE_DETAILS_FAIL,

            DELETE_RESCUE_REQUEST,
            DELETE_RESCUE_SUCCESS,
            DELETE_RESCUE_RESET,
            DELETE_RESCUE_FAIL,

            ADOPT_RESCUE_REQUEST,
            ADOPT_RESCUE_SUCCESS,
            ADOPT_RESCUE_RESET,
            ADOPT_RESCUE_FAIL,

            ADMIN_REQUESTS_REQUEST,
            ADMIN_REQUESTS_SUCCESS,
            ADMIN_REQUESTS_FAIL,

            APPROVE_REQUEST_REQUEST,
            APPROVE_REQUEST_SUCCESS,
            APPROVE_REQUEST_RESET,
            APPROVE_REQUEST_FAIL,

            DENY_REQUEST_REQUEST,
            DENY_REQUEST_SUCCESS,
            DENY_REQUEST_RESET,
            DENY_REQUEST_FAIL,

            ADOPTER_ADOPTED_REQUEST,
            ADOPTER_ADOPTED_SUCCESS,
            ADOPTER_ADOPTED_FAIL,

            TREAT_RESCUE_REQUEST,
            TREAT_RESCUE_SUCCESS,
            TREAT_RESCUE_RESET,
            TREAT_RESCUE_FAIL,

            GET_RESCUEDCHART_REQUEST,
            GET_RESCUEDCHART_SUCCESS,
            GET_RESCUEDCHART_FAIL,

            GET_ADOPTEDCHART_REQUEST,
            GET_ADOPTEDCHART_SUCCESS,
            GET_ADOPTEDCHART_FAIL,

			CLEAR_ERRORS 
} from '../constants/rescueConstants'

export const rescuesReducer = (state = { rescues:[] }, action) => {
	switch(action.type) {
	case ALL_RESCUES_REQUEST:
    case ADMIN_RESCUES_REQUEST:
	return {
		loading: true,
		rescues:[]
	}
	case ALL_RESCUES_SUCCESS:
	return {
		loading:false,
		rescues: action.payload.rescues,
		rescuesCount: action.payload.rescuesCount,
		resPerPage: action.payload.resPerPage,
		filteredRescuesCount: action.payload.filteredRescuesCount
	}
	case ALL_RESCUES_FAIL:
    case ADMIN_RESCUES_FAIL:
	return {
		loading:false,
		error: action.payload
	}
    case ADMIN_RESCUES_SUCCESS:
            return {
                loading: false,
                rescues: action.payload
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

// export const rescueDetailsReducer = (state = { rescue: {} }, action) => {
//     switch (action.type) {
//         case RESCUE_DETAILS_REQUEST:
//             return {
//                 ...state,
//                 loading: true
//             }
//         case RESCUE_DETAILS_SUCCESS:
//             return {
//                 loading: false,
//                 rescue: action.payload
//             }
//         case RESCUE_DETAILS_FAIL:
//             return {
//                 ...state,
//                 error: action.payload
//             }
//         case CLEAR_ERRORS:
//             return {
//                 ...state,
//                 error: null
//             }
//         default:
//             return state
//     }
// }

export const newCommentReducer = (state = {}, action) => {
    switch (action.type) {

        case NEW_COMMENT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_COMMENT_SUCCESS:
            return {
                loading: false,
                success: action.payload
            }

        case NEW_COMMENT_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_COMMENT_RESET:
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

export const newRescueReducer = (state = { rescue: {} }, action) => {
    switch (action.type) {

        case NEW_RESCUE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_RESCUE_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                rescue: action.payload.rescue
            }

        case NEW_RESCUE_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_RESCUE_RESET:
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

export const rescueReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_RESCUE_REQUEST:
        case DELETE_RESCUE_REQUEST:
        case TREAT_RESCUE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UPDATE_RESCUE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case DELETE_RESCUE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case TREAT_RESCUE_SUCCESS:
            return {
                ...state,
                loading: false,
                isTreated: action.payload
            }
        case UPDATE_RESCUE_RESET:
            return {
                ...state,
                isUpdated: false
            }
        case DELETE_RESCUE_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case TREAT_RESCUE_RESET:
            return {
                ...state,
                isTreated: false
            }
        case UPDATE_RESCUE_FAIL:
        case DELETE_RESCUE_FAIL:
        case TREAT_RESCUE_FAIL:
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

export const adoptRescueReducer = (state = { rescue: [] }, action) => {
    switch (action.type) {

        case ADOPT_RESCUE_REQUEST:
        case APPROVE_REQUEST_REQUEST:
        case DENY_REQUEST_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ADOPT_RESCUE_SUCCESS:
            return {
                ...state,
                loading: false,
                isRequested: action.payload
            }

        case APPROVE_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                isApproved: action.payload
            }
        case DENY_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                isDenied: action.payload
            }
        case ADOPT_RESCUE_RESET:
            return {
                ...state,
                isRequested: false
            }
        case APPROVE_REQUEST_RESET:
            return {
                ...state,
                isApproved: false
            }
        case DENY_REQUEST_RESET:
            return {
                ...state,
                isDenied: false
            }
        case ADOPT_RESCUE_FAIL:
        case APPROVE_REQUEST_FAIL:
        case DENY_REQUEST_FAIL:
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

export const requestsReducer = (state = { rescues:[] }, action) => {
    switch(action.type) {
    case ALL_RESCUES_REQUEST:
    case ADMIN_REQUESTS_REQUEST:
    return {
        loading: true,
        rescues:[]
    }
    case ADMIN_REQUESTS_SUCCESS:
        return {
            loading: false,
            requests: action.payload
    }
    case ADMIN_REQUESTS_FAIL:
    return {
        loading:false,
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

export const adoptedReducer = (state = { rescues:[] }, action) => {
    switch(action.type) {
    case ADOPTER_ADOPTED_REQUEST:
    return {
        loading: true,
        rescues:[]
    }
    case ADOPTER_ADOPTED_SUCCESS:
            return {
                loading: false,
                rescues: action.payload
            }
    case ADOPTER_ADOPTED_FAIL:
    return {
        loading:false,
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

export const rescueDetailReducer = (state = { rescue: {} }, action) => {
    switch (action.type) {

        case RESCUE_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case RESCUE_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                rescue: action.payload
            }

        case RESCUE_DETAIL_FAIL:
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

export const rescueDetailsReducer = (state = { rescue: {} }, action) => {
    switch (action.type) {

        case RESCUE_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case RESCUE_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                rescue: action.payload
            }

        case RESCUE_DETAILS_FAIL:
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

export const rescuedChartReducer = (state = { animalsrescued: [] }, action) => {
    switch (action.type) {

        case GET_RESCUEDCHART_REQUEST:
            return {
                ...state,
                loading: true,
                animalsrescued:[]
            }

        case GET_RESCUEDCHART_SUCCESS:
            return {
                loading: false,
                // success: action.payload.success,
                animalsrescued: action.payload
            }

        case GET_RESCUEDCHART_FAIL:
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

export const adoptedChartReducer = (state = { animalsadopted: [] }, action) => {
    switch (action.type) {

        case GET_ADOPTEDCHART_REQUEST:
            return {
                ...state,
                loading: true,
                animalsadopted:[]
            }

        case GET_ADOPTEDCHART_SUCCESS:
            return {
                loading: false,
                // success: action.payload.success,
                animalsadopted: action.payload
            }

        case GET_ADOPTEDCHART_FAIL:
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