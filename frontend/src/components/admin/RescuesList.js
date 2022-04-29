import React, { Fragment, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminRescues, deleteRescue, treatRescue, clearErrors } from '../../actions/rescueActions'
import { DELETE_RESCUE_RESET } from '../../constants/rescueConstants'
import { TREAT_RESCUE_RESET } from '../../constants/rescueConstants'

const RescuesList = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate()
    const { loading, error, rescues } = useSelector(state => state.rescues);
    const { isDeleted } = useSelector(state => state.rescue)
    const { isTreated } = useSelector(state => state.rescue)

    useEffect(() => {
        dispatch(getAdminRescues());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Animal deleted successfully');
            navigate('/admin/rescues');
            dispatch({ type: DELETE_RESCUE_RESET })
        }

        if (isTreated) {
            alert.success('Animal treated successfully');
            navigate('/admin/rescues');
            dispatch({ type: TREAT_RESCUE_RESET })
        }

    }, [dispatch, alert, error, isDeleted, isTreated, navigate])

    const deleteRescueHandler = (id) => {
        dispatch(deleteRescue(id))
    }

    const treatRescueHandler = (id) => {
        dispatch(treatRescue(id))
    }
 
    const setRescues = () => {
        const data = {
            columns: [
                {
                    label: 'Rescue ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Type',
                    field: 'type',
                    sort: 'asc'
                },
                {
                    label: 'Breed',
                    field: 'breed',
                    sort: 'asc'
                },
                {
                    label: 'Condition',
                    field: 'condition',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        rescues.forEach(rescue => {
            data.rows.push({
                id: rescue._id,
                name: rescue.name,
                type: rescue.type,
                breed: rescue.breed,
                condition: rescue.condition,
                actions: <Fragment>
                    <Link to={`/admin/rescue/${rescue._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-success py-1 px-2 ml-2" onClick={() => treatRescueHandler(rescue._id)}>
                        <i class="fa fa-syringe"></i>
                    </button>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteRescueHandler(rescue._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }

    return (
        <Fragment>
            <MetaData title={'All Rescues'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Rescues</h1>
                        <div className="col-md-12 text-center">
                            <Link to="/admin/rescue" id="create_btn" className="btn btn-lg">Create</Link>
                        </div>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setRescues()}
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

export default RescuesList