import React, { Fragment, useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminDiseases, deleteDisease, clearErrors } from '../../actions/diseaseActions'
import { DELETE_DISEASE_RESET } from '../../constants/diseaseConstants'

const DiseasesList = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { loading, error, diseases } = useSelector(state => state.diseases);
    const { isDeleted } = useSelector(state => state.disease)

    useEffect(() => {
        dispatch(getAdminDiseases());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Disease deleted successfully');
            navigate('/admin/diseases');
            dispatch({ type: DELETE_DISEASE_RESET })
        }

    }, [dispatch, alert, error, isDeleted, navigate])


    const deleteDiseaseHandler = (id) => {
        dispatch(deleteDisease(id))
    }

    const setDiseases = () => {
        const data = {
            columns: [
                {
                    label: 'Disease ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Disease name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        diseases.forEach(disease => {
            data.rows.push({
                id: disease._id,
                name: disease.name,

                actions: <Fragment>
                    <Link to={`/admin/disease/${disease._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteDiseaseHandler(disease._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                  
                </Fragment>
            })
        })

        return data;
    }


    return (
        <Fragment>
            <MetaData title={'All Diseases'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Diseases</h1>
                        <div className="col-md-12 text-center">
                            <Link to="/admin/disease" id="create_btn" className="btn btn-lg">Create</Link>
                        </div>
                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setDiseases()}
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

export default DiseasesList