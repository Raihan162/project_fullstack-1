import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectRegisterState = (state) => {
    return state.register || initialState
}

export const selectMajor = createSelector(selectRegisterState, (state) => state.major)