import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectDetailUserState = (state) => {
    return state.detailUser || initialState
};

export const selectData = createSelector(selectDetailUserState, (state) => state.data)