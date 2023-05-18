const socket = new WebSocket("wss://ws.finnhub.io?token=");

// Connection opened -> Subscribe
socket.addEventListener("open", function (event) {
  socket.send(JSON.stringify({ type: "subscribe", symbol: "AAPL" }));
  socket.send(JSON.stringify({ type: "subscribe", symbol: "BINANCE:BTCUSDT" }));
  socket.send(JSON.stringify({ type: "subscribe", symbol: "IC MARKETS:1" }));
});

// Listen for messages
socket.addEventListener("message", function (event) {
  console.log("Message from server ", event.data);
});
// {
//     country: 'US',
//     currency: 'USD',
//     estimateCurrency: 'USD',
//     exchange: 'NASDAQ NMS - GLOBAL MARKET',
//     finnhubIndustry: 'Technology',
//     ipo: '1980-12-12',
//     logo: 'https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/AAPL.svg',
//     marketCapitalization: 2716189.6896291194,
//     name: 'Apple Inc',
//     phone: '14089961010.0',
//     shareOutstanding: 15728.7,
//     ticker: 'AAPL',
//     weburl: 'https://www.apple.com/'
//   }
