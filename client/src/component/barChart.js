import axios from 'axios';
import { useEffect } from 'react';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)


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
}

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Sales',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: true,
      backgroundColor: 'rgb(54, 162, 235)', // Set the color to blue
    },
    {
      label: 'produce',
      data: [100, 9, 180, 50, 40, 20, 40],
      fill: true,
      backgroundColor: ['green', 'yellow'], // Set the color to blue
      // borderWidth: 30,
    },
  ],
}

const getResponses = async () => {
  try {
    console.log(1);
    const response = await axios.get('http://localhost:5000/ivr-call/responses');
    console.log(2);

    // const data= await response.json();
    // console.log(3);
    console.log(response);
  } catch (err) {
    console.warn("This is the error ", err);
  }
}

export const BarChart = () => {
  // useEffect(() => {
  //   console.log("Hey");
  //   getResponses();
  // }, []);
  // return <Bar options={options} data={data} />
  return (
    <>
      <h1>Swapnil</h1>
      <input type="date" id="myDate" value="2024-04-13" onSubmit={getResponses}></input>
    </>
  )

}
