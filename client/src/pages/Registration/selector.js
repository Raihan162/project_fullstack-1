import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectRegistration = (state) => {
    return state.otherCourse || initialState
};

export const selectOtherCourse = createSelector(selectRegistration, (state) => state.data)