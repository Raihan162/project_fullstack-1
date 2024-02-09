import { produce } from "immer";
import { GET_OTHER_COURSE, SET_OTHER_COURSE } from "./constants";

export const initialState = {
    data: []
}

export const storedKey = ['data']

const registrationReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case GET_OTHER_COURSE:
                draft.data = action.data
                break;
            case SET_OTHER_COURSE:
                draft.data = action.data
                break;
            default:
                break;
        }
    });

export default registrationReducer;