import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { newDisease, clearErrors } from '../../actions/diseaseActions'
import { NEW_DISEASE_RESET } from '../../constants/diseaseConstants'

const NewDisease = () => {

    const [disease, setDisease] = useState({
        name: ''
    })

    const { name } = disease;

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate()

    const { loading, error, success } = useSelector(state => state.newDisease);

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (success) {
            navigate('/admin/diseases');
            alert.success('Disease created successfully');
            dispatch({ type: NEW_DISEASE_RESET })
        }

    }, [dispatch, alert, error, success, navigate])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        dispatch(newDisease(formData))
    }

    const onChange = e => {
        setDisease({ ...disease, [e.target.name]: e.target.value })
    }

    return (
        <Fragment>
            <MetaData title={'New Disease'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="row wrapper">
                            <div className="col-10 col-lg-5">
                                <form className="" onSubmit={submitHandler} encType='multipart/form-data'>
                                    <h1 className="mb-4">New Disease</h1>

                                    <div className="form-group">
                                        <label htmlFor="email_field">Name</label>
                                        <input
                                            type="name"
                                            id="name_field"
                                            className="form-control"
                                            name='name'
                                            value={name}
                                            onChange={onChange}
                                        />
                                    </div>
                                    
                                    <button
                                        id="login_button"
                                        type="submit"
                                        className="btn btn-block py-3"
                                        disabled={loading ? true : false}
                                    >
                                        CREATE
                                    </button>

                                </form>
                            </div>
                        </div>
                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}
export default NewDisease
