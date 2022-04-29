import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";

import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateAdopter, getUserDetails, clearErrors } from '../../actions/userActions'
import { UPDATE_ADOPTER_RESET } from '../../constants/userConstants'

const UpdateAdopter = () => {

    const [status, setStatus] = useState('')

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { error, isUpdated } = useSelector(state => state.user);
    const { user } = useSelector(state => state.userDetails)

    const {id} = useParams();

    useEffect(() => {

        
        if (user && user._id !== id) {
            dispatch(getUserDetails(id))
        } else {

            setStatus(user.status)
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success('Adopter updated successfully')

            navigate('/admin/adopters')

            dispatch({
                type: UPDATE_ADOPTER_RESET
            })
        }

    }, [dispatch, alert, error, navigate, isUpdated, id, user])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('status', status);

        dispatch(updateAdopter(user._id, formData))
    }


    return (
        <Fragment>
            <MetaData title={`Update Adopter`} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form className="" onSubmit={submitHandler}>
                                <h1 className="mt-2 mb-5">Update Adopter</h1>
                                
                                <div className="form-group">
                                    <label htmlFor="status_field">Status</label>

                                    <select
                                        id="status_field"
                                        className="form-control"
                                        name='status'
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <option value="Active">active</option>
                                        <option value="Inactive">inactive</option>
                                    </select>
                                </div>

                                <button type="submit" className="btn update-btn btn-block mt-4 mb-3" >Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default UpdateAdopter