import React, { Fragment,  useEffect, useState } from 'react'
// import { Carousel } from 'react-bootstrap'

// import { Link } from 'react-router-dom'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';

import { getRescueDetail, newComment, newAdopt, clearErrors } from '../../actions/rescueActions'

import { NEW_COMMENT_RESET } from '../../constants/rescueConstants'
import ListComments from '../comment/ListComments'

import { ADOPT_RESCUE_RESET } from '../../constants/rescueConstants'
// import { addItemToCart } from '../../actions/cartActions'

const RescueDetails = () => { 
    const dispatch = useDispatch();
    const alert = useAlert();
    let { id } = useParams();
    let navigate = useNavigate();

    const { loading, error, rescue } = useSelector(state => state.rescueDetail);
    const { error: commentError, success } = useSelector(state => state.newComment)
    const { user } = useSelector(state => state.auth)
    const { isRequested } = useSelector(state => state.adoptRescue)

    const [text, setText] = useState('');

    useEffect(() => {
        dispatch(getRescueDetail(id))
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        if (commentError) {
            alert.error(commentError);
            dispatch(clearErrors())
        }
        if (success) {
            alert.success('Comment posted successfully')
            dispatch({ type: NEW_COMMENT_RESET })
        }
        if (isRequested) {
            navigate('/')
            alert.success('Animal is requested for adoption')
            dispatch({ type: ADOPT_RESCUE_RESET })
        }
    }, [dispatch, alert, error, commentError, isRequested, success, navigate, id]);

    // useEffect(() => {
    //     dispatch(getRescueDetails(id))
    //     if (error) {
    //         alert.error(error);
    //         dispatch(clearErrors())
    //     }
    //     if (commentError) {
    //         alert.error(commentError);
    //         dispatch(clearErrors())
    //     }
    //     if (success) {
    //         alert.success('Comment posted successfully')
    //         dispatch({ type: NEW_COMMENT_RESET })
    //     }
    // }, [dispatch, alert, error, commentError, success, id]);

    const commentHandler = () => {
        const formData = new FormData();

        formData.set('text', text);
        formData.set('rescueId', id);

        dispatch(newComment(formData));
    }

    const adoptRescueHandler = (id) => {
        dispatch(newAdopt(id))
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={rescue.name} />

                    <div className="container mt-5">
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-7">
                                <div className="card-profile p-3 py-4">
                                    <div className="text-center">
                                        {/*<figure className='avatar avatar-profile'>
                                            <img className="rounded-circle img-fluid" src={user.avatar.url} alt={user.name} />
                                        </figure>*/}
                                        <div className="rescue_image" id="rescue_image">
                                            {rescue.image && <div key={rescue.image.public_id}><img className="rounded-circle img-fluid" src={rescue.image.url} alt="" />
                                        </div>}
                                        </div>
                                    </div>
                                    <div className="text-center mt-3"> 
                                        <hr />
                                        <h5><strong>Name:</strong> {rescue.name}</h5>
                                        <h5><strong>Breed:</strong> {rescue.breed}</h5>
                                        <h5><strong>Gender:</strong> {rescue.gender}</h5>
                                        <h5><strong>Age:</strong> {rescue.age}</h5>
                                        <h5><strong>Rescued on:</strong> {String(rescue.createdAt).substring(0, 10)}</h5>
                                        <hr />
                                        {/*<div className="buttons">*/}
                                            {/*{user ? <button id="review_btn" type="button" className="btn" data-toggle="modal" data-target="#ratingModal" >
                                                Comment
                                            </button> :
                                            <div className="alert alert-danger mt-5" type='alert'>Login to post your review.
                                            </div>
                                            }*/}
                                            {user && user.role === 'Adopter' && (
                                                <button type="button" id="adopt_rescue" className="btn" onClick={() => adoptRescueHandler(rescue._id)}>
                                                    Adopt
                                                </button>
                                            )}
                                            {/*<Link to="/password/update" id="edit_password" className="btn">
                                                Change Password
                                            </Link>*/}
                                        {/*</div>*/}
                                        {/*<div className="row mt-2 mb-5">
                                            <div className="rating w-50">*/}
                                                <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                                                    <div className="modal-dialog" role="document">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h5 className="modal-title" id="ratingModalLabel">Submit Comment</h5>
                                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <textarea
                                                                    name="comment"
                                                                    id="comment" className="form-control mt-3"
                                                                    value={text}
                                                                    onChange={(e) => setText(e.target.value)}
                                                                >
                                                                </textarea>
                                                                <button className="btncomment" onClick={commentHandler} data-dismiss="modal" aria-label="Close">Submit</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {rescue.comments && rescue.comments.length > 0 && (
                                                    <ListComments comments={rescue.comments} />
                                                    )}
                                                    {user ? <button id="review_btn" type="button" className="btn" data-toggle="modal" data-target="#ratingModal" >
                                                            Comment
                                                        </button> :
                                                        <div className="alert" type='alert'>Login to write a comment.
                                                        </div>
                                                    }
                                            {/*</div>
                                        </div>*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*<div className="row d-flex justify-content-around">
                        <div className="col-12 col-lg-5 img-fluid" id="rescue_image">
                            {rescue.image && <div key={rescue.image.public_id}><img className="rescueImage" src={rescue.image.url} alt="" />
                        </div>}
                        </div>
                        <div className="col-12 col-lg-5 mt-5">
                            <h4 className="mt-2">ID:</h4>
                            <h5>{rescue._id}</h5>
                            <hr />
                            <h4 className="mt-2">Name:</h4>
                            <h5>{rescue.name}</h5>
                            <hr />
                            <h4 className="mt-2">Breed:</h4>
                            <h5>{rescue.breed}</h5>
                            <hr />
                            <h4 className="mt-2">Gender:</h4>
                            <h5>{rescue.gender}</h5>
                            <hr />
                            <h4 className="mt-2">Age:</h4>
                            <h5>{rescue.age}</h5>
                            <hr />
                            {user && user.role === 'Adopter' && (
                                <button type="button" id="cart_btn" className="btn btn-primary mt-4" onClick={() => adoptRescueHandler(rescue._id)}>
                                    Adopt
                                </button>
                            )}
                            <hr />
                            {user ? <button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal" >
                                Comment
                            </button> :
                            <div className="alert alert-danger mt-5" type='alert'>Login to post your review.
                            </div>
                            }
                            <div className="row mt-2 mb-5">
                                <div className="rating w-50">
                                    <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="ratingModalLabel">Submit Comment</h5>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    <textarea
                                                        name="comment"
                                                        id="comment" className="form-control mt-3"
                                                        value={text}
                                                        onChange={(e) => setText(e.target.value)}
                                                    >

                                                    </textarea>
                                                    <button className="btn my-3 float-right review-btn px-4 text-white" onClick={commentHandler} data-dismiss="modal" aria-label="Close">Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {rescue.comments && rescue.comments.length > 0 && (
                                        <ListComments comments={rescue.comments} />
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>*/}
                </Fragment>
            )}
        </Fragment>
    )
}
export default RescueDetails