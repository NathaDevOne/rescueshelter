import React from 'react'
import { Link } from 'react-router-dom'

const Rescue = ({rescue}) => {
 return ( 
 <div className="col-sm-12 col-md-6 col-lg-3 my-3">
    <div className="card-rescue p-3 rounded">
      <img alt=""
        className="card-img-top mx-auto"
        src={rescue.image.url}
      />
      {/*<div className="card-body d-flex flex-column">
        <h5 className="card-title">
        <a href="">Name: {rescue.name}</a>
        </h5>
        <h5 className="card-text">Breed: {rescue.breed}</h5>
          <Link to={`/rescue/${rescue._id}`} id="view_btn" className="btn btn-block">View Details</Link>
       </div>*/}
        <div className="text-center mt-3">
          <p><strong>Name:</strong> {rescue.name}</p>
          <p><strong>Breed:</strong> {rescue.breed}</p>
          <Link to={`/rescue/${rescue._id}`} id="view_btn" className="btn btn-block">View Details</Link>
        </div>
    </div>
  </div>
  )
}

export default Rescue