export default class {
  constructor(url, wsToken = null) {
    this.url = url;
    this.token = wsToken;
    this.socket = null;
  }

  createSocket() {
    this.socket = this.token === null ?
      new WebSocket(this.url) :
      new WebSocket(this.url, [this.token])
  }

  onOpen(fn) {
    this.socket.onopen = fn;
  }

  onMessage(fn) {
    this.socket.onmessage = fn;
  }

  send(msg) {
    this.socket.send(msg);
  }

  close() {
    this.socket.close();
  }
}
