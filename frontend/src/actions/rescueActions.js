import axios from 'axios';

import { ALL_RESCUES_REQUEST,
    	 ALL_RESCUES_SUCCESS, 
    	 ALL_RESCUES_FAIL,

         RESCUE_DETAIL_REQUEST,
         RESCUE_DETAIL_SUCCESS,
         RESCUE_DETAIL_FAIL,

    	 NEW_COMMENT_REQUEST,
  	     NEW_COMMENT_SUCCESS,
  	     NEW_COMMENT_FAIL,

         ADMIN_RESCUES_REQUEST,
         ADMIN_RESCUES_SUCCESS,
         ADMIN_RESCUES_FAIL,

         NEW_RESCUE_REQUEST,
         NEW_RESCUE_SUCCESS,
         NEW_RESCUE_FAIL,

         UPDATE_RESCUE_REQUEST,
         UPDATE_RESCUE_SUCCESS,
         UPDATE_RESCUE_FAIL,

         RESCUE_DETAILS_REQUEST,
         RESCUE_DETAILS_SUCCESS,
         RESCUE_DETAILS_FAIL,

         DELETE_RESCUE_REQUEST,
         DELETE_RESCUE_SUCCESS,
         DELETE_RESCUE_FAIL,

         ADOPT_RESCUE_REQUEST,
         ADOPT_RESCUE_SUCCESS,
         ADOPT_RESCUE_FAIL,

         ADMIN_REQUESTS_REQUEST,
         ADMIN_REQUESTS_SUCCESS,
         ADMIN_REQUESTS_FAIL,

         APPROVE_REQUEST_REQUEST,
         APPROVE_REQUEST_SUCCESS,
         APPROVE_REQUEST_FAIL,

         DENY_REQUEST_REQUEST,
         DENY_REQUEST_SUCCESS,
         DENY_REQUEST_FAIL,

         ADOPTER_ADOPTED_REQUEST,
         ADOPTER_ADOPTED_SUCCESS,
         ADOPTER_ADOPTED_FAIL,

         TREAT_RESCUE_REQUEST,
         TREAT_RESCUE_SUCCESS,
         TREAT_RESCUE_FAIL,

         GET_RESCUEDCHART_REQUEST,
         GET_RESCUEDCHART_SUCCESS,
         GET_RESCUEDCHART_FAIL,

         GET_ADOPTEDCHART_REQUEST,
         GET_ADOPTEDCHART_SUCCESS,
         GET_ADOPTEDCHART_FAIL,

		 CLEAR_ERRORS 
		    } from '../constants/rescueConstants';

export const getRescues = (currentPage=1, keyword='', age, type, breed, gender) => async (dispatch) => {
	try {
		dispatch({
			type: ALL_RESCUES_REQUEST
		})
		let link = `/api/v1/rescues?keyword=${keyword}&page=${currentPage}&age[lte]=${age[1]}&age[gte]=${age[0]}`

		if (type) {
            link = `/api/v1/rescues?keyword=${keyword}&page=${currentPage}&age[lte]=${age[1]}&age[gte]=${age[0]}&type=${type}`
        }

        if (breed) {
            link = `/api/v1/rescues?keyword=${keyword}&page=${currentPage}&age[lte]=${age[1]}&age[gte]=${age[0]}&type=${type}&breed=${breed}`
        }

        if (gender) {
            link = `/api/v1/rescues?keyword=${keyword}&page=${currentPage}&age[lte]=${age[1]}&age[gte]=${age[0]}&type=${type}&breed=${breed}&gender=${gender}`
        }

		// const {data} = await axios.get(`/api/v1/rescues?keyword=${keyword}&page=${currentPage}`);
		const {data} = await axios.get(link);

		dispatch({
			type: ALL_RESCUES_SUCCESS,
			payload: data
		})
	} catch(error) {
		dispatch({
			type: ALL_RESCUES_FAIL,
			payload: error.response.data.message
		})
	}
}

