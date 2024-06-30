class WebSocketService {
  private static instance: WebSocketService;
  private ws: WebSocket | null = null;
  private messageHandler: ((data: any) => void) | null = null;

  private constructor() {}

  public static getInstance() {
    if (!this.instance) {
      this.instance = new WebSocketService();
    }
    return this.instance;
  }

  public connect(symbols: string[]) {
    this.disconnect();

    this.ws = new WebSocket('wss://stream.binance.com:9443/ws');

    this.ws.onopen = () => {
      console.log('WebSocket connection opened');

      const subscriptionParams = symbols.map(
        symbol => `${symbol.toLowerCase()}usdt@avgPrice`,
      );
      const subscriptionMessage = {
        method: 'SUBSCRIBE',
        params: subscriptionParams,
        id: 1,
      };

      this.ws?.send(JSON.stringify(subscriptionMessage));
    };

    this.ws.onmessage = event => {
      const data = JSON.parse(event.data);
      this.messageHandler?.(data);
    };

    this.ws.onerror = error => {
      console.error('WebSocket error:', error);
    };

    this.ws.onclose = () => {
      console.log('WebSocket connection closed');
    };
  }

  public onMessage(handler: (data: any) => void) {
    this.messageHandler = handler;
  }

  public disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

export default WebSocketService;
