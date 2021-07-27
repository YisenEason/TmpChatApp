
const url = 'ws://82.157.123.54:9010/ajaxchattest';
let that: any = null;

export default class WebSocketClient {

  static instance: WebSocketClient;

  ws: WebSocket | undefined;
  timer: NodeJS.Timeout | undefined;
  timeout: NodeJS.Timeout | undefined;

  constructor() {
    // this.ws = null;
    // this.timer = null;
    that = this;
  }

  /**
   * 获取WebSocket单例
   * @returns {WebSocketClient}
   */
  static getInstance(): WebSocketClient {
    if (!this.instance) {
      this.instance = new WebSocketClient();
    }
    return this.instance;
  }

  /**
   * 初始化WebSocket
   */
  initWebSocket() {
    try {
      //timer为发送心跳的计时器
      this.timer && clearInterval(this.timer);
      this.ws = new WebSocket(url);
      this.initWsEvent();
    } catch (e) {
      console.log('WebSocket err:', e);
      //重连
      this.reconnect();
    }
  }

  /**
   * 初始化WebSocket相关事件
   */
  initWsEvent() {

    if (!this.ws) {
      throw new Error('WebSocket: WebSocket对象为null');
    }

    //建立WebSocket连接
    this.ws.onopen = function () {
      console.log('WebSocket:', '已连接到服务器');
    };

    //客户端接收服务端数据时触发
    this.ws.onmessage = function (evt) {
      if (evt.data !== 'pong') {
        //不是心跳消息，消息处理逻辑
        console.log('WebSocket: 服务器消息: ', evt.data);
        //接收到消息，处理逻辑...

      } else {
        console.log('WebSocket: 服务器pong消息: ', evt.data);
      }
    };
    //连接错误
    this.ws.onerror = function (err) {
      console.log('WebSocket:', `连接服务器错误(${new Date()}).`);
      //重连
      that.reconnect();
    };
    //连接关闭
    this.ws.onclose = function () {
      console.log('WebSocket:', '连接关闭');
      //重连
      that.reconnect();
    };

    //每隔15s向服务器发送一次心跳
    this.timer = setInterval(() => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        console.log('WebSocket:', '发送心跳ping');
        this.sendMessage('ping');
      }
    }, 15000);
  }

  //发送消息
  sendMessage(msg: string) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      try {
        this.ws.send(msg);
      } catch (err) {
        console.warn('ws 发送消息: ', err.message);
      }
    } else {
      console.log('WebSocket:', '尚未连接服务器，无法发送消息');
    }
  }

  //重连
  reconnect() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      //重新连接WebSocket
      this.initWebSocket();
    }, 15000);
  }

  close() {
    this.ws?.close();
  }
}