export const getRescueDetail = (id) => async (dispatch) => {
    try {
        dispatch({ type: RESCUE_DETAIL_REQUEST })
        const { data } = await axios.get(`/api/v1/rescue/${id}`)
        dispatch({
            type: RESCUE_DETAIL_SUCCESS,
            payload: data.rescue
        })
    } catch (error) {
        dispatch({
            type: RESCUE_DETAIL_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newComment = (commentData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_COMMENT_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/comment`, commentData, config)

        dispatch({
            type: NEW_COMMENT_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: NEW_COMMENT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getAdminRescues = () => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_RESCUES_REQUEST })

        const { data } = await axios.get(`/api/v1/admin/rescues`)

        dispatch({
            type: ADMIN_RESCUES_SUCCESS,
            payload: data.rescues
        })

    } catch (error) {

        dispatch({
            type: ADMIN_RESCUES_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newAdopt = (id) => async (dispatch) => {
    try {

        dispatch({ type: ADOPT_RESCUE_REQUEST })

        const { data } = await axios.put(`/api/v1/adopt/${id}`)

        dispatch({
            type: ADOPT_RESCUE_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: ADOPT_RESCUE_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newRescue = (rescueData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_RESCUE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post(`/api/v1/admin/rescue/new`, rescueData, config)

        dispatch({
            type: NEW_RESCUE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_RESCUE_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateRescue = (id, rescueData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_RESCUE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/rescue/${id}`, rescueData, config)

        dispatch({
            type: UPDATE_RESCUE_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_RESCUE_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getRescueDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: RESCUE_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/v1/admin/rescue/${id}`)

        dispatch({
            type: RESCUE_DETAILS_SUCCESS,
            payload: data.rescue
        })

    } catch (error) {
        dispatch({
            type: RESCUE_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteRescue = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_RESCUE_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/rescue/${id}`)

        dispatch({
            type: DELETE_RESCUE_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_RESCUE_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getAdminRequests = () => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_REQUESTS_REQUEST })

        const { data } = await axios.get(`/api/v1/admin/requests`)

        dispatch({
            type: ADMIN_REQUESTS_SUCCESS,
            payload: data.requests
        })

    } catch (error) {

        dispatch({
            type: ADMIN_REQUESTS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const approveRequest = (id) => async (dispatch) => {
    try {

        dispatch({ type: APPROVE_REQUEST_REQUEST })

        const { data } = await axios.put(`/api/v1/admin/approve/${id}`)

        dispatch({
            type: APPROVE_REQUEST_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: APPROVE_REQUEST_FAIL,
            payload: error.response.data.message
        })
    }
}

export const denyRequest = (id) => async (dispatch) => {
    try {

        dispatch({ type: DENY_REQUEST_REQUEST })

        const { data } = await axios.put(`/api/v1/admin/deny/${id}`)

        dispatch({
            type: DENY_REQUEST_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DENY_REQUEST_FAIL,
            payload: error.response.data.message
        })
    }
}

export const treatRescue = (id) => async (dispatch) => {
    try {

        dispatch({ type: TREAT_RESCUE_REQUEST })

        const { data } = await axios.put(`/api/v1/admin/treat/${id}`)

        dispatch({
            type: TREAT_RESCUE_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: TREAT_RESCUE_FAIL,
            payload: error.response.data.message
        })
    }
}

export const myAdopteds = () => async (dispatch) => {
    try {

        dispatch({ type: ADOPTER_ADOPTED_REQUEST })

        const { data } = await axios.get(`/api/v1/adopteds`)

        dispatch({
            type: ADOPTER_ADOPTED_SUCCESS,
            payload: data.rescues
        })

    } catch (error) {

        dispatch({
            type: ADOPTER_ADOPTED_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getRescuedchart = () => async (dispatch) => {
    try {

        dispatch({ type: GET_RESCUEDCHART_REQUEST })

        const { data } = await axios.get(`/api/v1/admin/rescuedcharts`)

        dispatch({
            type: GET_RESCUEDCHART_SUCCESS,
            payload: data.animalsrescued
        })

    } catch (error) {
        dispatch({
            type: GET_RESCUEDCHART_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getAdoptedchart = () => async (dispatch) => {
    try {

        dispatch({ type: GET_ADOPTEDCHART_REQUEST })

        const { data } = await axios.get(`/api/v1/admin/adoptedcharts`)

        dispatch({
            type: GET_ADOPTEDCHART_SUCCESS,
            payload: data.animalsadopted
        })

    } catch (error) {
        dispatch({
            type: GET_ADOPTEDCHART_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) =>{
	dispatch({
		type: CLEAR_ERRORS
	})
}
