import { SET_MESSAGE, CLEAR_MESSAGE } from "../actions/actionTypes";

const initialState = {};

const handleMessage = (state = initialState, action) => {
  const { type, message } = action;

  switch (type) {
    case SET_MESSAGE:
      return { message: message };

    case CLEAR_MESSAGE:
      return { message: "" };

    default:
      return state;
  }
}

export default handleMessage