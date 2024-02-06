import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectRegisterState = (state) => {
    console.log(state)
    return state.major || initialState
}

export const selectMajor = createSelector(selectRegisterState, (state) => state.major)