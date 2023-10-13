import React from "react";
import { Button } from "antd";

const ChartUploadButton = ({
  type,
  openPieChart,
  setIsOpenPieChart,
  setChartType,
}) => {
  const handleOpenChart = () => {
    setIsOpenPieChart(!openPieChart);
    setChartType(type);
  };

  return (
    <Button onClick={handleOpenChart}>
      {" "}
      {type === "pie" ? "Load Piechart" : "Load Bargraph"}
    </Button>
  );
};

export default ChartUploadButton;
