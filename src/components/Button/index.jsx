import React, { useState, useContext } from "react";
import { Button } from "antd";
import ModalComponent from "../Modal";
import { GlobalContext } from "../../context/GlobalState";

const ModalButton = ({ isOpen, setIsOpen, type, rowData }) => {
  const showModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {type === "add" && (
        <Button type="primary" onClick={showModal}>
          Add New Data
        </Button>
      )}
    </>
  );
};

export default ModalButton;
