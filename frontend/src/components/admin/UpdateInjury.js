import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";

import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateInjury, getInjuryDetails, clearErrors } from '../../actions/injuryActions'
import { UPDATE_INJURY_RESET } from '../../constants/injuryConstants'

const UpdateInjury = () => {

    const [name, setName] = useState('')

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { error, isUpdated } = useSelector(state => state.injury);
    const { injury } = useSelector(state => state.injuryDetails)

    const {id} = useParams();

    useEffect(() => {

        
        if (injury && injury._id !== id) {
            dispatch(getInjuryDetails(id))
        } else {
            setName(injury.name);
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success('Injury updated successfully')

            navigate('/admin/injuries')

            dispatch({
                type: UPDATE_INJURY_RESET
            })
        }

    }, [dispatch, alert, error, navigate, isUpdated, id, injury])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);

        dispatch(updateInjury(injury._id, formData))
    }


    return (
        <Fragment>
            <MetaData title={`Update Injury`} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form className="" onSubmit={submitHandler}>
                                <h1 className="mt-2 mb-5">Update Injury</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input
                                        type="name"
                                        id="name_field"
                                        className="form-control"
                                        name='name'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
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

export default UpdateInjury