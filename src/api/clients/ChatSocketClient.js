export default class {
  constructor(url, wsToken = null) {
    this.url = url;
    this.token = wsToken;
    this.socket = null;
  }

  createSocket(onOpen, onMessage) {
    this.socket = this.token === null ?
      new WebSocket(this.url) :
      new WebSocket(this.url, [this.token])
    this.socket.onopen = onOpen;
    this.socket.onmessage = onMessage;
  }

  send(msg) {
    this.socket.send(msg);
  }

  close() {
    this.socket.close();
  }
}
