import { AppStatus, REFRESH_APP_STATUS } from "../actions/AppStatusActions";

const initialState: AppStatus = {
  status: '',
  date: ''
}

const appStatusReducer = (state = initialState, action:any) => {
  switch(action.type) {
    case REFRESH_APP_STATUS: {
      return {
        ...state,
        date: action.stauts.date,
        status: action.stauts.status
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}

export { appStatusReducer };
