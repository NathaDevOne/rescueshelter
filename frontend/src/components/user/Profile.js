import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'

const Profile = () => {

    const { user, loading } = useSelector(state => state.auth)

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Your Profile'} />

                    {/*<h2 className="mt-5 ml-5">My Profile</h2>*/}

                    <div className="container mt-5">
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-7">
                                <div className="card-profile p-3 py-4">
                                    <div className="text-center">
                                        <figure className='avatar avatar-profile'>
                                            <img className="rounded-circle img-fluid" src={user.avatar.url} alt={user.name} />
                                        </figure>
                                    </div>
                                    <div className="text-center mt-3"> 
                                    {/*<span class="bg-secondary p-1 px-4 rounded text-white">Pro</span>*/}
                                        {/*<h5 class="mt-2 mb-0">{user.name}</h5> */}
                                        <hr />
                                        <h5><strong>Name:</strong> {user.name}</h5>
                                        <h5><strong>Role:</strong> {user.role}</h5>
                                        <h5><strong>Contact:</strong> {user.num}</h5>
                                        <h5><strong>Address:</strong> {user.addr}</h5>
                                        <h5><strong>Email:</strong> {user.email}</h5>
                                        <h5><strong>Joined on:</strong> {String(user.createdAt).substring(0, 10)}</h5>
                                        <hr />
                                        <ul className="social-list">
                                            <li><i className="fa fa-facebook"></i></li>
                                            <li><i className="fa fa-dribbble"></i></li>
                                            <li><i className="fa fa-instagram"></i></li>
                                            <li><i className="fa fa-linkedin"></i></li>
                                            <li><i className="fa fa-google"></i></li>
                                        </ul>
                                        <div className="buttons">
                                            <Link to="/me/update" id="edit_profile" className="btn">
                                                Edit Profile
                                            </Link>
                                            <Link to="/password/update" id="edit_password" className="btn">
                                                Change Password
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*<div className="row justify-content-around mt-5 user-info">
                        <div className="col-12 col-md-3">
                            <figure className='avatar avatar-profile'>
                                <img className="rounded-circle img-fluid" src={user.avatar.url} alt={user.name} />
                            </figure>
                            <Link to="/me/update" id="edit_profile" className="btn btn-primary btn-block my-5">
                                Edit Profile
                            </Link>
                        </div>

                        <div className="col-12 col-md-5">
                            <h4>Name</h4>
                            <p>{user.name}</p>

                            <h4>Role</h4>
                            <p>{user.role}</p>

                            <h4>Email Address</h4>
                            <p>{user.email}</p>

                            <h4>Joined On</h4>
                            <p>{String(user.createdAt).substring(0, 10)}</p>

                            {user.role !== 'Admin' && (
                                <Link to="/orders/me" className="btn btn-danger btn-block mt-5">
                                    My Orders
                                </Link>
                            )}

                            <Link to="/password/update" className="btn btn-primary btn-block mt-3">
                                Change Password
                            </Link>
                        </div>
                    </div>*/}
                </Fragment>
            )}
        </Fragment>
    )
}

export default Profile