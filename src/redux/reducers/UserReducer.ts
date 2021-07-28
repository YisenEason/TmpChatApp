import { REFRESH_ACTION_TYPE } from "../actions/UserActions";

const initialState = {
  user: null
}

const userReducer = (state = initialState, action:any) => {
  switch(action.type) {
    case REFRESH_ACTION_TYPE: {
      return {
        ...state,
        user: action.user
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}

export { userReducer };
