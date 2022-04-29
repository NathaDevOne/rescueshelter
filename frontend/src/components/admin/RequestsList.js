import React, { Fragment, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminRequests, approveRequest, denyRequest, clearErrors } from '../../actions/rescueActions'
import { APPROVE_REQUEST_RESET, DENY_REQUEST_RESET } from '../../constants/rescueConstants'


const RequestsList = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate()
    const { loading, error, requests } = useSelector(state => state.requests);
    const { isApproved } = useSelector(state => state.adoptRescue);
    const { isDenied } = useSelector(state => state.adoptRescue);

    useEffect(() => {
        dispatch(getAdminRequests());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isApproved) {
            alert.success('Adoption request approved');
            navigate('/admin/requests');
            dispatch({ type: APPROVE_REQUEST_RESET })
        }

        if (isDenied) {
            alert.success('Adoption request denied');
            navigate('/admin/requests');
            dispatch({ type: DENY_REQUEST_RESET })
        }

    }, [dispatch, alert, error, isApproved, isDenied, navigate])

    const approveRequestHandler = (id) => {
        dispatch(approveRequest(id))
    }

    const denyRequestHandler = (id) => {
        dispatch(denyRequest(id))
    }
 
    const setRequests = () => {
        const data = {
            columns: [
                {
                    label: 'Rescue ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Animal name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Adopter name',
                    field: 'adopter',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Action',
                    field: 'action',
                },
            ],
            rows: []
        }

        requests.forEach(rescue => {
            data.rows.push({
                id: rescue._id,
                name: rescue.name,
                adopter: rescue.request.name,
                status: rescue.condition && String(rescue.condition).includes('Adopted')
                    ? <p style={{ color: 'green' }}>{rescue.condition}</p>
                    : <p style={{ color: 'red' }}>{rescue.condition}</p>,
                action: <Fragment>
                    <button className="btn btn-success py-1 px-2 ml-2" onClick={() => approveRequestHandler(rescue._id)}>
                        <i class="fa fa-thumbs-up"></i>
                    </button>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => denyRequestHandler(rescue._id)}>
                        <i class="fa fa-thumbs-down"></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }

    return (
        <Fragment>
            <MetaData title={'All Requests'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Requests</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setRequests()}
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

export default RequestsList