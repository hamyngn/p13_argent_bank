import { UPDATE_SUCCEEDED, UPDATE_USER_REQUESTED, FETCH_SUCCEEDED, FETCH_FAILED, UPDATE_FAILED, GET_USER_REQUESTED } from '../actions/actionTypes'

const initialState = {
  user: null,
  loading: false,
  error: null
}

const profile = (state = initialState, action) => {
    switch (action.type) {
      case GET_USER_REQUESTED: {
        return {
          ...state,
          user: null,
          loading: true,
          error: null
        }
      }
      case FETCH_SUCCEEDED: {
        const { user } = action;
        return {
          ...state,
          user: user,
          loading: false,
          error: null
        };
      }
      case FETCH_FAILED: {
        const {error} = action;
        return {
          ...state,
          user: null,
          error: error,
          loading: false
        }
      };
      case UPDATE_USER_REQUESTED: {
        return {
          ...state,
          user: null,
          loading: true,
          error: null
        }
      }
      case UPDATE_SUCCEEDED: {
        const { user } = action;
        return {
          ...state,
          user: user,
          loading: false,
          error: null
        };
      }
      case UPDATE_FAILED: {
        const {error} = action;
        return {
          ...state,
          error: error,
          loading: false,
          user: null
        }
      };
      default:
        return state;
    }
  }

export default profile