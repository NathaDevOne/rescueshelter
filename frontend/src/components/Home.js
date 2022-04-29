import React, { Fragment, useEffect, useState } from 'react'
import MetaData from './layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import { useAlert } from 'react-alert'
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { getRescues, getRescuedchart, getAdoptedchart} from '../actions/rescueActions'
import Rescue from './rescue/Rescue'

import Loader from './layout/Loader'

const Home = () => {
  const createSliderWithTooltip = Slider.createSliderWithTooltip;
  const Range = createSliderWithTooltip(Slider.Range);
  const dispatch = useDispatch();
  const alert = useAlert();

  const [age, setAge] = useState([1, 20]);
  const [currentPage, setCurrentPage] = useState(1)
  const [type, setType] = useState('');
  const [breed, setBreed] = useState('');
  const [gender, setGender] = useState('');

  const { loading, 
          rescues, 
          error, 
          rescuesCount, 
          resPerPage,
          filteredRescuesCount
  } = useSelector(state => state.rescues);

  let { keyword } = useParams();

  const types = [
    'Cat',
    'Dog'
    ]

  const breeds = [
    'Aspin',
    'Bulldog',
    'Retriever',
    'Labrador',
    'Munchkin',
    'Persian',
    'Puspin',
    'Shiba inu',
    'Siberian',
    'Siamese'
    ]

  const genders = [
    'Male',
    'Female'
    ]

  useEffect( () => { 
    dispatch(getRescuedchart())
    dispatch(getAdoptedchart())
    if(error){
      alert.success('success')
      return alert.error(error)
    }
    dispatch(getRescues(currentPage, keyword, age, type, breed, gender))
  }, [dispatch, alert, error, currentPage, keyword, age, type, breed, gender] );

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber)
  }

  let count = rescuesCount;

  if (keyword) {
        count = filteredRescuesCount
  }
    return (
    <Fragment>
    { loading ? <Loader /> : (
      <Fragment>
        <MetaData title={'Adopt Rescued Animals'} />
          <h1 id="rescues_heading">Rescued Animals</h1>
          {/*<section id="rescues" className="container mt-5">
            <div className="row">
              {rescues && rescues.map(rescue => (
              <Rescue key={rescue._id } rescue={rescue} />
              ))}
            </div>
          </section>*/}
          <section id="rescues" className="container mt-5">
            <div className="row">
            {keyword ? (
              <Fragment>
                <div className="col-6 col-md-3 mt-5 mb-5">
                  <div className="px-5">
                    <h4 className="mb-3">
                      &nbsp; &nbsp; Age
                    </h4>
                    <Range
                      marks={{
                        1: `1`,
                        20: `20`
                      }}
                      min={1}
                      max={20}
                      defaultValue={[1, 20]}
                      tipFormatter={value => `${value}`}
                      tipProps={{
                      placement: "top",
                      visible: true
                      }}
                      value={age}
                      onChange={age => setAge(age)}
                    />
                    <hr className="my-5" />
                      <div className="mt-5">
                        <h4 className="mb-3">
                          Type
                        </h4>
                        <ul className="pl-0">
                          {types.map(type => (
                            <li
                              style={{
                                cursor: 'pointer',
                                listStyleType: 'none'
                              }}
                              key={type}
                              onClick={() => setType(type)}
                            >
                            {type}
                            </li>
                          ))}
                        </ul>
                      </div>
                    <hr className="my-5" />
                      <div className="mt-5">
                        <h4 className="mb-3">
                          Breed
                        </h4>
                        <ul className="pl-0">
                          {breeds.map(breed => (
                            <li
                              style={{
                                cursor: 'pointer',
                                listStyleType: 'none'
                              }}
                              key={breed}
                              onClick={() => setBreed(breed)}
                            >
                            {breed}
                            </li>
                          ))}
                        </ul>
                      </div>
                    <hr className="my-5" />
                      <div className="mt-5">
                        <h4 className="mb-3">
                          Gender
                        </h4>
                        <ul className="pl-0">
                          {genders.map(gender => (
                            <li
                              style={{
                                cursor: 'pointer',
                                listStyleType: 'none'
                              }}
                              key={gender}
                              onClick={() => setGender(gender)}
                            >
                            {gender}
                            </li>
                          ))}
                        </ul>
                      </div>
                  </div>
                </div>
                <div className="col-6 col-md-9">
                  <div className="row">
                    {rescues.map(rescue => (
                    <Rescue key={rescue._id } rescue={rescue} col={4} />
                    ))}
                  </div>
                </div>
              </Fragment>
                ) : (
                rescues.map(rescue => (
                <Rescue key={rescue._id } rescue={rescue} col={3} />
                ))
              )}
            </div>
          </section>
          {resPerPage <= count && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={rescuesCount}
                onChange={setCurrentPageNo}
                nextPageText={'Next'}
                prevPageText={'Prev'}
                firstPageText={'First'}
                lastPageText={'Last'}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
      </Fragment>
      )
    }
    </Fragment>
  );
}
export default Home