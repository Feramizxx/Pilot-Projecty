import React, { createContext, useReducer } from "react";
import appReducer from "./AppReducer";

const initialState = [];
export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, {
    tableData: initialState,
    open: { editMode: false, addMode: false },
  });

  function addTableData(data) {
    dispatch({
      type: "ADD_DATA",
      payload: data,
    });
  }

  function editTableData(data) {
    dispatch({
      type: "EDIT_DATA",
      payload: data,
    });
  }

  function removeTableData(id) {
    dispatch({
      type: "REMOVE_DATA",
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
        tableData: state.tableData,
        open: state.open,
        addTableData,
        editTableData,
        removeTableData,
        updateInitialState,
        toggleEditMode,
        toggleAddMode,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
