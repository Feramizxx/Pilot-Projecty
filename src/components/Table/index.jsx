import React, { useContext, useState } from "react";
import { ReactTabulator } from "react-tabulator";
import "react-tabulator/lib/styles.css";
import "react-tabulator/lib/css/tabulator.min.css";
import "./table.css";
import { GlobalContext } from "../../context/GlobalState";
import ModalComponent from "../Modal";
import ModalButton from "../Button";
import MapComponent from "../Map";
import { reactFormatter } from "./Utils";

const Table = ({ paginatedData, itemsPerPage, currentPage }) => {
  const { removeTableData } = useContext(GlobalContext);
  const sortedData = paginatedData.sort((a, b) => b.id - a.id);
  const [clickedCellData, setClickedCellData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [clickedCellWKT, setClickedCellWKT] = useState("");

  function EditButton(props) {
    // const rowData = props.cell._cell.row.data;
    const cellValue = "Edit";
    return <p>{cellValue}</p>;
  }
  function ShowInMapButton(props) {
    // const rowData = props.cell._cell.row.data;
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
      headerFilter: true,
    },
    { title: "len", field: "len", headerFilter: true },
    { title: "wkt", field: "wkt", headerFilter: true },
    { title: "status", field: "status", headerFilter: true },
    {
      title: "Edit",
      field: "edit",
      formatter: reactFormatter(<EditButton />),
      align: "center",
      headerSort: false,
      width: 40,
      cellClick: function (e, cell) {
        const rowData = cell.getRow().getData();
        // console.log("Cell clicked for row:", rowData);
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
        // console.log(mydata.id, "iddd");

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
        console.log("Map clicked for row:", cell.getRow().getData());
        const rowData = cell.getRow().getData();
        console.log(rowData.wkt, "WKT");
        setClickedCellWKT(rowData.wkt);
      },
    },
  ];

  return (
    <>
      <div
        className={`${
          clickedCellData !== "" ? "table-container" : "container"
        }`}
      >
        {sortedData.length !== 0 && (
          <ReactTabulator
            style={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              width: "100%",
              maxHeight: "400px",
              margin: "10px 0px",
            }}
            data={sortedData}
            columns={columns}
            layout="fitColumns"
            pagination="local"
            paginationSize={itemsPerPage}
            paginationSizeSelector={[itemsPerPage, 20, 50]}
            paginationInitialPage={currentPage}
            dataFiltered={() => {}}
            dataLoaded={() => {}}
            dataLoading={() => {}}
          />
        )}

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
