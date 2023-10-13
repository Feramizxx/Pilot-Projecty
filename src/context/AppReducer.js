export default function appReducer(state, action) {
  switch (action.type) {
    case "ADD_EMPLOYEE":
      return {
        ...state,
        employees: [...state.employees, action.payload],
      };

    case "UPDATE_INITIAL_STATE":
      return {
        ...state,
        employees: action.payload,
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

    case "EDIT_EMPLOYEE":
      const updatedEmployee = action.payload;

      const updatedEmployees = state.employees.map((employee) => {
        if (employee.id === updatedEmployee.id) {
          return updatedEmployee;
        }
        return employee;
      });

      return {
        ...state,
        employees: updatedEmployees,
      };

    case "REMOVE_EMPLOYEE":
      return {
        ...state,
        employees: state.employees.filter(
          (employee) => employee.id !== action.payload,
        ),
      };

    default:
      return state;
  }
}
