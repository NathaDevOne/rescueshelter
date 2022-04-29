import React, { Fragment, useEffect } from 'react'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import { myAdopteds, clearErrors } from '../../actions/rescueActions'

const AdoptedRescues = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, rescues} = useSelector(state => state.adopted);

    useEffect(() => {
        dispatch(myAdopteds());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error])
 
    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'All Adopteds'} />
                    <h1 id="rescues_heading">Your adopted animals</h1>
                     <div className="col-6 col-md-9">
                        <div className="row">
                            {rescues && rescues.map(rescue => (
                                <div key={rescue._id} className="col-sm-12 col-md-6 col-lg-3 my-3">
                                    <div className="card-rescue p-3 rounded">
                                      <img alt=""
                                        className="card-img-top mx-auto"
                                        src={rescue.image.url}
                                      />
                                        <div className="text-center mt-3">
                                          <p><strong>Name:</strong> {rescue.name}</p>
                                          <p><strong>Breed:</strong> {rescue.breed}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default AdoptedRescues