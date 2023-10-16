import React, { useState, useContext } from "react";
import Table from "./components/Table";
import UploadButton from "./components/UploadButton";
import AddDataButton from "./components/AddDataButton";
import { GlobalContext } from "./context/GlobalState";
import Charts from "./components/Charts";
import ChartUploadButton from "./components/Charts/ChartUploadButton";

function App() {
  const { tableData } = useContext(GlobalContext);
  const [data, setData] = useState([]);
  const [openPieChart, setIsOpenPieChart] = useState(false);
  const [chartType, setChartType] = useState("");

  const toggleChart = (type) => {
    setChartType(type);
    setIsOpenPieChart(true);
  };

  return (
    <div className="container">
      <div className="button-container">
        <UploadButton data={data} setData={setData} />

        {data?.length !== 0 && <AddDataButton newData={tableData} />}
      </div>

      {tableData.length > 0 && <Table />}
      {tableData.length > 0 && (
        <div className="btn-container">
          <div>
            <ChartUploadButton
              type="pie"
              openPieChart={openPieChart}
              setIsOpenPieChart={setIsOpenPieChart}
              chartType={chartType}
              setChartType={setChartType}
            />
            <ChartUploadButton
              type="bar"
              openPieChart={openPieChart}
              setIsOpenPieChart={setIsOpenPieChart}
              chartType={chartType}
              setChartType={setChartType}
            />
          </div>
        </div>
      )}

      {chartType && <Charts type={chartType} toggleChart={toggleChart} />}
    </div>
  );
}

export default App;
