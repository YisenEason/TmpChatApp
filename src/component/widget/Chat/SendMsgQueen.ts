import { DeviceEventEmitter, EmitterSubscription } from "react-native";

type SubData = {
  key: string;
  subscription: EmitterSubscription,
  date: Date
}

export type SendMsgRespone = {
  isComplete: boolean,
  isErr: boolean
}

const TIME_OUT = 5;

class SendMsgQueen {
  
  // 定时器，用于处理超时的发送请求
  timer?: NodeJS.Timeout;

  // 订阅数组
  subscriptions: SubData[] = [];

  // 发送消息服务器返回的Resp数组
  sendScuessResps: [] = [];

  constructor() {
    this.initTimer();
  }

  initTimer() {
    let that = this;
    this.timer = setInterval(()=>{
      // console.log('定时器,', new Date());
      // console.log(this.subscriptions);
      let subsTmp = [...this.subscriptions];
      this.subscriptions.map((sub, index)=>{

        // 超时判断
        if (new Date().getTime() - sub.date.getTime() >= TIME_OUT * 1000) {
          // sub.subscription.emitter.on;
          let rep: SendMsgRespone = {
            isComplete: true,
            isErr: false
          }
          DeviceEventEmitter.emit(sub.key, rep);
          subsTmp.splice(index, 1);
        }

      })
      that.subscriptions = subsTmp;
    }, 1000);
  }

  addSubscription(key: string, subscription: EmitterSubscription) {
    let subData: SubData = {
      key: key,
      subscription: subscription,
      date: new Date()
    }
    this.subscriptions.push(subData);
  }

}

const sendMsgQueen = new SendMsgQueen();

export default sendMsgQueen;