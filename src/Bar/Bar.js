import React from 'react';
import { Chart as ChartJS,  CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip,
Legend, Filler } from "chart.js"
import { Line } from "react-chartjs-2"
ChartJS.register(
   CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler 
)

const Bar = ({labelDate, labelBmi}) => {

  function getGradient(ctx) {
     const gradient = ctx.createLinearGradient(63, 81, 200, 700)
    gradient.addColorStop(0, '#7d8ac1');
     gradient.addColorStop(0.5, '#172b4c')
     gradient.addColorStop(1, '#34466e')
      gradient.addColorStop(1, '#465783')
    return gradient
  } 

  const data =  {
    labels: labelDate,
    datasets: [
      {
        label: 'BMI',
        data: labelBmi,
        fill: true,
        backgroundColor: (context) => {
          const chart = context.chart
          const { ctx, chartArea} = chart
          if(!chartArea) {
            return null;
          }
           return getGradient(ctx)
        },
        borderColor: '#3F51B5',
        pointRadius: 6,
        pointHoverRadius: 8,
        pointHoverBorderColor: 'white',
        pointHoverBorderWidth: 2,
        pointHoverBackgroundColor: "#3F51B5",
        tension: 0.4
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: 
        {
          ticks: {
             color: 'white'
          },
          title: {
             display: true,
             text: "Date",
             color: 'white'
          },
          grid: {
          color: (context) => {
              if(context.tick.value === 0) {
                return 'white'
              }
            }
          }
        },
      y: 
        {
          beginAtZero: true,
          ticks: {
             color: 'white'
          },
          title: {
             display: true,
             text: "BMI",
             color: 'white',
             fontSize: '60px'
          },
          grid : {
            color: (context) => {
              // if(context.tick.value === parseInt(Math.min(...labelBmi))) {
                if(context.tick.value === 0) {
                return 'white'
              }
            }
          }
        }
    },
    plugins: { 
      legend: {
        labels: {
          color: 'white'
        }
      },
      tooltip: {
        displayColors: false,
        yAlign: 'bottom',
        backgroundColor: 'red',
        callbacks: {
          labelTextColor: (context) => {
            return "#172b4d"
          }
        }
      },
    },
  }
    
    return (
         <> 
          <Line data={data} options={options} />
         </>
    ) 
}

export default Bar;