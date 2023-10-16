import React, { createContext, useReducer } from "react";
import appReducer from "./AppReducer";

const initialState = {
  tableData: [],
  filteredTableData: [],
};
export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

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

  function updateFilteredDataState(comingdata) {
    dispatch({
      type: "UPDATE_FILTERDEDDATA_STATE",
      payload: comingdata,
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
        filteredTableData: state.filteredTableData,
        open: state.open,
        addTableData,
        editTableData,
        removeTableData,
        updateInitialState,
        updateFilteredDataState,
        toggleEditMode,
        toggleAddMode,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
