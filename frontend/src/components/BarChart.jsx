import React from 'react';
import {Bar} from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';

const BarChart = ({ chartData,options }) => {
  if (!chartData || !chartData.datasets || chartData.datasets.length === 0) {
    return <div>No data available</div>;
  }
 
  const easeInOutQuad = (t) => {
    t /= 0.5;
    if (t < 1) return 0.5 * t * t;
    t--;
    return -0.5 * (t * (t - 2) - 1);
  };
  const borderRadius = 14;

  return (
    <div className='main-container'>
      <h2>Bar Chart</h2>
    <div className='barChart'>
      
      <Bar data={chartData} options={{
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
        elements:{
          bar:{
            borderRadius:borderRadius,
          }
        }
        
      }}/>
     
    </div>
    </div>
  );
};

export default BarChart
