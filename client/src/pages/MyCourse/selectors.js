import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectMyCourseState = (state) => {
    return state.courseUser || initialState
}
export const selectMyCourse = createSelector(selectMyCourseState, (state) => state.data)