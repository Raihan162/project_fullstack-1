import { produce } from "immer";
import { GET_MAJOR, SET_MAJOR, SET_STEP, SET_USER } from "./constants";

export const initialState = {
    step: 1,
    user: {
    },
    major: []
};

export const storedKey = ['step', 'user']

const registerReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case SET_STEP:
                draft.step = action.step
                break;
            case SET_USER:
                draft.user = action.user
                break;
            case GET_MAJOR:
                draft.major = action.major
                break;
            case SET_MAJOR:
                draft.major = action.data
                break;
            default:
                break;
        }
    });

export default registerReducer;