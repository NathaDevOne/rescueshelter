import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { newRescue, clearErrors } from '../../actions/rescueActions'
import { getAdminDiseases } from '../../actions/diseaseActions'
import { getAdminInjuries } from '../../actions/injuryActions'
import { NEW_RESCUE_RESET } from '../../constants/rescueConstants'

const NewRescue = () => {

    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [breed, setBreed] = useState('')
    const [gender, setGender] = useState('')
    const [age, setAge] = useState('')
    const [getdiseases, setDiseases] = useState([])
    const [getinjuries, setInjuries] = useState([])
    const [image, setImage] = useState('')
    const [imagePreview, setImagePreview] = useState('/images/default_animal.jpg')

    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate = useNavigate()

    const { loading, error, success } = useSelector(state => state.newRescue);
    const { diseases } = useSelector(state => state.diseases);
    const { injuries } = useSelector(state => state.injuries);

    useEffect(() => {
        (dispatch(getAdminDiseases))
        (dispatch(getAdminInjuries))

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (success) {
            navigate('/admin/rescues');
            alert.success('Animal created successfully');
            dispatch({ type: NEW_RESCUE_RESET })
        }

    }, [dispatch, alert, error, success, navigate])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('type', type);
        formData.set('breed', breed);
        formData.set('gender', gender);
        formData.set('age', age);
        formData.set('image', image);

        getdiseases.forEach(getdisease => formData.append('diseases', getdisease))
        getinjuries.forEach(getinjury => formData.append('injuries', getinjury))

        dispatch(newRescue(formData))
    }

    const onChange = e => {

            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagePreview(reader.result)
                    setImage(reader.result)
                }
            } 

            reader.readAsDataURL(e.target.files[0])
    }

    return (
        <Fragment>
            <MetaData title={'New Animal'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="row wrapper">
                            <div className="col-10 col-lg-5">
                                <form className="" onSubmit={submitHandler} encType='multipart/form-data'>
                                    <h1 className="mb-4">New Animal</h1>

                                    <div className="form-group">
                                        <label htmlFor="name_field">Name</label>
                                        <input
                                            type="name"
                                            id="name_field"
                                            className="form-control"
                                            name='name'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="type_field">Type</label>
                                        <select
                                            id="type_field"
                                            className="form-control"
                                            name='type'
                                            value={type}
                                            onChange={(e) => setType(e.target.value)}
                                        >
                                            <option value="" disabled hidden>--Select type--</option>
                                            <option value="Cat">Cat</option>
                                            <option value="Dog">Dog</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="breed_field">Breed</label>
                                        <select
                                            id="breed_field"
                                            className="form-control"
                                            name='breed'
                                            value={breed}
                                            onChange={(e) => setBreed(e.target.value)}
                                        >
                                            <option value="" disabled hidden>--Select breed--</option>
                                            <option value="Aspin">Aspin</option>
                                            <option value="Bulldog">Bulldog</option>
                                            <option value="Retriever">Retriever</option>
                                            <option value="Labrador">Labrador</option>
                                            <option value="Munchkin">Munchkin</option>
                                            <option value="Persian">Persian</option>
                                            <option value="Puspin">Puspin</option>
                                            <option value="Shiba inu">Shiba inu</option>
                                            <option value="Siberian">Siberian</option>
                                            <option value="Siamese">Siamese</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="gender_field">Gender</label>
                                        <select
                                            id="gender_field"
                                            className="form-control"
                                            name='gender'
                                            value={gender}
                                            onChange={(e) => setGender(e.target.value)}
                                        >
                                            <option value="" disabled hidden>--Select gender--</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="age_field">Age</label>
                                        <input
                                            type="age"
                                            id="age_field"
                                            className="form-control"
                                            name='age'
                                            value={age}
                                            onChange={(e) => setAge(e.target.value)}
                                        />
                                    </div>

                                    <div className="row">
                                        <div className="col">
                                            <div className="form-group">
                                                <label htmlFor="disease_field">Diseases:</label>
                                                {diseases.map(disease => (
                                                    <div key={disease._id}>
                                                        <input
                                                        type="checkbox"
                                                        id="checkbox"
                                                        name='checkbox'
                                                        value={disease._id}
                                                        onChange={e => setDiseases([...getdiseases, disease._id])}
                                                    />
                                                    <label className="">{disease.name}</label>
                                                    </div>
                                                    ))}
                                            </div>
                                        </div>
                                        
                                        <div className="col">
                                            <div className="form-group">
                                                <label htmlFor="injury_field">Injuries:</label>
                                                {injuries.map(injury => (
                                                    <div key={injury._id}>
                                                        <input
                                                        type="checkbox"
                                                        id="checkbox"
                                                        name='checkbox'
                                                        value={injury._id}
                                                        onChange={e => setInjuries([...getinjuries, injury._id])}
                                                    />
                                                    <label className="">{injury.name}</label>
                                                    </div>
                                                    ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className='form-group'>
                                        <label htmlFor='avatar_upload'>Image</label>
                                        <div className='d-flex align-items-center'>
                                            <div>
                                                <figure className='avatar mr-3 item-rtl'>
                                                    <img
                                                        src={imagePreview}
                                                        className='rounded-circle'
                                                        alt='Avatar Preview'
                                                    />
                                                </figure>
                                            </div>
                                            <div className='custom-file'>
                                                <input
                                                    type='file'
                                                    name='image'
                                                    className='custom-file-input'
                                                    id='customFile'
                                                    accept="images/*"
                                                    onChange={onChange}
                                                />
                                                <label className='custom-file-label' htmlFor='customFile'>
                                                    Choose Image
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <button
                                        id="login_button"
                                        type="submit"
                                        className="btn btn-block py-3"
                                        disabled={loading ? true : false}
                                    >
                                        CREATE
                                    </button>

                                </form>
                            </div>
                        </div>
                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}
export default NewRescue
