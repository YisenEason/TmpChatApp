import User from "../../dto/User";

const REFRESH_ACTION_TYPE = "REFRESH_ACTION_TYPE";

const refreshUserInfoAction = (user: User) => {
  return {
    type: REFRESH_ACTION_TYPE,
    user: user
  }
}

export {
  REFRESH_ACTION_TYPE,
  refreshUserInfoAction
}