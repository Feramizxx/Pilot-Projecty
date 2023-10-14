import React, { useState } from "react";
import ModalComponent from "../Modal";
import ModalButton from "../Button";

const AddDataButton = ({ newData }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ModalButton type="add" isOpen={isOpen} setIsOpen={setIsOpen} />
      <ModalComponent
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        type="add"
        newData={newData}
      />
    </>
  );
};

export default AddDataButton;
