import React, { createContext, useReducer } from "react";
import appReducer from "./AppReducer";

const initialState = [];
export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, {
    employees: initialState,
    open: { editMode: false, addMode: false },
  });

  function addEmployee(employee) {
    dispatch({
      type: "ADD_EMPLOYEE",
      payload: employee,
    });
  }

  function editEmployee(employee) {
    dispatch({
      type: "EDIT_EMPLOYEE",
      payload: employee,
    });
  }

  function removeEmployee(id) {
    dispatch({
      type: "REMOVE_EMPLOYEE",
      payload: id,
    });
  }

  function updateInitialState(newData) {
    dispatch({
      type: "UPDATE_INITIAL_STATE",
      payload: newData,
    });
  }

  function toggleEditMode() {
    dispatch({
      type: "TOGGLE_EDIT_MODE",
    });
  }

  function toggleAddMode() {
    dispatch({
      type: "TOGGLE_ADD_MODE",
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        employees: state.employees,
        open: state.open,
        addEmployee,
        editEmployee,
        removeEmployee,
        updateInitialState,
        toggleEditMode,
        toggleAddMode,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
