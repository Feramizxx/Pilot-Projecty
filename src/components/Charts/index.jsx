import React, { useState, useEffect, useContext } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Doughnut, Pie, Bar } from "react-chartjs-2";
import { GlobalContext } from "../../context/GlobalState";

// import { Chart, ArcElement,CategoryScale } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
);


const Charts = ({ openPieChart, setIsOpenPieChart, type }) => {
  const { employees } = useContext(GlobalContext);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ["red", "green", "blue"],
      },
    ],
  });

  const [Data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Length Sum",
        data: [],
        backgroundColor: ["red", "green", "blue"],
      },
    ],
  });

  useEffect(() => {
    const groupedEmployees = employees.reduce((acc, employee) => {
      const status = employee.status;

      if (!acc[status]) {
        acc[status] = [];
      }

      acc[status].push(employee);

      return acc;
    }, {});

    const totalEmployees = employees.length;

    const data = Object.keys(groupedEmployees).map((status) => {
      const count = groupedEmployees[status].length;
      const percentage = ((count / totalEmployees) * 100).toFixed(2);

      return {
        label: `Status ${status} (${percentage}%)`,
        value: count,
        percentage: ((count / totalEmployees) * 100).toFixed(2),
      };
    });

    setChartData({
      labels: data.map((d) => d.label),
      datasets: [
        {
          data: data.map((d) => d.value),
          backgroundColor: ["red", "green", "blue"],
        },
      ],
    });

    const barData = Object.keys(groupedEmployees).map((status) => {
      const sum = groupedEmployees[status].reduce(
        (acc, employee) => acc + employee.len,
        0,
      );

      return {
        label: `Status ${status}`,
        value: sum,
      };
    });
    const updatedData = {
      labels: barData.map((d) => d.label),
      datasets: [
        {
          label: "Length Sum",
          data: barData.map((d) => d.value),
          backgroundColor: ["red", "green", "blue"],
        },
      ],
    };

    setData(updatedData);
  }, [employees]);


  const options = {
    legend: {
      display: true,
      position: "bottom", // Position can be 'top', 'bottom', 'left', 'right', etc.
      labels: {
        fontColor: "black",
        fontSize: 20,
      },
    },
  };

  const baroptions = {
    title: {
      display: true,
      text: "Employee Status Length Sum",
    },
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

  console.log(employees, "emplooo");

  return (
    <div className="App" style={{ width: "30%", height: "30%" }}>
      <h2>Our {type === "pie" ? "Pie  chart" : "Bar graph"}: </h2>
      {type === "pie" && employees.length !== 0 && (
        <Doughnut data={chartData} />
      )}
      {type === "bar" && employees.length !== 0 ? <Bar data={Data} /> : ""}
    </div>
  );
};

export default Charts;
