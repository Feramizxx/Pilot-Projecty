import React from "react";
import { Button } from "antd";

const ModalButton = ({ isOpen, setIsOpen, type }) => {
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
