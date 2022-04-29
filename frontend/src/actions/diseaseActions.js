import axios from 'axios'

import  {   ADMIN_DISEASES_REQUEST,
            ADMIN_DISEASES_SUCCESS,
            ADMIN_DISEASES_FAIL,

            NEW_DISEASE_REQUEST,
            NEW_DISEASE_SUCCESS,
            NEW_DISEASE_FAIL,

            UPDATE_DISEASE_REQUEST,
            UPDATE_DISEASE_SUCCESS,
            UPDATE_DISEASE_FAIL,

            DISEASE_DETAILS_REQUEST,
            DISEASE_DETAILS_SUCCESS,
            DISEASE_DETAILS_FAIL,

            DELETE_DISEASE_REQUEST,
            DELETE_DISEASE_SUCCESS,
            DELETE_DISEASE_FAIL,

            CLEAR_ERRORS
} from '../constants/diseaseConstants'

export const getAdminDiseases = () => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_DISEASES_REQUEST })

        const { data } = await axios.get('/api/v1/admin/diseases')

        dispatch({
            type: ADMIN_DISEASES_SUCCESS,
            payload: data.diseases
        })

    } catch (error) {
        dispatch({
            type: ADMIN_DISEASES_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newDisease = (diseaseData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_DISEASE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post('/api/v1/admin/disease/new', diseaseData, config)

        dispatch({
            type: NEW_DISEASE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_DISEASE_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getDiseaseDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: DISEASE_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/v1/admin/disease/${id}`)

        dispatch({
            type: DISEASE_DETAILS_SUCCESS,
            payload: data.disease
        })

    } catch (error) {
        dispatch({
            type: DISEASE_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateDisease = (id, diseaseData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_DISEASE_REQUEST })

        const { data } = await axios.put(`/api/v1/admin/disease/${id}`, diseaseData)

        dispatch({
            type: UPDATE_DISEASE_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_DISEASE_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteDisease = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_DISEASE_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/disease/${id}`)

        dispatch({
            type: DELETE_DISEASE_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_DISEASE_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) =>{
    dispatch({
        type: CLEAR_ERRORS
    })
}