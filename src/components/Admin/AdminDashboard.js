import React, {useContext, useState} from 'react'
import UserContext from '../../contexts/UserContext'
import { Bar } from 'react-chartjs-2';
import {today} from '../../utils/date'
import DialogForm from '../DialogForm'
import FilterDashboard from './FilterDashboard'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
const AdminDashboard = () => {
    const userContext = useContext(UserContext);
    const [open, setOpen] = useState(false)
    const handleClose = () => setOpen(!open)
    const [state, setState] = useState({
      good:50,
      mild:15,
      severe:35,
      infected:40,
      vaccinated:5
    })
    const [dateSet, setDate] = useState(today)
    const data = {
        labels: ['Good', 'Mild', 'Severe', 'Infected','Vaccinated'],
        datasets: [
          {
            label: '# of Visitors',
            data: [state.good, state.mild, state.severe ,state.infected ,state.vaccinated],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
    return(
        <div>
             <div className='buttons'>
               <div id='date'>
                 <span>Date: {dateSet}</span>
               </div>
                <div>
                    <button className='btn btn-add icon' onClick={() => setOpen(true)}>
                            <CalendarTodayIcon/>
                            <span>Choose a Date</span>
                    </button>  
                </div>
            </div>
             <Bar data={data} options={options} />
             <DialogForm open={open} setOpen={setOpen} title={'Filter By Date'} content={'Choose a date of your choice to filter the graph'}>
                <FilterDashboard setOpen={setOpen} handleClose={handleClose} setState={setState} setDate={setDate}/>
            </DialogForm>
        </div>
    )
}

export default AdminDashboard;