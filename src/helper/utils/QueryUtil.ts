import { Alert } from "react-native";
import { ChatInfo } from "../../dto/ChatInfo";
import User from "../../dto/User";
import { SqlUtil } from "./SqlUtil"

// 查询好友列表
const queryFrient = (callback?: (results: User[])=>void) => {
  SqlUtil.queryTable(`
    select * from User
  `, [], (results, err)=>{
    console.log(results);
    callback && callback(results);
  });
}

// 插入新好友
const addFriend = (user: User) => {
  SqlUtil.insertTable(`
      INSERT INTO User (name,avatar,no)
      VALUES (?,?,?);
    `, [user.name, user.avatar, user.no], (status, err)=>{
    console.log(status);
    if (err) {
      Alert.alert(err.message);
    }
  });
}

// 插入聊天记录
const addChat = (chat: ChatInfo) => {
  SqlUtil.insertTable(`
      INSERT INTO Chat_History (id, user_id, content, date, group_id)
      VALUES (?,?,?,?,?);
    `, [chat.id, chat.user_id, chat.content, chat.date, chat.group_id], (status, err)=>{
    console.log(status);
    if (err) {
      Alert.alert(err.message);
    }
  });
}

// 查询单聊
const queryChat = (callback?: (results: ChatInfo[])=>void) => {
  SqlUtil.queryTable(`
    select * from User
  `, [], (results, err)=>{
    console.log(results);
    callback && callback(results);
  });
}

export const QueryUtil = {
  queryFrient,
  addFriend,
  addChat
}