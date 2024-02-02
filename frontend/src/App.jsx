import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import BarChart from "./components/BarChart";
import LineCahrt from "./components/LineCahrt";
import PieChart from "./components/PieChart";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [barChartData, setBarChartData] = useState({
    labels: [],
    datasets: [
      {
        label: " Average Intensities in each Region",
        data: [],
        backgroundColor: [
          "aquamarine",
          "aqua",
          "red",
          "green",
          "yellow",
          "purple",
        ],
        barThickness: 20,
      },
    ],
  });
  const [lineChartData, setLineChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Topics and thier Likelihood",
        data: [],
        backgroundColor: [
          "burlywood",
          "cadetblue",
          "chartreuse",
          "crimson",
          "darkkhaki",
          "darkturquoise",
          "limegreen",
          'cadetblue'
        ],
      },
    ],
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:4000/");
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading) {
      const groupedData = {};
      const groupedData2 = {};

      const averageIntensities = [];
      const averageLikelihoodAndTopics = [];

      data.forEach((item) => {
        if (!groupedData[item.region]) {
          groupedData[item.region] = [];
        }
        groupedData[item.region].push(item);
      });

      data.forEach((item) => {
        if (!groupedData2[item.topic]) {
          groupedData2[item.topic] = [];
        }
        groupedData2[item.topic].push(item);
      });

      for (const region in groupedData) {
        const intensities = groupedData[region].map((item) => item.intensity);
        const totalIntensity = intensities.reduce(
          (total, current) => total + current,
          0
        );
        const averageIntensity = Math.round(
          totalIntensity / intensities.length
        );
        averageIntensities.push({ region, averageIntensity });
      }

      for (const topic in groupedData2) {
        const likelihoods = groupedData2[topic].map((item) => item.likelihood);
        const totalLikelihood = likelihoods.reduce(
          (total, current) => total + current,
          0
        );
        const averageLikelihood = Math.round(
          totalLikelihood / likelihoods.length
        );
        averageLikelihoodAndTopics.push({ topic, averageLikelihood });
      }

      setBarChartData({
        labels: averageIntensities.map((item) => item.region),
        datasets: [
          {
            label: " Average Intensities in each Region",
            data: averageIntensities.map((item) => item.averageIntensity),
            backgroundColor: [
              "burlywood",
              "cadetblue",
              "chartreuse",
              "crimson",
              "darkkhaki",
              "darkturquoise",
              "limegreen"
            ],
            barThickness: 26,
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
      setLineChartData({
        labels: averageLikelihoodAndTopics.map((item) => item.topic),
        datasets: [
          {
            label: "Topics and thier Likelihood in all regions",
            data: averageLikelihoodAndTopics.map(
              (item) => item.averageLikelihood
            ),
            backgroundColor: [
              "aquamarine",
              "aqua",
              "red",
              "green",
              "yellow",
              "purple",
              'teal',
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
    }
  }, [data, loading]);

  return (
    <div className="App">

      {loading ? (
        <h1 className="loading-text loading-animation" align='center'>Loading...</h1>
      ) : (
        <div className="barChart-container">
          <BarChart chartData={barChartData} />
        </div>
      )}

      {loading ? (
        <h1 className="loading-text loading-animation"  align='center'>Loading...</h1>
      ) : (
        <div className="lineChart-container">
          <LineCahrt chartData={lineChartData} />
        </div>
      )}

      {loading ? (
        <h1 className="loading-text loading-animation"  align='center'>Loading...</h1>
      ) : (
        <div className="pieChart-container">
          <PieChart chartData={data} />
        </div>
      )}

    </div>
  );
}

export default App;
