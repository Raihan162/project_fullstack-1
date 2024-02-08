import { produce } from "immer";
import { GET_COURSE, SET_COURSE } from "./constant";

export const initialState = {
    data: []
};

export const storedKey = ['data'];

const MyCourseReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case GET_COURSE:
                draft.data = action.data
                break;
            case SET_COURSE:
                draft.data = action.data
                break;
            default:
                break;
        }
    })

export default MyCourseReducer;