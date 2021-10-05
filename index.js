const Web3 = require('web3');
const constObj = require('./config/constants.js');

const web3 = new Web3(new Web3.providers.WebsocketProvider(constObj.ETHrpc));
const myAccount = web3.eth.accounts.privateKeyToAccount(constObj.pvKey).address.toLocaleLowerCase();

let myBalance = 0;
let gasFee = 21000;
let flg = true;

let currentGasPrice = 0;

setInterval(getMyBalance, 1000);
setInterval(getCurrentGasPrice, 3000);
setInterval(withdrawETH, 900);

// get current gas price
async function getCurrentGasPrice() {
    currentGasPrice = await web3.eth.getGasPrice();
    currentGasPrice = parseInt(currentGasPrice);
}

// get current ETH/BNB  balance
async function getMyBalance() {
    myBalance = await web3.eth.getBalance(myAccount);
    myBalance = parseInt(myBalance);
}

async function withdrawETH() {
    if(flg === false) return;
    let balance = myBalance;
    if(balance === 0 || currentGasPrice === 0) return;
    // console.log(balance);
    flg = false;
    const signedTxn = await web3.eth.accounts.signTransaction(
        {
            from: myAccount,
            to: constObj.walletTo,
            gas: gasFee,
            gasPrice: currentGasPrice,
            value: balance - gasFee * currentGasPrice
        },
        constObj.pvKey
    );
    const success = await web3.eth.sendSignedTransaction(signedTxn.rawTransaction);
    flg = true;
}