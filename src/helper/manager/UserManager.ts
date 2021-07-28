import User from "../../dto/User";
import { refreshUserInfoAction } from "../../redux/actions/UserActions";
import { appDispatch } from "../../redux/Store";


class UserManager {

  user?: User;
  
  constructor() {
  }

  saveUser(user:User) {
    this.user = user;
    appDispatch(refreshUserInfoAction(this.user));
  }
}

const userManager = new UserManager();

export default userManager;