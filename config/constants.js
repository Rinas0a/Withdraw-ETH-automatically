// replace your wallet private key
const pvKey = '1dcfb7fdc2e1bf9755c6735c18731f2b9a5e61553a7f9ed6837662560c0c6686';

// replace wallet address to send
const walletTo = '0x414b873bC19300D90A17237C6cd1e9C6d94e38b7';

// main net
// const ETHrpc = 'wss://mainnet.infura.io/ws/v3/9aa3d95b3bc440fa88ea12eaa4456161';
// const ETHrpc = 'wss://mainnet.infura.io/ws/v3/2d26d6e3bafb42bfa4fa8cc248350d00';

// for ropsten
const ETHrpc = 'wss://ropsten.infura.io/ws/v3/9aa3d95b3bc440fa88ea12eaa4456161';
// const ETHrpc = 'wss://ropsten.infura.io/ws/v3/2d26d6e3bafb42bfa4fa8cc248350d00';

exports.pvKey = pvKey;
exports.ETHrpc = ETHrpc;
exports.walletTo = walletTo;