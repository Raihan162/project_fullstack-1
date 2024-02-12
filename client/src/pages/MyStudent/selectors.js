import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectMyStudentState = (state) => {
    return state.myStudent || initialState
}
export const selectMyStudent = createSelector(selectMyStudentState, (state) => state.data)