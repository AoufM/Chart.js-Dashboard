


// import React, { useState, useEffect } from 'react';
// import { Pie } from 'react-chartjs-2';

// const PieChart = ({ chartData }) => {
//     const [pieChartData, setPieChartData] = useState(null);

//     useEffect(() => {
//         if (chartData) {
//             const topics = {};
//             const regions = {};
//             let totalYear = 0;
//             let totalCount = chartData.length;

//             chartData.forEach(item => {
//                 if (!topics[item.topic]) {
//                     topics[item.topic] = 0;
//                 }
//                 topics[item.topic]++;

//                 if (!regions[item.region]) {
//                     regions[item.region] = 0;
//                 }
//                 regions[item.region]++;

//                 totalYear += parseInt(item.start_year);
//             });

//             const avgTopics = Object.keys(topics).map(topic => topics[topic] / totalCount);
//             const avgRegions = Object.keys(regions).map(region => regions[region] / totalCount);
//             const avgYear = totalYear / totalCount;

//             const pieData = {
//                 labels: ['Average Topics', 'Average Regions', 'Average Year'],
//                 datasets: [{
//                     data: [avgTopics.length ? avgTopics.reduce((a, b) => a + b, 0) / avgTopics.length : 0,
//                            avgRegions.length ? avgRegions.reduce((a, b) => a + b, 0) / avgRegions.length : 0,
//                            avgYear],
//                     backgroundColor: ['red', 'blue', 'green'],
//                 }]
//             };

//             setPieChartData(pieData);
//         }
//     }, [chartData]);

//     return (
//         <div className='main-container'>
//             <h2>Pie Chart</h2>
//             <div className='barChart'>
//                 {pieChartData && <Pie data={pieChartData} options={{
//                     animation: {
//                         duration: 2000,
//                         easing: 'easeInOutQuad',
//                     },
//                     plugins: {
//                         legend: {
//                             labels: {
//                                 font: {
//                                     size: 20,
//                                 },
//                             },
//                         },
//                     },
//                     responsive: true,
//                 }} />}
//             </div>
//         </div>
//     );
// }

// export default PieChart;


import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';


const PieChart = ({ chartData }) => {
    const [pieChartData, setPieChartData] = useState(null);
    const [selectedTopics, setSelectedTopics] = useState([]);

    useEffect(() => {
        if (chartData) {
            const allTopics = chartData.map(item => item.topic);
            const randomTopics = allTopics.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 2) + 3);
            setSelectedTopics(randomTopics);
        }
    }, [chartData]);
    useEffect(() => {
        if (chartData && selectedTopics.length > 0) {
            const topics = {};
            let totalCount = 0;

            chartData.forEach(item => {
                if (selectedTopics.includes(item.topic)) {
                    if (!topics[item.topic]) {
                        topics[item.topic] = 0;
                    }
                    topics[item.topic]++;
                    totalCount++;
                }
            });

            const avgTopics = selectedTopics.map(topic => topics[topic] / totalCount);

            const pieData = {
                labels: selectedTopics,
                datasets: [{
                    data: avgTopics,
                    backgroundColor: getRandomColorArray(selectedTopics.length),
                }]
            };

            setPieChartData(pieData);
        }
    }, [chartData, selectedTopics]);
    
    const getRandomColorArray = (length) => {
        const colors = [];
        for (let i = 0; i < length; i++) {
            colors.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
        }
        return colors;
    };

    const easeInOutQuad = (t) => {
        t /= 0.5;
        if (t < 1) return 0.5 * t * t;
        t--;
        return -0.5 * (t * (t - 2) - 1);
      };


    return (
        <div className='main-container'>
            <h2>Pie Chart</h2>
            
            <div className='pieChart'>
                {pieChartData && <Pie data={pieChartData} options={{
                    animation: {
                        duration: 2000,
                        easing: easeInOutQuad(3000),
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
                }} />}
            </div>
        </div>
    );
}

export default PieChart;

