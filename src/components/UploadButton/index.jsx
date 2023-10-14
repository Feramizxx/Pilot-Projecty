import React, { useState, useContext } from "react";
import * as XLSX from "xlsx";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import { GlobalContext } from "../../context/GlobalState";
import "./uploadbutton.css";

const UploadButton = ({ setData, setCurrentPage }) => {
  const [loading, setLoading] = useState(false);
  const { updateInitialState } = useContext(GlobalContext);

  const handleFileUpload = (file) => {
    setLoading(true); // Set loading to true during file processing
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (e) => {
      const data = e.target.result;
      if (!file.name.endsWith(".xlsx")) {
        setLoading(false);
        return;
      }
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);

      setData(parsedData);
      updateInitialState(parsedData);
      setCurrentPage(1);
      setLoading(false);
    };
  };

  return (
    <Upload
      accept=".xlsx, .xls"
      beforeUpload={(file) => {
        handleFileUpload(file);
        return false;
      }}
      showUploadList={false}
    >
      <Button icon={<UploadOutlined />} loading={loading}>
        {loading ? "Uploading..." : "Load Excel File"}
      </Button>
    </Upload>
  );
};

export default UploadButton;
