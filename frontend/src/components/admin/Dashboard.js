import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom';

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

import { useDispatch, useSelector } from 'react-redux'

import { getAdminRescues } from '../../actions/rescueActions'
import { allUsers } from '../../actions/userActions'
import { allAdopters } from '../../actions/userActions'
import { getAdminDiseases } from '../../actions/diseaseActions'
import { getAdminInjuries } from '../../actions/injuryActions'

const Dashboard = () => {

    const dispatch = useDispatch();

    const { rescues } = useSelector(state => state.rescues)
    const { users } = useSelector(state => state.allUsers)
    const { adopters } = useSelector(state => state.allAdopters)
    const { diseases } = useSelector(state => state.diseases)
    const { injuries } = useSelector(state => state.injuries)

    useEffect(() => {
        dispatch(getAdminRescues())
        dispatch(allUsers())
        dispatch(allAdopters())
        dispatch(getAdminDiseases())
        dispatch(getAdminInjuries())
    }, [dispatch])

    return (
        <Fragment>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <h1 className="my-4">Dashboard</h1>

                    {false ? <Loader /> : (
                        <Fragment>
                            <MetaData title={'Admin Dashboard'} />

                            <div className="row pr-4">
                                <div className="col-xl-12 col-sm-12 mb-3">
                                    <div className="card text-white bg-warning o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Total rescued animals<br /> <b>{rescues && rescues.length}</b>
                                            </div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/rescues">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="row pr-4">
                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-primary o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Personnels<br /> <b>{users && users.length}</b></div>
                                        </div>
                                        
                                            <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                                                <span className="float-left">View Details</span>
                                                <span className="float-right">
                                                    <i className="fa fa-angle-right"></i>
                                                </span>
                                            </Link>
                                    </div>
                                </div>

                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-info o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Adopters<br /> <b>{adopters && adopters.length}</b></div>
                                        </div>
 
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/adopters">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>

                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-danger o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Diseases<br /> <b>{diseases && diseases.length}</b></div>
                                        </div>

                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/diseases">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>

                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-dark o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Injuries<br /> <b>{injuries && injuries.length}</b></div>
                                        </div>

                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/injuries">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    )}

                </div>
            </div>

        </Fragment >
    )
}

export default Dashboard