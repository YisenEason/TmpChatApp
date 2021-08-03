import User from "../../dto/User";

const SET_FRIEND_LIST_ACTION_TYPE = "SET_FRIEND_LIST_ACTION_TYPE";


const SetFriendAction = (users: User[]) => {

  return {
    type: SET_FRIEND_LIST_ACTION_TYPE,
    list: users
  }
}

export {
  SET_FRIEND_LIST_ACTION_TYPE,
  SetFriendAction
}