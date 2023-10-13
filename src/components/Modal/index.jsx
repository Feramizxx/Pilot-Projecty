import React, { useContext, useRef } from "react";
import { Button, Modal, Form, Input, Select } from "antd";
import { GlobalContext } from "../../context/GlobalState";

const ModalComponent = ({ isOpen, setIsOpen, newData, type }) => {
  const formRef = useRef();
  const { employees, addEmployee, open, editEmployee, toggleAddMode } =
    useContext(GlobalContext);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const newValues = {
      ...values,
      len: Number(values.len),
      status: Number(values.status),
    };

    if (newValues.len >= 0) {
      if (type === "add") {
        const maxId = employees.reduce(
          (max, employee) => (employee.id > max ? employee.id : max),
          0,
        );
        const newValue = { ...newValues, id: maxId + 1 };
        addEmployee(newValue);
      } else if (type === "edit") {
        editEmployee({ ...newData, ...newValues });
      }
      formRef.current.resetFields();
      handleOk();
    } else {
      formRef.current.resetFields();

      alert("Length cannot be less than 0");
    }
  };

  const handleOk = (e) => {
    setIsOpen(!isOpen);

    console.log(e);
  };
  const handleCancel = (e) => {
    setIsOpen(!isOpen);
    console.log(e);
  };

  return (
    <Modal
      title={type === "add" ? "Add Data" : "Edit Data"}
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={form.submit}>
          {type === "add" ? "Add data" : "Save"}
        </Button>,
      ]}
    >
      <Form ref={formRef} form={form} onFinish={onFinish}>
        <Form.Item
          label="Len"
          name="len"
          rules={[{ required: true, message: "Please input Length!" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please select a status!" }]}
        >
          <Select>
            <Select.Option value="0">0</Select.Option>
            <Select.Option value="1">1</Select.Option>
            <Select.Option value="2">2</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalComponent;
