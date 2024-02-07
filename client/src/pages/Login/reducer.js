import { produce } from "immer";
import { DO_LOGIN, SET_LOGIN } from "./constants";

export const initialState = {
    login: false,
    data: {}
};

export const storedKey = ['login', 'data'];

const loginReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case SET_LOGIN:
                draft.login = action.login
                break;
            default:
                break;
        }
    })

export default loginReducer;