import { produce } from "immer";
import { GET_MY_STUDENT, SET_MY_STUDENT } from "./constant";

export const initialState = {
    data: []
};

export const storedKey = ['data'];

const MyStudentReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case GET_MY_STUDENT:
                draft.data = action.data
                break;
            case SET_MY_STUDENT:
                draft.data = action.data
                break;
            default:
                break;
        }
    })

export default MyStudentReducer;