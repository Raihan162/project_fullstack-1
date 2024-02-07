import { produce } from "immer";
import { GET_DATA_STUDENT, SET_DATA_STUDENT } from "./constants";

export const initialState = {
    data: {}
};

export const storedKey = ['data'];

const detailUserReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case GET_DATA_STUDENT:
                draft.data = action.data
                break;
            case SET_DATA_STUDENT:
                draft.data = action.data
                break;
            default:
                break;
        }
    })

export default detailUserReducer;