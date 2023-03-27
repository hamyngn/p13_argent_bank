import { UPDATE } from '../actions/actionTypes'

const initialState = {}

const updateData = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE: {
        const { user } = action.payload;
        return {
          ...state,
          user: user,
        };
      }
      default:
        return state;
    }
  }

export default updateData