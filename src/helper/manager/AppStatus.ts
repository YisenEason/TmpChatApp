import { refreshAppStatusAction } from "../../redux/actions/AppStatusActions";
import { appDispatch } from "../../redux/Store";

 
type Status = 'online'|'offline';

class AppStatus {

  status: Status;

  constructor() {
    this.status = 'offline';
  }

  init () {
    
  }

  refresh(status: Status) {
    this.status = status;
    appDispatch(refreshAppStatusAction({
      status: this.status,
      date: new Date().toLocaleString()
    }))
  }

}

const appStatus = new AppStatus()
export default appStatus;