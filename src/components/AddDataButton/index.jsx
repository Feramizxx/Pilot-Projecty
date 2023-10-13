import React, { useState, useContext } from "react";
import { Button } from "antd";
import ModalComponent from "../Modal";
import ModalButton from "../Button";
import { GlobalContext } from "../../context/GlobalState";

const AddDataButton = ({ newData }) => {
  // const [open, setOpen] = useState({ editMode: false, addMode: false });
  const { addEmployee, toggleEditMode, toggleAddMode } =
    useContext(GlobalContext);
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
