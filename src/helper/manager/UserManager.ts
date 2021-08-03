import { ChatInfo } from "../../dto/ChatInfo";
import User from "../../dto/User";
import { SetFriendAction } from "../../redux/actions/FriendActions";
import { refreshUserInfoAction } from "../../redux/actions/UserActions";
import { appDispatch } from "../../redux/Store";
import { QueryUtil } from "../utils/QueryUtil";


class UserManager {

  user?: User;
  
  constructor() {
  }

  saveUser(user:User) {
    this.user = user;
    appDispatch(refreshUserInfoAction(this.user));
  }

  fetchFriends() {
    QueryUtil.queryFrient((results)=>{
      appDispatch(SetFriendAction(results));
    })
  }

  addFriends(user: User) {
    QueryUtil.addFriend(user);
    this.fetchFriends();
  }

  fetchChat() {
    
  }

  sendChat(chat: ChatInfo) {
    QueryUtil.addChat(chat);
  }
  
}

const userManager = new UserManager();

export default userManager;