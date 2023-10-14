export default function appReducer(state, action) {
  switch (action.type) {
    case "ADD_DATA":
      return {
        ...state,
        tableData: [...state.tableData, action.payload],
      };

    case "UPDATE_INITIAL_STATE":
      return {
        ...state,
        tableData: action.payload,
      };

    case "TOGGLE_EDIT_MODE":
      return {
        ...state,
        open: { ...state.open, editMode: !state.open.editMode },
      };

    case "TOGGLE_ADD_MODE":
      return {
        ...state,
        open: { ...state.open, addMode: !state.open.addMode },
      };

    case "EDIT_DATA":
      const updatedEmployee = action.payload;

      const updatedEmployees = state.tableData.map((item) => {
        if (item.id === updatedEmployee.id) {
          return updatedEmployee;
        }
        return item;
      });

      return {
        ...state,
        tableData: updatedEmployees,
      };

    case "REMOVE_DATA":
      return {
        ...state,
        tableData: state.tableData.filter((item) => item.id !== action.payload),
      };

    default:
      return state;
  }
}
