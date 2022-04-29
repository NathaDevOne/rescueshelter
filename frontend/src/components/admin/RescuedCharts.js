import React, { Fragment, useState, useRef, useEffect } from 'react'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getRescuedchart, clearErrors } from '../../actions/rescueActions'

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

const RescuedCharts  = () => {
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
    const { loading, error, animalsrescued } = useSelector(state => state.rescuedChart);

    useEffect(() => {
        dispatch(getRescuedchart());

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
    console.log(animalsrescued);
    const groupstest = animalsrescued.reduce(
        (groupstest, rescued_rescue) => {
            const rescueddate = dateFormat(rescued_rescue.createdAt.split('T')[0], "mmmm")
            if (!groupstest[rescueddate]) {
                groupstest[rescueddate]=[]
            }
            groupstest[rescueddate].push(rescued_rescue);
            return groupstest;
        }, {}
    )
    console.log(groupstest);

//----------------------------------------------------------------------
    //this is for filtering data to be regroup into months
    const groups = animalsrescued.reduce(
        (groups, rescued_rescue) => {
            const rescueddate = rescued_rescue.createdAt;
            if (!groups[rescueddate]) {
                groups[rescueddate]=[]
            }
            groups[rescueddate].push(rescued_rescue);
            return groups;
        }, {}
    )
    console.log(groups);

    //Fetching Dates from groups
    const rescuedAnimalDate = Object.keys(groups)
    console.log(rescuedAnimalDate);

    // Fetching Date Counts from roups
    const rescuedAnimalCount = Object.values(groups)
    const rescuedAnimalCountLength = Object.values(rescuedAnimalCount).map((testvariable)=> {
        return testvariable.length
    })
    console.log(rescuedAnimalCountLength);
//----------------------------------------------------------------------

//----------------------------------------------------------------------
    // Regrouping Animal Rescued into Month name

    const animalDateMonth = rescuedAnimalDate.reduce(
    // const animalDateMonth = animalsrescued.reduce(
        (animalDateMonth, rescued_rescue) => {
            const rescueddate = dateFormat(rescued_rescue, "mmmm")
            if (!animalDateMonth[rescueddate]) {
                animalDateMonth[rescueddate]=[]
            }
            animalDateMonth[rescueddate].push(rescued_rescue);
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
    const [rescueDates, setRescueDates] = useState(rescueDateGroup);
    const [rescueDataPoints, setRescueDataPoints] = useState(animalCountLength);
    console.log(rescueDates, rescueDataPoints);

    //Input Type Date Data
    const [rescuedStart, setRescuedStart] = useState('2022-01-01');
    const [rescuedEnd, setRescuedEnd] = useState('2022-12-31');

    const rescuedRefStart = useRef();
    const rescuedRefEnd = useRef();

    //converting Obj into Array via Entries (keys and values included)
    const arrGroups = Object.entries(groups);
    // const arrGroups = Object.entries(animalDateMonth);
    console.log(arrGroups);

    //Function for changing the state of start date
    function filterData1() {

        let valueStart = rescuedRefStart.current.value;
        setRescuedStart(valueStart);
        let valueEnd = rescuedEnd;
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

        const newRescueDateGroup = rescueDateGroup.reduce((newRescueDateGroup, rescued_rescue )=>{
            const rescueddate = dateFormat(rescued_rescue, "mmmm")
            if (!newRescueDateGroup[rescueddate]) {
                newRescueDateGroup[rescueddate]=[]
            }
            newRescueDateGroup[rescueddate].push(rescued_rescue);

            // return dateFormat(item, "mmmm");
            return newRescueDateGroup;
            // return item;
        }, {});

        console.log(newRescueDateGroup);

        const uniqueDates = Object.keys(newRescueDateGroup);
        console.log(uniqueDates);
        setRescueDates(uniqueDates);

        const newRescueCount = Object.values(newRescueDateGroup)
        const newRescueCountLength = Object.values(newRescueCount).map((rescue)=> {
            return rescue.length
        })
        console.log(newRescueCountLength);
        setRescueDataPoints(newRescueCountLength);

    };

    //Function for changing the state of end date
    function filterData2() {

        let valueEnd = rescuedRefEnd.current.value;
        setRescuedEnd(valueEnd);
        // let valueStart = dateFormat(rescuedRefStart.current.value, "mmmm");
        let valueStart = rescuedStart;
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

        const newRescueDateGroup = rescueDateGroup.reduce((newRescueDateGroup, rescued_rescue )=>{
            const rescueddate = dateFormat(rescued_rescue, "mmmm")
            if (!newRescueDateGroup[rescueddate]) {
                newRescueDateGroup[rescueddate]=[]
            }
            newRescueDateGroup[rescueddate].push(rescued_rescue);

            // return dateFormat(item, "mmmm");
            return newRescueDateGroup;
            // return item;
        }, {});

        console.log(newRescueDateGroup);

        const uniqueDates = Object.keys(newRescueDateGroup);
        console.log(uniqueDates);
        setRescueDates(uniqueDates);

        const newRescueCount = Object.values(newRescueDateGroup)
        const newRescueCountLength = Object.values(newRescueCount).map((rescue)=> {
            return rescue.length
        })
        console.log(newRescueCountLength);
        setRescueDataPoints(newRescueCountLength);

    };

    //Setting up datas to Bar chart
    const state = {
        labels: rescueDates,
        datasets: [
            {
                label: 'Animal',
                backgroundColor: 'rgb(255, 222, 239)',
                borderColor: 'rgba(144,36,172)',
                borderWidth: 2,
                data: rescueDataPoints
            }
        ]
    }
    
    return (
    	<Fragment>
        <MetaData title={'Dashboard'} />
            <div className="row">
                <div className="col-12 col-md-2">
                        <Sidebar />
                </div>
            	{loading ? <Loader /> : (
                    <div className="col-md-8 text-center">
                        <h3 className="my-4">Rescued Animal</h3>
                        <Bar
                            data={state}
                            options={options}
                        />
                        <div className="form-group">
                            <label >From:</label>
                            <input type="date" ref={rescuedRefStart} onChange={filterData1}/>
                            <label > To:</label>
                            <input type="date" ref={rescuedRefEnd} onChange={filterData2}/>
                        </div>
                    </div>
                )}
            </div>
        </Fragment>
    )
}
export default RescuedCharts
