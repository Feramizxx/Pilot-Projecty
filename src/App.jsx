import React, { useState, useContext } from "react";
import PagintaionButton from "./components/PaginationButtons";
import Table from "./components/Table";
import UploadButton from "./components/UploadButton";
import AddDataButton from "./components/AddDataButton";
import { GlobalContext } from "./context/GlobalState";
import Charts from "./components/Charts";
import ChartUploadButton from "./components/Charts/ChartUploadButton";

function App() {
  const { tableData } = useContext(GlobalContext);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openPieChart, setIsOpenPieChart] = useState(false);
  const [chartType, setChartType] = useState("");
  const itemsPerPage = 100;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = tableData?.slice(startIndex, endIndex);
  const totalPages = Math.ceil(tableData?.length / itemsPerPage) || "unknown";
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const toggleChart = (type) => {
    setChartType(type);
    setIsOpenPieChart(true);
  };

  return (
    <div className="container">
      <div className="button-container">
        <UploadButton
          data={data}
          setData={setData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        {data?.length !== 0 && <AddDataButton newData={tableData} />}
      </div>

      <Table
        paginatedData={paginatedData}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
      />

      {/* <Modal /> */}
      {tableData.length > 0 && (
        <div className="btn-container">
          <PagintaionButton
            currentPage={currentPage}
            totalPages={totalPages}
            handlePreviousPage={handlePreviousPage}
            handleNextPage={handleNextPage}
          />
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
