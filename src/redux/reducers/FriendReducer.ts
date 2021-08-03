import { Group } from "../../dto/Group";
import User from "../../dto/User";
import { SET_FRIEND_LIST_ACTION_TYPE } from "../actions/FriendActions";

const pinyin = require('tiny-pinyin')

const initialState = {
  friends: []
}


const coverData = (user: User) => {
  let nameStr: string = pinyin.convertToPinyin(user.name);
  let firstChar = nameStr.charAt(0);
  return {
    key: firstChar.toUpperCase(),
    user: user
  }
}

const coverGroup = (users: User[]): Group[] => {

  let friendList : Group[] = [];

  users.map((user)=>{
    let keyUser = coverData(user);
    let isExistByKey = false
    friendList.map((item: Group)=>{
      if (item.title.toUpperCase() === keyUser.key.toUpperCase()) {
        item.data.push(keyUser.user);
        isExistByKey= true;
      }
    })
    if (!isExistByKey) {
      friendList.push({
        title: keyUser.key.toUpperCase(),
        data: [keyUser.user]
      })
    }
  })

  return friendList;
}

var compare = function (obj1: Group, obj2: Group) {
    var val1 = obj1.title;
    var val2 = obj2.title;
    if (val1 < val2) {
        return -1;
    } else if (val1 > val2) {
        return 1;
    } else {
        return 0;
    }            
} 

const friendReducer = (state = initialState, action:any) => {
  switch(action.type) {
    case SET_FRIEND_LIST_ACTION_TYPE: {
      return {
        ...state,
        friends: coverGroup(action.list).sort(compare)
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}

export { friendReducer };
