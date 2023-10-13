import React from "react";
import { Button } from "antd";
import "./pagination.css";

const PagintaionButton = ({
  currentPage,
  totalPages,
  handlePreviousPage,
  handleNextPage,
}) => {
  return (
    <div className="paginationButtons-container">
      <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
        Previous Page
      </Button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
        Next Page
      </Button>
    </div>
  );
};

export default PagintaionButton;
