import React, { Fragment, useState, useRef, useEffect } from 'react'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getAdoptedchart, clearErrors } from '../../actions/rescueActions'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

import dateFormat from 'dateformat';
import {Chart as ChartJS,
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

const AdoptedCharts  = () => {
	const alert = useAlert();
	const dispatch = useDispatch();

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );
    const { loading, error, animalsadopted } = useSelector(state => state.adoptedChart);

    useEffect(() => {
        dispatch(getAdoptedchart());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error])

    const options = {
        indexAxis: 'x',
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Rescued animal per month',
            },
        },
    };
//----------------------------------------------------------------------
    // Regrouping Animal Rescued information into array for setting up data to charts
    console.log(animalsadopted);
    const groupstest = animalsadopted.reduce(
        (groupstest, adopted_rescue) => {
            const adopteddate = dateFormat(adopted_rescue.adoptedAt.split('T')[0], "mmmm")
            if (!groupstest[adopteddate]) {
                groupstest[adopteddate]=[]
            }
            groupstest[adopteddate].push(adopted_rescue);
            return groupstest;
        }, {}
    )
    console.log(groupstest);

//----------------------------------------------------------------------
    //this is for filtering data to be regroup into months
    const groups = animalsadopted.reduce(
        (groups, adopted_rescue) => {
            const adopteddate = adopted_rescue.adoptedAt;
            if (!groups[adopteddate]) {
                groups[adopteddate]=[]
            }
            groups[adopteddate].push(adopted_rescue);
            return groups;
        }, {}
    )
    console.log(groups);

    //Fetching Dates from groups
    const adoptedAnimalDate = Object.keys(groups)
    console.log(adoptedAnimalDate);

    // Fetching Date Counts from roups
    const adoptedAnimalCount = Object.values(groups)
    const adoptedAnimalCountLength = Object.values(adoptedAnimalCount).map((testvariable)=> {
        return testvariable.length
    })
    console.log(adoptedAnimalCountLength);
//----------------------------------------------------------------------

//----------------------------------------------------------------------
    // Regrouping Animal Rescued into Month name

    const animalDateMonth = adoptedAnimalDate.reduce(
    // const animalDateMonth = animalsadopted.reduce(
        (animalDateMonth, adopted_rescue) => {
            const adopteddate = dateFormat(adopted_rescue, "mmmm")
            if (!animalDateMonth[adopteddate]) {
                animalDateMonth[adopteddate]=[]
            }
            animalDateMonth[adopteddate].push(adopted_rescue);
            return animalDateMonth;
        }, {}
    )
    console.log(animalDateMonth);

    const rescueDateGroup  = Object.keys(animalDateMonth)
    console.log(rescueDateGroup);

    const animalCount = Object.values(animalDateMonth)
    const animalCountLength = Object.values(animalCount).map((rescue)=> {
        return rescue.length
    })
    console.log(animalCountLength);
