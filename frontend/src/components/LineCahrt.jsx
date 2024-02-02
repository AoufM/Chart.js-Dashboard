import React from 'react'
import { Line } from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';


const LineCahrt = ({chartData}) => {
  if (!chartData || !chartData.datasets || chartData.datasets.length === 0) {
    return <div>No data available</div>;
  }

  const easeInOutQuad = (t) => {
    t /= 0.5;
    if (t < 1) return 0.5 * t * t;
    t--;
    return -0.5 * (t * (t - 2) - 1);
  };
  const pointRadius = 4;
  const lineTension = 0.5;

  return (
    <div className='main-container'>
      <h2>Line Chart</h2>
       <div className='lineChart'>
      
      <Line data={chartData} options={{
        animation:{
          duration:2000,
          easing:easeInOutQuad(3000),
        },
        scales: {
          y: {
            ticks: {
              font: {
                size: 16, 
                weight:900,

              },
            },
          },
          x: {
            ticks: {
              font: {
                size: 16, 
                weight:900,

              },
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              font: {
                size: 20,
                weight:900,
               
              },
            },
          },
        },
        responsive: true,
        elements: {
          line: {
              tension: lineTension, 
          },
          point:{
            radius:pointRadius,
          }
      },
      }}/>
   
    </div>
    </div>
  )
}

export default LineCahrt
