import React, { useContext, useState, useEffect } from "react";
import { ReactTabulator } from "react-tabulator";
import "react-tabulator/lib/styles.css";
import "react-tabulator/lib/css/tabulator.min.css";
import "./table.css";
import { GlobalContext } from "../../context/GlobalState";
import ModalComponent from "../Modal";
import ModalButton from "../Button";
import MapComponent from "../Map";
import { reactFormatter } from "./Utils";

const Table = () => {
  const { removeTableData, tableData, updateFilteredDataState } =
    useContext(GlobalContext);

  tableData.sort((a, b) => b.id - a.id);
  const [clickedCellData, setClickedCellData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [clickedCellWKT, setClickedCellWKT] = useState("");
  const [filteredData, setFilteredData] = useState();

  useEffect(() => {
    updateFilteredDataState(filteredData);
  }, [filteredData]);

  function EditButton(props) {
    const cellValue = "Edit";
    return <p>{cellValue}</p>;
  }
  function ShowInMapButton(props) {
    const cellValue = "Map";
    return <p>{cellValue}</p>;
  }

  const columns = [
    {
      title: "id",
      field: "id",
      sorter: "number",
      align: "right",
      initialSort: [{ column: "id", dir: "desc" }],
      headerFilter: "input",
    },
    { title: "len", field: "len", headerFilter: "input" },
    { title: "wkt", field: "wkt", headerFilter: "input" },
    { title: "status", field: "status", headerFilter: "input" },

    {
      title: "Edit",
      field: "edit",
      formatter: reactFormatter(<EditButton />),
      align: "center",
      headerSort: false,
      width: 40,
      cellClick: function (e, cell) {
        const rowData = cell.getRow().getData();
        setClickedCellData(rowData);
        setIsOpen(true);
      },
    },

    {
      title: "remove",
      field: "remove",
      formatter: "buttonCross",
      align: "center",
      headerSort: false,
      width: 40,
      cellClick: function (e, cell) {
        const mydata = cell.getRow().getData().id;
        removeTableData(mydata);
      },
    },

    {
      title: "Map",
      field: "showInMap",
      formatter: reactFormatter(<ShowInMapButton />),
      align: "center",
      headerSort: false,
      width: 40,
      cellClick: function (e, cell) {
        const rowData = cell.getRow().getData();
        setClickedCellWKT(rowData.wkt);
      },
    },
  ];

  const options = {
    pagination: "local",
    paginationSize: 100,
  };

  return (
    <>
      <div
        className={`${
          clickedCellData !== "" ? "table-container" : "container"
        }`}
      >
        <ReactTabulator
          style={{
            border: "1px solid #ccc",
            borderRadius: "5px",
            width: "100%",
            maxHeight: "400px",
            margin: "10px 0px",
          }}
          data={tableData}
          columns={columns}
          options={options}
          layout="fitColumns"
          dataLoading={() => {}}
          events={{
            dataFiltered: function (filters, rows) {
              const filteredRows = rows.map((row) => row.getData());
              setFilteredData(filteredRows);
            },
          }}
        />

        <MapComponent wktData={clickedCellWKT} />
        {clickedCellData !== "" && (
          <ModalComponent
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            type="edit"
            newData={clickedCellData}
          />
        )}
      </div>

      {clickedCellData && <ModalButton type="edit" rowData={clickedCellData} />}
    </>
  );
};

export default Table;