//----------------------------------------------------------------------

    // Setting States

    //Bar Chart Data
    const [adoptDates, setAdoptDates] = useState(rescueDateGroup);
    const [adoptDataPoints, setAdoptDataPoints] = useState(animalCountLength);
    console.log(adoptDates, adoptDataPoints);

    //Input Type Date Data
    const [adoptedStart, setAdoptedStart] = useState('2022-01-01');
    const [adoptedEnd, setAdoptedEnd] = useState('2022-12-31');

    const adoptedRefStart = useRef();
    const adoptedRefEnd = useRef();

    //converting Obj into Array via Entries (keys and values included)
    const arrGroups = Object.entries(groups);
    // const arrGroups = Object.entries(animalDateMonth);
    console.log(arrGroups);

    //Function for changing the state of start date
    function filterData1() {

        let valueStart = adoptedRefStart.current.value;
        setAdoptedStart(valueStart);
        let valueEnd = adoptedEnd;
        // let valueEnd = dateFormat(rescuedEnd, "mmmm");
        console.log(valueStart);
        console.log(valueEnd );

        console.log(arrGroups);
        // const newgroups = arrGroups.filter(
        const newgroups = arrGroups.filter(
            (obj) =>{
                return  obj >= valueStart &&  obj <= valueEnd
            }
        )
        console.log(newgroups);

        const newData = Object.fromEntries(newgroups);
        console.log(newData);


        const rescueDateGroup  = Object.keys(newData)
        // const animalDateGroup  = Object.entries(newData)
        console.log(rescueDateGroup);

        const newRescueDateGroup = rescueDateGroup.reduce((newRescueDateGroup, adopted_rescue )=>{
            const adopteddate = dateFormat(adopted_rescue, "mmmm")
            if (!newRescueDateGroup[adopteddate]) {
                newRescueDateGroup[adopteddate]=[]
            }
            newRescueDateGroup[adopteddate].push(adopted_rescue);

            // return dateFormat(item, "mmmm");
            return newRescueDateGroup;
            // return item;
        }, {});

        console.log(newRescueDateGroup);

        const uniqueDates = Object.keys(newRescueDateGroup);
        console.log(uniqueDates);
        setAdoptDates(uniqueDates);

        const newRescueCount = Object.values(newRescueDateGroup)
        const newRescueCountLength = Object.values(newRescueCount).map((rescue)=> {
            return rescue.length
        })
        console.log(newRescueCountLength);
        setAdoptDataPoints(newRescueCountLength);

    };

    //Function for changing the state of end date
    function filterData2() {

        let valueEnd = adoptedRefEnd.current.value;
        setAdoptedEnd(valueEnd);
        // let valueStart = dateFormat(rescuedRefStart.current.value, "mmmm");
        let valueStart = adoptedStart;
        // let valueEnd = dateFormat(rescuedEnd, "mmmm");
        console.log(valueStart);
        console.log(valueEnd );

        console.log(arrGroups);
        // const newgroups = arrGroups.filter(
        const newgroups = arrGroups.filter(
            (obj) =>{
                return  obj >= valueStart &&  obj <= valueEnd
            }
        )
        console.log(newgroups);

        const newData = Object.fromEntries(newgroups);
        console.log(newData);


        const rescueDateGroup  = Object.keys(newData)
        // const rescueDateGroup  = Object.entries(newData)
        console.log(rescueDateGroup);

        const newRescueDateGroup = rescueDateGroup.reduce((newRescueDateGroup, adopted_rescue )=>{
            const adopteddate = dateFormat(adopted_rescue, "mmmm")
            if (!newRescueDateGroup[adopteddate]) {
                newRescueDateGroup[adopteddate]=[]
            }
            newRescueDateGroup[adopteddate].push(adopted_rescue);

            // return dateFormat(item, "mmmm");
            return newRescueDateGroup;
            // return item;
        }, {});

        console.log(newRescueDateGroup);

        const uniqueDates = Object.keys(newRescueDateGroup);
        console.log(uniqueDates);
        setAdoptDates(uniqueDates);

        const newRescueCount = Object.values(newRescueDateGroup)
        const newRescueCountLength = Object.values(newRescueCount).map((animal)=> {
            return animal.length
        })
        console.log(newRescueCountLength);
        setAdoptDataPoints(newRescueCountLength);

    };

    //Setting up datas to Bar chart
    const state = {
        labels: adoptDates,
        datasets: [
            {
                label: 'Animal',
                backgroundColor: 'rgb(255, 222, 239)',
                borderColor: 'rgba(144,36,172)',
                borderWidth: 2,
                data: adoptDataPoints
            }
        ]
    }
    
    return (
    	<Fragment>
        <MetaData title={'Dashboard'} />
            <div className="row">
                <div className="col-12 col-md-2 text">
                        <Sidebar />
                </div>
            	{loading ? <Loader /> : (
                    <div className="col-md-8 text-center">
                        <h1 className="my-4">Adopted Animal</h1>
                        <Bar
                            data={state}
                            options={options}
                        />
                        <div className="form-group">
                            <label >From:</label>
                            <input type="date" ref={adoptedRefStart} onChange={filterData1}/>
                            <label > To:</label>
                            <input type="date" ref={adoptedRefEnd} onChange={filterData2}/>
                        </div>
                    </div>
                )}
            </div>
        </Fragment>
    )
}
export default AdoptedCharts
