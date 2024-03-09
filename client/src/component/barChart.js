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
      backgroundColor: ['green','yellow'], // Set the color to blue
      // borderWidth: 30,
    },
  ],
}

export const BarChart = () => {
  return <Bar options={options} data={data} />
}
