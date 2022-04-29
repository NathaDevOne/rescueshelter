import React, { Fragment, useEffect } from 'react'
import { useNavigate} from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { allAdopters, deleteUser, updateAdopter, clearErrors } from '../../actions/userActions'
import { UPDATE_ADOPTER_RESET } from '../../constants/userConstants'
import { DELETE_USER_RESET } from '../../constants/userConstants'

const AdoptersList = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { loading, error, adopters } = useSelector(state => state.allAdopters);
    const { isUpdated } = useSelector(state => state.user);
    const { isDeleted } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(allAdopters());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isUpdated) {
            alert.success('Adopter updated successfully');
            navigate('/admin/adopters');
            dispatch({ type: UPDATE_ADOPTER_RESET })
        }

        if (isDeleted) {
            alert.success('Adopter deleted successfully');
            navigate('/admin/adopters');
            dispatch({ type: DELETE_USER_RESET })
        }

    }, [dispatch, alert, error, isDeleted, isUpdated, navigate])


    const updateAdopterHandler = (id) => {
        dispatch(updateAdopter(id))
    }

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id))
    }

    const setAdopters = () => {
        const data = {
            columns: [
                {
                    label: 'Adopter ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        adopters.forEach(user => {
            data.rows.push({
                id: user._id,
                name: user.name,
                email: user.email,
                status: user.status && String(user.status).includes('Active')
                    ? <p style={{ color: 'green' }}>{user.status}</p>
                    : <p style={{ color: 'red' }}>{user.status}</p>,
                actions: <Fragment>
                    <button className="btn btn-primary py-1 px-2 ml-2" onClick={() => updateAdopterHandler(user._id)}>
                        <i className="fa fa-toggle-on"></i>
                    </button>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteUserHandler(user._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                  
                </Fragment>
            })
        })

        return data;
    }


    return (
        <Fragment>
            <MetaData title={'All Adopters'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Adopters</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setAdopters()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}

                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default AdoptersList